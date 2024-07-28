'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Twitter, Globe, Github, Copy, Trash2, Download, Shuffle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ColorTheme, colorThemes, defaultThemeIndex } from './colorThemes';
import TextPreview from './TextPreview';
import { Switch } from "../components/ui/switch";

const defaultText = `C'est ça, la vie.
这就是人生

https://card.pomodiary.com/`;

const EpicCard: React.FC = () => {
    const [text, setText] = useState<string>(defaultText);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const [randomLayout, setRandomLayout] = useState<boolean>(false);
    const [currentTheme, setCurrentTheme] = useState<ColorTheme>(colorThemes[defaultThemeIndex]);
    const [isPortraitMode, setIsPortraitMode] = useState<boolean>(false);
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

    const trimTransparentCanvas = (canvas: HTMLCanvasElement) => {
        const ctx = canvas.getContext('2d');
        if (!ctx) return canvas;

        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const l = pixels.data.length;
        const bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        };

        for (let i = 0; i < l; i += 4) {
            if (pixels.data[i + 3] !== 0) {
                const x = (i / 4) % canvas.width;
                const y = ~~((i / 4) / canvas.width);

                if (bound.top === null) {
                    bound.top = y;
                }

                if (bound.left === null) {
                    bound.left = x;
                } else if (x < bound.left) {
                    bound.left = x;
                }

                if (bound.right === null) {
                    bound.right = x;
                } else if (bound.right < x) {
                    bound.right = x;
                }

                if (bound.bottom === null) {
                    bound.bottom = y;
                } else if (bound.bottom < y) {
                    bound.bottom = y;
                }
            }
        }

        const trimHeight = bound.bottom! - bound.top! + 1;
        const trimWidth = bound.right! - bound.left! + 1;
        const trimmed = ctx.getImageData(bound.left!, bound.top!, trimWidth, trimHeight);

        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimWidth;
        trimmedCanvas.height = trimHeight;
        trimmedCanvas.getContext('2d')!.putImageData(trimmed, 0, 0);

        return trimmedCanvas;
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
                const trimmedCanvas = trimTransparentCanvas(canvas);
                const link = document.createElement('a');
                link.download = 'epic-card.png';
                link.href = trimmedCanvas.toDataURL('image/png');
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
                const trimmedCanvas = trimTransparentCanvas(canvas);
                trimmedCanvas.toBlob((blob) => {
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

    const handlePortraitModeToggle = () => {
        setIsPortraitMode(prev => !prev);
    };

    return (
        <div className={`flex flex-col xl:flex-row gap-8 md:gap-12 ${isPortraitMode ? 'max-w-3xl mx-auto' : ''}`}>
            <div className={`flex-1 flex flex-col ${isPortraitMode ? 'xl:w-1/2' : ''}`}>
                <Textarea
                    placeholder="Enter your text here..."
                    value={text}
                    onChange={handleTextChange}
                    className="w-full flex-grow mb-6 huiwen-font rounded-xl text-base md:text-lg lg:text-xl p-4 md:p-6 border-2 border-gray-300 focus:border-[#166434] transition-colors duration-200"
                    style={{ minHeight: '250px', whiteSpace: 'pre-wrap', borderColor: currentTheme.websiteTheme }}
                />
                <div className="flex flex-wrap gap-4 justify-between mb-4">
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
                <div className="flex items-center gap-2">
                    <Switch
                        id="portrait-mode"
                        checked={isPortraitMode}
                        onCheckedChange={handlePortraitModeToggle}
                    />
                    <label htmlFor="portrait-mode" className="text-sm font-medium">
                        Portrait Mode
                    </label>
                </div>
            </div>
            <div className={`flex-1 w-full ${isPortraitMode ? 'xl:w-1/2' : ''}`} ref={canvasRef}>
                <TextPreview
                    text={text}
                    fontsLoaded={fontsLoaded}
                    randomLayout={randomLayout}
                    theme={currentTheme}
                    isPortraitMode={isPortraitMode}
                />
            </div>
        </div>
    );
};

export default EpicCard;