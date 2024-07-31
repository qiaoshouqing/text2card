// 定义颜色主题的接口
interface ColorTheme {
    name: string;
    websiteTheme: string;
    textColor: string;
    cardBackground: string;
    borderBackground: string;
    titleColor: string; // 新添加的网站标题颜色
}

// 定义颜色主题
const colorThemes: ColorTheme[] = [
    {
        name: "Default Blue",
        websiteTheme: "#013365",
        textColor: "#013365",
        cardBackground: "#f3f4f6",
        borderBackground: "#fff",
        titleColor: "#001F3F" // 深蓝色，与默认主题协调
    },
    {
        name: "Green",
        websiteTheme: "#166434",
        textColor: "#166434",
        cardBackground: "#f3f4f6",
        borderBackground: "#fff",
        titleColor: "#0B4619" // 深绿色，与绿色主题协调
    },
    {
        name: "Refined Elegance",
        websiteTheme: "#D4B996", // 柔和金
        textColor: "#4A4238", // 深褐灰
        cardBackground: "#F5E6D3", // 奶油色
        borderBackground: "#A1785C", // 暖棕色
        titleColor: "#8D6E63" // 深棕色，与精致优雅主题协调
    }
];

// 默认主题索引
const defaultThemeIndex = 2;

// @ts-ignore
export { ColorTheme, colorThemes, defaultThemeIndex };