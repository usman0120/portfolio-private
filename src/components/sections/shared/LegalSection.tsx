// src/components/sections/shared/LegalSection.tsx
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../assets/icons/Icon';

type LegalSectionProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export const LegalSection = ({ title, lastUpdated, children }: LegalSectionProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.state?.idx > 0) {
      navigate(-1); // Go back if there's history
    } else {
      navigate('/'); // Fallback to home
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 mb-4"
        >
          <Icon icon="chevron-left" className="mr-2" />
          Go Back
        </button>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
};