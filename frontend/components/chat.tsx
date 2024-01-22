import { useState, useRef, useEffect, useMemo, useContext, ReactNode } from 'react'
import { produce } from 'immer'
import { motion, useAnimate, usePresence } from 'framer-motion'

import { js_beautify } from "js-beautify"
import { FaAnglesDown, FaAnglesUp, FaCheck, FaCircleCheck, FaHeart, FaPaperPlane, FaStop, FaUser } from "react-icons/fa6"

import validator from '@rjsf/validator-ajv8'
import { Form } from './json-forms'

import { Button, Card, CardHeader, CardBody, CardFooter, Avatar, Textarea, Spinner, AvatarIcon } from "@nextui-org/react"
import { Expander, ExpanderItem } from '@/components/base/expander'
import { MD } from '@/components/base/md'
import { DataContext } from '@/app/first-contact/contexts'
import { toast } from 'sonner'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css';


// define messages state object and its reducer
type Message = {
  role: string,
  content?: string,
  tool_calls?: any[],
  tool_call_id?: string
}

type Messages = {
  history: Message[],
  partial: Message | null,
}
const initialMessages: Messages = {
  history: [],
  partial: null,
}

export type { Message, Messages }
export { initialMessages }


// UI
interface ToolProps {
  tool_call: any,
}

const DefaultTool = ({ tool_call }: ToolProps) => (
  <div>
    <MD>
      {`\`\`\`json\n${js_beautify(tool_call.function.arguments, { indent_size: 2 })}\n\`\`\``}
    </MD>
    {
      tool_call.result
        ? <MD>{`**Result:** \`${tool_call.result}\``}</MD>
        : null
    }
  </div>
)

const SummaryTool = ({ tool_call }: ToolProps) => {
  const { summarySchema, summary, setSummary, chatEnded, sendAction } = useContext(DataContext)

  let parsed = null
  try {
    parsed = JSON.parse(tool_call.function.arguments)
  } catch (e) {
    parsed = null
  }
  return (
    <div>
      {/* {JSON.stringify(data)} */}
      {/* {tool_call.function.arguments} */}
      {
        parsed && <Form
          schema={summarySchema}
          formData={{ ...parsed, ...summary }}
          validator={validator}
          readonly={chatEnded}
          onChange={(e) => setSummary(e.formData)}
          onSubmit={(e) => {
            sendAction({ type: "SUMMARY_SUBMITTED", ...e.formData })
            toast.info("Sending legal inquiry...")
          }}
        >
          {
            chatEnded
              ? <Button type='button' color='success' className='font-sans' onClick={
                () => toast.success(`Your inquiry has already been sent. ${summary.lawyer || 'Your lawyer'} will contact you soon!`)}>
                <FaCheck /> Legal Inquiry Sent
              </Button>
              : <Button type='submit' color='primary' className='font-sans'>
                <FaPaperPlane /> Send Legal Inquiry
              </Button>
          }
        </Form>
      }
    </div>
  )
}

const ChatEndTool = ({ tool_call }: ToolProps) => (
  <div>
    {/* <MD>
      {`Thank you for using ChatJustus!`}
    </MD> */}
  </div>

)

const ScheduleMeetingTool = ({ tool_call }: ToolProps) => {
  let parsed = undefined
  try {
    parsed = JSON.parse(tool_call.function.arguments)
    const { year, month, day, hour, minute } = parsed
    parsed = new Date(year, month, day, hour, minute)
  } catch (e) {
    parsed = undefined
  }

  const [selected, setSelected] = useState<Date | undefined>(undefined)

  const current = selected || parsed
  return (
    <div>
      {
        parsed &&
        <DayPicker
          className='bg-default/50 rounded-xl min-w-min max-w-min p-3'
          style={{ margin: '0px' }}
          mode="single"
          selected={current}
          onSelect={setSelected}
          footer={
            current &&
            <div className='flex flex-col justify-center'>
              <p className='text-primary/100 font-bold text-center my-3'>Your meeting will be on {current.toLocaleDateString()}.</p>
              <Button
                color='primary'
                onClick={() => {
                  toast.info("Scheduling meeting...")
                  setTimeout(() => {
                    toast.success(`Meeting scheduled on ${current.toLocaleDateString()}!`)
                  }, 2000)
                }}
              >
                Schedule Meeting
              </Button>
            </div>
          }
        />
      }
    </div>
  )
}

