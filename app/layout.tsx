// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import React from "react";
import GoogleAnalytics from "../lib/goolge-analytics";

export const metadata: Metadata = {
    title: 'Text2Card | Free Online Card Maker for Beautiful Text Cards',
    description: 'Create stunning text cards effortlessly with Text2Card. The easiest free online card maker for quotes, greetings, and personalized messages. Design at your own pace.',
    keywords: 'card maker, text card generator, online card creator, free card maker, Text2Card, personalized cards',
    openGraph: {
        title: 'Text2Card - Your Go-To Free Online Card Maker',
        description: 'Design beautiful text cards with Text2Card, the ultimate free card maker for all your creative needs.',
        type: 'website',
        url: 'https://card.pomodiary.com',
    },
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>
        <main>{children}</main>
        <GoogleAnalytics/>
        </body>
        </html>
    )
}