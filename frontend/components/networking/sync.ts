import { useState, useReducer, useContext, useEffect, useMemo } from "react"
import { applyPatch, applyReducer, compare, deepClone } from "fast-json-patch"
import { ConnectionContext } from "./connection"
import { castImmutable, produceWithPatches, enablePatches } from "immer"
enablePatches()


// export function useStateAndSync<T>(defaultValue: T, key: string, sendOnInit = false) {
//   const connection = useContext(ConnectionContext)
//   const [state, setState] = useState<T>(defaultValue)

//   const send = (newState: T) => {
//     connection?.send(set_event(key), newState)
//   }

//   useEffect(() => {
//     connection?.register_event(set_event(key), setState)
//     connection?.register_event(get_event(key), () => {
//       send(state)
//     })
//     if (sendOnInit) {
//       connection?.register_init(key, () => {
//         send(state)
//       })
//     }

//     return () => {
//       connection?.deregister_event(set_event(key))
//       connection?.deregister_event(get_event(key))
//       if (sendOnInit) {
//         connection?.deregister_init(key)
//       }
//     }
//   }, [connection, key])

//   const setSyncedState = (newState: T) => {
//     send(newState)
//     setState(newState)
//   }

//   return [state, setState, setSyncedState] as const
// }

// export function useSyncedState<T>(defaultValue: T, key: string, sendOnInit = false) {
//   const [state, setState, setSyncedState] = useStateAndSync(defaultValue, key, sendOnInit)
//   return [state, setSyncedState] as const
// }

// export function useRemoteState<T>(defaultValue: T, key: string) {
//   const [state, setState] = useSyncedState(defaultValue, key, false)
//   // do not expose the setter, since only the server can set the state
//   return state
// }

// export function useExposedState<T>(defaultValue: T, key: string) {
//   const [state, setState] = useSyncedState(defaultValue, key, true)
//   return [state, setState] as const
// }



const setEvent = (key: string) => "_SET:" + key
const getEvent = (key: string) => "_GET:" + key
const patchEvent = (key: string) => "_PATCH:" + key
const actionEvent = (key: string) => "_ACTION:" + key


export type Action = {
  type: string
} & Record<string, any>

// sync object that can calculate the json patch and send it to remote
export type Sync<S> = () => void
export type Delegate = (actionOverride?: Action) => void
export type SyncedReducer<S> = (draft: S, action: Action, sync: Sync<S>, delegate: Delegate) => S | void


