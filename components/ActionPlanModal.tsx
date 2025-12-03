import React, { useEffect, useState } from 'react';
import { X, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Opportunity } from '../types';
import { generateActionPlan } from '../services/gemini';

interface ActionPlanModalProps {
  opportunity: Opportunity;
  onClose: () => void;
}

export const ActionPlanModal: React.FC<ActionPlanModalProps> = ({ opportunity, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let mounted = true;
    const fetchPlan = async () => {
      try {
        const text = await generateActionPlan(opportunity);
        if (mounted) {
            setPlan(text);
            setLoading(false);
        }
      } catch (error) {
        if (mounted) {
            setPlan("Sorry, we couldn't generate the plan at this time. Please check your API key.");
            setLoading(false);
        }
      }
    };
    fetchPlan();
    return () => { mounted = false; };
  }, [opportunity]);

  const handleCopy = () => {
    navigator.clipboard.writeText(plan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Action Plan</h2>
            <p className="text-sm text-gray-500 mt-0.5 truncate max-w-md">{opportunity.title}</p>
          </div>
          <div className="flex items-center space-x-2">
             {!loading && (
                <button 
                    onClick={handleCopy}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy to clipboard"
                >
                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
             )}
            <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 md:p-8 bg-gray-50/50">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
               <div className="relative w-16 h-16">
                 <div className="absolute inset-0 rounded-full border-4 border-primary-100"></div>
                 <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
               </div>
               <p className="text-gray-500 font-medium animate-pulse">Generating strategic insights...</p>
            </div>
          ) : (
            <div className="prose prose-purple prose-sm sm:prose-base max-w-none">
              <ReactMarkdown 
                components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-800 mt-6 mb-3 flex items-center" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-semibold text-gray-800 mt-4 mb-2" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1 text-gray-700" {...props} />,
                    li: ({node, ...props}) => <li className="pl-1" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                }}
              >
                  {plan}
              </ReactMarkdown>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-end">
            <button 
                onClick={onClose}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
};
