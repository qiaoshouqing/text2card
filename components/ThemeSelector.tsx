import React from 'react';
import { ColorTheme } from '../app/colorThemes';
import { Check } from 'lucide-react';

interface ThemeSelectorProps {
    themes: ColorTheme[];
    currentTheme: ColorTheme;
    onThemeChange: (theme: ColorTheme) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, currentTheme, onThemeChange }) => {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {themes.map((theme) => (
                <button
                    key={theme.name}
                    className={`w-8 h-8 rounded-full relative transition-all duration-200 ${
                        theme.name === currentTheme.name ? 'ring-2 ring-offset-2' : ''
                    }`}
                    style={{
                        backgroundColor: theme.websiteTheme,
                        '--ring-color': theme.borderBackground,
                    } as React.CSSProperties}
                    onClick={() => onThemeChange(theme)}
                    title={theme.name}
                >
                    {theme.name === currentTheme.name && (
                        <Check className="absolute inset-0 m-auto text-white" size={16} />
                    )}
                </button>
            ))}
        </div>
    );
};

export default ThemeSelector;