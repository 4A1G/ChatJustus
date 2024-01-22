"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConnectionProvider, DefaultConnectionContext } from '@/hooks/networking/connection'
import { useIsClient } from "@uidotdev/usehooks";


export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
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
        url={`ws://${getHost()}:42069/ws/follow_up`}
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
