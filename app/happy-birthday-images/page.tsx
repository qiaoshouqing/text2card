// app/happy-birthday-images/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import EpicCard from '../../components/EpicCard';
import Footer from "../../components/Footer";
import { ColorTheme, colorThemes } from '../../app/colorThemes';
export const metadata: Metadata = {
    title: 'Create Stunning Happy Birthday Images | Free Birthday Card Maker',
    description: 'Design beautiful and personalized happy birthday images with our free online card maker. Perfect for social media, e-cards, and heartfelt birthday wishes.',
    keywords: 'happy birthday images, birthday card maker, free birthday cards, online birthday card creator, personalized birthday wishes',
};

const birthdayTheme: ColorTheme = {
    name: "Birthday Celebration",
    websiteTheme: "#FF69B4",
    textColor: "#FF1493",
    cardBackground: "#FFF0F5",
    borderBackground: "#FFB6C1",
    titleColor: "#FF1493",
};

const defaultBirthdayText = `Happy Birthday!
🎉🎂🎈


Wishing you a day filled with 
joy, laughter, and wonderful surprises.


May all your dreams come true!


#CelebrateLife #HappyBirthday`;

export default function HappyBirthdayPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 p-8 md:p-12 lg:p-16">
            <div className="max-w-6xl mx-auto">
                <nav className="mb-8">
                    <Link href="/" className="text-pink-600 hover:text-pink-800 transition-colors">
                        ← Back to Home
                    </Link>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-pink-600 text-center">
                    Create Magical Birthday Cards
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
                    Craft unforgettable birthday wishes with our easy-to-use card maker. Spread joy and celebrate life!
                </p>

                <EpicCard defaultText={defaultBirthdayText} theme={colorThemes[9]} />

                <Features />
                <FAQ />
                <Footer/>
            </div>
        </div>
    );
}

const Features: React.FC = () => (
    <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-600">Why Choose Our Birthday Card Maker?</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
                title="Personalized Creations"
                description="Customize every aspect of your birthday card to make it truly special and unique."
            />
            <FeatureCard
                title="Instant Sharing"
                description="Share your beautiful birthday wishes directly on social media or via email with just a click."
            />
            <FeatureCard
                title="Endless Inspiration"
                description="Choose from a variety of themes and layouts to spark your creativity and craft the perfect message."
            />
            <FeatureCard
                title="Free and Easy"
                description="Create stunning birthday cards without any cost or design experience required."
            />
        </div>
    </section>
);

const FAQ: React.FC = () => (
    <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-pink-600">Frequently Asked Questions</h2>
        <div className="space-y-6">
            <FAQItem
                question="How do I create a birthday card?"
                answer="Simply enter your birthday message in the text box, customize the layout and design, then download or share your creation!"
            />
            <FAQItem
                question="Can I use my own images in the birthday cards?"
                answer="Currently, our tool focuses on text-based designs. However, you can download your card and add images using other editing tools."
            />
            <FAQItem
                question="Is it really free to use?"
                answer="Yes! Our birthday card maker is completely free to use. Create as many cards as you like at no cost."
            />
        </div>
    </section>
);

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-pink-50 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-pink-600">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div>
        <h3 className="text-xl font-semibold mb-2 text-pink-600">{question}</h3>
        <p className="text-gray-700">{answer}</p>
    </div>
);