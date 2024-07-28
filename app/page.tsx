import React from 'react';
import EpicCard from './EpicCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EpicCard Generator - Create Beautiful Text Cards',
    description: 'Generate stunning text cards with EpicCard. Perfect for quotes, thoughts, and memorable snippets. Easy to use, beautiful results.',
    keywords: 'EpicCard, text card generator, quote maker, social media image',
};

const Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EFEEE5] to-[#D7D6CF] p-6 md:p-10 lg:p-16 flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#166434] text-center">EpicCard Generator</h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 italic text-center">"Simplicity is the ultimate sophistication"</p>
                <EpicCard />
            </div>
            <footer className="mt-12 text-center">
                <p className="text-sm md:text-base text-gray-500">© 2024 EpicCard Generator. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Page;