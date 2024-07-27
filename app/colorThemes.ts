// 定义颜色主题的接口
interface ColorTheme {
    name: string;
    websiteTheme: string;
    textColor: string;
    cardBackground: string;
    borderBackground: string;
}

// 定义颜色主题
const colorThemes: ColorTheme[] = [
    {
        name: "Default Blue",
        websiteTheme: "#013365",
        textColor: "#013365",
        cardBackground: "#f3f4f6",
        borderBackground: "#fff"
    },
    {
        name: "Green",
        websiteTheme: "#166434",
        textColor: "#166434",
        cardBackground: "#f3f4f6",
        borderBackground: "#fff"
    }
];

// 默认主题索引
const defaultThemeIndex = 0;

// @ts-ignore
export { ColorTheme, colorThemes, defaultThemeIndex };