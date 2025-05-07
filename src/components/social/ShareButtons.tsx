import React, { useState } from 'react';
import { Copy, Twitter, Facebook } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ShareButtonsProps {
  title: string;
  text: string;
  url: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ title, text, url }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      <button
        onClick={handleCopyLink}
        className="inline-flex items-center px-4 py-2 rounded-full bg-white hover:bg-gray-50 text-purple-600 border border-purple-500 hover:border-purple-700 transition-colors text-sm"
        aria-label="Copy link"
      >
        <Copy className="h-4 w-4 mr-2 text-purple-600" />
        {copied ? t('copied', 'common') || 'Copied!' : t('copyLink', 'common') || 'Copy Link'}
      </button>
      
      <button
        onClick={shareToTwitter}
        className="inline-flex items-center px-4 py-2 rounded-full bg-[#1DA1F2] hover:bg-[#0c85d0] text-white transition-colors text-sm"
        aria-label="Share on Twitter"
      >
        <Twitter className="h-4 w-4 mr-2" />
        {t('shareOnTwitter', 'common') || 'Share on Twitter'}
      </button>
      
      <button
        onClick={shareToFacebook}
        className="inline-flex items-center px-4 py-2 rounded-full bg-[#4267B2] hover:bg-[#365899] text-white transition-colors text-sm"
        aria-label="Share on Facebook"
      >
        <Facebook className="h-4 w-4 mr-2" />
        {t('shareOnFacebook', 'common') || 'Share on Facebook'}
      </button>
    </div>
  );
};

export default ShareButtons; 