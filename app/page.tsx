// pages/index.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Features from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

// 动态导入 EpicCard 组件，禁用 SSR
const EpicCard = dynamic(() => import('../components/EpicCard'), { ssr: false });

export const metadata: Metadata = {
    title: 'Text2Card - Best Online Card Maker | Create Beautiful Text Cards Easily',
    description: 'Text2Card is the ultimate online card maker. Create stunning text cards, quote cards, and more with our easy-to-use card maker. Perfect for social media, presentations, and personal use. Try our free card maker today!',
    keywords: 'card maker, text card maker, quote card maker, online card creator, easy card designer, Text2Card',
};

const Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F2EDE4] to-[#D6CCC2] p-6 md:p-10 lg:p-16 flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#49392C]">Text2Card: Your Ultimate Card Maker</h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-[#5E503F] mb-4 italic">"The easiest card maker for your thoughts and quotes"</p>
                    <p className="text-[#2C2823]">Create stunning cards effortlessly with our intuitive card maker. Perfect for social media, presentations, and personal use.</p>
                </header>
                <main className="space-y-24">
                    <section className="text-center mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#49392C]">Create Your Card Now</h2>
                        <EpicCard />
                    </section>

                    <section className="text-center">
                        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#49392C]">Specialized Card Makers</h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <SpecializedCardLink
                                href="/happy-birthday-images"
                                title="Birthday Card Maker"
                                description="Create stunning birthday cards and wishes"
                                bgColor="bg-pink-100"
                                textColor="text-pink-600"
                            />
                            <SpecializedCardLink
                                href="/good-morning-images"
                                title="Good Morning Card Maker"
                                description="Design beautiful morning greeting cards"
                                bgColor="bg-blue-100"
                                textColor="text-blue-600"
                            />
                        </div>
                    </section>

                    <Features />
                    <FAQ />
                </main>
            </div>
            <Footer />
        </div>
    );
};

const SpecializedCardLink: React.FC<{ href: string; title: string; description: string; bgColor: string; textColor: string }> =
    ({ href, title, description, bgColor, textColor }) => (
        <Link href={href} className={`block p-6 rounded-lg shadow-md ${bgColor} hover:shadow-lg transition-shadow`}>
            <h3 className={`text-xl font-semibold mb-2 ${textColor}`}>{title}</h3>
            <p className="text-gray-700">{description}</p>
        </Link>
    );

export default Page;