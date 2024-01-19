import React from 'react'

import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import rehypeRaw from 'rehype-raw'
import 'katex/dist/katex.min.css' // `rehype-katex` does not import the CSS for you


interface MDProps {
  className?: string
  children?: string
  props?: any
}

const MD = ({ className, children, ...props }: MDProps) => (
  <div className={`overflow-auto prose dark:prose-invert prose-neutral max-w-none prose-pre:max-w-full prose-code:before:hidden prose-code:after:hidden prose-hr:m-1 prose-hr:border-primary/100 prose-a:text-primary/100 ${className ?? ''}`}>
    <Markdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeRaw]}
      {...props}
    >
      {children}
    </Markdown>
  </div>
)

export { MD }