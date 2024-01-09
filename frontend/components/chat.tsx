import { useState, useRef, useEffect, useMemo } from 'react'
import { produce } from 'immer'

import { js_beautify } from "js-beautify"
import { FaAnglesUp, FaCircleCheck, FaStop } from "react-icons/fa6"

import { Button, Card, CardHeader, CardBody, CardFooter, Avatar, Textarea, Spinner } from "@nextui-org/react"
import { Expander, ExpanderItem } from '@/components/base/expander'
import { MD } from '@/components/base/md'


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
const ToolCalls = ({ message }: { message: Message }) => (
  <Expander
    defaultExpandedKeys={
      // message.tool_calls!.filter((m) => !m.result).map((m, i) => String(i))
      message.tool_calls!.reduce((keys, m, i) => {
        if (!m.result) keys.push(String(i))
        return keys
      }, [] as string[])
    }
    showDivider
    variant='bordered'
  >
    {
      message.tool_calls!.map((tool_call, i) => (
        <ExpanderItem
          key={String(i)}
          title={`${tool_call.function.name}`}
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
          <MD>{`\`\`\`json\n${js_beautify(tool_call.function.arguments, { indent_size: 2 })}\n\`\`\``}</MD>
          {
            tool_call.result
              ? <MD>{`**Result:** \`${tool_call.result}\``}</MD>
              : null
          }
        </ExpanderItem>
      ))
    }
  </Expander>
)


type ChatMessageProps = {
  messageGroup: Message[]
  className?: string
}

const avatar_fallback: { [key: string]: string } = {
  "user": "U",
  "assistant": "A",
  "system": "S",
}
const style: { [key: string]: string } = {
  "user": "bg-default/50",
  "assistant": "bg-default/50 backdrop-saturate-200",
  "system": "bg-primary/50",
}

const ChatMessage = ({ messageGroup, className }: ChatMessageProps) => {
  const cls = style[messageGroup[0].role]

  return (
    <Card className={`rounded-3xl ${cls} shadow-md backdrop-blur ${className ?? ''}`}>
      <CardBody className='flex flex-row p-0'>
        <Avatar className='flex-none m-4' name={avatar_fallback[messageGroup[0].role]} />
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
  )
}

type ChatInputProps = {
  onSend: (message: string) => void
  isGenerating: boolean
  className?: string
}

const ChatInput = ({ onSend, isGenerating, className }: ChatInputProps) => {
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
        onClick={handleSendMessage}
        isDisabled={isGenerating}
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
  isConnected: boolean
  isGenerating: boolean
  showSystem: boolean
}

const Chat = ({ history, onSend, isConnected, isGenerating, showSystem }: ChatProps) => {
  const chatBottomRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    const chatContainer = chatBottomRef.current;
    if (chatContainer) {
      //if we're in "detached mode", i.e. the user scrolled up, don't scroll down
      chatContainer.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [history])

  useEffect(() => {
    window.addEventListener("resize", scrollToBottom)
    return () => window.removeEventListener("resize", scrollToBottom)
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

      <div className='flex-initial h-screen flex flex-col'>
        <Card className='my-10 p-3 self-center max-w-lg bg-default/50 backdrop-saturate-200 shadow-md'>
          <CardHeader className='justify-center'>
            <h1 className='text-xl text-primary-foreground'>Welcome to ChatJustus!</h1>
          </CardHeader>
          <CardBody>
            <MD>
              {`
Do you have any legal questions? I'm here to help! I can answer questions about:
- Law
- Case management
- Lawyers at this firm

Feel free to ask me anything! I'm here to help you.
              `}
            </MD>
          </CardBody>
          <CardFooter className='justify-center'>
            <p className='text-tiny text-primary-foreground'>Made with &lt;3 by Team 4A1G.</p>
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
          isConnected ? (
            <ChatInput onSend={onSend} isGenerating={isGenerating} />
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