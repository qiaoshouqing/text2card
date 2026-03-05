import { Metadata } from 'next';
import GoodMorningClient from './GoodMorningClient';

export const metadata: Metadata = {
  title: 'Create Inspiring Good Morning Images | Free Morning Card Maker',
  description:
    'Design beautiful and motivational good morning images with our free online card maker. Perfect for spreading positivity, social media posts, and daily inspiration.',
  keywords:
    'good morning images, morning card maker, free morning greetings, online greeting card creator, daily inspiration',
};

export default function GoodMorningPage() {
  return <GoodMorningClient />;
}
