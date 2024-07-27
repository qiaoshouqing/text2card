'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Twitter, Globe, Github, Copy, Trash2, Download, Shuffle } from 'lucide-react';
import html2canvas from 'html2canvas';

const defaultText = `我总是不假思索地在上路， 因为出发的感觉真是太好了

I was surprised, as always, that how easy it was to leave—how good it felt to be gone, to be on the move, to be someplace where I had never been before and where I was never going to be again.

- John Krakauer, Into the Wild. `;

interface TextPreviewProps {
    text: string;
    fontsLoaded: boolean;
    isVertical: boolean;
    randomLayout: boolean;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text, fontsLoaded, isVertical, randomLayout }) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [fontSizes, setFontSizes] = useState<number[]>([]);
    const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });

    const getRandomFontSize = (baseSize: number) => {
        return Math.floor(Math.random() * (baseSize * 2 - baseSize / 4 + 1) + baseSize / 4);
    };

    const regenerateFontSizes = (baseSize: number) => {
        return text.split('\n\n').map(() => getRandomFontSize(baseSize));
    };

    const checkAndAdjustFontSizes = () => {
        if (!previewRef.current || !contentRef.current) return;

        const containerWidth = previewRef.current.offsetWidth;
        const containerHeight = previewRef.current.offsetHeight;
        const baseFontSize = Math.min(containerWidth, containerHeight) * 0.07; // 4% of smaller dimension as base font size

        let newFontSizes = regenerateFontSizes(baseFontSize);
        let attempts = 0;
        const maxAttempts = 100;
        while (attempts < maxAttempts) {
            contentRef.current.style.fontSize = `${baseFontSize}px`;
            newFontSizes.forEach((size, index) => {
                const paragraph = contentRef.current!.children[index] as HTMLParagraphElement;
                if (paragraph) {
                    paragraph.style.fontSize = `${size}px`;
                }
            });

            const isOverflowing = contentRef.current.scrollWidth > containerWidth ||
                contentRef.current.scrollHeight > containerHeight;

            if (!isOverflowing) {
                break;
            }

            newFontSizes = newFontSizes.map(size => Math.max(size * 0.9, baseFontSize / 4));
            attempts++;
        }

        if (attempts === maxAttempts) {
            // If we've reached max attempts, set all font sizes to the minimum
            newFontSizes = newFontSizes.map(() => baseFontSize / 2);
        }

        setFontSizes(newFontSizes);
    };

    const updatePreviewSize = () => {
        if (previewRef.current) {
            const width = previewRef.current.offsetWidth;
            const height = isVertical ? width * 1.618 : width / 1.618;
            setPreviewSize({ width, height });
        }
    };

    useEffect(() => {
        updatePreviewSize();
        window.addEventListener('resize', updatePreviewSize);
        return () => window.removeEventListener('resize', updatePreviewSize);
    }, [isVertical]);

    useEffect(() => {
        if (fontsLoaded) {
            checkAndAdjustFontSizes();
        }
    }, [text, fontsLoaded, randomLayout, previewSize]);

    const getBorderRadius = () => {
        return `${previewSize.width * 0.05}px`; // 5% of width
    };

    const getPadding = () => {
        return `${previewSize.width * 0.06}px`; // 6% of width
    };

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: `${previewSize.width * 0.03}px`, // 3% of width
                borderRadius: `${previewSize.width * 0.0375}px`, // 3.75% of width
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <div
                ref={previewRef}
                className="text-preview"
                style={{
                    backgroundColor: '#f3f4f6',
                    borderRadius: getBorderRadius(),
                    padding: getPadding(),
                    width: '100%',
                    height: `${previewSize.height}px`,
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
                        height: '100%',
                        color: '#166434',
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        fontFamily: fontsLoaded ? 'Huiwen_mingchao, sans-serif' : 'sans-serif',
                        overflow: 'hidden',
                    }}
                >
                    {text.split('\n\n').map((paragraph, index) => (
                        <p
                            key={index}
                            style={{
                                fontSize: `${fontSizes[index] || previewSize.width * 0.04}px`,
                                lineHeight: '1.5',
                                marginBottom: `${previewSize.width * 0.02}px`, // 2% of width
                                textAlign: 'left',
                            }}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TextToImageGenerator: React.FC = () => {
    const [text, setText] = useState<string>(defaultText);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const [isVertical, setIsVertical] = useState<boolean>(false);
    const [randomLayout, setRandomLayout] = useState<boolean>(false);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        document.fonts.ready.then(() => {
            setFontsLoaded(true);
        });

        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
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
                    if (clonedElement instanceof HTMLElement) {
                        clonedElement.style.overflow = 'hidden';
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

    const handleRandomLayout = () => {
        setRandomLayout(prev => !prev);
    };

    return (
        <div className={`min-h-screen bg-[#EFEEE5] p-6 md:p-10 lg:p-16 huiwen-font flex flex-col ${isVertical && !isMobile ? 'items-center' : ''}`}>
            <Card className={`w-full mx-auto rounded-2xl overflow-hidden shadow-lg flex-grow bg-white ${isVertical && !isMobile ? 'max-w-2xl' : ''}`}>
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
                        <Button
                            onClick={handleRandomLayout}
                            className="huiwen-font bg-purple-500 text-white hover:bg-purple-600 rounded-xl text-sm md:text-base py-2 px-4"
                        >
                            <Shuffle className="mr-2 h-4 w-4" /> 随机布局
                        </Button>
                    </div>
                    <div className={`flex ${isVertical && !isMobile ? 'flex-col' : 'flex-col lg:flex-row'} gap-6 md:gap-8`}>
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
                                    <Download className="mr-2 h-4 w-4" /> 下载图片
                                </Button>
                                {!isMobile && (
                                    <Button
                                        onClick={handleCopy}
                                        className="huiwen-font bg-gray-200 text-black hover:bg-gray-300 rounded-xl text-sm md:text-base py-2 px-4"
                                    >
                                        <Copy className="mr-2 h-4 w-4" /> 复制图片
                                    </Button>
                                )}
                                <Button
                                    onClick={handleClear}
                                    className="huiwen-font bg-red-500 text-white hover:bg-red-600 rounded-xl text-sm md:text-base py-2 px-4"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" /> 清空文字
                                </Button>
                            </div>
                        </div>
                        <div className="flex-1 w-full" ref={canvasRef}>
                            <TextPreview
                                text={text}
                                fontsLoaded={fontsLoaded}
                                isVertical={isVertical}
                                randomLayout={randomLayout}
                            />
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