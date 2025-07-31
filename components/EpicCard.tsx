// components/EpicCard.tsx
'use client'

import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Download, Copy, Trash2, Smartphone } from 'lucide-react';
import { snapdom } from '@zumer/snapdom';
import { ColorTheme, colorThemes, defaultThemeIndex } from '../app/colorThemes';
import TextPreview from './TextPreview';
import ThemeSelector from './ThemeSelector';
import { Switch } from "./ui/switch";

const fallbackDefaultContent = `I was surprised, as always, that how easy it was to leave—how good it felt to be gone, to be on the move, to be someplace where I had never been before and where I was never going to be again.

我总是不假思索地在上路，因为出发的感觉真是太好了，世界突然充满了可能性。`;

const fallbackDefaultAuthor = `John Krakauer, Into the Wild`;

interface EpicCardProps {
    defaultContent?: string;
    defaultAuthor?: string;
    theme?: ColorTheme;
}

const EpicCard: React.FC<EpicCardProps> = ({
                                               defaultContent = fallbackDefaultContent,
                                               defaultAuthor = fallbackDefaultAuthor,
                                               theme = colorThemes[defaultThemeIndex]
                                           }) => {
    const [content, setContent] = useState<string>(defaultContent);
    const [author, setAuthor] = useState<string>(defaultAuthor);
    const [fontsLoaded, setFontsLoaded] = useState<boolean>(false);
    const [currentTheme, setCurrentTheme] = useState<ColorTheme>(theme);
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

    useEffect(() => {
        setContent(defaultContent);
        setAuthor(defaultAuthor);
    }, [defaultContent, defaultAuthor]);

    const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };

    const trimTransparentCanvas = (canvas: HTMLCanvasElement, preserveMargin: number = 60) => {
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

        // Add preserve margin to maintain border and rounded corners
        const finalLeft = Math.max(0, bound.left! - preserveMargin);
        const finalTop = Math.max(0, bound.top! - preserveMargin);
        const finalRight = Math.min(canvas.width - 1, bound.right! + preserveMargin);
        const finalBottom = Math.min(canvas.height - 1, bound.bottom! + preserveMargin);

        const trimHeight = finalBottom - finalTop + 1;
        const trimWidth = finalRight - finalLeft + 1;
        const trimmed = ctx.getImageData(finalLeft, finalTop, trimWidth, trimHeight);

        const trimmedCanvas = document.createElement('canvas');
        trimmedCanvas.width = trimWidth;
        trimmedCanvas.height = trimHeight;
        trimmedCanvas.getContext('2d')!.putImageData(trimmed, 0, 0);

        return trimmedCanvas;
    };

    const handleDownload = () => {
        if (canvasRef.current) {
            // Directly find the text-preview-outer element within the canvasRef
            const textPreviewWrapper = canvasRef.current.querySelector('.text-preview-outer') as HTMLElement;
            
            if (!textPreviewWrapper) {
                console.error('Text preview wrapper element not found');
                return;
            }

            const rect = textPreviewWrapper.getBoundingClientRect();
            const targetWidth = isPortraitMode ? 1080 : 1920;
            const targetHeight = isPortraitMode ? Math.round(targetWidth * 1.414) : Math.round(targetWidth / 1.618);
            
            const scaleX = targetWidth / rect.width;
            const scaleY = targetHeight / rect.height;
            const scale = Math.min(scaleX, scaleY, 3);

            ensureFontLoaded(textPreviewWrapper).then(() => {
                return snapdom.toCanvas(textPreviewWrapper, {
                    scale: scale,
                    useCORS: true,
                    allowTaint: true,
                });
            }).then((canvas) => {
                // Always use mobile standard (60px margin) for consistent behavior
                const trimmedCanvas = trimTransparentCanvas(canvas, 60);
                const link = document.createElement('a');
                link.download = 'Text2Card.png';
                link.href = trimmedCanvas.toDataURL('image/png', 1.0);
                link.click();
            });
        }
    };

    const handleCopy = () => {
        if (canvasRef.current) {
            // Directly find the text-preview-outer element within the canvasRef
            const textPreviewWrapper = canvasRef.current.querySelector('.text-preview-outer') as HTMLElement;
            
            if (!textPreviewWrapper) {
                console.error('Text preview wrapper element not found');
                return;
            }

            const rect = textPreviewWrapper.getBoundingClientRect();
            const targetWidth = isPortraitMode ? 1080 : 1920;
            const targetHeight = isPortraitMode ? Math.round(targetWidth * 1.414) : Math.round(targetWidth / 1.618);
            
            const scaleX = targetWidth / rect.width;
            const scaleY = targetHeight / rect.height;
            const scale = Math.min(scaleX, scaleY, 2);

            ensureFontLoaded(textPreviewWrapper).then(() => {
                return snapdom.toCanvas(textPreviewWrapper, {
                    scale: scale,
                    useCORS: true,
                    allowTaint: true,
                });
            }).then((canvas) => {
                // Always use mobile standard (60px margin) for consistent behavior
                const trimmedCanvas = trimTransparentCanvas(canvas, 60);
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
        setContent('');
        setAuthor('');
    };

    const ensureFontLoaded = async (element: HTMLElement) => {
        try {
            // Try to load the font explicitly
            const font = new FontFace('Huiwen_mingchao', 'url(/fonts/Huiwen_mingchao.woff2)');
            await font.load();
            document.fonts.add(font);
            await document.fonts.ready;
            
            // Force a repaint
            const originalDisplay = element.style.display;
            element.style.display = 'none';
            element.offsetHeight; // trigger reflow
            element.style.display = originalDisplay;
            
            // Additional delay for rendering
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
            console.warn('Font loading failed, proceeding with fallback:', error);
            await document.fonts.ready;
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    };

    const handlePortraitModeToggle = () => {
        setIsPortraitMode(prev => !prev);
    };

    const handleThemeChange = (newTheme: ColorTheme) => {
        setCurrentTheme(newTheme);
    };

    return (
        <div className="flex flex-col gap-4">
            <div className={`flex flex-col lg:flex-row gap-8 md:gap-12 ${isPortraitMode ? 'max-w-6xl mx-auto' : ''}`}>
                <div className="flex-1 flex flex-col lg:max-w-xl">
                    <div className="flex justify-between items-center mb-4">
                        <ThemeSelector
                            themes={colorThemes}
                            currentTheme={currentTheme}
                            onThemeChange={handleThemeChange}
                        />
                    </div>
                    <Textarea
                        placeholder="Enter your content here..."
                        value={content}
                        onChange={handleContentChange}
                        className="w-full flex-grow mb-4 huiwen-font rounded-xl text-base md:text-lg lg:text-xl p-4 md:p-6 border-2 border-gray-300 transition-colors duration-200"
                        style={{ minHeight: '200px', whiteSpace: 'pre-wrap', borderColor: currentTheme.websiteTheme }}
                    />
                    <input
                        type="text"
                        placeholder="Author (e.g., John Doe, Book Title)"
                        value={author}
                        onChange={handleAuthorChange}
                        className="w-full mb-6 huiwen-font rounded-xl text-base md:text-lg p-3 md:p-4 border-2 border-gray-300 transition-colors duration-200 bg-background"
                        style={{ borderColor: currentTheme.websiteTheme }}
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
                            <Button
                                onClick={handlePortraitModeToggle}
                                className="huiwen-font text-white rounded-xl text-sm md:text-base py-3 px-6 transition-colors duration-200 flex items-center"
                                style={{ backgroundColor: currentTheme.websiteTheme }}
                            >
                                <Smartphone className="mr-2 h-5 w-5" />
                                <span className="mr-2">{isPortraitMode ? 'Portrait' : 'Landscape'}</span>
                                <Switch
                                    id="portrait-mode"
                                    checked={isPortraitMode}
                                    onCheckedChange={handlePortraitModeToggle}
                                    className="scale-75"
                                />
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full" ref={canvasRef}>
                    <TextPreview
                        content={content}
                        author={author}
                        fontsLoaded={fontsLoaded}
                        theme={currentTheme}
                        isPortraitMode={isPortraitMode}
                    />
                </div>
            </div>
        </div>
    );
};

export default EpicCard;