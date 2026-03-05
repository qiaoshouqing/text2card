'use client';

import React from 'react';
import Link from 'next/link';
import EpicCard from '../../components/EpicCard';
import { colorThemes } from '../colorThemes';
import Footer from '../../components/Footer';

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


#MorningVibes #Success`,
];

const getRandomMorningGreeting = () =>
  morningGreetings[Math.floor(Math.random() * morningGreetings.length)];

const Features: React.FC = () => (
  <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
    <h2 className="text-3xl font-bold mb-8 text-blue-500 text-center">Why Use Our Morning Greeting Maker?</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Easy to Use</h3>
        <p className="text-gray-600">Generate beautiful greetings in seconds with our intuitive interface.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Customizable Themes</h3>
        <p className="text-gray-600">Choose from various color themes and styles to match your mood.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Shareable Content</h3>
        <p className="text-gray-600">Perfect for social media posts and sending to friends and family.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Free Forever</h3>
        <p className="text-gray-600">Create unlimited morning greetings without any cost.</p>
      </div>
    </div>
  </section>
);

const FAQ: React.FC = () => (
  <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
    <h2 className="text-3xl font-bold mb-8 text-blue-500 text-center">Frequently Asked Questions</h2>
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Is this morning greeting maker free?</h3>
        <p className="text-gray-600">Yes, our tool is completely free to use with unlimited greeting generation.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Can I customize the greeting text?</h3>
        <p className="text-gray-600">Absolutely! You can edit the generated text, choose themes, and personalize your cards.</p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Can I use these greetings for social media?</h3>
        <p className="text-gray-600">Yes, the generated cards are perfect for Instagram, Facebook, WhatsApp, and more.</p>
      </div>
    </div>
  </section>
);

export default function GoodMorningClient() {
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
        <Footer />
      </div>
    </div>
  );
}
