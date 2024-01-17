import { ReactNode, useContext, useEffect } from "react"
import { ConnectionContext } from "./connection"
import { useLocalStorage } from "@uidotdev/usehooks"
import { v4 as uuid } from 'uuid'

const WSAuthProvider = ({ children }: { children: ReactNode }) => {
  const connection = useContext(ConnectionContext)
  const [sessionId, setSessionId] = useLocalStorage<string | null>("_SESSION_ID", null)

  useEffect(() => {
    if (sessionId === null)
      setSessionId(uuid())
  }, [])

  useEffect(() => {
    connection?.registerEvent("_REQUEST_SESSION_ID", () => {
      connection.send("_SESSION_ID", sessionId)
    })
    connection?.registerEvent("_REGEN_SESSION_ID", () => {
      setSessionId(uuid())
      connection.send("_SESSION_ID", sessionId)
    })

    return () => {
      connection?.deregisterEvent("_REQUEST_SESSION_ID")
      connection?.deregisterEvent("_REGEN_SESSION_ID")
    }
  }, [connection])

  return <>{children}</>
}

export { WSAuthProvider }