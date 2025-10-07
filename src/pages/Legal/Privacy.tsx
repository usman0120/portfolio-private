// src/pages/Legal/Privacy.tsx
import LoadingLine from '../../components/common/LoadingLine';
import { LegalSection } from '../../components/sections/shared/LegalSection';

const Privacy = () => {
  return (
    <LegalSection title="Privacy Policy" lastUpdated="June 15, 2025">
      <LoadingLine />
      <div className="space-y-8">
        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">1. Information Collection</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            I may collect personal information such as your name, email address, and contact details when you:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed">Submit a contact form or inquiry</li>
            <li className="leading-relaxed">Subscribe to my newsletter or updates</li>
            <li className="leading-relaxed">Request my services or consultation</li>
            <li className="leading-relaxed">Leave comments or feedback</li>
          </ul>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">2. Use of Information</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            The information I collect may be used for the following purposes:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed"><strong>Communication:</strong> To respond to your inquiries and provide information</li>
            <li className="leading-relaxed"><strong>Service provision:</strong> To deliver requested services and support</li>
            <li className="leading-relaxed"><strong>Improvement:</strong> To enhance and personalize your experience</li>
            <li className="leading-relaxed"><strong>Marketing:</strong> To send periodic emails (only if you explicitly opt-in)</li>
          </ul>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">3. Data Protection</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            I implement appropriate security measures to protect your personal information against unauthorized access, 
            alteration, disclosure, or destruction. However, please understand that no electronic transmission or storage 
            method is 100% secure.
          </p>
        </section>

        <section className="border-b border-gray-200 dark:border-gray-700 pb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">4. Third-Party Disclosure</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            I do not sell, trade, or otherwise transfer your personally identifiable information to outside parties unless 
            I provide users with advance notice. This does not include:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed">Trusted third parties who assist in website operation</li>
            <li className="leading-relaxed">Legal requirements to comply with the law</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">5. Your Rights</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            Under data protection laws, you have rights including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-300">
            <li className="leading-relaxed"><strong>Access:</strong> You may request copies of your personal data</li>
            <li className="leading-relaxed"><strong>Correction:</strong> You may request correction of inaccurate data</li>
            <li className="leading-relaxed"><strong>Erasure:</strong> You may request deletion of your personal data</li>
            <li className="leading-relaxed"><strong>Restriction:</strong> You may request limited processing of your data</li>
            <li className="leading-relaxed"><strong>Objection:</strong> You may object to certain processing activities</li>
          </ul>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-4">
            To exercise these rights, please contact me using the information provided in the Contact section.
          </p>
        </section>
      </div>
    </LegalSection>
  );
};

export default Privacy;