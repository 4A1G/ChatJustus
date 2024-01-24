'use client'

import { useState, useEffect } from 'react'
import { Button } from '@nextui-org/button'
import { FaEye } from 'react-icons/fa6'

export default function Home() {
  const [cases, setCases] = useState([])

  useEffect(() => {
    fetch(`../cases`)
      .then(response => response.json())
      .then(data => setCases(data))
      .catch(error => console.error(error))
    //   .catch(e => setCases(JSON.parse(`[
    //     [
    //         "438f6b6d-1a92-483c-b020-7d4b668e4200",
    //         "Caspar",
    //         "David Chambers",
    //         "The client entered into a teddy bear rental agreement with their neighbor, lending a 1.5-meter tall teddy bear for a 3-day birthday party at a rate of 50 euro per day. The neighbor has retained the teddy bear for over two weeks, refusing to return it and to pay the agreed-upon penalty of 100 euro. The teddy bear is valued at more than 1000 euro. The client seeks the return of the teddy bear and compensation for the breach of contract."
    //     ],
    //     [
    //         "4be445c2-f6a9-49e8-afdf-d3c798538059",
    //         "Jay",
    //         "David Chambers",
    //         "The client is experiencing extreme disturbance due to loud music played by the neighbor, which occurs all night every night. The client has attempted to address the issue with the neighbor multiple times without success."
    //     ],
    //     [
    //         "a93be7b7-20b2-49db-8c92-e083bc25f85b",
    //         "Violet",
    //         "Sofia Sterling",
    //         "The client is in the retail sector and is looking to merge with another company. They have not yet initiated discussions or negotiations and are seeking legal assistance with structuring the deal."
    //     ],
    //     [
    //         "df303ca0-79e2-4633-bab0-d054c9a6d394",
    //         "Harry Potter",
    //         "David Chambers",
    //         "The client's friend is alleged to have murdered the client's cat yesterday. The client has evidence to support their claim but has not yet reported the incident to the police or any other authorities. The client wishes to pursue legal action for damages."
    //     ]
    // ]`)))
  }, [])

  return (
    <div className="flex flex-col gap-5 p-5 w-full h-full overflow-y-scroll">
      <p className="text-center text-xl">All Legal Cases at the TC Prototype Fair</p>
      <div className="flex flex-wrap gap-5 justify-center">
        {
          cases.map(([case_id, client, lawyer, summary]) => (
            <div key={case_id} className="max-w-sm flex flex-col p-4 rounded-lg backdrop-saturate-200 bg-default/30">
              <div className="flex flex-row space-x-4">
                <div className="font-bold">Client:</div>
                <div>{client}</div>
              </div>
              <div className="flex flex-row space-x-4">
                <div className="font-bold">Lawyer:</div>
                <div>{lawyer}</div>
              </div>
              <div className="mt-2">{summary}</div>
              <div className="flex mt-4">
                <Button fullWidth as='a' href={`/ChatJustus/demo-first-contact?case_id=${case_id}`}>
                  <FaEye /> View Case
                </Button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
