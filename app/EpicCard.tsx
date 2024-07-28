'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Twitter, Globe, Github, Copy, Trash2, Download, Shuffle } from 'lucide-react';
import html2canvas from 'html2canvas';
import { ColorTheme, colorThemes, defaultThemeIndex } from './colorThemes';
import TextPreview from './TextPreview';

const defaultText = `I was surprised, as always, by how easy it was to leave—how good it felt to be gone, to be on the move, to be someplace where I had never been before and where I was never going to be again.

- John Krakauer, Into the Wild.`;

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
    );
};

export default EpicCard;