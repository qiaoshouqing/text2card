// app/inspirational-quotes/page.tsx
'use client'

import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import EpicCard from '../../components/EpicCard';
import { ColorTheme } from '../../app/colorThemes';
import Footer from "../../components/Footer";

const inspirationalTheme: ColorTheme = {
    name: "Inspiring Wisdom",
    websiteTheme: "#4B0082",
    textColor: "#8A2BE2",
    cardBackground: "#E6E6FA",
    borderBackground: "#9370DB",
    titleColor: "#4B0082",
};

const inspirationalQuotes = [
    `Believe you can  
and you're halfway there.

- Theodore Roosevelt`,

    `The only way to do great work  
is to love what you do.

- Steve Jobs`,

    `Success is not final,  
failure is not fatal:  
it is the courage to continue  
that counts.

- Winston Churchill`,

    `The future belongs to those  
who believe in the beauty  
of their dreams.

- Eleanor Roosevelt`,

    `Strive not to be a success,  
but rather to be of value.

- Albert Einstein`,

    `The only limit to our realization  
of tomorrow will be our  
doubts of today.

- Franklin D. Roosevelt`,

    `Do what you can,  
with what you have,  
where you are.

- Theodore Roosevelt`,

    `The best way to  
predict the future  
is to create it.

- Peter Drucker`,

    `Your time is limited,  
don't waste it living  
someone else's life.

- Steve Jobs`,

    `The harder you work  
for something,  
the greater you'll feel  
when you achieve it.

- Unknown`,

    `Be the change  
you wish to see  
in the world.

- Mahatma Gandhi`,

    `Every moment is  
a fresh beginning.

- T.S. Eliot`,

    `Never give up on a dream  
just because of the time  
it will take to accomplish it.  
The time will pass anyway.

- Earl Nightingale`,

    `The only person you are destined  
to become is the person you  
decide to be.

- Ralph Waldo Emerson`,

    `Go confidently in the direction  
of your dreams. Live the life  
you have imagined.

- Henry David Thoreau`,

    `Whatever you are,  
be a good one.

- Abraham Lincoln`,

    `You miss 100% of the shots  
you don't take.

- Wayne Gretzky`,

    `The only impossible journey  
is the one you never begin.

- Tony Robbins`,

    `Believe in yourself,  
take on your challenges,  
dig deep within yourself  
to conquer fears.

- Chantal Sutherland`,

    `Life is 10% what happens to you  
and 90% how you react to it.

- Charles R. Swindoll`,

    `The way to get started  
is to quit talking  
and begin doing.

- Walt Disney`,

    `Don't watch the clock;  
do what it does.  
Keep going.

- Sam Levenson`,

    `Twenty years from now you will be  
more disappointed by the things  
that you didn't do than by the  
ones you did do.

- Mark Twain`,

    `The mind is everything.  
What you think  
you become.

- Buddha`,

    `Strive not to be a success,  
but rather to be of value.

- Albert Einstein`,

    `I have not failed.  
I've just found 10,000 ways  
that won't work.

- Thomas A. Edison`,

    `The best revenge  
is massive success.

- Frank Sinatra`,

    `Opportunities don't happen.  
You create them.

- Chris Grosser`,

    `Either you run the day,  
or the day runs you.

- Jim Rohn`,

    `The only way to do great work  
is to love what you do.  
If you haven't found it yet,  
keep looking. Don't settle.

- Steve Jobs`,

    `Success is not how high you have climbed,  
but how you make a positive difference  
to the world.

- Roy T. Bennett`,

    `The future depends on what you do today.  

- Mahatma Gandhi`,

    `It's not whether you get knocked down,  
it's whether you get up.

- Vince Lombardi`,

    `Happiness is not something ready-made.  
It comes from your own actions.

- Dalai Lama`,

    `The greatest glory in living  
lies not in never falling,  
but in rising every time we fall.

- Nelson Mandela`,

    `You are never too old to set another goal  
or to dream a new dream.

- C.S. Lewis`,

    `The secret of getting ahead  
is getting started.

- Mark Twain`,

    `If you want to lift yourself up,  
lift up someone else.

- Booker T. Washington`,

    `Don't be pushed around by the fears  
in your mind. Be led by the dreams  
in your heart.

- Roy T. Bennett`,

    `It is during our darkest moments  
that we must focus to see the light.

- Aristotle`,

    `Believe in yourself. You are braver than you think,  
more talented than you know, and capable of more  
than you imagine.

- Roy T. Bennett`,

    `Challenges are what make life interesting  
and overcoming them is what makes life meaningful.

- Joshua J. Marine`,

    `Success usually comes to those  
who are too busy to be looking for it.

- Henry David Thoreau`,

    `If you are working on something that you really care about,  
you don't have to be pushed. The vision pulls you.

- Steve Jobs`,

    `Aim for the moon. If you miss,  
you may hit a star.

- W. Clement Stone`,

    `Don't let yesterday take up too much of today.  

- Will Rogers`,

    `You don't have to be great to start,  
but you have to start to be great.

- Zig Ziglar`,

    `The pessimist sees difficulty in every opportunity.  
The optimist sees opportunity in every difficulty.

- Winston Churchill`,

    `It does not matter how slowly you go,  
as long as you do not stop.

- Confucius`,

    `Always do your best.  
What you plant now,  
you will harvest later.

- Og Mandino`,
        `The only way to do great work  
is to love what you do.

- Steve Jobs`,

    `Your time is limited,  
don't waste it living  
someone else's life.

- Steve Jobs`,

    `Success is not final, failure is not fatal:  
it is the courage to continue that counts.

- Winston Churchill`,

    `Believe you can  
and you're halfway there.

- Theodore Roosevelt`,

    `The future belongs to those  
who believe in the beauty of their dreams.

- Eleanor Roosevelt`,

    `Two roads diverged in a wood, and I—  
I took the one less traveled by,  
And that has made all the difference.

- Robert Frost`,

    `I have not failed.  
I've just found 10,000 ways that won't work.

- Thomas A. Edison`,

    `Ask not what your country can do for you—  
ask what you can do for your country.

- John F. Kennedy`,

    `I have a dream that one day this nation will rise up  
and live out the true meaning of its creed:  
"We hold these truths to be self-evident,  
that all men are created equal."

- Martin Luther King Jr.`,

    `To be yourself in a world  
that is constantly trying to make you  
something else is the greatest accomplishment.

- Ralph Waldo Emerson`,

    `There is no greater agony  
than bearing an untold story inside you.

- Maya Angelou`,

    `I think, therefore I am.  

- René Descartes`,

    `Life is what happens to you  
while you're busy making other plans.

- John Lennon`,

    `That which does not kill us makes us stronger.  

- Friedrich Nietzsche`,

    `Be who you are and say what you feel,  
because those who mind don't matter  
and those who matter don't mind.

- Bernard M. Baruch`,

    `We must not allow other people's limited perceptions  
to define us.

- Virginia Satir`,

    `Do what you can, with what you have, where you are.  

- Theodore Roosevelt`,

    `Be yourself; everyone else is already taken.  

- Oscar Wilde`,

    `This above all: to thine own self be true.  

- William Shakespeare`,

    `If you cannot do great things,  
do small things in a great way.

- Napoleon Hill`
];

