import React from 'react';
import EpicCard from './EpicCard';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'SlothCard Generator - Create Beautiful Text Cards',
    description: 'Generate stunning text cards with SlothCard. Perfect for quotes, thoughts, and memorable snippets. Easy to use, beautiful results.',
    keywords: 'SlothCard, text card generator, quote maker, social media image',
};

const Page: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#EFEEE5] to-[#D7D6CF] p-6 md:p-10 lg:p-16 flex flex-col items-center justify-center">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#013365] text-center">SlothCard Generator</h1>
                <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 italic text-center">"Slow down and savor your thoughts"</p>
                <EpicCard />
            </div>
            <footer className="mt-12 text-center">
                <p className="text-sm md:text-base text-gray-500">© 2024 SlothCard Generator. All rights reserved.</p>
                <div className="mt-4 flex justify-center space-x-6">
                    <a href="https://x.com/benshandebiao" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        <span className="sr-only">Twitter</span>
                    </a>
                    <a href="https://github.com/qiaoshouqing/text2card" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                        <span className="sr-only">GitHub</span>
                    </a>
                    <a href="https://pomodiary.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="sr-only">Official Website</span>
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Page;