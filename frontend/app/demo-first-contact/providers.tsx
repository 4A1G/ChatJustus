"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConnectionProvider, DefaultConnectionContext } from '@/hooks/networking/connection'
import { useIsClient } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";


export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const searchParams = useSearchParams()
  
  const isClient = useIsClient()
  const getHost = () => {
    if (isClient) {
      if (window.location.hostname === "4a1g.github.io") {
        return "34.90.113.6"
      } else {
        return window.location.hostname
      }
    }
  }

  return (
    <>
      {isClient && (
        <ConnectionProvider
        url={`ws://${getHost()}:42069/ws/demo/first_contact/${searchParams.get('case_id')}`}
        context={DefaultConnectionContext}
        autoconnect
        wsAuth
        >
            {children}
        </ConnectionProvider>
      )}
      {!isClient && children}
    </>
  );
}
