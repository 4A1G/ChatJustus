import { useContext, useEffect } from "react"
import { toast } from "sonner"
import { ConnectionContext } from "./connection"

// remote toast handler
export const useRemoteToast = () => {
  const connection = useContext(ConnectionContext)
  
  useEffect(() => {
    connection?.registerEvent("_TOAST", ({ message, type }) => {
      switch (type) {
        case 'default':
          toast(message)
          break
        case 'message':
          toast.message(message)
          break
        case 'success':
          toast.success(message)
          break
        case 'info':
          toast.info(message)
          break
        case 'warning':
          toast.warning(message)
          break
        case 'error':
          toast.error(message)
          break
        default:
          toast(message)
      }
    })
    return () => connection?.deregisterEvent("_TOAST")
  }, [])
}