// app/good-morning-images/page.tsx
import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import EpicCard from '../../components/EpicCard';
import { ColorTheme, colorThemes } from '../../app/colorThemes';
import Footer from "../../components/Footer";

export const metadata: Metadata = {
    title: 'Create Inspiring Good Morning Images | Free Morning Card Maker',
    description: 'Design beautiful and motivational good morning images with our free online card maker. Perfect for spreading positivity, social media posts, and daily inspiration.',
    keywords: 'good morning images, morning card maker, free morning greetings, online greeting card creator, daily inspiration',
};


const morningGreetings = [
    `Good Morning!
☀️🌞🌻


Embrace the new day with a smile.
May your day be filled with 
positivity, success, and joy!


Rise and shine!


#GoodMorning #DailyInspiration`,

    `Wake up and shine! ✨
🌅


Every morning is a new opportunity
to make your dreams come true.
Start fresh, stay positive!


Good Morning!


#MorningMotivation #NewDay`,

    `Good Morning! 🌻
🌞☀️


Today is full of possibilities.
Embrace the sunshine and
let your light shine bright!


Have a wonderful day!


#GoodMorning #Sunshine`,

    `Rise and Grind! ⭐
🌅


A new day means new chances
to grow, learn, and succeed.
Make today amazing!


Good Morning!


#MorningVibes #Success`
];

const getRandomMorningGreeting = () => {
    return morningGreetings[Math.floor(Math.random() * morningGreetings.length)];
};

export default function GoodMorningPage() {
    const [currentGreeting, setCurrentGreeting] = React.useState(getRandomMorningGreeting());

    const handleNewGreeting = () => {
        setCurrentGreeting(getRandomMorningGreeting());
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-8 md:p-12 lg:p-16">
            <div className="max-w-6xl mx-auto">
                <nav className="mb-8">
                    <Link href="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                        ← Back to Home
                    </Link>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-blue-600 text-center">
                    Create Inspiring Morning Greetings
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
                    Start your day right by crafting beautiful good morning messages. Spread positivity and motivation!
                </p>

                <EpicCard defaultContent={currentGreeting} defaultAuthor="" theme={colorThemes[2]} />

                <div className="mt-8 text-center">
                    <button
                        onClick={handleNewGreeting}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
                    >
                        Generate New Greeting
                    </button>
                </div>

                <Features />
                <FAQ />
                <Footer/>
            </div>
        </div>
    );
}

const Features: React.FC = () => (
    <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">Why Use Our Good Morning Card Maker?</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
                title="Daily Inspiration"
                description="Create uplifting messages to motivate yourself and others every morning."
            />
            <FeatureCard
                title="Easy Sharing"
                description="Share your morning greetings on social media or messaging apps with a single click."
            />
            <FeatureCard
                title="Customizable Designs"
                description="Choose from various themes and layouts to match your mood and message."
            />
            <FeatureCard
                title="Quick and Free"
                description="Design beautiful morning cards in seconds, absolutely free and without any design skills."
            />
        </div>
    </section>
);

const FAQ: React.FC = () => (
    <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">Frequently Asked Questions</h2>
        <div className="space-y-6">
            <FAQItem
                question="How can I create a good morning card?"
                answer="Simply type your morning message in the text box, adjust the layout and design as desired, then download or share your creation!"
            />
            <FAQItem
                question="Can I schedule my good morning messages?"
                answer="While our tool doesn't offer scheduling, you can create and save multiple designs in advance for easy sharing each morning."
            />
            <FAQItem
                question="Is there a limit to how many cards I can create?"
                answer="Not at all! Our good morning card maker is completely free, and you can create as many cards as you like."
            />
        </div>
    </section>
);

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-blue-50 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-blue-600">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div>
        <h3 className="text-xl font-semibold mb-2 text-blue-600">{question}</h3>
        <p className="text-gray-700">{answer}</p>
    </div>
);