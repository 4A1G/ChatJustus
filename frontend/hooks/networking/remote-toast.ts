import { useContext, useEffect } from "react"
import { toast } from "sonner"
import { Connection, DefaultConnectionContext } from "./connection"

// remote toast handler
export const useRemoteToast = (connection: Connection | null, prefix: string = "") => {  
  useEffect(() => {
    connection?.registerEvent("_TOAST", ({ message, type }) => {
      switch (type) {
        case 'default':
          toast(prefix+message)
          break
        case 'message':
          toast.message(prefix+message)
          break
        case 'success':
          toast.success(prefix+message)
          break
        case 'info':
          toast.info(prefix+message)
          break
        case 'warning':
          toast.warning(prefix+message)
          break
        case 'error':
          toast.error(prefix+message)
          break
        default:
          toast(prefix+message)
      }
    })
    return () => connection?.deregisterEvent("_TOAST")
  }, [])
}