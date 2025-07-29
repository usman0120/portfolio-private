import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SecondaryHeader from "../../components/layouts/HeaderSec";
import SecondaryFooter from "../../components/layouts/FooterSec";
import MiniProjectCard from "../../components/sections/project/MiniProjectCard";
import { miniProjects } from "../../data/miniProjects";
import { FaSearch, FaCode, FaGithub, FaCodepen } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingLine from "../../components/common/LoadingLine";



const MiniProjectsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
const [activeFilter, setActiveFilter] = useState<string|undefined>("All");
  const [filteredProjects, setFilteredProjects] = useState(miniProjects);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // And update the filter logic:
useEffect(() => {
  let results = miniProjects;

  if (searchTerm) {
    results = results.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  }

  if (activeFilter !== "All") {
    results = results.filter(project => project.type === activeFilter);
  }

  setFilteredProjects(results);
}, [searchTerm, activeFilter]);
  const projectTypes = ["All", ...new Set(miniProjects.map(project => project.type).filter(Boolean))];

  return (
    <div className="min-h-screen mt-10 flex flex-col bg-gray-50 dark:bg-gray-900">
      <SecondaryHeader />
      <LoadingLine />

      <main className="flex-1 px-4 md:px-12 py-12 max-w-6xl mx-auto">
        {/* Page Header */}
        <section className="mb-12 text-center" data-aos="fade-up">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mini Projects Collection
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Small experiments, code pens, and quick prototypes showcasing specific techniques or ideas.
          </p>
        </section>

        {/* Search and Filter */}
        <section className="mb-8" data-aos="fade-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search mini projects..."
                className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === type
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section data-aos="fade-up">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map(project => (
                <MiniProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <FaCode className="text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                No projects found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setActiveFilter("All");
                }}
                className="mt-4 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Reset filters
              </button>
            </div>
          )}
        </section>

        {/* Stats */}
        <section className="mt-12" data-aos="fade-up">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Collection Stats
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {miniProjects.length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Projects
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {miniProjects.filter(p => p.type === "CodePen").length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  CodePens
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {miniProjects.filter(p => p.type === "GitHub").length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  GitHub Repos
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {miniProjects.filter(p => p.type === "Live Demo").length}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Live Demos
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Projects */}
        <section className="mt-12 text-center" data-aos="fade-up">
          <Link
            to="/projects"
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
            Back to Main Projects
          </Link>
        </section>
      </main>

      <SecondaryFooter/>
    </div>
  );
};

export default MiniProjectsPage;