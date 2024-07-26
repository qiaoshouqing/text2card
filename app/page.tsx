// app/page.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Twitter, Globe, Github } from 'lucide-react';
import html2canvas from 'html2canvas';

const defaultText = `放弃向他人证明自己，放弃向自己证明自己。专注忘我地去做你应该做的事情，心无旁骛地去解决问题。当你脚踏实地的走自己的路时，那种拼命想要证明什么的冲动就会越来越少。你也会因此变得轻松、自由。\n\n——查理·芒格`;

interface TextPreviewProps {
    text: string;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text }) => {
    const getRandomFontSize = () => Math.floor(Math.random() * (36 - 20 + 1) + 20);

    const paragraphStyle = (fontSize: number): React.CSSProperties => ({
        fontSize: `${fontSize}px`,
        lineHeight: '1.5',
        marginBottom: '1rem',
        color: '#166434',
        wordBreak: 'break-word',
        whiteSpace: 'pre-wrap',
    });

    return (
        <div className="text-preview" style={{
            backgroundColor: '#f3f4f6',
            borderRadius: '1rem',
            padding: '2rem 3rem',
            minHeight: '61.8vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'Huiwen_mingchao, sans-serif',
            overflow: 'hidden',
        }}>
            {text.split('\n\n').map((paragraph, index) => (
                <p key={index} style={paragraphStyle(getRandomFontSize())}>
                    {paragraph}
                </p>
            ))}
        </div>
    );
};

const TextToImageGenerator: React.FC = () => {
    const [text, setText] = useState<string>(defaultText);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });
    }, []);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const handleDownload = () => {
        if (canvasRef.current) {
            const scale = 2;
            const element = canvasRef.current;

            html2canvas(element, {
                backgroundColor: null,
                scale: scale,
                logging: false,
                useCORS: true,
                onclone: (clonedDoc) => {
                    const clonedElement = clonedDoc.querySelector('.text-preview');
                    if (clonedElement && clonedElement instanceof HTMLElement) {
                        clonedElement.style.borderRadius = '1rem';
                        clonedElement.style.overflow = 'hidden';
                    }
                    Array.from(clonedDoc.getElementsByTagName('p')).forEach(p => {
                        if (p instanceof HTMLElement) {
                            p.style.whiteSpace = 'pre-wrap';
                        }
                    });
                }
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'generated-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#EFEEE5] p-8 md:p-16 huiwen-font flex flex-col">
            <Card className="w-full max-w-6xl mx-auto rounded-2xl overflow-hidden shadow-lg flex-grow bg-white">
                <CardContent className="p-6 md:p-8">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#166434]">文字生成图片工具</h1>
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                        <div className="flex-1 flex flex-col">
                            <Textarea
                                placeholder="请输入文字..."
                                value={text}
                                onChange={handleTextChange}
                                className="w-full flex-grow mb-4 huiwen-font rounded-xl text-base md:text-lg p-4"
                                style={{ minHeight: '300px', whiteSpace: 'pre-wrap' }}
                            />
                            <Button
                                onClick={handleDownload}
                                className="huiwen-font bg-black text-white hover:bg-gray-800 rounded-xl text-base md:text-lg py-2 px-4"
                            >
                                下载图片
                            </Button>
                        </div>
                        <div className="flex-1" ref={canvasRef}>
                            {fontsLoaded && <TextPreview text={text} />}
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
                        aria-label="Twitter profile"
                    >
                        <Twitter size={24} />
                    </a>
                    <a
                        href="https://pomodiary.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                        aria-label="Official website"
                    >
                        <Globe size={24} />
                    </a>
                    <a
                        href="https://github.com/qiaoshouqing/text2card"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                        aria-label="GitHub repository"
                    >
                        <Github size={24} />
                    </a>
                </div>
                <p className="mt-2 text-sm text-gray-500">© 2024 文字生成图片工具. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TextToImageGenerator;