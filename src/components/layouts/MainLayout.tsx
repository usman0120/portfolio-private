// src/components/layouts/MainLayout.tsx
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet'; // Alternative for head management

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

const MainLayout = ({ 
  children, 
  title = 'Usman Ahmad | Portfolio', 
  description = 'Portfolio of Usman Ahmad - Web Developer' 
}: MainLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Helmet>
      
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {children}
      </div>
    </>
  );
};

export default MainLayout;