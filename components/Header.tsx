// components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-[#013365]">SlothCard: Your Ultimate Card Maker</h1>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 italic">"The easiest card maker for your thoughts and quotes"</p>
            <p className="text-gray-700">Create stunning cards effortlessly with our intuitive card maker. Perfect for social media, presentations, and personal use.</p>
        </header>
    );
};

export default Header;