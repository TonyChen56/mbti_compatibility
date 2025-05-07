import React from 'react';
import { Heart, Share2, MessageCircle } from 'lucide-react';

interface RelationshipCardProps {
  title: string;
  description: string;
  type: 'relationship' | 'values' | 'communication';
}

const RelationshipCard: React.FC<RelationshipCardProps> = ({ title, description, type }) => {
  // Define icon based on card type
  const getIcon = () => {
    switch (type) {
      case 'relationship':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'values':
        return <Share2 className="h-5 w-5 text-blue-500" />;
      case 'communication':
        return <MessageCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Heart className="h-5 w-5 text-red-500" />;
    }
  };
  
  // Define color classes based on card type
  const getColorClasses = () => {
    switch (type) {
      case 'relationship':
        return 'border-red-100 bg-red-50';
      case 'values':
        return 'border-blue-100 bg-blue-50';
      case 'communication':
        return 'border-green-100 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };
  
  const colorClasses = getColorClasses();
  
  return (
    <div className={`rounded-lg border ${colorClasses} p-4`}>
      <div className="flex items-center mb-2">
        {getIcon()}
        <h3 className="ml-2 font-medium text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default RelationshipCard;