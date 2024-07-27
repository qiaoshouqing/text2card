'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Twitter, Globe, Github, Copy, Trash2, Download, Shuffle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ColorTheme, colorThemes, defaultThemeIndex } from './colorThemes';

const defaultText = `I was surprised, as always, by how easy it was to leave—how good it felt to be gone, to be on the move, to be someplace where I had never been before and where I was never going to be again.

- John Krakauer, Into the Wild.`;

interface TextPreviewProps {
    text: string;
    fontsLoaded: boolean;
    randomLayout: boolean;
    theme: ColorTheme;
}

const TextPreview: React.FC<TextPreviewProps> = ({ text, fontsLoaded, randomLayout, theme }) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [fontSizes, setFontSizes] = useState<number[]>([]);
    const [yPositions, setYPositions] = useState<number[]>([]);
    const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });

    const getRandomFontSize = (baseSize: number) => {
        return Math.floor(Math.random() * (baseSize * 2 - baseSize / 4 + 1) + baseSize / 4);
    };

    const regenerateFontSizes = (baseSize: number) => {
        return text.split('\n\n').map(() => getRandomFontSize(baseSize));
    };

    const generateRandomYPositions = (containerHeight: number, paragraphHeights: number[]) => {
        const positions: number[] = [];
        const totalContentHeight = paragraphHeights.reduce((sum, height) => sum + height, 0);
        const availableSpace = containerHeight - totalContentHeight;
        const minGap = containerHeight * 0.05; // Minimum gap between paragraphs (5% of container height)

        let currentY = 0;
        paragraphHeights.forEach((height, index) => {
            if (index === 0) {
                positions.push(0); // First paragraph starts at the top
                currentY = height;
            } else {
                const maxOffset = availableSpace / (paragraphHeights.length - 1);
                let randomOffset = Math.random() * maxOffset;
                if (randomOffset < minGap) randomOffset = minGap;
                currentY += randomOffset;
                positions.push(currentY);
                currentY += height;
            }
        });

        return positions;
    };

    const checkAndAdjustLayout = () => {
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
            const paragraphHeights: number[] = [];

            newFontSizes.forEach((size, index) => {
                const paragraph = contentRef.current!.children[index] as HTMLParagraphElement;
                if (paragraph) {
                    paragraph.style.fontSize = `${size}px`;
                    paragraph.style.position = 'absolute';
                    paragraph.style.width = `${containerWidth - totalHorizontalPadding}px`;
                    paragraphHeights.push(paragraph.offsetHeight);
                }
            });

            const newYPositions = generateRandomYPositions(containerHeight - totalVerticalPadding, paragraphHeights);

            let isOverflowing = false;
            newYPositions.forEach((y, index) => {
                const paragraph = contentRef.current!.children[index] as HTMLParagraphElement;
                if (paragraph) {
                    paragraph.style.top = `${y}px`;
                    if (y + paragraphHeights[index] > containerHeight - totalVerticalPadding) {
                        isOverflowing = true;
                    }
                }
            });

            if (!isOverflowing) {
                setFontSizes(newFontSizes);
                setYPositions(newYPositions);
                break;
            }

            newFontSizes = newFontSizes.map(size => Math.max(size * 0.9, baseFontSize / 4));
            attempts++;
        }

        if (attempts === maxAttempts) {
            const fallbackFontSize = baseFontSize / 2;
            setFontSizes(newFontSizes.map(() => fallbackFontSize));
            const fallbackYPositions = text.split('\n\n').map((_, index) => index * (fallbackFontSize * 1.5));
            setYPositions(fallbackYPositions);
        }
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
            checkAndAdjustLayout();
        }
    }, [text, fontsLoaded, randomLayout, previewSize]);

    const getBorderRadius = () => {
        return `${previewSize.width * 0.03}px`;
    };

    const getPadding = () => {
        return `${previewSize.width * 0.06}px`;
    };

    return (
        <div
            style={{
                backgroundColor: theme.borderBackground,
                padding: `${previewSize.width * 0.03}px`,
                borderRadius: `${previewSize.width * 0.025}px`,
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            <div
                ref={previewRef}
                className="text-preview"
                style={{
                    backgroundColor: theme.cardBackground,
                    borderRadius: getBorderRadius(),
                    padding: getPadding(),
                    width: '100%',
                    height: `${previewSize.height}px`,
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <div
                    ref={contentRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        color: theme.textColor,
                        wordBreak: 'break-word',
                        whiteSpace: 'pre-wrap',
                        fontFamily: fontsLoaded ? 'Huiwen_mingchao, sans-serif' : 'sans-serif',
                        overflow: 'hidden',
                        position: 'relative',
                    }}
                >
                    {text.split('\n\n').map((paragraph, index) => (
                        <p
                            key={index}
                            style={{
                                fontSize: `${fontSizes[index] || previewSize.width * 0.04}px`,
                                lineHeight: '1.5',
                                marginBottom: 0,
                                textAlign: 'left',
                                position: 'absolute',
                                top: `${yPositions[index] || 0}px`,
                                left: 0,
                                width: '100%',
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
    const [currentTheme, setCurrentTheme] = useState<ColorTheme>(colorThemes[defaultThemeIndex]);
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
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#166434] text-center" style={{ color: currentTheme.websiteTheme }}>EpicCard Generator</h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 italic text-center">"Simplicity is the ultimate sophistication"</p>
                <div className="flex flex-col xl:flex-row gap-8 md:gap-12">
                    <div className="flex-1 flex flex-col">
                        <Textarea
                            placeholder="Enter your text here..."
                            value={text}
                            onChange={handleTextChange}
                            className="w-full flex-grow mb-6 huiwen-font rounded-xl text-base md:text-lg lg:text-xl p-4 md:p-6 border-2 border-gray-300 focus:border-[#166434] transition-colors duration-200"
                            style={{ minHeight: '250px', whiteSpace: 'pre-wrap', borderColor: currentTheme.websiteTheme }}
                        />
                        <div className="flex flex-wrap gap-4 justify-between">
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    onClick={handleDownload}
                                    className="huiwen-font text-white hover:bg-opacity-80 rounded-xl text-sm md:text-base py-3 px-6 transition-colors duration-200"
                                    style={{ backgroundColor: currentTheme.websiteTheme }}
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
                            theme={currentTheme}
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