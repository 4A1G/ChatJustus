import fileDownload from 'js-file-download'

import { Button, ButtonGroup, ScrollShadow, Slider, Switch } from "@nextui-org/react"
import { Expander, ExpanderItem } from "../base/expander"
import { SingleSelect } from "../base/single-select"
import { FaFileArrowDown, FaFileArrowUp, FaRecycle } from "react-icons/fa6"
import { ConfirmButton, PopTooltip } from "../base/confirm-button"
import { toast } from "sonner"
import { useState } from 'react'

interface LoadChatProps {
  gpt: any
}

const LoadChat = ({ gpt }: LoadChatProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <PopTooltip
      className='grow'
      tooltip="Load Chat from .json File"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      popoverProps={{
        backdrop: "blur"
      }}
      trigger={
        <Button size='sm' fullWidth>
          <FaFileArrowUp className='flex-none' /> Load Chat
        </Button>
      }
    >
      <div className="px-1 py-2">
        <div className="text-small font-bold pb-3">
          Load Chat from .json File
        </div>
        <div className="text-danger font-bold pb-3">
          {`Warning: Your current chat history will be overwritten!`}
        </div>
        <input
          type="file"
          onChange={
            (e) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onload = (e) => {
                  const json = e.target?.result
                  if (json) {
                    try {
                      gpt.syncHistory(JSON.parse(json as string))
                      toast.success("Chat loaded!")
                    } catch (e) {
                      toast.error("Invalid JSON!")
                    } finally {
                      setIsOpen(false)
                    }
                  }
                }
                reader.readAsText(file)
              }
            }
          }
        />
      </div>
    </PopTooltip>
  )
}


interface DebugSidebarProps {
  gpt: any
  messages: any
  showSystem: boolean
  setShowSystem: (show: boolean) => void
  className?: string
}

const DebugSidebar = ({ gpt, messages, showSystem, setShowSystem, className }: DebugSidebarProps) => {
  return (
    <div className={`flex flex-col min-h-0 h-full${className || ''}`}>

      <div className='p-4 px-2 text-xl text-primary/100'>
        Your Case Timeline
      </div>

      <div className='w-full h-full flex flex-col overflow-auto'>

        <ScrollShadow>
          <div className='flex flex-col gap-3 m-3 mt-0'>
            {
              [
                ['1st Meeting on 02.10.2023', 'Your first meeting with Sofia'],
                ['2nd Meeting on 17.10.2023', 'Agreeing on the terms of the divorce'],
                ['3rd Meeting on 01.11.2023', 'Finalizing the divorce papers'],
                ['4th Meeting on 15.11.2023', 'Emergency meeting with Sofia'],
              ].map(([title, summary]) => (
                <>
                  <div className='flex flex-col bg-default-50 rounded-lg p-3'>
                    <div className='text-xs text-default-700'>{title}</div>
                    <div>{summary}</div>
                  </div>
                </>
              ))
            }
            <div className='flex flex-col bg-default-50 border-primary border-4 rounded-lg p-3'>
              <div className='text-xs text-primary-700/100'>5th Meeting Today</div>
              <div className='text-primary/100'>Signing the papers</div>
            </div>
          </div>
        </ScrollShadow>
      </div>


      <Expander variant='light' defaultExpandedKeys={['1', '2']}>

        <ExpanderItem title='Model Options' key='1'>

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

        <ExpanderItem title='Chat Options' key='2'>

          <Switch size='sm' color='primary' isSelected={showSystem} onValueChange={setShowSystem}>
            Show System Messages
          </Switch>

          <div className='flex flex-row flex-wrap gap-2'>
            <Button
              size='sm'
              className='grow'
              onClick={() => {
                fileDownload(JSON.stringify(messages.history), "chat.json")
                toast.success("Chat downloaded!")
              }}
            >
              <FaFileArrowDown className='flex-none' /> Save Chat
            </Button>
            <LoadChat gpt={gpt} />

          </div>

          <ConfirmButton
            tooltip='Reset chat history permanently'
            buttonProps={{ fullWidth: true, size: 'sm' }}
            onConfirm={() => messages.sendAction({ type: "RESET_CHAT" })}
          >
            <FaRecycle /> Reset Chat
          </ConfirmButton>


        </ExpanderItem>
      </Expander>
    </div>
  )
}

export { DebugSidebar }