"use client";

import * as React from "react";
import { ConnectionProvider } from '@/components/networking/connection'


export interface ProvidersProps {
	children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
	return (
		<ConnectionProvider url={"ws://localhost:42069/ws/follow_up/default_session"}>
			{children}
		</ConnectionProvider>
	);
}
