// components/FAQ.tsx
import React from 'react';

const FAQ: React.FC = () => (
    <section className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-[#013365] text-center">Frequently Asked Questions About Our Card Maker</h2>
        <div className="space-y-10">
            <FAQItem
                question="What's the idea behind Text2Card's random design approach?"
                answer="Text2Card's card maker is built on the philosophy of embracing randomness in creativity. We believe that unexpected combinations and layouts can spark inspiration and lead to unique, eye-catching designs. Our algorithm generates random layouts that challenge traditional design norms, encouraging users to think outside the box."
            />
            <FAQItem
                question="How does the Text2Card card maker generate random layouts?"
                answer="Our card maker uses a combination of AI algorithms and design principles to create random layouts. It considers factors like text length, paragraph breaks, and overall balance to generate visually appealing designs. The magic happens when you add two empty lines between paragraphs in your input text – this triggers our system to create new, unexpected layout variations."
            />
            <FAQItem
                question="Can I have some control over the randomness in my card designs?"
                answer="Absolutely! While our card maker thrives on randomness, you can influence the outcome. By adjusting your text input, adding or removing double line breaks, you can guide the direction of the design. It's a perfect balance of unexpected creativity and user control."
            />
            <FAQItem
                question="What makes Text2Card the best card maker for beginners?"
                answer="Text2Card's card maker is designed with simplicity in mind. Our random design approach takes the pressure off users to make complex design decisions. This makes it perfect for beginners who want professional-looking results without needing any design experience. Just input your text, and let our card maker do the creative heavy lifting!"
            />
            <FAQItem
                question="Can I create cards with consistent paragraph sizes using your card maker?"
                answer="Yes, our card maker allows you to maintain consistent paragraph sizes if desired. While we encourage embracing the randomness, we understand some projects need uniformity. To keep paragraphs the same size, simply use single line breaks between paragraphs when creating your card. For new layout variations, use double line breaks. This gives you the flexibility to balance between random creativity and structured design."
            />
            <FAQItem
                question="How often does Text2Card update its design algorithms?"
                answer="We're constantly working on improving and expanding our design algorithms. We regularly update our system to introduce new design elements, layout options, and creative possibilities. This means that even if you're a frequent user, you'll always find fresh and exciting design options for your cards."
            />
        </div>
    </section>
);

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div>
        <h3 className="text-xl font-semibold mb-4 text-[#013365]">{question}</h3>
        <p className="text-gray-700">{answer}</p>
    </div>
);

export default FAQ;