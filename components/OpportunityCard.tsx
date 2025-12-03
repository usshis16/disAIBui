import React from 'react';
import { MapPin, ArrowRight, ExternalLink } from 'lucide-react';
import { Opportunity } from '../types';

interface OpportunityCardProps {
  data: Opportunity;
  onViewPlan: (opportunity: Opportunity) => void;
}

const MetricBadge: React.FC<{ label: string; value: string; colorClass: string }> = ({ label, value, colorClass }) => (
  <div className={`flex flex-col bg-${colorClass}-50 p-3 rounded-lg flex-1 min-w-[80px]`}>
    <div className={`flex items-center text-${colorClass}-600 mb-1`}>
      <span className="text-xs font-semibold mr-1">
        {label === 'Difficulty' && '⚡'}
        {label === 'Cost' && '$'}
        {label === 'Skill Level' && '🎓'}
      </span>
      <span className="text-xs font-semibold">{label}</span>
    </div>
    <span className={`text-sm font-bold text-${colorClass}-700`}>{value}</span>
  </div>
);

// Helper to determine color based on value
const getColor = (value: string): string => {
    const v = value.toLowerCase();
    if (v.includes('low')) return 'green';
    if (v.includes('medium')) return 'yellow';
    if (v.includes('high')) return 'red';
    return 'gray';
};

// Helper to format source URLs nicely
const getSourceLabel = (url: string) => {
    try {
        if (url.startsWith('http')) {
            return new URL(url).hostname.replace('www.', '');
        }
        return url;
    } catch (e) {
        return url;
    }
};

const getSourceUrl = (source: string) => {
    if (source.startsWith('http://') || source.startsWith('https://')) {
        return source;
    }
    return `https://${source}`;
};

export const OpportunityCard: React.FC<OpportunityCardProps> = ({ data, onViewPlan }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-bold text-gray-900 leading-tight pr-4">{data.title}</h3>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 whitespace-nowrap border border-primary-100">
          {data.category}
        </span>
      </div>
      
      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin className="w-4 h-4 mr-1.5" />
        {data.country}
      </div>
      
      <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
        {data.description}
      </p>
      
      <div className="flex space-x-3 mb-6">
        <MetricBadge label="Difficulty" value={data.difficulty} colorClass={getColor(data.difficulty)} />
        <MetricBadge label="Cost" value={data.cost} colorClass={getColor(data.cost)} />
        <MetricBadge label="Skill Level" value={data.skillLevel} colorClass={getColor(data.skillLevel)} />
      </div>
      
      <div className="space-y-4 mt-auto">
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
            <span>Sources:</span>
            {data.sources.slice(0, 3).map((source, i) => (
                <a 
                    key={i} 
                    href={getSourceUrl(source)} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-primary-600 hover:underline flex items-center bg-primary-50 px-2 py-1 rounded"
                >
                   {getSourceLabel(source)} <ExternalLink className="w-3 h-3 ml-1" />
                </a>
            ))}
        </div>

        <button 
            onClick={() => onViewPlan(data)}
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2.5 px-4 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center shadow-sm group"
        >
          View Action Plan
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};