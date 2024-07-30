// components/Features.tsx
import React from 'react';

const Features: React.FC = () => (
    <section className="w-full max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-12 text-[#013365] text-center">Why Choose SlothCard Card Maker?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <FeatureCard
                title="Embrace Random Creativity"
                description="Our card maker thrives on randomness, generating unique and inspiring layouts that spark creativity with every design."
            />
            <FeatureCard
                title="AI-Powered Card Designs"
                description="Our smart card maker uses advanced algorithms to create visually appealing layouts automatically."
            />
            <FeatureCard
                title="User-Friendly Interface"
                description="Create beautiful cards in seconds with our intuitive card making interface, designed for both beginners and pros."
            />
            <FeatureCard
                title="Perfect for Social Media"
                description="Create eye-catching quote cards for your social posts with our specialized card maker, optimized for various platforms."
            />
            <FeatureCard
                title="No Design Skills Needed"
                description="Our card maker handles the design complexity, so you can focus on your message and content."
            />
            <FeatureCard
                title="Endless Possibilities"
                description="With our random design approach, every card is a unique creation, offering endless possibilities for your ideas."
            />
        </div>
    </section>
);

const FeatureCard: React.FC<{ title: string; description: string }> = ({ title, description }) => (
    <div className="bg-white p-8 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-[#013365]">{title}</h3>
        <p className="text-gray-700">{description}</p>
    </div>
);

export default Features;