// 定义颜色主题的接口
interface ColorTheme {
    name: string;
    websiteTheme: string;
    textColor: string;
    cardBackground: string;
    borderBackground: string;
    titleColor: string;
}

// 定义精简后的颜色主题
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
        name: "Fresh Morning",
        websiteTheme: "#4682B4",
        textColor: "#1E90FF",
        cardBackground: "#F0F8FF",
        borderBackground: "#87CEEB",
        titleColor: "#1E90FF"
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
        name: "Tropical Paradise",
        websiteTheme: "#00CED1",
        textColor: "#20B2AA",
        cardBackground: "#E0FFFF",
        borderBackground: "#40E0D0",
        titleColor: "#48D1CC"
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
        name: "Urban Chic",
        websiteTheme: "#696969",
        textColor: "#2F4F4F",
        cardBackground: "#F5F5F5",
        borderBackground: "#A9A9A9",
        titleColor: "#4A4A4A"
    },
    {
        name: "Retro Pop",
        websiteTheme: "#FF6347",
        textColor: "#FF4500",
        cardBackground: "#FFDAB9",
        borderBackground: "#FFA07A",
        titleColor: "#FF7F50"
    },
];

// 默认主题索引
const defaultThemeIndex = 0; // 设置 "Default Blue" 为默认主题

// @ts-ignore
export { ColorTheme, colorThemes, defaultThemeIndex };