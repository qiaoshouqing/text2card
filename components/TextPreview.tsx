import React, { useEffect, useRef, useState } from "react";
import { ColorTheme } from "../app/colorThemes";

interface TextPreviewProps {
    content: string;
    author: string;
    fontsLoaded: boolean;
    theme: ColorTheme;
    isPortraitMode: boolean;
}

const TextPreview: React.FC<TextPreviewProps> = ({ content, author, fontsLoaded, theme, isPortraitMode }) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const [previewSize, setPreviewSize] = useState({ width: 0, height: 0 });

    const updatePreviewSize = () => {
        if (previewRef.current) {
            const width = previewRef.current.offsetWidth;
            const height = isPortraitMode ? width * 1.414 : width / 1.618;
            setPreviewSize({ width, height });
        }
    };

    useEffect(() => {
        updatePreviewSize();
        window.addEventListener('resize', updatePreviewSize);
        return () => window.removeEventListener('resize', updatePreviewSize);
    }, [isPortraitMode]);

    const getBorderRadius = () => {
        return `${previewSize.width * 0.03}px`;
    };

    const getPadding = () => {
        return `${previewSize.width * 0.08}px`;
    };

    const getContentFontSize = () => {
        const baseFontSize = Math.min(previewSize.width, previewSize.height) * 0.045;
        return isPortraitMode ? baseFontSize * 0.95 : baseFontSize;
    };

    const getAuthorFontSize = () => {
        const baseFontSize = Math.min(previewSize.width, previewSize.height) * 0.028;
        return isPortraitMode ? baseFontSize * 0.95 : baseFontSize;
    };

    return (
        <div
            className="w-full box-border text-preview-outer"
            style={{
                backgroundColor: theme.borderBackground,
                padding: `${previewSize.width * 0.03}px`,
                borderRadius: `${previewSize.width * 0.025}px`,
            }}
        >
            <div
                ref={previewRef}
                className="text-preview w-full relative overflow-hidden"
                style={{
                    backgroundColor: theme.cardBackground,
                    borderRadius: getBorderRadius(),
                    padding: getPadding(),
                    height: `${previewSize.height}px`,
                }}
            >
                <div className="h-full flex flex-col">
                    {/* 内容区域 */}
                    <div 
                        className="flex-1"
                        style={{
                            paddingTop: `${previewSize.height * 0.1}px`,
                            paddingBottom: `${previewSize.height * 0.1}px`,
                        }}
                    >
                        <div
                            style={{
                                color: theme.textColor,
                                fontFamily: fontsLoaded ? 'Huiwen_mingchao, serif' : 'serif',
                                fontSize: `${getContentFontSize()}px`,
                                lineHeight: 1.75,
                                letterSpacing: '0.02em',
                            }}
                        >
                            {content.split('\n\n').filter(p => p.trim()).map((paragraph, index) => (
                                <p 
                                    key={index} 
                                    className="mb-8 last:mb-0 text-left"
                                >
                                    {paragraph.trim()}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* 作者信息 */}
                    {author && (
                        <div className="mt-auto flex justify-end">
                            <div 
                                style={{
                                    color: theme.textColor,
                                    fontFamily: fontsLoaded ? 'Huiwen_mingchao, serif' : 'serif',
                                    fontSize: `${getAuthorFontSize()}px`,
                                    opacity: 0.75,
                                    letterSpacing: '0.05em',
                                }}
                            >
                                — {author}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TextPreview;