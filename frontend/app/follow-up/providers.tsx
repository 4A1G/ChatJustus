"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConnectionProvider, DefaultConnectionContext } from '@/hooks/networking/connection'
import { useIsClient } from "@uidotdev/usehooks";


export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const isClient = useIsClient()

  return (
    <>
      {isClient && (
        <ConnectionProvider
        url={`ws://${window.location.hostname}:27017/ws/follow_up`}
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
