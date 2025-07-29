import { useParams } from "react-router-dom";
import SecondaryHeader from "../../components/layouts/HeaderSec";
import SecondaryFooter from "../../components/layouts/FooterSec";
import ProjectCard from "../../components/sections/project/ProjectCard";
import { getProjectBySlug, getRelatedProjects } from "../../data/projects";
import { FaGithub, FaExternalLinkAlt, FaCalendarAlt, FaTools, FaCheckCircle } from "react-icons/fa";
import { MdOutlineDesignServices } from "react-icons/md";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import LoadingLine from "../../components/common/LoadingLine";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = getProjectBySlug(slug || "");
  const relatedProjects = project ? getRelatedProjects(project) : [];

  useEffect(() => {
    AOS.init({ duration: 800 });
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <SecondaryHeader />
        <main className="flex-1 px-4 md:px-12 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/projects"
            className="mt-6 inline-block px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
          >
            Back to Projects
          </Link>
        </main>
        <SecondaryFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-10 flex flex-col bg-gray-50 dark:bg-gray-900">
      <SecondaryHeader />
      <LoadingLine />

      <main className="flex-1 px-4 md:px-12 py-12 max-w-6xl mx-auto">
        {/* Project Header */}
<section 
  className="py-16 mb-12 bg-gradient-to-br from-gray-50 to-gray-200 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900"
  data-aos="fade-up"
>
  <div className="container mx-auto px-6">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-2/3 mb-8 md:mb-0">
        <span className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
          {project.type}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          {project.shortDescription}
        </p>
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-colors"
            >
              <FaExternalLinkAlt className="inline mr-2" />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FaGithub className="inline mr-2" />
              View Code
            </a>
          )}
        </div>
      </div>
      <div className="md:w-1/3">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="rounded-xl shadow-lg w-full object-cover h-64"
        />
      </div>
    </div>
  </div>
</section>

{/* Project Content Sections */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
  <div className="lg:col-span-2">
    <section className="mb-8" data-aos="fade-up">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Project Overview
      </h2>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p>{project.overview}</p>
      </div>
    </section>

    <section className="mb-8" data-aos="fade-up">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Key Challenges
      </h2>
      <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
        {project.challenges?.split('\n').map((challenge, index) => (
          <li key={index}>{challenge.replace(/^- /, '')}</li>
        ))}
      </ul>
    </section>

    <section className="mb-8" data-aos="fade-up">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        My Solution
      </h2>
      <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <p>{project.solutions}</p>
      </div>
    </section>
  </div>

  {/* Project Details Sidebar */}
  <div className="lg:col-span-1">
    <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 sticky top-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Project Details
      </h3>

      <div className="space-y-5">
        <div>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Client
          </h4>
          <p className="text-gray-700 dark:text-gray-300">
            {project.client || "Personal Project"}
          </p>
        </div>

        {project.date && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Date
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        )}

        {project.services && project.services.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Services
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.services.map(service => (
                <span
                  key={service}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map(tech => (
              <span
                key={tech}
                className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-sm rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {project.results && (
          <div>
            <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Results
            </h4>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {project.results.split('\n').map((result, index) => (
                <li key={index} className="flex items-start">
                  <FaCheckCircle className="text-green-500 dark:text-green-400 mt-1 mr-2 flex-shrink-0" />
                  <span>{result.replace(/^● /, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="mb-12" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Project Delivery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((image, index) => (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                  <p className="p-3 text-center text-sm text-gray-600 dark:text-gray-300">
                    {index === 0 ? 'Homepage Design' : 'Product Page'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="mt-16" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map(project => (
                <ProjectCard key={project.id} project={project} layout="grid" />
              ))}
            </div>
          </section>
        )}

        {/* Back Button */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-2 rounded-md border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Portfolio
          </Link>
        </div>
      </main>

      <SecondaryFooter />
    </div>
  );
};

export default ProjectDetail;