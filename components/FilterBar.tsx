import React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { FilterState } from '../types';
import { CATEGORIES, COUNTRIES, DIFFICULTIES, COSTS, SKILL_LEVELS } from '../constants';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Select: React.FC<{
  label: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}> = ({ label, value, options, onChange }) => (
  <div className="flex flex-col space-y-1.5 w-full">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 px-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm font-medium shadow-sm cursor-pointer hover:border-gray-300 transition-colors"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
  </div>
);

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, onGenerate, isGenerating }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex items-center mb-6">
        <SlidersHorizontal className="w-5 h-5 text-primary-600 mr-2" />
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Select 
          label="Category" 
          value={filters.category} 
          options={CATEGORIES} 
          onChange={(e) => onFilterChange('category', e.target.value)} 
        />
        <Select 
          label="Country" 
          value={filters.country} 
          options={COUNTRIES} 
          onChange={(e) => onFilterChange('country', e.target.value)} 
        />
        <Select 
          label="Max Difficulty" 
          value={filters.maxDifficulty} 
          options={DIFFICULTIES} 
          onChange={(e) => onFilterChange('maxDifficulty', e.target.value)} 
        />
        <Select 
          label="Max Cost" 
          value={filters.maxCost} 
          options={COSTS} 
          onChange={(e) => onFilterChange('maxCost', e.target.value)} 
        />
        <Select 
          label="Max Skill Level" 
          value={filters.maxSkillLevel} 
          options={SKILL_LEVELS} 
          onChange={(e) => onFilterChange('maxSkillLevel', e.target.value)} 
        />
      </div>

      <div className="mt-6 flex justify-end">
        <button 
            onClick={onGenerate}
            disabled={isGenerating}
            className={`
                px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition-all flex items-center
                ${isGenerating ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-primary-50 text-primary-700 hover:bg-primary-100 border border-primary-200'}
            `}
        >
            {isGenerating ? (
                <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                </>
            ) : (
                <>
                  <span className="mr-2">✨</span>
                  Generate New Ideas with AI
                </>
            )}
        </button>
      </div>
    </div>
  );
};