export function useSyncedReducer<S>(
  key: string,
  syncedReducer: SyncedReducer<S> | undefined,
  initialState: S,
  sendOnInit = false
): [any, (action: Action) => void] {
  const connection = useContext(ConnectionContext)

  // Syncing: Local -> Remote
  const sendState = (newState: S) => {
    connection?.send(setEvent(key), newState)
  }
  const sendPatch = (patch: any) => {
    connection?.send(patchEvent(key), patch)
  }
  const sendAction = (action: Action) => {
    connection?.send(actionEvent(key), action)
  }

  // Dynamically create setters and syncers for each attribute
  const setters = useMemo(
    () => Object.keys(initialState as object).reduce((acc, attr) => {
      const upper = attr.charAt(0).toUpperCase() + attr.slice(1)

      const setState = (newValue: any) => {
        const patch = [{ op: "replace", path: `/${attr}`, value: newValue }]
        patchState(patch) // local update
      }
      const syncState = (newValue: any) => {
        const patch = [{ op: "replace", path: `/${attr}`, value: newValue }]
        patchState(patch) // local update
        sendPatch(patch) // sync to remote
      };

      acc[`set${upper}`] = setState
      acc[`sync${upper}`] = syncState
      return acc
    }, {} as Record<string, (v: any) => void>),
    [initialState])

  // State Management
  // reducer must be wrapped to handle the remote events, and also return a queue of side effects to perform, i.e. sync and sendAction
  const wrappedReducer = ([state, _]: [S, any[]], action: Action): [S, any[]] => {
    switch (action.type) {

      case setEvent(key): {
        const newState = action.data
        return [newState, []]
      }

      case patchEvent(key): {
        const patch = action.data
        const newState = patch.reduce(applyReducer, deepClone(state))
        return [newState, []]
      }

      default: {
        if (!syncedReducer) {
          return [state, []]
        }
        // sync and delegate enqueues the patch and action to be sent to the remote, will actually be executed in the useEffect after the reducer
        const createEffect: any[] = []
        const sync = () => {
          createEffect.push((patch: any[]) => () => {
            if (patch.length > 0) {
              //convert "Immer" patches to standard json patches
              console.log("syncing", patch)
              patch.forEach((p) => {
                // if path is an array, join it into a string
                if (Array.isArray(p.path)) {
                  p.path = p.path.join("/")
                }
                // if it does not start with /, add it
                if (!p.path.startsWith("/")) {
                  p.path = "/" + p.path
                }
              })
              sendPatch(patch)
            }
          })
        }
        const delegate = (actionOverride?: Action) => {
          createEffect.push((patch: any[]) => () => {
            sendAction(actionOverride ?? action)
          })
        }
        const withPatch = produceWithPatches(syncedReducer)
        const [newState, patch, inverse] = withPatch(castImmutable(state), action, sync, delegate)
        return [newState, createEffect.map((f) => f(patch))]
      }
    }
  }

  // The underlying state holder and reducer
  const [[state, effects], dispatch] = useReducer(wrappedReducer, [initialState, []])

  // Execute the side effects (after render)
  useEffect(() => {
    effects.forEach((f) => f())
    // clear the effects
    effects.splice(0, effects.length)
  })

  // Syncing: Remote -> Local
  // callbacks to handle remote events
  const setState = (newState: S) => {
    dispatch({ type: setEvent(key), data: newState })
  }
  const patchState = (patch: any) => {
    dispatch({ type: patchEvent(key), data: patch })
  }
  const actionState = (action: Action) => {
    dispatch(action)
  }

  useEffect(() => {
    connection?.registerEvent(getEvent(key), () => sendState(state)) //TODO: closure correct?
    connection?.registerEvent(setEvent(key), setState)
    connection?.registerEvent(patchEvent(key), patchState)
    connection?.registerEvent(actionEvent(key), actionState)
    if (sendOnInit) {
      // Optionally, send the initial state or an initial action
      connection?.registerInit(key, () => sendState(state))
    }

    return () => {
      connection?.deregisterEvent(getEvent(key))
      connection?.deregisterEvent(setEvent(key))
      connection?.deregisterEvent(patchEvent(key))
      connection?.deregisterEvent(actionEvent(key))
      if (sendOnInit) {
        connection?.deregisterInit(key)
      }
    }
  }, [connection, key])

  // expose the state with setters and syncers
  const stateWithSync = {
    ...state,
    ...setters,
    sendAction
  }

  return [stateWithSync, dispatch]
}

export function useSynced<S>(
  key: string,
  initialState: S,
  sendOnInit = false
) {
  const [stateWithSync, dispatch] = useSyncedReducer(key, undefined, initialState, sendOnInit)
  return stateWithSync
}


// export function useReducerAndSync<S>(
//   reducer: Reducer<S, Action>,
//   initialState: S,
//   key: string,
//   sendOnInit = false
// ) {
//   const [state, dispatch, syncedDispatch, setState] = useReducerAndSyncAndState(reducer, initialState, key, sendOnInit)

//   return [state, dispatch, syncedDispatch] as const
// }

// export function useSyncedReducerAndSet<S>(
//   reducer: Reducer<S, Action>,
//   initialState: S,
//   key: string,
//   sendOnInit = false
// ) {
//   const [state, dispatch, syncedDispatch, setState] = useReducerAndSyncAndState(reducer, initialState, key, sendOnInit)

//   return [state, syncedDispatch, setState] as const
// }

// export function useSyncedReducer<S>(
//   reducer: Reducer<S, Action>,
//   initialState: S,
//   key: string,
//   sendOnInit = false
// ) {
//   const [state, dispatch, syncedDispatch] = useReducerAndSync(reducer, initialState, key, sendOnInit)
//   return [state, syncedDispatch] as const
// }

// export function useRemoteReducer<S>(
//   reducer: Reducer<S, Action>,
//   initialState: S,
//   key: string
// ) {
//   const [state, dispatch] = useSyncedReducer(reducer, initialState, key, false)
//   // do not expose the setter, since only the server can set the state
//   return state
// }

// export function useExposedReducer<S>(
//   reducer: Reducer<S, Action>,
//   initialState: S,
//   key: string
// ) {
//   const [state, dispatch] = useSyncedReducer(reducer, initialState, key, true)
//   return [state, dispatch] as const
// }
