// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '文字生成图片工具',
    description: '一个简单的文字生成图片工具',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="zh">
        <body>{children}</body>
        </html>
    )
}