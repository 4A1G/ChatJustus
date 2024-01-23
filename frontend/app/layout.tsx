import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans, fontSerif } from "@/config/fonts";
import { Providers } from "./providers";
import { Toaster } from 'sonner';
import clsx from "clsx";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/ChatJustus/icon-192x192.png",
		apple: "/ChatJustus/icon-192x192.png",
		shortcut: "/ChatJustus/icon-192x192.png",
	},
	manifest: "/ChatJustus/manifest.webmanifest",
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
	minimumScale: 1,
	userScalable: false,
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={clsx(
					"min-h-[calc(100dvh)] bg-background font-sans antialiased",
					fontSans.variable,
					fontSerif.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
					<div className="relative flex flex-col w-full h-[calc(100dvh)] bg-gradient-to-bl from-[#9982DD] to-[#283E88] dark:from-blue-900 dark:to-orange-900">
						{/* <Navbar /> */}
						<main className="w-full h-full">
							{children}
						</main>
						<Toaster richColors position="bottom-right" />
					</div>
				</Providers>
			</body>
		</html>
	);
}
