"use client";

import { ReactNode, useEffect, useState } from "react";
import { ConnectionProvider } from '@/hooks/networking/connection'
import { WSAuthProvider } from '@/hooks/networking/ws-auth'


export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set isClient to true once the component is mounted on the client
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <ConnectionProvider url={`ws://${window.location.hostname}:42069/ws/follow_up`}>
          <WSAuthProvider>
            {children}
          </WSAuthProvider>
        </ConnectionProvider>
      )}
      {!isClient && children}
    </>
  );
}