const toolRenderers = (tool_name: string) => {
  switch (tool_name) {
    // First Contact
    case 'summarize_first_contact':
      return { title: 'Legal Inquiry to Lawyer', Renderer: SummaryTool, open: true }
    case 'end_chat':
      return { title: 'Chat Finished', Renderer: ChatEndTool, open: false }
    // Follow Up
    case 'query_dialog':
      return { title: 'Searching Meeting Dialog', Renderer: DefaultTool, open: false }
    case 'query_law_articles':
      return { title: 'Searching Law Books', Renderer: DefaultTool, open: false }
    case 'message_lawyer':
      return { title: 'Message Lawyer', Renderer: DefaultTool, open: false }
    case 'schedule_meeting':
      return { title: 'Schedule a Meeting', Renderer: ScheduleMeetingTool, open: true }
    default:
      return { title: tool_name, Renderer: DefaultTool, open: true }
  }
}

const toolFootnotes = (tool_call: any) => {
  const n = tool_call.function.name
  switch (n) {
    case 'query_law_articles':
    case 'query_dialog':
      return [tool_call.result]
    default:
      return []
  }
}

const ToolCalls = ({ message }: { message: Message }) => {
  const tool_calls = message.tool_calls!

  return (<Expander
    defaultExpandedKeys={
      tool_calls.filter((m) => toolRenderers(m.function.name).open).map((m) => m.id)
      // message.tool_calls!.filter((m) => !m.result).map((m, i) => String(i))
    }
    showDivider
    variant='bordered'
    className='font-serif'
  >
    {
      tool_calls.map((tool_call) => {
        const { title, Renderer, open } = toolRenderers(tool_call.function.name)
        return (
          <ExpanderItem
            key={tool_call.id}
            title={`${title}`}
            // isDisabled={!open}
            startContent={
              <div className="flex justify-center w-5 h-5">
                {tool_call.result ? (
                  <FaCircleCheck className='text-primary/100 text-lg' />
                ) : (
                  <Spinner color='primary' size='sm' />
                )}
              </div>
            }
          >
            <Renderer tool_call={tool_call} />
          </ExpanderItem>
        )
      })
    }
  </Expander>)
}


type ChatMessageProps = {
  messageGroup: Message[]
  className?: string
}


const ChatAvatar = ({ role, className }: { role: string, className?: string }) => {
  switch (role) {
    case 'user':
      return <Avatar className={`${className} text-primary/100`} showFallback />
    case 'assistant':
      return <Avatar className={className} src='/ChatJustus/avatar_bg_none.png' />
    case 'system':
      return <Avatar className={className} name='S' />
    default:
      return <Avatar className={className} name='?' />
  }
}
const style: { [key: string]: string } = {
  "user": "bg-default/50",
  "assistant": "bg-default/50",
  "system": "bg-primary/50",
}
const dstyle: { [key: string]: string } = {
  "user": "",
  "assistant": "backdrop-saturate-200",
  "system": "",
}

