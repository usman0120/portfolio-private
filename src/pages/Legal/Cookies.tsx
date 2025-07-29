// src/pages/Legal/Cookies.tsx
import LoadingLine from '../../components/common/LoadingLine';
import { LegalSection } from '../../components/sections/shared/LegalSection';

const Cookies = () => {
  return (
    <LegalSection title="Cookies Policy" lastUpdated="June 15, 2023">
      <LoadingLine />
      <div className="space-y-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">1. What Are Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            Cookies are small text files stored on your device when you visit websites. They help the website remember 
            information about your visit, which can make your next visit easier and the site more useful to you.
          </p>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">2. How I Use Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This website uses cookies for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed"><strong>Essential functionality:</strong> Necessary for the website to function properly</li>
            <li className="leading-relaxed"><strong>Performance analytics:</strong> Helps me understand how visitors interact with the site</li>
            <li className="leading-relaxed"><strong>Preference storage:</strong> Remembers your preferences like dark mode and language settings</li>
          </ul>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">3. Third-Party Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I use services like Google Analytics which set their own cookies to help analyze how users use the site. 
            These cookies collect information in an anonymous form.
          </p>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">4. Managing Cookies</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            You can control or delete cookies through your browser settings. Most browsers allow you to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed">See what cookies are stored and delete them</li>
            <li className="leading-relaxed">Block third-party cookies</li>
            <li className="leading-relaxed">Block cookies from particular sites</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
            However, disabling cookies may affect website functionality.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">5. Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I may update this Cookies Policy from time to time. The "last updated" date at the top indicates when changes 
            were made. I encourage you to review this policy periodically.
          </p>
        </section>
      </div>
    </LegalSection>
  );
};

export default Cookies;