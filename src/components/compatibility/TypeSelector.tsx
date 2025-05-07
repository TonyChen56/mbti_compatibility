import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useCompatibility } from '../../context/CompatibilityContext';
import { mbtiTypes } from '../../data/mbtiTypes';
import { ArrowLeftRight } from 'lucide-react';

const TypeSelector: React.FC = () => {
  const { t } = useLanguage();
  const { type1, type2, setType1, setType2, calculateCompatibility, swapTypes } = useCompatibility();

  const handleTypeChange = (setter: (type: string) => void) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setter(e.target.value);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    calculateCompatibility();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">{t('select', 'common')}</h2>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
          <div className="md:col-span-2">
            <label htmlFor="type1" className="block text-sm font-medium text-gray-700 mb-1">
              {t('type1', 'common')}
            </label>
            <select
              id="type1"
              value={type1}
              onChange={handleTypeChange(setType1)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select type</option>
              {mbtiTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} - {type.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-center">
            <button
              type="button"
              onClick={swapTypes}
              className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
              aria-label="Swap types"
            >
              <ArrowLeftRight className="h-5 w-5 text-indigo-600" />
            </button>
          </div>
          
          <div className="md:col-span-2">
            <label htmlFor="type2" className="block text-sm font-medium text-gray-700 mb-1">
              {t('type2', 'common')}
            </label>
            <select
              id="type2"
              value={type2}
              onChange={handleTypeChange(setType2)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="">Select type</option>
              {mbtiTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name} - {type.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            {t('calculate', 'common')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TypeSelector;