const ChatMessage = ({ messageGroup, className }: ChatMessageProps) => {
  const cls = style[messageGroup[0].role]
  const d = dstyle[messageGroup[0].role]

  // some tools need to inject footnotes into the message
  const footnotes: string[] = [];
  for (const message of messageGroup) {
    if (message.tool_calls) {
      for (const tool_call of message.tool_calls) {
        footnotes.push(...toolFootnotes(tool_call));
      }
    }
  }

  return (
    <motion.div
      className={`rounded-3xl ${d}`}
      // layout="position" // causes overlaps, so disabled for now
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
    >
      {/* {JSON.stringify(footnotes)} */}
      <Card className={`rounded-3xl ${cls} shadow-md ${className ?? ''}`}>
        <CardBody className='flex flex-row p-0'>
          <ChatAvatar className='flex-none m-3 ' role={messageGroup[0].role} />
          <div className='min-w-0 w-full flex flex-col gap-2 p-4 pl-0'>
            {
              messageGroup.map((message, i) => (
                <>
                  <MD>
                    {
                      message.content &&
                      message.content.replaceAll('\n', '  \n')
                      + (footnotes.length > 0 ? '\n\n---\n**Sources**\n\n' + footnotes.join('\n\n') : '')
                      //                       + `
                      // <details>
                      // <summary>Summary</summary>
                      // ${footnotes.join('\n\n')}
                      // </details>
                      //                       `
                    }
                  </MD>
                  {
                    (message.tool_calls?.length ?? 0) > 0
                      ? <ToolCalls message={message} />
                      : null
                  }
                </>
              ))

            }
          </div>
        </CardBody>
      </Card>
    </motion.div>
  )
}

type ChatInputProps = {
  onSend: (message: string) => void
  onCancel: () => void
  isGenerating: boolean
  className?: string
}

const ChatInput = ({ onSend, onCancel, isGenerating, className }: ChatInputProps) => {
  const enterToSend = true;
  const [inputValue, setInputValue] = useState('')
  const [textBoxHeight, setTextBoxHeight] = useState(0)

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' && !isGenerating) {
      onSend(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className={`flex flex-row items-center justify-center border bg-default-50 rounded-3xl focus:outline-none resize-none shadow-lg backdrop-blur-sm overflow-y-visible ${className}`}>
      <Textarea
        value={inputValue}
        onValueChange={setInputValue}
        onKeyDown={(event) => {
          if (enterToSend && event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSendMessage()
          }
        }}
        variant='underlined'
        className="ml-5"
        placeholder="Type your message..."
        minRows={1}
        maxRows={15}
        onHeightChange={setTextBoxHeight}
      />
      <Button
        isIconOnly
        onClick={isGenerating ? onCancel : handleSendMessage}
        color={isGenerating ? 'danger' : 'primary'}
        className="m-2 px-4 py-2 rounded-3xl shadow-lg hover:scale-[1.2] hover:bg-current/100"
        style={{ height: textBoxHeight + 10 }}
      >
        {
          isGenerating
            ? <FaStop className='text-2xl' />
            : <FaAnglesUp className='text-2xl' />
        }
      </Button>
    </div>
  )
}

// main chat view
type ChatProps = {
  introTitle: string
  introContent: string
  history: Message[]
  onSend: (message: string) => void
  onCancel: () => void
  isConnected: boolean
  isGenerating: boolean
  isDisabled?: boolean | ReactNode
  showSystem: boolean
}

