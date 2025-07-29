import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SecondaryHeader from "../../components/layouts/HeaderSec";
import SecondaryFooter from "../../components/layouts/FooterSec";
import ProjectCard from "../../components/sections/project/ProjectCard";
import MiniProjectCard from "../../components/sections/project/MiniProjectCard";
import { projects } from "../../data/projects";
import { miniProjects } from "../../data/miniProjects";
import { useSearchParams } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingLine from "../../components/common/LoadingLine";

const Projects = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [activeFilter, setActiveFilter] = useState<string>(categoryParam || "All");
  const [visibleProjects, setVisibleProjects] = useState<number>(6);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Get multiple featured projects (one of each type)
  const featuredProjects = [
    projects.find(project => project.type === "Website" && project.tags.includes("featured")) || 
      projects.find(project => project.type === "Website") || projects[0],
    projects.find(project => project.type === "App" && project.tags.includes("featured")) || 
      projects.find(project => project.type === "App") || projects[1],
    projects.find(project => project.type === "Design" && project.tags.includes("featured")) || 
      projects.find(project => project.type === "Design") || projects[2],
    projects.find(project => project.type === "Open Source" && project.tags.includes("featured")) || 
      projects.find(project => project.type === "Open Source") || projects[3]
  ].filter(Boolean);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800 });

    // Auto-scroll carousel
    const interval = setInterval(() => {
      setCurrentFeaturedIndex(prev => (prev + 1) % featuredProjects.length);
    }, 3000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentFeaturedIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentFeaturedIndex]);

  // Filter projects by type
  const filteredProjects = projects.filter(project => 
    activeFilter === "All" || project.type === activeFilter
  );

  // Get unique project types for filters
  const projectTypes = ["All", ...new Set(projects.map(project => project.type))];

  // Show more projects
  const showMoreProjects = () => {
    setVisibleProjects(prev => prev + 6);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <SecondaryHeader />
      <LoadingLine />

      <main className="flex-1 px-4 md:px-12 py-12 mt-10">
        {/* Featured Projects Carousel */}
        <section className="mb-16" data-aos="fade-up">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          
          <div className="relative">
            <div 
              ref={carouselRef}
              className="flex overflow-x-hidden scroll-snap-x-mandatory scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {featuredProjects.map((project, index) => (
                <div 
                  key={project.id}
                  className="flex-shrink-0 w-full scroll-snap-align-start px-2"
                  style={{ width: '100%' }}
                >
                  <ProjectCard project={project} layout="grid" />
                </div>
              ))}
            </div>
            
            {/* Navigation dots */}
            <div className="flex justify-center mt-6 space-x-2">
              {featuredProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentFeaturedIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentFeaturedIndex 
                      ? 'bg-indigo-600 dark:bg-indigo-400' 
                      : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Filter */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              My Projects
            </h2>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map(type => (
                <button
                  key={type}
                  onClick={() => {
                    setActiveFilter(type);
                    setVisibleProjects(6);
                  }}
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredProjects.slice(0, visibleProjects).map(project => (
              <ProjectCard key={project.id} project={project} layout="grid" />
            ))}
          </div>

          {visibleProjects < filteredProjects.length && (
            <div className="text-center">
              <button
                onClick={showMoreProjects}
                className="px-6 py-2 rounded-full border border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 transition-colors"
              >
                Show More Projects
              </button>
            </div>
          )}
        </section>

        {/* Mini Projects Section */}
        <section data-aos="fade-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Mini Projects
            </h2>
            <Link
              to="/projects/mini-projects"
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
            >
              View All Mini Projects
              <svg
                className="w-4 h-4 ml-1"
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
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {miniProjects.slice(0, 4).map(project => (
              <MiniProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      </main>
      <SecondaryFooter />
    </div>
  );
};
export default Projects;