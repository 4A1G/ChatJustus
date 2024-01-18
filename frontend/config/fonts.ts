import { Fira_Code as FontMono, Lato as FontSans, Lora as FontSerif } from "next/font/google"

export const fontSans = FontSans({
  weight: "400",
  subsets: ["latin"],
  variable: "--my-font-sans",
})

export const fontSerif = FontSerif({
  weight: "400",
  subsets: ["latin"],
  variable: "--my-font-serif",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--my-font-mono",
})
