// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import React from "react";
import GoogleAnalytics from "../lib/goolge-analytics";

export const metadata: Metadata = {
    title: 'SlothCard | Free Online Card Maker for Beautiful Text Cards',
    description: 'Create stunning text cards effortlessly with SlothCard. The easiest free online card maker for quotes, greetings, and personalized messages. Design at your own pace.',
    keywords: 'card maker, text card generator, online card creator, free card maker, SlothCard, personalized cards',
    openGraph: {
        title: 'SlothCard - Your Go-To Free Online Card Maker',
        description: 'Design beautiful text cards with SlothCard, the ultimate free card maker for all your creative needs.',
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