import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { CompatibilityResult } from '../types';
import { getCompatibilityData } from '../data/compatibilityData';

type CompatibilityContextType = {
  type1: string;
  type2: string;
  setType1: (type: string) => void;
  setType2: (type: string) => void;
  compatibilityResult: CompatibilityResult | null;
  calculateCompatibility: () => void;
  isCalculated: boolean;
  swapTypes: () => void;
  shareURL: string;
  loading: boolean;
  error: string | null;
};

const CompatibilityContext = createContext<CompatibilityContextType>({
  type1: '',
  type2: '',
  setType1: () => {},
  setType2: () => {},
  compatibilityResult: null,
  calculateCompatibility: () => {},
  isCalculated: false,
  swapTypes: () => {},
  shareURL: '',
  loading: false,
  error: null
});

export const CompatibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Get URL parameters if any
  const getInitialTypes = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const type1Param = urlParams.get('type1');
      const type2Param = urlParams.get('type2');
      
      return {
        type1: type1Param || 'INFP',
        type2: type2Param || 'INFJ',
      };
    }
    
    return {
      type1: 'INFP',
      type2: 'INFJ',
    };
  };

  const { type1: initialType1, type2: initialType2 } = getInitialTypes();
  
  const [type1, setType1] = useState<string>(initialType1);
  const [type2, setType2] = useState<string>(initialType2);
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityResult | null>(null);
  const [isCalculated, setIsCalculated] = useState<boolean>(false);
  const [shareURL, setShareURL] = useState<string>(window.location.href);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const calculateCompatibility = async () => {
    if (!type1 || !type2) {
      setCompatibilityResult(null);
      setIsCalculated(false);
      return;
    }

    setLoading(true);
    try {
      const result = await getCompatibilityData(type1, type2);
      
      if (result) {
        setCompatibilityResult(result);
        setIsCalculated(true);
        
        // 更新URL和分享URL
        const url = new URL(window.location.href);
        url.searchParams.set('type1', type1);
        url.searchParams.set('type2', type2);
        window.history.replaceState({}, '', url.toString());
        setShareURL(url.toString());
      } else {
        console.error(`No compatibility data found for ${type1}-${type2}`);
        setError(`No compatibility data found for ${type1}-${type2} pair.`);
      }
    } catch (error) {
      console.error('Error calculating compatibility:', error);
      setError('Failed to calculate compatibility. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapTypes = () => {
    setType1(type2);
    setType2(type1);
  };

  // Auto-calculate on initial load if types are present in URL
  useEffect(() => {
    if (initialType1 && initialType2) {
      calculateCompatibility();
    }
  }, []);

  return (
    <CompatibilityContext.Provider 
      value={{ 
        type1, 
        type2, 
        setType1, 
        setType2, 
        compatibilityResult, 
        calculateCompatibility, 
        isCalculated,
        swapTypes,
        shareURL,
        loading,
        error
      }}
    >
      {children}
    </CompatibilityContext.Provider>
  );
};

export const useCompatibility = () => useContext(CompatibilityContext);

export default CompatibilityContext;