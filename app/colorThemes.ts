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
        name: "Tropical Paradise",
        websiteTheme: "#00CED1",
        textColor: "#20B2AA",
        cardBackground: "#E0FFFF",
        borderBackground: "#40E0D0",
        titleColor: "#48D1CC"
    },
    {
        name: "Birthday Celebration",
        websiteTheme: "#FF69B4",
        textColor: "#FF1493",
        cardBackground: "#FFF0F5",
        borderBackground: "#FFB6C1",
        titleColor: "#FF1493"
    }
];

// 默认主题索引
const defaultThemeIndex = 0; // 设置 "Default Blue" 为默认主题

// @ts-ignore
export { ColorTheme, colorThemes, defaultThemeIndex };