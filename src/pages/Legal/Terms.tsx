// src/pages/Legal/Terms.tsx
import LoadingLine from '../../components/common/LoadingLine';
import { LegalSection } from '../../components/sections/shared/LegalSection';

const Terms = () => {
  return (
    <LegalSection title="Terms of Service" lastUpdated="June 15, 2023">
      <LoadingLine />
      <div className="space-y-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">1. Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Welcome to my portfolio website. By accessing or using this website, you agree to be bound by these Terms 
            of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are 
            prohibited from using or accessing this site.
          </p>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">2. Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            All content on this website, including but not limited to text, graphics, logos, images, and software, is 
            my property or the property of my licensors and is protected by copyright and other intellectual property laws.
          </p>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            You may view and download content for personal, non-commercial use only, provided you keep intact all copyright 
            and other proprietary notices.
          </p>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">3. User Responsibilities</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            When using this website, you agree not to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed">Use the website for any unlawful purpose or in violation of these terms</li>
            <li className="leading-relaxed">Harass, abuse, or harm others through the website</li>
            <li className="leading-relaxed">Impersonate any person or entity or misrepresent your affiliation</li>
            <li className="leading-relaxed">Upload or transmit viruses or any malicious code</li>
            <li className="leading-relaxed">Attempt to gain unauthorized access to any part of the website</li>
          </ul>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">4. Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            In no event shall I be liable for any indirect, incidental, special, consequential, or punitive damages, 
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed">Your access to or use of or inability to access or use the website</li>
            <li className="leading-relaxed">Any conduct or content of any third party on the website</li>
            <li className="leading-relaxed">Any content obtained from the website</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">5. Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I reserve the right to modify or replace these terms at any time at my sole discretion. I will provide notice 
            of any material changes by posting the updated terms on this page. Your continued use of the website after 
            any such changes constitutes your acceptance of the new terms.
          </p>
        </section>
      </div>
    </LegalSection>
  );
};

export default Terms;