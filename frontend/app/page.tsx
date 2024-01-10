'use client'

import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { useSynced, useSyncedReducer } from '@/components/networking/sync'
import { ConnectionContext } from '@/components/networking/connection'

import { Allotment, LayoutPriority } from 'allotment'
import 'allotment/dist/style.css'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { Button } from '@nextui-org/button'
import { Switch, Slider, ScrollShadow } from "@nextui-org/react"
import { Expander, ExpanderItem } from '@/components/base/expander'
import { SingleSelect } from '@/components/base/single-select'
import { ThemeSwitch } from "@/components/theme-switch"
import { Chat, Messages, initialMessages } from '@/components/chat'


export const DataContext = createContext({} as any)

export default function Home() {
  // UI state
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const [showSystem, setShowSystem] = useState(false)

  // connection
  const connection = useContext(ConnectionContext)
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // assistant settings
  const gpt = useSynced("GPT", {
    modelList: [] as string[],
    selectedModel: "",
    temperature: 1.0,
  })

  // assistant state
  const messages = useSynced<Messages>("MESSAGES", initialMessages)

  // other synced data
  const data = useSynced("DATA", {
    firstContactSummarySchema: {} as any
  })




  useEffect(() => {
    if (window.innerWidth >= 600)
      setSidebarVisible(true)
  }, [])

  useEffect(() => {
    // notice the return: connect also returns a cleanup function
    if (connection)
      connection.onConnectionChange = setIsConnected
    return connection?.connect()
  }, [])


  return (
    <DataContext.Provider value={data}>
      <div className='w-full h-full'>
        <Allotment
          proportionalLayout={false}
          onChange={(sizes: number[]) => {
            if (sizes.length > 0)
              setSidebarVisible(sizes[0] > 0)
          }}
        >
          {/* left sidebar */}
          <Allotment.Pane minSize={200} maxSize={400} preferredSize={300} snap priority={LayoutPriority.Low} visible={sidebarVisible}>

            <div className='flex flex-col content-between h-full bg-default-100'>

              <div className='p-4 px-2 text-xl text-primary/100'>
                Your Case Timeline
              </div>

              <div className='w-full h-full flex flex-col overflow-auto p-2'>
                {/* <ScrollShadow> */}
                  <div className='flex flex-col gap-3'>
                    {
                      [
                        ['1st Meeting on 02.10.2023', 'Your first meeting with Sofia'],
                        ['2nd Meeting on 17.10.2023', 'Agreeing on the terms of the divorce'],
                        ['3rd Meeting on 01.11.2023', 'Finalizing the divorce papers'],
                        ['4th Meeting on 15.11.2023', 'Emergency meeting with Sofia'],
                      ].map(([title, summary]) => (
                        <div className='flex flex-col bg-default-50 rounded-lg p-3'>
                          <div className='text-xs text-default-700'>{title}</div>
                          <div>{summary}</div>
                        </div>
                      ))
                    }
                    <div className='flex flex-col bg-default-50 border-primary border-4 rounded-lg p-3'>
                          <div className='text-xs text-primary-700/100'>5th Meeting Today</div>
                          <div className='text-primary/100'>Signing the papers</div>
                        </div>
                  </div>
                {/* </ScrollShadow> */}
              </div>

              <Expander variant='light' defaultExpandedKeys={'1'}>
                <ExpanderItem title='Your Documents' key='1'>
                  <SingleSelect
                    label='model'
                    selected={gpt.selectedModel}
                    setSelected={gpt.syncSelectedModel}
                    valList={gpt.modelList}
                  />
                  <Slider
                    size='sm'
                    minValue={0}
                    maxValue={2}
                    step={0.1}
                    value={gpt.temperature}
                    onChange={gpt.setTemperature}
                    onChangeEnd={gpt.syncTemperature}
                    label='Temperature'
                  />
                </ExpanderItem>

                <ExpanderItem title='Messages from Sofia' key='2'>
                  <Switch size='sm' color='primary' isSelected={showSystem} onValueChange={setShowSystem}>
                    Show System Messages
                  </Switch>

                </ExpanderItem>
              </Expander>

              <div className='flex flex-wrap justify-between p-2 items-center bg-default-100'>
                <ThemeSwitch />
              </div>
            </div>
          </Allotment.Pane>

          {/* main chat view */}
          <Allotment.Pane minSize={400} priority={LayoutPriority.High}>
            {/* <button
              className='absolute left-2 top-1/2 z-50 w-4 h-8 rounded-full bg-default text-tiny text-default-600 flex items-center justify-center hover:scale-125 transition'
              onClick={() => setSidebarVisible(!sidebarVisible)}
            >
              {sidebarVisible ? <FaChevronLeft /> : <FaChevronRight />}
            </button> */}

            <Chat
              history={
                messages.partial
                  ? [...messages.history, messages.partial]
                  : messages.history
              }
              onSend={
                (message) => {
                  gpt.sendAction({ type: "PROMPT", prompt: message })
                }
              }
              isConnected={isConnected}
              isGenerating={messages.partial !== null}
              showSystem={showSystem}
            />

          </Allotment.Pane>
        </Allotment>
      </div>
    </DataContext.Provider>
  )
}
