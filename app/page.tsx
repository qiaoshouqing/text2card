// app/page.tsx
'use client'

import React, { useState, useRef } from 'react';
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
        <div className="min-h-screen bg-white p-16 huiwen-font">
            <Card className="max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-lg">
                <CardContent className="p-8">
                    <h1 className="text-3xl font-bold mb-6 text-[#166434]">文字生成图片工具</h1>
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <Textarea
                                placeholder="请输入文字..."
                                value={text}
                                onChange={handleTextChange}
                                className="w-full h-64 mb-4 huiwen-font rounded-xl"
                            />
                            <Button
                                onClick={handleDownload}
                                className="huiwen-font bg-black text-white hover:bg-gray-800 rounded-xl"
                            >
                                下载图片
                            </Button>
                        </div>
                        <div className="flex-1">
                            <div
                                ref={canvasRef}
                                className="bg-gray-100 rounded-2xl p-8 aspect-[1.618] flex flex-col justify-center huiwen-font overflow-hidden"
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
        </div>
    );
};

export default TextToImageGenerator;