import { MbtiType } from '../types';

export const mbtiTypes: MbtiType[] = [
  {
    id: 'INFP',
    name: 'INFP',
    title: 'The Mediator',
    description: 'Idealistic, creative, and driven by personal values. INFPs are loyal to their ideals and deeply compassionate.',
    traits: ['Idealistic', 'Creative', 'Sensitive', 'Caring', 'Reserved'],
    color: '#4DB6AC'
  },
  {
    id: 'INFJ',
    name: 'INFJ',
    title: 'The Advocate',
    description: 'Insightful, principled, and quietly determined. INFJs seek meaning and connection in all they do.',
    traits: ['Insightful', 'Principled', 'Determined', 'Idealistic', 'Complex'],
    color: '#7986CB'
  },
  {
    id: 'ENFP',
    name: 'ENFP',
    title: 'The Campaigner',
    description: 'Enthusiastic, creative, and sociable. ENFPs see possibilities everywhere and bring energy to all they do.',
    traits: ['Enthusiastic', 'Creative', 'Sociable', 'Free-spirited', 'Empathetic'],
    color: '#FFB74D'
  },
  {
    id: 'ENFJ',
    name: 'ENFJ',
    title: 'The Protagonist',
    description: 'Charismatic, inspiring, and driven. ENFJs are natural leaders who connect deeply with others.',
    traits: ['Charismatic', 'Inspiring', 'Altruistic', 'Reliable', 'Persuasive'],
    color: '#E57373'
  },
  {
    id: 'INTJ',
    name: 'INTJ',
    title: 'The Architect',
    description: 'Strategic, innovative, and independent. INTJs are driven by their vision and high standards.',
    traits: ['Strategic', 'Innovative', 'Independent', 'Analytical', 'Reserved'],
    color: '#5C6BC0'
  },
  {
    id: 'INTP',
    name: 'INTP',
    title: 'The Logician',
    description: 'Innovative, logical, and introspective. INTPs seek clarity and conceptual understanding above all.',
    traits: ['Innovative', 'Logical', 'Introspective', 'Objective', 'Curious'],
    color: '#64B5F6'
  },
  {
    id: 'ENTP',
    name: 'ENTP',
    title: 'The Debater',
    description: 'Quick-thinking, curious, and versatile. ENTPs enjoy intellectual challenges and seeing possibilities.',
    traits: ['Quick-thinking', 'Curious', 'Versatile', 'Energetic', 'Argumentative'],
    color: '#4FC3F7'
  },
  {
    id: 'ENTJ',
    name: 'ENTJ',
    title: 'The Commander',
    description: 'Strategic, decisive, and assertive. ENTJs are natural leaders who implement efficient solutions.',
    traits: ['Strategic', 'Decisive', 'Assertive', 'Efficient', 'Confident'],
    color: '#7E57C2'
  },
  {
    id: 'ISFP',
    name: 'ISFP',
    title: 'The Adventurer',
    description: 'Artistic, sensitive, and spontaneous. ISFPs bring beauty and unconventional thinking to the world.',
    traits: ['Artistic', 'Sensitive', 'Spontaneous', 'Kind', 'Adventurous'],
    color: '#FFD54F'
  },
  {
    id: 'ISFJ',
    name: 'ISFJ',
    title: 'The Defender',
    description: 'Reliable, observant, and supportive. ISFJs treasure traditions and offer practical help to others.',
    traits: ['Reliable', 'Observant', 'Supportive', 'Detail-oriented', 'Loyal'],
    color: '#81C784'
  },
  {
    id: 'ESFP',
    name: 'ESFP',
    title: 'The Entertainer',
    description: 'Spontaneous, energetic, and enthusiastic. ESFPs enjoy the moment and bring joy to others.',
    traits: ['Spontaneous', 'Energetic', 'Enthusiastic', 'Friendly', 'Present-focused'],
    color: '#FFB74D'
  },
  {
    id: 'ESFJ',
    name: 'ESFJ',
    title: 'The Consul',
    description: 'Caring, sociable, and organized. ESFJs create harmony and take care of practical matters.',
    traits: ['Caring', 'Sociable', 'Organized', 'Traditional', 'Supportive'],
    color: '#F06292'
  },
  {
    id: 'ISTP',
    name: 'ISTP',
    title: 'The Virtuoso',
    description: 'Versatile, practical, and independent. ISTPs excel at understanding how things work.',
    traits: ['Versatile', 'Practical', 'Independent', 'Spontaneous', 'Logical'],
    color: '#4DD0E1'
  },
  {
    id: 'ISTJ',
    name: 'ISTJ',
    title: 'The Logistician',
    description: 'Practical, fact-minded, and reliable. ISTJs value traditions and take responsibility seriously.',
    traits: ['Practical', 'Fact-minded', 'Reliable', 'Organized', 'Dutiful'],
    color: '#9575CD'
  },
  {
    id: 'ESTP',
    name: 'ESTP',
    title: 'The Entrepreneur',
    description: 'Energetic, perceptive, and bold. ESTPs thrive on excitement and hands-on problem solving.',
    traits: ['Energetic', 'Perceptive', 'Bold', 'Rational', 'Direct'],
    color: '#FF8A65'
  },
  {
    id: 'ESTJ',
    name: 'ESTJ',
    title: 'The Executive',
    description: 'Organized, practical, and traditional. ESTJs bring structure and follow through on their commitments.',
    traits: ['Organized', 'Practical', 'Traditional', 'Direct', 'Responsible'],
    color: '#A1887F'
  }
];

// 验证MBTI类型是否有效
export const isValidMbtiType = (type: string): boolean => {
  return mbtiTypes.some(mbtiType => mbtiType.id === type);
};