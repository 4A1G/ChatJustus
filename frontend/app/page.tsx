'use client'

import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-5 p-3'>
      <p className='text-primary/100 text-3xl'>Welcome to ChatJustus!</p>
      <p className='text-foreground/100'>The proper landing page is coming soon. But you can already try out the bot. Make sure to use your real email!</p>

      <Link href='/first-contact'>
        <Button color='primary'>
          Try it out!
        </Button>
      </Link>

      <p className='text-foreground/100 text-xs'>
        If you already finished above, you can also check out the follow-up bot.<br />
        Note that if you access the follow-up bot before finishing the conversation with the first-contact bot, it will automatically load the demo case!
      </p>

      <Link href='/follow-up'>
        <Button size='sm'>
          Follow-Up Bot
        </Button>
      </Link>

    </div>
  )
}
