'use client'

import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { useSynced, useSyncedReducer } from '@/hooks/networking/sync'
import { ConnectionContext } from '@/hooks/networking/connection'

import { Allotment, LayoutPriority } from 'allotment'
import 'allotment/dist/style.css'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { Button } from '@nextui-org/button'
import { Switch, Slider, ScrollShadow } from "@nextui-org/react"
import { Expander, ExpanderItem } from '@/components/base/expander'
import { SingleSelect } from '@/components/base/single-select'
import { ThemeSwitch } from "@/components/theme-switch"
import { Chat, Messages, initialMessages } from '@/components/chat'
import Image from 'next/image'
import { DataContext } from './contexts'



export default function Home() {
  // connection
  const connection = useContext(ConnectionContext)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // assistant settings
  const gpt = useSynced("GPT", {
    modelList: [] as string[],
    selectedModel: "",
    temperature: 1.0,
    runningTasks: [] as string[]
  })
  // assistant state
  const messages = useSynced<Messages>("MESSAGES", initialMessages)

  // other synced data
  const data = useSynced("DATA", {
    firstContactSummarySchema: {} as any
  })


  useEffect(() => {
    // notice the return: connect also returns a cleanup function
    if (connection)
      connection.onConnectionChange = setIsConnected
    return connection?.connect()
  }, [])


  return (
    <DataContext.Provider value={data}>
      <div className='w-full h-full'>

        {/* main chat view */}

        <Chat
            history={
              messages.partial
                ? [...messages.history, messages.partial]
                : messages.history
            }
            onSend={
              (message) => {
                gpt.startTask({ type: "PROMPT", prompt: message })
              }
            }
            onCancel={
              () => {
                gpt.cancelTask({ type: "PROMPT" })
              }
            }
            isConnected={isConnected}
            isGenerating={gpt.runningTasks.includes("PROMPT")}
            showSystem={true}
          />

      </div>
    </DataContext.Provider>
  )
}
