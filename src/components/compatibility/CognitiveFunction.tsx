import React from 'react';
import { CognitivePair } from '../../types';

interface CognitiveFunctionProps {
  pairKey: string;
  data: CognitivePair;
  language: string;
}

const CognitiveFunction: React.FC<CognitiveFunctionProps> = ({ pairKey, data, language }) => {
  // Get color based on compatibility score
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const scoreColor = getScoreColor(data.score);
  const functions = pairKey.split('_');
  const functionsLabel = functions.join(' & ');
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-gray-900">{functionsLabel}</h4>
        <span className={`text-white text-sm font-medium px-2 py-1 rounded-full ${scoreColor}`}>
          {data.score}%
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
        <div className="bg-white p-2 rounded border border-gray-100 text-sm">
          {data.type1Function}
        </div>
        <div className="bg-white p-2 rounded border border-gray-100 text-sm">
          {data.type2Function}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm">
        {data.description[language as keyof typeof data.description]}
      </p>
    </div>
  );
};

export default CognitiveFunction;