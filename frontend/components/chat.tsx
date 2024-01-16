import { useState, useRef, useEffect, useMemo, useContext } from 'react'
import { produce } from 'immer'
import { motion, useAnimate, usePresence } from 'framer-motion'

import { js_beautify } from "js-beautify"
import { FaAnglesDown, FaAnglesUp, FaCircleCheck, FaHeart, FaStop, FaUser } from "react-icons/fa6"

import validator from '@rjsf/validator-ajv8'
import { Form } from './json-forms'

import { Button, Card, CardHeader, CardBody, CardFooter, Avatar, Textarea, Spinner, AvatarIcon } from "@nextui-org/react"
import { Expander, ExpanderItem } from '@/components/base/expander'
import { MD } from '@/components/base/md'
import { DataContext } from '@/app/first-contact/contexts'


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
  i: number
}

const DefaultTool = ({ tool_call, i }: ToolProps) => (
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

const SummaryTool = ({ tool_call, i }: ToolProps) => {
  const { firstContactSummarySchema } = useContext(DataContext)
  let parsed = null
  try {
    parsed = JSON.parse(tool_call.function.arguments)
  } catch (e) {
    parsed = null
  }
  return (
    <div>
      {/* {JSON.stringify(firstContactSummarySchema)}
      {tool_call.function.arguments} */}
      {parsed && <Form
        schema={firstContactSummarySchema}
        formData={parsed}
        // onChange={(e) => onChange(e.formData)}
        // onSubmit={(e) => onSubmit(e.formData)} //validated, TODO: set temp to final
        validator={validator}
        readonly={false}
      />}
    </div>
  )
}

const toolRenderers = (tool_name: string) => {
  switch (tool_name) {
    case 'summarize_first_contact':
      return ['Legal Inquiry to Lawyer', SummaryTool]
    case 'end_chat':
      return ['Finished', DefaultTool]
    default:
      return [tool_name, DefaultTool]
  }
}

const ToolCalls = ({ message }: { message: Message }) => {
  return (<Expander
    defaultExpandedKeys={
      // message.tool_calls!.filter((m) => !m.result).map((m, i) => String(i))
      message.tool_calls!.reduce((keys, m, i) => {
        // if (!m.result) keys.push(String(i))
        keys.push(String(i))
        return keys
      }, [] as string[])
    }
    showDivider
    variant='bordered'
  >
    {
      message.tool_calls!.map((tool_call, i) => {
        const [tool_name, ToolRenderer] = toolRenderers(tool_call.function.name)
        return (
          <ExpanderItem
            key={String(i)}
            title={`${tool_name}`}
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
            <ToolRenderer tool_call={tool_call} i={i} />
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
      return <Avatar className={className} icon={<FaUser className='text-2xl text-primary/100' />} />
    case 'assistant':
      return <Avatar className={className} src='/avatar_bg_none.png' />
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

  return (
    <motion.div
      className={`rounded-3xl ${d}`}
      // layout="position" // causes overlaps, so disabled for now
      animate={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 50 }}
    >
      <Card className={`rounded-3xl ${cls} shadow-md ${className ?? ''}`}>
        <CardBody className='flex flex-row p-0'>
          <ChatAvatar className='flex-none m-5 ' role={messageGroup[0].role} />
          <div className='min-w-0 w-full flex flex-col gap-2 p-5 pl-0'>
            {
              messageGroup.map((message, i) => (
                <>
                  <MD>
                    {message.content?.replaceAll('\n', '  \n')}
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
    <div className={`flex flex-row items-center justify-center border bg-default-50 rounded-3xl focus:outline-none resize-none shadow-lg backdrop-blur overflow-y-visible ${className}`}>
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
  history: Message[]
  onSend: (message: string) => void
  onCancel: () => void
  isConnected: boolean
  isGenerating: boolean
  showSystem: boolean
}

const Chat = ({ history, onSend, onCancel, isConnected, isGenerating, showSystem }: ChatProps) => {
  const chatBottomRef = useRef<HTMLDivElement>(null)
  const [isBottom, setIsBottom] = useState(true)

  const scrollToBottom = (behavior: ScrollBehavior = "auto") => {
    const chatContainer = chatBottomRef.current;
    if (chatContainer) {
      //if we're in "detached mode", i.e. the user scrolled up, don't scroll down
      chatContainer.scrollIntoView({ behavior: behavior, block: "end", inline: "nearest" })
    }
  }

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const t = e.target as HTMLDivElement
    const bottom = Math.abs(t.scrollHeight - (t.scrollTop + t.clientHeight)) <= 50;
    setIsBottom(bottom)
  }

  useEffect(() => {
    if (isBottom)
      scrollToBottom()
  }, [history])

  useEffect(() => {
    window.addEventListener("resize", () => scrollToBottom())
    return () => window.removeEventListener("resize", () => scrollToBottom())
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
    <div className="w-full h-full px-8 flex flex-col overflow-y-scroll">
      {/* <div>
        {
          JSON.stringify(history)
        }
      </div> */}

      <div className='flex-initial h-screen flex flex-col'>
        <Card className='my-10 p-3 self-center max-w-lg bg-default/50 backdrop-saturate-200 shadow-md'>
          <CardHeader className='justify-center'>
            <ChatAvatar className='mr-3' role='assistant' />
            <h1 className='text-2xl text-primary/100'>
              Welcome to ChatJustus!
            </h1>
          </CardHeader>
          <CardBody>
            <MD className='leading-5'>
              {`
Do you have any legal questions? I can help you with:
- Answering your questions about the law
- Your legal situation
- Finding Lawyers at *Sterling Legal Associates*, specialized for your case
- Forwarding your case to the lawyer

*For your privacy, this conversation will **not be saved**, and only the final inquiry you send will be forwarded to the lawyer.*
              `}
            </MD>
          </CardBody>
          <CardFooter className='justify-center'>
            <p className='text-xs text-primary/100'>Made with <FaHeart className='inline-block align-text-bottom' /> by Team 4A1G</p>
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
              className='absolute bottom-3 left-1/2 w-12 h-8 rounded-full text-tiny text-default-600 border border-default-600 flex items-center justify-center backdrop-blur-sm bg-default-50/10 hover:bg-primary hover:scale-125 transition shadow-lg'
              onClick={() => { scrollToBottom("smooth") }}
            >
              <FaAnglesDown />
            </button>
          </div>
        }
        {
          isConnected ? (
            <ChatInput
              onSend={(m) => {
                setIsBottom(true)
                onSend(m)
              }}
              onCancel={onCancel}
              isGenerating={isGenerating} />
          )
            : (
              <Card className='bg-danger rounded-3xl shadow-md backdrop-blur'>
                <CardBody className='flex flex-row gap-5 items-center'>
                  <Spinner color='default' />
                  <p className='text-danger-foreground'>Reconnecting to the server...</p>
                </CardBody>
              </Card>
            )
        }
      </div>
      <div ref={chatBottomRef} className='h-0 invisible'></div>
    </div>);
}


export { ChatMessage, ChatInput, Chat }