import { Opportunity } from './types';

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: '1',
    title: 'AI-Powered Resume Builder',
    category: 'Productivity',
    country: 'United States',
    description: 'Create an automated resume builder that uses AI to optimize content for ATS systems and generate tailored resumes for specific job postings.',
    difficulty: 'Low',
    cost: 'Very Low',
    skillLevel: 'Low',
    sources: ['openai.com', 'anthropic.com']
  },
  {
    id: '2',
    title: 'Smart Email Newsletter Curator',
    category: 'Content',
    country: 'UK',
    description: 'Build a service that uses AI to curate personalized newsletters from various sources based on user interests and reading patterns.',
    difficulty: 'Medium',
    cost: 'Low',
    skillLevel: 'Medium',
    sources: ['openai.com', 'news.ycombinator.com']
  },
  {
    id: '3',
    title: 'AI Meeting Transcription Service',
    category: 'Productivity',
    country: 'Bangladesh',
    description: 'Develop a specialized transcription service for local dialects and business contexts, offering real-time summaries and action items.',
    difficulty: 'Medium',
    cost: 'Low',
    skillLevel: 'Medium',
    sources: ['google.com', 'assemblyai.com']
  },
  {
    id: '4',
    title: 'Automated Social Media Content Generator',
    category: 'Marketing',
    country: 'Dubai',
    description: 'Generate platform-specific social media posts, captions, and hashtag strategies using computer vision and text generation.',
    difficulty: 'High',
    cost: 'Medium',
    skillLevel: 'High',
    sources: ['meta.com', 'twitter.com']
  }
];

export const CATEGORIES = ['All Categories', 'Productivity', 'Content', 'Marketing', 'Healthcare', 'Finance', 'Education'];
export const COUNTRIES = ['All Countries', 'United States', 'UK', 'Bangladesh', 'Dubai', 'India', 'Canada', 'Germany'];
export const DIFFICULTIES = ['Any', 'Low', 'Medium', 'High'];
export const COSTS = ['Any', 'Very Low', 'Low', 'Medium', 'High'];
export const SKILL_LEVELS = ['Any', 'Low', 'Medium', 'High'];
