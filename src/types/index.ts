export interface MbtiType {
  id: string;
  name: string;
  title: string;
  description: string;
  traits: string[];
  color: string;
}

export interface LanguageOption {
  id: string;
  name: string;
  flag: string;
}

export interface CognitiveFunction {
  function: string;
  position: 'Dominant' | 'Auxiliary' | 'Tertiary' | 'Inferior';
  description: string;
}

export interface CognitivePair {
  score: number;
  type1Function: string;
  type2Function: string;
  description: {
    en: string;
    zh: string;
  }
}

export interface FAQ {
  question: {
    en: string;
    zh: string;
  };
  answer: {
    en: string;
    zh: string;
  };
}

export interface CompatibilityResult {
  overallScore: number;
  mediator: string;
  provider: string;
  summary: {
    en: string;
    zh: string;
  };
  relationshipType: {
    en: string;
    zh: string;
  };
  relationshipDesc: {
    en: string;
    zh: string;
  };
  sharedValues: {
    en: string;
    zh: string;
  };
  sharedValuesDesc: {
    en: string;
    zh: string;
  };
  communicationStyle: {
    en: string;
    zh: string;
  };
  communicationDesc: {
    en: string;
    zh: string;
  };
  cognitiveCompatibility: {
    [key: string]: CognitivePair;
  };
  compatibilityReason: {
    en: string;
    zh: string;
  };
  growthPotential: {
    en: string;
    zh: string;
  };
  faq: FAQ[];
}