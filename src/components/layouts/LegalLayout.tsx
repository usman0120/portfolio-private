// Specific layout for legal pages
// src/components/sections/shared/LegalSection.tsx
import { Link } from 'react-router-dom';
import { Icon } from '../../assets/icons/Icon';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

type LegalSectionProps = {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
};

export const LegalSection = ({ title, lastUpdated, children }: LegalSectionProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link 
          to=".." 
          relative="path"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 dark:hover:text-purple-400 mb-4"
        >
          <Icon icon="chevron-left" className="mr-2" />
          Back to previous page
        </Link>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400">Last updated: {lastUpdated}</p>
      </div>
      
      <div className="prose dark:prose-invert max-w-none">
        {children}
      </div>
    </div>
  );
};