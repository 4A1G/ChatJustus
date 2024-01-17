'use client'

import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { useSynced, useSyncedReducer } from '@/hooks/networking/sync'
import { ConnectionContext } from '@/hooks/networking/connection'

import { Allotment, LayoutPriority } from 'allotment'
import 'allotment/dist/style.css'

import { FaChevronLeft, FaChevronRight } from "react-icons/fa6"
import { Button } from '@nextui-org/button'
import { Switch, Slider, ScrollShadow } from "@nextui-org/react"
import { Expander, ExpanderItem } from '@/components/base/expander'
import { SingleSelect } from '@/components/base/single-select'
import { ThemeSwitch } from "@/components/theme-switch"
import { Chat, Messages, initialMessages } from '@/components/chat'
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
