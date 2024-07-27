// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import React from "react";
import GoogleAnalytics from "../lib/goolge-analytics";

export const metadata: Metadata = {
    title: 'EpicCard Generator',
    description: 'A simple tool to generate epic text cards',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body>{children}</body>
        <GoogleAnalytics/>
        </html>
    )
}