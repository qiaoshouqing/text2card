'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Twitter, Globe, Github, Copy, Trash2, Download, Shuffle } from 'lucide-react';
import html2canvas from 'html2canvas';

const defaultText = `I was surprised, as always, by how easy it was to leave—how good it felt to be gone, to be on the move, to be someplace where I had never been before and where I was never going to be again.

- John Krakauer, Into the Wild.`;

interface TextPreviewProps {
    text: string;
    fontsLoaded: boolean;
    randomLayout: boolean;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text, fontsLoaded, randomLayout }) => {
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
        const baseFontSize = Math.min(containerWidth, containerHeight) * 0.07;

        const innerPadding = containerWidth * 0.06;
        const totalHorizontalPadding = 2 * innerPadding;
        const totalVerticalPadding = 2 * innerPadding;

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

            const isOverflowing =
                contentRef.current.scrollWidth > (containerWidth - totalHorizontalPadding) ||
                contentRef.current.scrollHeight > (containerHeight - totalVerticalPadding);

            if (!isOverflowing) {
                break;
            }

            newFontSizes = newFontSizes.map(size => Math.max(size * 0.9, baseFontSize / 4));
            attempts++;
        }

        if (attempts === maxAttempts) {
            newFontSizes = newFontSizes.map(() => baseFontSize / 2);
        }

        setFontSizes(newFontSizes);
    };

    const updatePreviewSize = () => {
        if (previewRef.current) {
            const width = previewRef.current.offsetWidth;
            const height = width / 1.618;
            setPreviewSize({ width, height });
        }
    };

    useEffect(() => {
        updatePreviewSize();
        window.addEventListener('resize', updatePreviewSize);
        return () => window.removeEventListener('resize', updatePreviewSize);
    }, []);

    useEffect(() => {
        if (fontsLoaded) {
            checkAndAdjustFontSizes();
        }
    }, [text, fontsLoaded, randomLayout, previewSize]);

    const getBorderRadius = () => {
        return `${previewSize.width * 0.05}px`;
    };

    const getPadding = () => {
        return `${previewSize.width * 0.06}px`;
    };

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: `${previewSize.width * 0.03}px`,
                borderRadius: `${previewSize.width * 0.0375}px`,
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
                                marginBottom: `${previewSize.width * 0.02}px`,
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

const EpicCard: React.FC = () => {
    const [text, setText] = useState<string>(defaultText);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
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
                link.download = 'epic-card.png';
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
                            alert('Image copied to clipboard');
                        }).catch(err => {
                            console.error('Copy failed:', err);
                            alert('Copy failed, please try again');
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
        <div className="min-h-screen bg-gradient-to-br from-[#EFEEE5] to-[#D7D6CF] p-6 md:p-10 lg:p-16 huiwen-font flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#166434] text-center">EpicCard Generator</h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 italic text-center">"Simplicity is the ultimate sophistication"</p>
                <div className="flex flex-col xl:flex-row gap-8 md:gap-12">
                    <div className="flex-1 flex flex-col">
                        <Textarea
                            placeholder="Enter your text here..."
                            value={text}
                            onChange={handleTextChange}
                            className="w-full flex-grow mb-6 huiwen-font rounded-xl text-base md:text-lg lg:text-xl p-4 md:p-6 border-2 border-gray-300 focus:border-[#166434] transition-colors duration-200"
                            style={{ minHeight: '250px', whiteSpace: 'pre-wrap' }}
                        />
                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={handleDownload}
                                    className="huiwen-font bg-[#166434] text-white hover:bg-[#0D4A2C] rounded-xl text-sm md:text-base py-3 px-6 transition-colors duration-200"
                                >
                                    <Download className="mr-2 h-5 w-5" /> Download
                                </Button>
                                {!isMobile && (
                                    <Button
                                        onClick={handleCopy}
                                        className="huiwen-font bg-gray-200 text-black hover:bg-gray-300 rounded-xl text-sm md:text-base py-3 px-6 transition-colors duration-200"
                                    >
                                        <Copy className="mr-2 h-5 w-5" /> Copy
                                    </Button>
                                )}
                                <Button
                                    onClick={handleClear}
                                    className="huiwen-font bg-red-500 text-white hover:bg-red-600 rounded-xl text-sm md:text-base py-3 px-6 transition-colors duration-200"
                                >
                                    <Trash2 className="mr-2 h-5 w-5" /> Clear
                                </Button>
                            </div>
                            <Button
                                onClick={handleRandomLayout}
                                className="huiwen-font bg-purple-500 text-white hover:bg-purple-600 rounded-xl text-sm md:text-base py-3 px-6 transition-colors duration-200"
                            >
                                <Shuffle className="mr-2 h-5 w-5" /> Random Layout
                            </Button>
                        </div>
                    </div>
                    <div className="flex-1 w-full" ref={canvasRef}>
                        <TextPreview
                            text={text}
                            fontsLoaded={fontsLoaded}
                            randomLayout={randomLayout}
                        />
                    </div>
                </div>
            </div>
            <footer className="mt-12 text-center">
                <div className="flex justify-center space-x-6 mb-4">
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
                <p className="text-sm md:text-base text-gray-500">© 2024 EpicCard Generator. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default EpicCard;