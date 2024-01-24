'use client'

import { useState, useRef, useEffect, useContext, createContext } from 'react'
import { useSynced, useSyncedReducer } from '@/hooks/networking/sync'
import { DefaultConnectionContext } from '@/hooks/networking/connection'

import { ThemeSwitch } from "@/components/theme-switch"
import { Chat, Messages, initialMessages } from '@/components/chat'
import { FCContext } from '../first-contact/contexts'
import { DebugSidebar } from '@/components/sidebar/debug-sidebar'
import { SidebarLayout } from '@/components/sidebar/layout'
import { useRemoteToast } from '@/hooks/networking/remote-toast'
import { Button } from '@nextui-org/button'
import { FaArrowRight, FaCircleCheck, FaEye, FaHeart } from 'react-icons/fa6'
import { ConfirmButton } from '@/components/base/confirm-button'
import { Tab, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'



export default function Home() {
  // fetch the JSON list from ${baseurl}/cases  
  const [cases, setCases] = useState([])

  useEffect(() => {
    fetch(`../cases`)
      .then(response => response.json())
      .then(data => setCases(data))
      .catch(error => console.error(error))
  }, [])

  return (
    <Table removeWrapper>
      <TableHeader>
        <TableColumn>Client</TableColumn>
        <TableColumn>Lawyer</TableColumn>
        <TableColumn>Summary</TableColumn>
        <TableColumn>View</TableColumn>
      </TableHeader>
      <TableBody>
        {
          // render eahc in 
          cases.map(([case_id, client, lawyer, summary]) => (
            <TableRow key={case_id}>
              <TableCell>{client}</TableCell>
              <TableCell>{lawyer}</TableCell>
              <TableCell>{summary}</TableCell>
              <TableCell>
                <Button as='a' href={`/ChatJustus/demo-first-contact?case_id=${case_id}`}>
                  <FaEye />
                </Button>
              </TableCell>
            </TableRow>
          )
          )
        }
      </TableBody>
    </Table>
  )
}
