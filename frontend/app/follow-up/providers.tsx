"use client";

import * as React from "react";
import { ConnectionProvider } from '@/components/networking/connection'


export interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    // Set isClient to true once the component is mounted on the client
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <ConnectionProvider url={`ws://${window.location.hostname}:42069/ws/follow_up/default_session`}>
          {children}
        </ConnectionProvider>
      )}
      {!isClient && children}
    </>
  );
}
