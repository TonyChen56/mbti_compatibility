import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: t('faq1Question', 'common'),
      answer: t('faq1Answer', 'common')
    },
    {
      question: t('faq2Question', 'common'),
      answer: t('faq2Answer', 'common')
    },
    {
      question: t('faq3Question', 'common'),
      answer: t('faq3Answer', 'common')
    },
    {
      question: t('faq4Question', 'common'),
      answer: t('faq4Answer', 'common')
    }
  ];

  // 创建结构化数据
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section aria-labelledby="faq-heading" className="mt-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }} />
      
      <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-6">{t('faqTitle', 'common')}</h2>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleFAQ(index)}
              className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500" aria-hidden="true" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" aria-hidden="true" />
              )}
            </button>
            
            <div 
              id={`faq-answer-${index}`}
              className={`px-4 pb-4 ${openIndex === index ? 'block' : 'hidden'}`}
            >
              <p className="text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;