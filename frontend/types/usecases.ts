import { produce } from 'immer'
import { RJSFSchema } from '@rjsf/utils'
import { SyncedReducer } from '@/components/networking/sync'


// define usecases state object and its reducer
type UsecaseID = number | string
type Usecase = any

type Usecases = {
  schema: RJSFSchema
  remote: Record<UsecaseID, Usecase> // all usecases on the server

  created: Record<UsecaseID, Usecase> // usecases that have been created locally
  updated: Record<UsecaseID, Usecase> // usecases that have been changed locally
  deleted: UsecaseID[] // usecases that have been deleted locally

  opened: UsecaseID[] // usecases that are currently open
}
const initialUsecases: Usecases = {
  schema: {},
  remote: {},

  created: {},
  updated: {},
  deleted: [],

  opened: [],
}

const reduceUsecases: SyncedReducer<Usecases> = (usecases, action, sync, delegate) => {
  switch (action.type) {
    // handled locally
    case 'UPDATE': {
      // determine which dict to modify
      const { id, usecase } = action
      let target
      if (id in usecases.created) {
        target = usecases.created
      } else if (id in usecases.remote || id in usecases.updated) {
        target = usecases.updated
      } else {
        throw new Error("No such usecase")
      }
      // restore deleted
      for (let i = 0; i < usecases.deleted.length; i++) {
        if (usecases.deleted[i] == id) {
          usecases.deleted.splice(i, 1)
          break
        }
      }

      target[id] = usecase
      sync()
    } break

    //handled by remote
    case 'CREATE':
    case 'DELETE':
    case 'RESTORE':
    case 'IMPORT':
    case 'FETCH_REMOTE':
    case 'PUSH_REMOTE': {
      delegate()
    } break
  }
}

const applyModifications = (usecases: Usecases) => {
  const modified = produce(usecases.remote, (draft) => {
    Object.entries(usecases.created).forEach(([id, uc]) => {
      draft[id] = uc
    })
    Object.entries(usecases.updated).forEach(([id, uc]) => {
      draft[id] = uc
    })
    usecases.deleted.forEach((id) => {
      delete draft[id]
    })
  })
  return modified
}

export type { UsecaseID, Usecase, Usecases }
export { initialUsecases, reduceUsecases, applyModifications }