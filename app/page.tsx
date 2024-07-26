// app/page.tsx
'use client'

import React, { useState, useRef } from 'react';
import { Twitter, Globe } from 'lucide-react';
import html2canvas from 'html2canvas';
import {Card, CardContent} from "../components/ui/card";
import {Textarea} from "../components/ui/textarea";
import {Button} from "../components/ui/button";

const TextToImageGenerator = () => {
    const [text, setText] = useState('');
    const canvasRef = useRef<HTMLDivElement>(null);

    const getRandomFontSize = () => Math.floor(Math.random() * (36 - 20 + 1) + 20);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleDownload = () => {
        if (canvasRef.current) {
            html2canvas(canvasRef.current, {
                backgroundColor: null,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'generated-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    return (
        <div className="min-h-screen bg-white p-8 md:p-16 huiwen-font flex flex-col">
            <Card className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg flex-grow">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#166434]">文字生成图片工具</h1>
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                        <div className="flex-1 flex flex-col">
                            <Textarea
                                placeholder="请输入文字..."
                                value={text}
                                onChange={handleTextChange}
                                className="w-full flex-grow mb-4 huiwen-font rounded-xl text-base md:text-lg p-4"
                                style={{ minHeight: '300px' }}
                            />
                            <Button
                                onClick={handleDownload}
                                className="huiwen-font bg-black text-white hover:bg-gray-800 rounded-xl text-base md:text-lg py-2 px-4"
                            >
                                下载图片
                            </Button>
                        </div>
                        <div className="flex-1">
                            <div
                                ref={canvasRef}
                                className="bg-gray-100 rounded-2xl p-6 md:p-8 aspect-[1.618] flex flex-col justify-center huiwen-font overflow-hidden"
                                style={{ minHeight: '300px' }}
                            >
                                {text.split('\n\n').map((paragraph, index) => (
                                    <p
                                        key={index}
                                        className="text-left mb-4 text-[#166434]"
                                        style={{ fontSize: `${getRandomFontSize()}px` }}
                                    >
                                        {paragraph}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <footer className="mt-8 text-center">
                <div className="flex justify-center space-x-4">
                    <a
                        href="https://x.com/benshandebiao"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                        <Twitter size={24} />
                    </a>
                    <a
                        href="https://pomodiary.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                    >
                        <Globe size={24} />
                    </a>
                </div>
                <p className="mt-2 text-sm text-gray-500">© 2024 文字生成图片工具. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TextToImageGenerator;