const Chat = ({ introTitle, introContent, history, onSend, onCancel, isConnected, isGenerating, isDisabled, showSystem }: ChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null)
  const chatBottomRef = useRef<HTMLDivElement>(null)
  const [isBottom, setIsBottom] = useState(true)

  const scrollToBottom = (behavior: ScrollBehavior = "auto", force = false) => {
    const chatContainer = chatBottomRef.current;
    if (chatContainer && (force || isBottom)) {
      console.log("scrolling to bottom")
      chatContainer.scrollIntoView({ behavior: behavior, block: "end", inline: "nearest" })
    }
  }

  // detect if user is at the bottom of the chat
  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.target as HTMLDivElement
    const bottom = Math.abs(t.scrollHeight - (t.scrollTop + t.clientHeight)) <= 50;
    setIsBottom(bottom)
  }

  useEffect(() => {
    if (!chatRef.current) {
      console.log("chatRef.current is null")
      return
    }
    const t = chatRef.current
    const bottom = Math.abs(t.scrollHeight - (t.scrollTop + t.clientHeight)) <= 50;
    setIsBottom(bottom)
  })

  // scroll to bottom when new messages are added
  useEffect(() => scrollToBottom(), [history])

  // scroll to bottom when window is resized
  useEffect(() => {
    window.addEventListener("resize", () => {
      scrollToBottom()
    })
    return () => window.removeEventListener("resize", () => { })
  }, [])


  const mergedMessages = useMemo(() => {
    // split history into tool messages and non-tool messages
    const initial: { msgs: Message[], tools: any } = { msgs: [], tools: {} }

    const { msgs, tools } = history.reduce(({ msgs, tools }, msg, i) => {
      if (msg.role == 'tool') {
        tools[msg.tool_call_id!] = msg.content
      } else {
        msgs.push(msg)
      }
      return { msgs, tools }
    }, initial)

    // convert to format better suited for rendering
    const mergedMsgs: Message[][] = []
    msgs.forEach((msg, i) => {
      // remove tool messages
      if (msg.role == 'tool') {
        return
      }
      // copy msg to avoid mutating the original
      msg = { ...msg }
      // add tool results to the tool calls
      if (msg.role == 'assistant') {
        msg.tool_calls = msg.tool_calls?.map((tool_call: any) => ({
          ...tool_call,
          result: tools[tool_call.id] // artificially add the result to the tool call
        }))
      }
      // merge consecutive messages of same role
      if (i == 0 || msg.role != msgs[i - 1].role) {
        mergedMsgs.push([msg])
      } else {
        mergedMsgs[mergedMsgs.length - 1].push(msg)
      }
    })

    return mergedMsgs
  }, [history])

  return (
    <div
      className="w-full h-full px-2 flex flex-col overflow-y-scroll"
      ref={chatRef}
      onScroll={onScroll}
    >


      <div className='flex-initial h-screen flex flex-col'>
        <Card className='my-10 p-3 self-center max-w-lg bg-default/50 backdrop-saturate-200 shadow-md'>
          <CardHeader className='justify-center'>
            <ChatAvatar className='mr-3' role='assistant' />
            <h1 className='text-2xl text-primary/100 font-serif font-bold'>
              {introTitle}
            </h1>
          </CardHeader>
          <CardBody>
            <MD className='leading-5'>
              {introContent}
            </MD>
          </CardBody>
          <CardFooter className='justify-center'>
            <p className='text-xs text-primary/100 font-sans'>Made with <FaHeart className='inline-block' /> by Team 4A1G</p>
          </CardFooter>
        </Card>
      </div>

      <div className='flex flex-col gap-2 px-2 my-8 self-center w-full max-w-3xl'>
        {mergedMessages.map(
          (msgGroup, index) => {
            if (msgGroup[0].role === 'system' && !showSystem)
              return null
            return <ChatMessage messageGroup={msgGroup} key={index} className='' />
          }
        )}
      </div>

      <div className="sticky bottom-0 self-center pb-5 px-2 w-full max-w-3xl">
        {
          !isBottom &&
          <div className="relative">
            <button
              className='absolute bottom-3 left-1/2 -translate-x-1/2 w-12 h-8 rounded-full text-tiny text-default-600 border border-default-600 flex items-center justify-center backdrop-blur-sm bg-default-50/10 hover:bg-primary hover:scale-125 transition shadow-lg'
              onClick={() => { scrollToBottom("smooth", true) }}
            >
              <FaAnglesDown />
            </button>
          </div>
        }
        {
          isDisabled ?
            <Card className='bg-default rounded-3xl shadow-md backdrop-blur-sm'>
              <CardBody className=''>
                {typeof isDisabled == 'boolean' ? <p className='text-center text-default-600'>Chat Finished</p> : isDisabled}
              </CardBody>
            </Card>
            : isConnected ?
              <ChatInput
                onSend={(m) => {
                  setIsBottom(true)
                  onSend(m)
                }}
                onCancel={onCancel}
                isGenerating={isGenerating} />
              :
              <Card className='bg-danger rounded-3xl shadow-md backdrop-blur-sm'>
                <CardBody className='flex flex-row gap-5 items-center'>
                  <Spinner color='default' />
                  <p className='text-danger-foreground'>Connecting to the server...</p>
                </CardBody>
              </Card>
        }
      </div>
      <div ref={chatBottomRef} className='h-0 invisible'></div>
    </div>);
}


export { ChatMessage, ChatInput, Chat }