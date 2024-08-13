// 定义颜色主题的接口
interface ColorTheme {
    name: string;
    websiteTheme: string;
    textColor: string;
    cardBackground: string;
    borderBackground: string;
    titleColor: string;
}

// 定义所有颜色主题
const colorThemes: ColorTheme[] = [
    {
        name: "Default Blue",
        websiteTheme: "#013365",
        textColor: "#013365",
        cardBackground: "#f3f4f6",
        borderBackground: "#fff",
        titleColor: "#001F3F"
    },
    {
        name: "Green",
        websiteTheme: "#166434",
        textColor: "#166434",
        cardBackground: "#f3f4f6",
        borderBackground: "#fff",
        titleColor: "#0B4619"
    },
    {
        name: "Deep Blue",
        websiteTheme: "#1E3A8A",
        textColor: "#1E3A8A",
        cardBackground: "#E0E7FF",
        borderBackground: "#3B82F6",
        titleColor: "#1E40AF"
    },
    {
        name: "Fresh Morning",
        websiteTheme: "#4682B4",
        textColor: "#1E90FF",
        cardBackground: "#F0F8FF",
        borderBackground: "#87CEEB",
        titleColor: "#1E90FF"
    },
    {
        name: "Birthday Celebration",
        websiteTheme: "#FF69B4",
        textColor: "#FF1493",
        cardBackground: "#FFF0F5",
        borderBackground: "#FFB6C1",
        titleColor: "#FF1493"
    },
    {
        name: "Sunset Glow",
        websiteTheme: "#FF7F50",
        textColor: "#FF4500",
        cardBackground: "#FFDAB9",
        borderBackground: "#FFA07A",
        titleColor: "#FF6347"
    },
    {
        name: "Lavender Dreams",
        websiteTheme: "#9370DB",
        textColor: "#8A2BE2",
        cardBackground: "#E6E6FA",
        borderBackground: "#DDA0DD",
        titleColor: "#9932CC"
    },
    {
        name: "Mint Fresh",
        websiteTheme: "#3EB489",
        textColor: "#2E8B57",
        cardBackground: "#F0FFF0",
        borderBackground: "#98FB98",
        titleColor: "#00A86B"
    },
    {
        name: "Golden Autumn",
        websiteTheme: "#DAA520",
        textColor: "#B8860B",
        cardBackground: "#FFF8DC",
        borderBackground: "#F4A460",
        titleColor: "#CD853F"
    },
    {
        name: "Ocean Breeze",
        websiteTheme: "#20B2AA",
        textColor: "#008B8B",
        cardBackground: "#E0FFFF",
        borderBackground: "#48D1CC",
        titleColor: "#00CED1"
    },
    {
        name: "Cherry Blossom",
        websiteTheme: "#FFB7C5",
        textColor: "#FF69B4",
        cardBackground: "#FFF0F5",
        borderBackground: "#FFC0CB",
        titleColor: "#FF1493"
    },
    {
        name: "Twilight Purple",
        websiteTheme: "#4B0082",
        textColor: "#8A2BE2",
        cardBackground: "#E6E6FA",
        borderBackground: "#9370DB",
        titleColor: "#9400D3"
    },
    {
        name: "Earthy Tones",
        websiteTheme: "#8B4513",
        textColor: "#A0522D",
        cardBackground: "#FFF8DC",
        borderBackground: "#DEB887",
        titleColor: "#D2691E"
    },
    {
        name: "Neon Nights",
        websiteTheme: "#FF00FF",
        textColor: "#00FF00",
        cardBackground: "#000000",
        borderBackground: "#00FFFF",
        titleColor: "#FF1493"
    },
    {
        name: "Monochrome Elegance",
        websiteTheme: "#2C3E50",
        textColor: "#34495E",
        cardBackground: "#ECF0F1",
        borderBackground: "#BDC3C7",
        titleColor: "#2C3E50"
    },
    {
        name: "Desert Oasis",
        websiteTheme: "#D2691E",
        textColor: "#8B4513",
        cardBackground: "#FAEBD7",
        borderBackground: "#DEB887",
        titleColor: "#A0522D"
    },

    {
        name: "Tropical Paradise",
        websiteTheme: "#00CED1",
        textColor: "#20B2AA",
        cardBackground: "#E0FFFF",
        borderBackground: "#40E0D0",
        titleColor: "#48D1CC"
    },
    {
        name: "Vintage Charm",
        websiteTheme: "#DEB887",
        textColor: "#D2691E",
        cardBackground: "#FFF8DC",
        borderBackground: "#F4A460",
        titleColor: "#CD853F"
    },
    {
        name: "Cosmic Galaxy",
        websiteTheme: "#483D8B",
        textColor: "#4B0082",
        cardBackground: "#E6E6FA",
        borderBackground: "#9370DB",
        titleColor: "#8A2BE2"
    },
    {
        name: "Autumn Harvest",
        websiteTheme: "#B8860B",
        textColor: "#CD853F",
        cardBackground: "#FFFACD",
        borderBackground: "#F4A460",
        titleColor: "#D2691E"
    },
    {
        name: "Pastel Dream",
        websiteTheme: "#FFB6C1",
        textColor: "#DB7093",
        cardBackground: "#FFF0F5",
        borderBackground: "#FFC0CB",
        titleColor: "#FF69B4"
    },
    {
        name: "Urban Chic",
        websiteTheme: "#696969",
        textColor: "#2F4F4F",
        cardBackground: "#F5F5F5",
        borderBackground: "#A9A9A9",
        titleColor: "#4A4A4A"
    },
    {
        name: "Zen Garden",
        websiteTheme: "#8FBC8F",
        textColor: "#3CB371",
        cardBackground: "#F0FFF0",
        borderBackground: "#98FB98",
        titleColor: "#2E8B57"
    },
    {
        name: "Royal Elegance",
        websiteTheme: "#4B0082",
        textColor: "#800080",
        cardBackground: "#E6E6FA",
        borderBackground: "#9370DB",
        titleColor: "#8A2BE2"
    },
    {
        name: "Retro Pop",
        websiteTheme: "#FF6347",
        textColor: "#FF4500",
        cardBackground: "#FFDAB9",
        borderBackground: "#FFA07A",
        titleColor: "#FF7F50"
    },
    {
        name: "Misty Morning",
        websiteTheme: "#B0C4DE",
        textColor: "#4682B4",
        cardBackground: "#F0F8FF",
        borderBackground: "#87CEFA",
        titleColor: "#6495ED"
    },
    {
        name: "Candy Crush",
        websiteTheme: "#FF69B4",
        textColor: "#FF1493",
        cardBackground: "#FFF0F5",
        borderBackground: "#FFB6C1",
        titleColor: "#FF69B4"
    },
    {
        name: "Coffee Break",
        websiteTheme: "#8B4513",
        textColor: "#A0522D",
        cardBackground: "#FFF8DC",
        borderBackground: "#DEB887",
        titleColor: "#D2691E"
    },
    {
        name: "Emerald City",
        websiteTheme: "#008B8B",
        textColor: "#006400",
        cardBackground: "#E0FFFF",
        borderBackground: "#20B2AA",
        titleColor: "#00CED1"
    },
    {
        name: "Sunset Serenity",
        websiteTheme: "#FF7F50",
        textColor: "#FF6347",
        cardBackground: "#FFDAB9",
        borderBackground: "#FFA07A",
        titleColor: "#FF4500"
    },
    {
        name: "Moonlight Shadow",
        websiteTheme: "#4B0082",
        textColor: "#483D8B",
        cardBackground: "#E6E6FA",
        borderBackground: "#9370DB",
        titleColor: "#8A2BE2"
    },
    {
        name: "Spring Blossom",
        websiteTheme: "#FF69B4",
        textColor: "#DB7093",
        cardBackground: "#FFF0F5",
        borderBackground: "#FFB6C1",
        titleColor: "#FF1493"
    },
    {
        name: "Tech Noir",
        websiteTheme: "#2F4F4F",
        textColor: "#008080",
        cardBackground: "#F5FFFA",
        borderBackground: "#20B2AA",
        titleColor: "#00CED1"
    }
];

// 默认主题索引
const defaultThemeIndex = 3; // 设置 "Deep Blue" 为默认主题

// @ts-ignore
export { ColorTheme, colorThemes, defaultThemeIndex };