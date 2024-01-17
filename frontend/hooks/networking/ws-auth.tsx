import { ReactNode, useContext, useEffect } from "react"
import { ConnectionContext } from "./connection"
import { useLocalStorage, useSessionStorage } from "@uidotdev/usehooks"
import { v4 as uuid } from 'uuid'

const WSAuthProvider = ({ children }: { children: ReactNode }) => {
  const connection = useContext(ConnectionContext)
  const [userId, setUserId] = useLocalStorage<string | null>("_USER_ID", null)
  const [sessionId, setSessionId] = useSessionStorage<string | null>("_SESSION_ID", null)

  useEffect(() => {
    connection?.registerEvent("_REQUEST_USER_SESSION", () => {
      let u = userId, s = sessionId
      if (userId === null) {
        u = uuid()
        setUserId(u)
      }
      if (sessionId === null) {
        s = uuid()
        setSessionId(s)
      }
      connection.send("_USER_SESSION", { user: u, session: s })
    })

    return () => {
      connection?.deregisterEvent("_REQUEST_USER_SESSION")
    }
  }, [connection])

  return <>{children}</>
}

export { WSAuthProvider }