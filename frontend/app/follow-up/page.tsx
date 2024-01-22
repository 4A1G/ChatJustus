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


function nth(i: number) {
  let j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}


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

  // meeting data
  const { caseData, meetings, selectedMeeting, setSelectedMeeting } = useSynced("MEETINGS", {
    caseData: {} as any,
    meetings: [] as any[],
    selectedMeeting: null as number | null
  })


  useEffect(() => {
    // notice the return: connect also returns a cleanup function
    if (connection)
      connection.onConnectionChange = setIsConnected
    return connection?.connect()
  }, [])


  return (
    <SidebarLayout
      sidebarDefaultVisible
      leftSidebar={
        <div className='flex flex-col content-between h-full'>

          <DebugSidebar
            listTitle='Your Case Timeline'
            listContent={
              <>
                {
                  meetings.map(({ timestamp, title }: any, i: number) => (
                    <>
                      <button
                        className='flex flex-col bg-default-50 rounded-lg p-3 hover:scale-105 transition-all duration-200 ease-in-out'
                        onClick={() => setSelectedMeeting(timestamp)}
                      >
                        <div className={`text-xs ${timestamp == selectedMeeting ? 'text-primary/100' : 'text-default-700'}`}>
                          {`${nth(i + 1)} Meeting on ${new Date(timestamp * 1000).toLocaleDateString()}`}
                        </div>
                        <div className={`font-serif text-left ${timestamp == selectedMeeting ? 'text-primary/100 font-bold' : 'text-default-700'}`}>{title}</div>
                      </button>
                    </>
                  ))
                }
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
        introTitle={`Welcome back${caseData.client ? ", " + caseData.client : " to ChatJustus"}!`}
        introContent={
          selectedMeeting ?
            meetings.find(({ timestamp }: any) => timestamp == selectedMeeting).summary
            : "*Select a meeting on your case timeline!*"
        }
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
        isDisabled={!selectedMeeting || selectedMeeting != meetings[meetings.length - 1].timestamp}
        showSystem={showSystem}
      />

    </SidebarLayout>
  )
}
