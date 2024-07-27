import Script from "next/script";

export default function GoogleAnalytics() {

    const GA_ID = process.env.GOOGLE_ANALYTICS_ID;

    return <>
        <Script id="gtag-1" src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}></Script>
        <Script
            id="gtag-2"
            dangerouslySetInnerHTML={{
                __html: `window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GA_ID}');`,
            }}
        />
    </>
}