const getRandomQuote = () => {
    return inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];
};

export default function InspirationalQuotesPage() {
    const [currentQuote, setCurrentQuote] = React.useState(getRandomQuote());

    const handleNewQuote = () => {
        setCurrentQuote(getRandomQuote());
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-8 md:p-12 lg:p-16">
            <div className="max-w-6xl mx-auto">
                <nav className="mb-8">
                    <Link href="/" className="text-purple-600 hover:text-purple-800 transition-colors">
                        ← Back to Home
                    </Link>
                </nav>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-purple-600 text-center">
                    Create Inspiring Quote Images
                </h1>
                <p className="text-xl md:text-2xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
                    Craft beautiful inspirational quotes to motivate yourself and others. Spread wisdom and positivity!
                </p>

                <EpicCard defaultText={currentQuote} theme={inspirationalTheme} />

                <div className="mt-8 text-center">
                    <button
                        onClick={handleNewQuote}
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition-colors"
                    >
                        Generate New Quote
                    </button>
                </div>

                <Features />
                <FAQ />
                <Footer />
            </div>
        </div>
    );
}

const Features: React.FC = () => (
    <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-600">Why Use Our Inspirational Quote Maker?</h2>
        <div className="grid md:grid-cols-2 gap-8">
            <FeatureCard
                title="Daily Inspiration"
                description="Access a curated list of motivational quotes to inspire you every day."
            />
            <FeatureCard
                title="Easy Sharing"
                description="Share your inspirational quote images on social media or messaging apps with a single click."
            />
            <FeatureCard
                title="Customizable Designs"
                description="Personalize your quote images with various themes and layouts to match your style."
            />
            <FeatureCard
                title="Quick and Free"
                description="Create beautiful quote images in seconds, absolutely free and without any design skills."
            />
        </div>
    </section>
);

const FAQ: React.FC = () => (
    <section className="mt-20 bg-white rounded-xl shadow-lg p-8 md:p-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-purple-600">Frequently Asked Questions</h2>
        <div className="space-y-6">
            <FAQItem
                question="How can I create an inspirational quote image?"
                answer="Simply click the 'Generate New Quote' button to get a random quote, or type your own in the text box. Adjust the layout and design as desired, then download or share your creation!"
            />
            <FAQItem
                question="Can I add my own quotes?"
                answer="Yes! While we provide a list of inspirational quotes, you can also type in your own custom quotes or modify existing ones."
            />
            <FAQItem
                question="Is there a limit to how many quote images I can create?"
                answer="Not at all! Our inspirational quote maker is completely free, and you can create as many quote images as you like."
            />
        </div>
    </section>
);

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-purple-50 rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-semibold mb-3 text-purple-600">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div>
        <h3 className="text-xl font-semibold mb-2 text-purple-600">{question}</h3>
        <p className="text-gray-700">{answer}</p>
    </div>
);