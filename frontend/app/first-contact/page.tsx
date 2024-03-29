'use client'

import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { useSynced, useSyncedReducer } from '@/hooks/networking/sync'
import { DefaultConnectionContext } from '@/hooks/networking/connection'

import 'allotment/dist/style.css'

import { ThemeSwitch } from "@/components/theme-switch"
import { Chat, Messages, initialMessages } from '@/components/chat'
import { FCContext } from './contexts'
import { DebugSidebar } from '@/components/sidebar/debug-sidebar'
import { SidebarLayout } from '@/components/sidebar/layout'
import { useRemoteToast } from '@/hooks/networking/remote-toast'
import { Button } from '@nextui-org/button'
import { FaCircleCheck, FaHeart } from 'react-icons/fa6'
import { ConfirmButton } from '@/components/base/confirm-button'



export default function Home() {
  // UI
  const [showSystem, setShowSystem] = useState(false)

  // connection
  const connection = useContext(DefaultConnectionContext)
  const [isConnected, setIsConnected] = useState<boolean>(false)
  useRemoteToast(connection)

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
  const firstContact = useSynced("FIRST_CONTACT", {
    chatEnded: false,
    summarySchema: {} as any,
    summary: {} as any
  })

  useEffect(() => {
    if (connection)
      connection.onConnectionChange = setIsConnected
  }, [])


  return (
    <FCContext.Provider value={firstContact}>
      <SidebarLayout
        leftSidebar={
          <div className='flex flex-col content-between h-full'>

            <DebugSidebar
              gpt={gpt}
              messages={messages}
              showSystem={showSystem}
              setShowSystem={setShowSystem}
            />

            <div className='flex flex-wrap justify-between p-2 items-center bg-default-100'>
              <ThemeSwitch />
              <div className='flex gap-2'>
              </div>
            </div>
          </div>
        }
      >

        <Chat
          introTitle='Welcome to ChatJustus!'
          introContent={`
Do you have any legal questions? I can help you with:
- Answering your questions about the law
- Your legal situation
- Finding Lawyers at *Sterling Legal Associates*, specialized for your case
- Forwarding your case to the lawyer

*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*
              `}
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
          isDisabled={
            firstContact.chatEnded
              ? <div className='flex justify-between items-center'>
                <p className='font-bold'><FaCircleCheck className='text-xl inline m-1' /> Thank you, please check your email to proceed!</p>
                <ConfirmButton
                tooltip='This will permanently reset your conversation!'
                onConfirm={() => {
                  messages.sendAction({ type: "RESET_CHAT" })
                  firstContact.syncChatEnded(false)
                }}
                >
                  {`No, start over`}
                </ConfirmButton>
              </div>
              : false
          }
          showSystem={showSystem}
        />

      </SidebarLayout>
    </FCContext.Provider>
  )
}
