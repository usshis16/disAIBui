import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { OpportunityCard } from './components/OpportunityCard';
import { ActionPlanModal } from './components/ActionPlanModal';
import { INITIAL_OPPORTUNITIES } from './constants';
import { Opportunity, FilterState } from './types';
import { generateNewOpportunities } from './services/gemini';

const App: React.FC = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All Categories',
    country: 'All Countries',
    maxDifficulty: 'Any',
    maxCost: 'Any',
    maxSkillLevel: 'Any',
  });
  
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Local filtering for the existing list
  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(op => {
      if (filters.category !== 'All Categories' && op.category !== filters.category) return false;
      if (filters.country !== 'All Countries' && op.country !== filters.country) return false;
      if (filters.maxDifficulty !== 'Any' && op.difficulty !== filters.maxDifficulty) return false; // Simple exact match for demo
      if (filters.maxCost !== 'Any' && op.cost !== filters.maxCost) return false;
      if (filters.maxSkillLevel !== 'Any' && op.skillLevel !== filters.maxSkillLevel) return false;
      return true;
    });
  }, [opportunities, filters]);

  const handleGenerateNew = async () => {
    setIsGenerating(true);
    try {
        const newOps = await generateNewOpportunities(filters);
        // Prepend new opportunities
        setOpportunities(prev => [...newOps, ...prev]);
    } catch (e) {
        alert("Could not generate new opportunities. Check API Key configuration.");
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-12">
        <Hero />
        
        <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            onGenerate={handleGenerateNew}
            isGenerating={isGenerating}
        />

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredOpportunities.length} {filteredOpportunities.length === 1 ? 'Opportunity' : 'Opportunities'} Found
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard 
              key={opportunity.id} 
              data={opportunity} 
              onViewPlan={setSelectedOpportunity} 
            />
          ))}
        </div>

        {filteredOpportunities.length === 0 && (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No opportunities match these filters.</p>
                <button 
                    onClick={handleGenerateNew}
                    className="mt-4 text-primary-600 font-semibold hover:underline"
                >
                    Ask AI to invent one?
                </button>
            </div>
        )}
      </main>

      {selectedOpportunity && (
        <ActionPlanModal 
          opportunity={selectedOpportunity} 
          onClose={() => setSelectedOpportunity(null)} 
        />
      )}
    </div>
  );
};

export default App;
