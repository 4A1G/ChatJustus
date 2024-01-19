'use client'

import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { useSynced, useSyncedReducer } from '@/hooks/networking/sync'
import { DefaultConnectionContext } from '@/hooks/networking/connection'

import 'allotment/dist/style.css'

import { ThemeSwitch } from "@/components/theme-switch"
import { Chat, Messages, initialMessages } from '@/components/chat'
import { DataContext } from './contexts'
import { DebugSidebar } from '@/components/sidebar/debug-sidebar'
import { SidebarLayout } from '@/components/sidebar/layout'
import { useRemoteToast } from '@/hooks/networking/remote-toast'



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
  const meetingData = useSynced("FOLLOW_UP", {
    meetings: [] as any[]
  })


  useEffect(() => {
    // notice the return: connect also returns a cleanup function
    if (connection)
      connection.onConnectionChange = setIsConnected
    return connection?.connect()
  }, [])


  return (
    <DataContext.Provider value={meetingData}>
      <SidebarLayout
        leftSidebar={
          <div className='flex flex-col content-between h-full'>

            <DebugSidebar
              listTitle='Your Case Timeline'
              listContent={
                <>
                  {
                    meetingData.meetings.map(({timestamp, title, summary}: any) => (
                      <>
                        <div className='flex flex-col bg-default-50 rounded-lg p-3'>
                          <div className='text-xs text-default-700'>{timestamp}</div>
                          <div className='font-serif'>{title}</div>
                        </div>
                      </>
                    ))
                  }
                  {/* <div className='flex flex-col bg-default-50 border-primary border-4 rounded-lg p-3 -m-1'>
                    <div className='text-xs text-primary-700/100'>5th Meeting Today</div>
                    <div className='text-primary/100 font-serif font-bold'>Signing the papers</div>
                  </div> */}
                </>
              }
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
          showSystem={showSystem}
        />

      </SidebarLayout>
    </DataContext.Provider>
  )
}
