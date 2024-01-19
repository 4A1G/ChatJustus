'use client'

import Image from 'next/image'
import Link from 'next/link'


export default function Home() {
  return (
    <div className='text-primary/100 text-3xl'>
      Hello, World!

      If youre looking for the First-Contact bot, it has moved to <Link href='/first-contact'>first-contact</Link>

      If youre looking for the Follow-Up bot, it has moved to <Link href='/follow-up'>follow-up</Link>
    </div>
  )
}
