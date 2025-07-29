import { MiniProject } from "../../../types/project";
import { FaGithub, FaCodepen, FaExternalLinkAlt, FaCalendarAlt, FaCode } from "react-icons/fa";

interface MiniProjectCardProps {
  project: MiniProject;
  className?: string;
}

const MiniProjectCard = ({ project, className = "" }: MiniProjectCardProps) => {
  const getPlatformIcon = () => {
    switch (project.type) {
      case "CodePen":
        return <FaCodepen className="w-4 h-4" />;
      case "GitHub":
        return <FaGithub className="w-4 h-4" />;
      default:
        return <FaExternalLinkAlt className="w-4 h-4" />;
    }
  };

  return (
    <div
      className={`relative group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}
      data-aos="fade-up"
    >
      {/* Background image */}
      {project.imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-800"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 p-5 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-gray-500 dark:text-gray-400">
            {getPlatformIcon()}
          </span>
        </div>

        {/* Short description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
          {project.description}
        </p>

        {/* Expanded info (shown on hover) */}
        <div className="mt-auto">
          <div className="group-hover:max-h-40 max-h-0 overflow-hidden transition-all duration-300">
            {/* Long description */}
            {project.longDescription && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {project.longDescription}
              </p>
            )}

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
              {project.date && (
                <span className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  {new Date(project.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                </span>
              )}
              {project.technologies && project.technologies.length > 0 && (
                <span className="flex items-center">
                  <FaCode className="mr-1" />
                  {project.technologies.slice(0, 2).join(', ')}
                  {project.technologies.length > 2 && '...'}
                </span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Visit button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20"
          aria-label={`Open ${project.title}`}
        ></a>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
            Visit Project
            <svg
              className="w-3 h-3 ml-1.5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MiniProjectCard;