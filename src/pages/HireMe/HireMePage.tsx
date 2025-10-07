// src/pages/HireMe/index.tsx
import { useState, useRef} from 'react';
import { Link } from "react-router-dom";
import type{FormEvent, ChangeEvent}from 'react';
import SecondaryHeader from "../../components/layouts/HeaderSec"
import SecondaryFooter from '../../components/layouts/FooterSec';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFonticonsFi, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import LoadingLine from '../../components/common/LoadingLine'
import { db } from "../../../src/firebase";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import toast from "react-hot-toast";

type FormData = {
  name: string;
  email: string;
  company: string;
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
  nda: boolean;
  terms: boolean;
};

type FileWithPreview = {
  file: File;
  preview: string;
};

const HireMePage=() =>{
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    project_type: '',
    budget: '',
    timeline: '',
    description: '',
    nda: false,
    terms: false,
  });
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const [removed] = newFiles.splice(index, 1);
    URL.revokeObjectURL(removed.preview);
    setFiles(newFiles);
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    // Add form data to Firestore
    await addDoc(collection(db, "contactMessages"), {
      ...formData,
      files: files.map(f => f.file.name), // optional: only save filenames
      createdAt: serverTimestamp()
    });

    toast.success("Message sent successfully!");

    setShowSuccess(true);
    setFormData({
      name: '',
      email: '',
      company: '',
      project_type: '',
      budget: '',
      timeline: '',
      description: '',
      nda: false,
      terms: false,
    });
    setFiles([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Something went wrong. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="font-sans bg-gray-50 dark:bg-gray-900 transition-colors duration-300 min-h-screen flex flex-col">
      <SecondaryHeader />
      <LoadingLine />
      <main className="flex-grow">
        {/* Hero Section - Updated for mobile */}
<section className="hero-bg pt-20 pb-12 md:pt-24 md:pb-16"> {/* Reduced padding on mobile */}
  <div className="container mx-auto px-4 md:px-6 text-center"> {/* Reduced side padding on mobile */}
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-3 md:mb-4">Hire Me</h1>
    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2 md:px-0">
      Let's work together on your next project. Fill out the form below to get started.
    </p>
  </div>
</section>

        {/* Hire Me Form Section - Mobile Optimized */}
<section className="py-8 md:py-16 bg-white dark:bg-gray-800">
  <div className="container mx-auto px-4 md:px-6">
    <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12">
      {/* Main Form Column */}
      <div className="lg:col-span-2">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
          Project Inquiry Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Company / Organization
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Project Type */}
          <div>
            <label htmlFor="project-type" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Project Type *
            </label>
            <select
              id="project-type"
              name="project_type"
              required
              value={formData.project_type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="">Select project type</option>
              <option value="web-development">Website Development</option>
              <option value="web-app">Web Application</option>
              <option value="ecommerce">E-Commerce Store</option>
              <option value="ui-ux">UI/UX Design</option>
              <option value="mobile-app">Mobile Application</option>
              <option value="consulting">Consulting</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Budget & Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label htmlFor="budget" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Estimated Budget *
              </label>
              <select
                id="budget"
                name="budget"
                required
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select budget range</option>
                <option value="under-1k">Under $1,000</option>
                <option value="1k-5k">$1,000 - $5,000</option>
                <option value="5k-10k">$5,000 - $10,000</option>
                <option value="10k-25k">$10,000 - $25,000</option>
                <option value="25k-plus">$25,000+</option>
                <option value="not-sure">Not sure yet</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
                Project Timeline *
              </label>
              <select
                id="timeline"
                name="timeline"
                required
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP (within 2 weeks)</option>
                <option value="1-month">1 Month</option>
                <option value="1-3-months">1-3 Months</option>
                <option value="3-6-months">3-6 Months</option>
                <option value="6-plus-months">6+ Months</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>
          </div>

          {/* Project Description */}
          <div>
            <label htmlFor="description" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Project Description *
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 dark:bg-gray-700 dark:text-white"
            ></textarea>
          </div>

          {/* File Upload */}
          <div>
            <label htmlFor="files" className="block text-gray-700 dark:text-gray-300 mb-1 md:mb-2">
              Attach Files (Optional)
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-28 md:h-32 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col items-center justify-center pt-4 pb-5 md:pt-5 md:pb-6">
                  <FontAwesomeIcon icon="cloud-upload-alt" className="text-2xl md:text-3xl text-gray-500 dark:text-gray-400 mb-1 md:mb-2" />
                  <p className="mb-1 md:mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    PDF, DOC, JPG, PNG (MAX. 5MB each)
                  </p>
                </div>
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
              </label>
            </div>
            <div className="mt-2 grid grid-cols-1 gap-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded"
                >
                  <div className="flex items-center">
                    <FontAwesomeIcon icon="file-alt" className="text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-xs">
                      {file.file.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeFile(index)}
                  >
                    <FontAwesomeIcon icon="times" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* NDA Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="nda"
                name="nda"
                type="checkbox"
                checked={formData.nda}
                onChange={handleInputChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
              />
            </div>
            <label htmlFor="nda" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              I require a Non-Disclosure Agreement (NDA) before discussing project details
            </label>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={formData.terms}
                onChange={handleInputChange}
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800"
              />
            </div>
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              I agree to the{' '}
              <Link
                to="/legal/terms"
                className="text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                to="/legal/privacy"
                className="text-purple-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy *
              </Link>
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end">
            <button
              type="reset"
              className="text-gray-700 px-3 py-1 md:px-4 md:py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300 text-sm md:text-base"
            >
              Reset Form
            </button>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary text-white px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold w-full transition-all duration-300 flex items-center justify-center"
          >
            <span>{isSubmitting ? 'Submitting...' : 'Submit Project Inquiry'}</span>
            {isSubmitting && <FontAwesomeIcon icon="spinner" className="ml-2 animate-spin" />}
          </button>
        </form>
      </div>

      {/* Contact Info Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm sticky top-4 md:top-8">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white mb-4 md:mb-6">
            Contact Information
          </h3>

          <div className="space-y-3 md:space-y-4">
            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-2 md:p-3 rounded-lg">
                <FontAwesomeIcon icon="envelope" className="text-purple-600 dark:text-purple-300 text-sm md:text-base" />
              </div>
              <div className="ml-3">
                <h4 className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">Email</h4>
                <a
                  href="mailto:usmanahmad.workmail@gmail.com"
                  className="text-purple-600 dark:text-purple-400 hover:underline text-sm md:text-base"
                >
                  usmanahmad.workmail <br /> @gmail.com
                </a>
              </div>
            </div>

            {/* Phone */}
            {/* <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-2 md:p-3 rounded-lg">
                <FontAwesomeIcon icon="phone-alt" className="text-purple-600 dark:text-purple-300 text-sm md:text-base" />
              </div>
              <div className="ml-3">
                <h4 className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">Phone</h4>
                <a
                  href="tel:+920000000000"
                  className="text-purple-600 dark:text-purple-400 hover:underline text-sm md:text-base"
                >
                  +92 (000) 000-0000
                </a>
              </div>
            </div> */}

            {/* Location */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-2 md:p-3 rounded-lg">
                <FontAwesomeIcon icon="map-marker-alt" className="text-purple-600 dark:text-purple-300 text-sm md:text-base" />
              </div>
              <div className="ml-3">
                <h4 className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">Location</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Lahore, Punjab, Pakistan
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">
                  Available for remote work worldwide
                </p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-100 dark:bg-purple-900 p-2 md:p-3 rounded-lg">
                <FontAwesomeIcon icon="clock" className="text-purple-600 dark:text-purple-300 text-sm md:text-base" />
              </div>
              <div className="ml-3">
                <h4 className="text-gray-700 dark:text-gray-300 font-medium text-sm md:text-base">Working Hours</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Monday - Sunday</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">9:00 AM - 12:00 PM PST</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-6 md:mt-8">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3 md:mb-4 text-sm md:text-base">
              Follow Me
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <FontAwesomeIcon icon={faLinkedin} className="text-lg md:text-xl" />
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <FontAwesomeIcon icon={faGithub} className="text-lg md:text-xl" />
              </a>
              <a
                href="https://fiverr.com/yourprofile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
              >
                <FontAwesomeIcon icon={faFonticonsFi} className="text-lg md:text-xl" />
              </a>
            </div>
          </div>

          {/* What to Expect */}
          <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-600">
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-3 md:mb-4 text-sm md:text-base">
              What to Expect
            </h4>
            <ul className="space-y-2 md:space-y-3 text-gray-600 dark:text-gray-400 text-sm md:text-base">
              <li className="flex items-start">
                <FontAwesomeIcon icon="check-circle" className="text-purple-600 dark:text-purple-400 mt-0.5 mr-2" />
                <span>Response within 24-48 hours</span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon="check-circle"  className="text-purple-600 dark:text-purple-400 mt-0.5 mr-2" />
                <span>Free initial consultation</span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon="check-circle"  className="text-purple-600 dark:text-purple-400 mt-0.5 mr-2" />
                <span>Clear project proposal</span>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon icon="check-circle"  className="text-purple-600 dark:text-purple-400 mt-0.5 mr-2" />
                <span>Transparent pricing</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* Success Modal - Mobile optimized */}
{showSuccess && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xs sm:max-w-md mx-2 p-6 md:p-8 relative">
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-100 dark:bg-green-900">
          <FontAwesomeIcon icon="check" className="text-green-600 dark:text-green-300 text-lg md:text-xl" />
        </div>
        <h3 className="text-base md:text-lg font-medium text-gray-900 dark:text-white mt-2 md:mt-3">
          Request Submitted Successfully!
        </h3>
        <div className="mt-1 md:mt-2 text-sm md:text-base text-gray-600 dark:text-gray-300">
          <p>Thank you for your interest. I'll review your project and get back to you within 24-48 hours.</p>
          <p className="mt-1 md:mt-2">A confirmation email has been sent to your inbox.</p>
        </div>
        <div className="mt-4 md:mt-6">
          <button
            onClick={() => setShowSuccess(false)}
            type="button"
            className="btn-primary text-white px-4 py-1 md:px-6 md:py-2 rounded-lg font-medium text-sm md:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
      </main>

      <SecondaryFooter />
    </div>
  );
}

export default HireMePage;