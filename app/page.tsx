// app/page.tsx
'use client'

import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Twitter, Globe, Github, Copy, Trash2 } from 'lucide-react';
import html2canvas from 'html2canvas';

const defaultText = `人生得意须尽欢，莫使金樽空对月 \n\n——李白`;

interface TextPreviewProps {
    text: string;
    fontsLoaded: boolean;
    isVertical: boolean;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text, fontsLoaded, isVertical }) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [fontSizes, setFontSizes] = useState<number[]>([]);

    const getRandomFontSize = () => {
        return Math.floor(Math.random() * (48 - 12 + 1) + 12);
    };

    const regenerateFontSizes = () => {
        return text.split('\n\n').map(() => getRandomFontSize());
    };

    const checkAndAdjustFontSizes = () => {
        if (!previewRef.current || !contentRef.current) return;

        const containerWidth = previewRef.current.offsetWidth - 64; // 考虑 padding
        const containerHeight = isVertical
            ? previewRef.current.offsetWidth * 1.618 - 64
            : previewRef.current.offsetWidth / 1.618 - 64;

        let newFontSizes = regenerateFontSizes();
        let attempts = 0;
        const maxAttempts = 100;

        while (attempts < maxAttempts) {
            contentRef.current.style.fontSize = '12px'; // 重置字体大小
            newFontSizes.forEach((size, index) => {
                const paragraph = contentRef.current!.children[index] as HTMLParagraphElement;
                if (paragraph) {
                    paragraph.style.fontSize = `${size}px`;
                }
            });

            if (contentRef.current.scrollWidth <= containerWidth &&
                contentRef.current.scrollHeight <= containerHeight) {
                break;
            }

            newFontSizes = newFontSizes.map(size => Math.max(size - 1, 12));
            attempts++;
        }

        setFontSizes(newFontSizes);
    };

    useEffect(() => {
        checkAndAdjustFontSizes();
    }, [text, isVertical, fontsLoaded]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', checkAndAdjustFontSizes);
            return () => window.removeEventListener('resize', checkAndAdjustFontSizes);
        }
    }, []);

    return (
        <div
            ref={previewRef}
            className="text-preview"
            style={{
                backgroundColor: '#f3f4f6',
                borderRadius: typeof window === 'undefined' ? '1rem' : window.innerWidth < 768 ? '0.75rem' : '1rem',
                padding: '2rem',
                width: '100%',
                aspectRatio: isVertical ? '1 / 1.618' : '1.618 / 1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflow: 'hidden',
            }}
        >
            <div
                ref={contentRef}
                style={{
                    width: '100%',
                    color: '#166434',
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    fontFamily: fontsLoaded ? 'Huiwen_mingchao, sans-serif' : 'sans-serif',
                }}
            >
                {text.split('\n\n').map((paragraph, index) => (
                    <p
                        key={index}
                        style={{
                            fontSize: `${fontSizes[index] || 12}px`,
                            lineHeight: '1.5',
                            marginBottom: '1rem',
                            textAlign: 'left',
                        }}
                    >
                        {paragraph}
                    </p>
                ))}
            </div>
        </div>
    );
};

const TextToImageGenerator: React.FC = () => {
    const [text, setText] = useState<string>(defaultText);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const [isVertical, setIsVertical] = useState<boolean>(false);
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
                    if (typeof window !== 'undefined') {
                        if (clonedElement && clonedElement instanceof HTMLElement) {
                            if (typeof window !== 'undefined') {
                                clonedElement.style.borderRadius = window.innerWidth < 768 ? '0.75rem' : '1rem';
                                clonedElement.style.overflow = 'hidden';
                            }
                        }
                    }
                }
            }).then((canvas) => {
                const link = document.createElement('a');
                link.download = 'generated-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    const handleCopy = () => {
        if (canvasRef.current) {
            html2canvas(canvasRef.current, {
                backgroundColor: null,
                scale: 2,
                logging: false,
                useCORS: true,
            }).then((canvas) => {
                canvas.toBlob((blob) => {
                    if (blob) {
                        navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blob })
                        ]).then(() => {
                            alert('图片已复制到剪贴板');
                        }).catch(err => {
                            console.error('复制失败:', err);
                            alert('复制失败，请重试');
                        });
                    }
                });
            });
        }
    };

    const handleClear = () => {
        setText('');
    };

    return (
        <div className="min-h-screen bg-[#EFEEE5] p-6 md:p-10 lg:p-16 huiwen-font flex flex-col">
            <Card className={`w-full mx-auto rounded-2xl overflow-hidden shadow-lg flex-grow bg-white ${isVertical ? 'max-w-3xl' : 'max-w-6xl'}`}>
                <CardContent className="p-6 md:p-8 lg:p-10">
                    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-[#166434]">文字生成图片工具</h1>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <span>横版</span>
                            <Switch
                                checked={isVertical}
                                onCheckedChange={setIsVertical}
                            />
                            <span>竖版</span>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                        <div className="flex-1 flex flex-col">
                            <Textarea
                                placeholder="请输入文字..."
                                value={text}
                                onChange={handleTextChange}
                                className="w-full flex-grow mb-4 huiwen-font rounded-xl text-sm md:text-base lg:text-lg p-3 md:p-4"
                                style={{ minHeight: '200px', whiteSpace: 'pre-wrap' }}
                            />
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    onClick={handleDownload}
                                    className="huiwen-font bg-black text-white hover:bg-gray-800 rounded-xl text-sm md:text-base py-2 px-4"
                                >
                                    下载图片
                                </Button>
                                <Button
                                    onClick={handleCopy}
                                    className="huiwen-font bg-gray-200 text-black hover:bg-gray-300 rounded-xl text-sm md:text-base py-2 px-4"
                                >
                                    <Copy className="mr-2 h-4 w-4" /> 复制图片
                                </Button>
                                <Button
                                    onClick={handleClear}
                                    className="huiwen-font bg-red-500 text-white hover:bg-red-600 rounded-xl text-sm md:text-base py-2 px-4"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> 清空文字
                                </Button>
                            </div>
                        </div>
                        <div className={`flex-1 ${isVertical ? 'lg:w-2/3 mx-auto' : ''}`} ref={canvasRef}>
                            <TextPreview text={text} fontsLoaded={fontsLoaded} isVertical={isVertical} />
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
                        <Twitter size={20} />
                    </a>
                    <a
                        href="https://pomodiary.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                        aria-label="Official website"
                    >
                        <Globe size={20} />
                    </a>
                    <a
                        href="https://github.com/qiaoshouqing/text2card"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-black transition-colors duration-200"
                        aria-label="GitHub repository"
                    >
                        <Github size={20} />
                    </a>
                </div>
                <p className="mt-2 text-xs md:text-sm text-gray-500">© 2024 文字生成图片工具. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TextToImageGenerator;