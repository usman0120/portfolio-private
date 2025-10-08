import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSearch,
  FaFilter,
  FaUpload,
  FaStar,
  FaRegStar,
  FaProjectDiagram
} from 'react-icons/fa';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase-admin';
import { Project } from '../../types/project';
import toast from 'react-hot-toast';

const ProjectManagement = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'featured'>('all');

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    slug: '',
    type: 'Website',
    shortDescription: '',
    fullDescription: '',
    client: '',
    overview: '',
    challenges: '',
    solutions: '',
    results: '',
    tags: [],
    technologies: [],
    githubUrl: '',
    liveUrl: '',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
    services: [],
    gallery: []
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const projectsQuery = query(collection(db, 'projects'), orderBy('date', 'desc'));
      const snapshot = await getDocs(projectsQuery);
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setUploading(true);
    try {
      const storageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const toggleFeatured = async (project: Project) => {
    try {
      const updatedTags = project.tags.includes('featured') 
        ? project.tags.filter(tag => tag !== 'featured')
        : [...project.tags, 'featured'];
      
      await updateDoc(doc(db, 'projects', project.id), {
        tags: updatedTags
      });
      
      toast.success(updatedTags.includes('featured') ? 'Project featured!' : 'Project unfeatured');
      fetchProjects();
    } catch (error) {
      console.error('Error updating featured status:', error);
      toast.error('Failed to update featured status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject) {
        // Update existing project
        await updateDoc(doc(db, 'projects', editingProject.id), formData);
        toast.success('Project updated successfully!');
      } else {
        // Add new project
        await addDoc(collection(db, 'projects'), {
          ...formData,
          createdAt: new Date()
        });
        toast.success('Project added successfully!');
      }
      
      setShowForm(false);
      setEditingProject(null);
      resetForm();
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error('Failed to save project');
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await deleteDoc(doc(db, 'projects', project.id));
      toast.success('Project deleted successfully!');
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      type: 'Website',
      shortDescription: '',
      fullDescription: '',
      client: '',
      overview: '',
      challenges: '',
      solutions: '',
      results: '',
      tags: [],
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      imageUrl: '',
      date: new Date().toISOString().split('T')[0],
      services: [],
      gallery: []
    });
  };

  const startEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      type: project.type,
      shortDescription: project.shortDescription,
      fullDescription: project.fullDescription,
      client: project.client || '',
      overview: project.overview || '',
      challenges: project.challenges || '',
      solutions: project.solutions || '',
      results: project.results || '',
      tags: project.tags,
      technologies: project.technologies,
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      imageUrl: project.imageUrl,
      date: project.date || new Date().toISOString().split('T')[0],
      services: project.services || [],
      gallery: project.gallery || []
    });
    setShowForm(true);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
      (filter === 'featured' && project.tags.includes('featured'));
    
    return matchesSearch && matchesFilter;
  });

  const featuredProjectsCount = projects.filter(p => p.tags.includes('featured')).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Project Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your portfolio projects ({projects.length} total, {featuredProjectsCount} featured)
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center"
        >
          <FaPlus className="h-4 w-4 mr-2" />
          Add Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                filter === 'featured'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <FaStar className="h-4 w-4 mr-2" />
              Featured ({featuredProjectsCount})
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 relative"
          >
            {/* Featured Badge */}
            {project.tags.includes('featured') && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                  <FaStar className="h-3 w-3 mr-1" />
                  Featured
                </div>
              </div>
            )}
            
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-48 object-cover"
            />
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {project.title}
                </h3>
                <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full">
                  {project.type}
                </span>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                {project.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {project.tags.slice(0, 3).map(tag => (
                  <span
                    key={tag}
                    className={`px-2 py-1 text-xs rounded ${
                      tag === 'featured'
                        ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 text-xs rounded">
                    +{project.tags.length - 3}
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {project.date}
                </span>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => toggleFeatured(project)}
                    className={`p-2 rounded-lg transition-colors ${
                      project.tags.includes('featured')
                        ? 'text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                        : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    title={project.tags.includes('featured') ? 'Unfeature' : 'Mark as Featured'}
                  >
                    {project.tags.includes('featured') ? (
                      <FaStar className="h-4 w-4" />
                    ) : (
                      <FaRegStar className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    title="Edit Project"
                  >
                    <FaEdit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    title="Delete Project"
                  >
                    <FaTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <FaProjectDiagram className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            {searchTerm || filter !== 'all' 
              ? 'Try adjusting your search terms or filters' 
              : 'Get started by adding your first project'
            }
          </p>
        </div>
      )}

      {/* Project Form Modal */}
{showForm && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-y-auto"
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Slug *
              </label>
              <input
                type="text"
                required
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="project-name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Type *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option value="Website">Website</option>
                <option value="App">App</option>
                <option value="Open Source">Open Source</option>
                <option value="Design">Design</option>
                <option value="Mini Project">Mini Project</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Project Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Client Information */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Client (Optional)
            </label>
            <input
              type="text"
              value={formData.client || ''}
              onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Client name or company"
            />
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Brief description for project cards"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Description *
              </label>
              <textarea
                required
                rows={3}
                value={formData.fullDescription}
                onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Detailed project description"
              />
            </div>
          </div>

          {/* Project Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Project Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Overview
              </label>
              <textarea
                rows={2}
                value={formData.overview || ''}
                onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Project overview and context"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Challenges
              </label>
              <textarea
                rows={2}
                value={formData.challenges || ''}
                onChange={(e) => setFormData({ ...formData, challenges: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Key challenges faced"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Solutions
              </label>
              <textarea
                rows={2}
                value={formData.solutions || ''}
                onChange={(e) => setFormData({ ...formData, solutions: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Solutions implemented"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Results
              </label>
              <textarea
                rows={2}
                value={formData.results || ''}
                onChange={(e) => setFormData({ ...formData, results: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Project outcomes and results"
              />
            </div>
          </div>

          {/* Tags and Technologies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="ecommerce, fullstack, responsive (comma separated)"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate tags with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Technologies
              </label>
              <input
                type="text"
                value={formData.technologies.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  technologies: e.target.value.split(',').map(tech => tech.trim()).filter(Boolean)
                })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="React, Node.js, MongoDB (comma separated)"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Separate technologies with commas
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Services
            </label>
            <input
              type="text"
              value={formData.services?.join(', ') || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                services: e.target.value.split(',').map(service => service.trim()).filter(Boolean)
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Frontend Development, Backend API (comma separated)"
            />
          </div>

          {/* URLs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                GitHub URL (Optional)
              </label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="https://github.com/username/repo"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Live URL (Optional)
              </label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="https://project-demo.com"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Image URL *
            </label>
            <div className="flex gap-4">
              <input
                type="url"
                required
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="https://images.unsplash.com/photo-..."
              />
              <label className="relative cursor-pointer bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                <FaUpload className="h-4 w-4 mr-2" />
                Upload
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      try {
                        const imageUrl = await handleImageUpload(file);
                        setFormData({ ...formData, imageUrl });
                        toast.success('Image uploaded successfully!');
                      } catch (error) {
                        toast.error('Failed to upload image');
                      }
                    }
                  }}
                />
              </label>
            </div>
            {formData.imageUrl && (
              <div className="mt-2">
                <img 
                  src={formData.imageUrl} 
                  alt="Preview" 
                  className="h-32 w-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gallery Images (Optional)
            </label>
            <input
              type="text"
              value={formData.gallery?.join(', ') || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                gallery: e.target.value.split(',').map(url => url.trim()).filter(Boolean)
              })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="https://image1.jpg, https://image2.jpg (comma separated)"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Separate image URLs with commas
            </p>
          </div>

          {/* Featured Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.tags.includes('featured')}
              onChange={(e) => {
                const updatedTags = e.target.checked
                  ? [...formData.tags.filter(tag => tag !== 'featured'), 'featured']
                  : formData.tags.filter(tag => tag !== 'featured');
                setFormData({ ...formData, tags: updatedTags });
              }}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="featured" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Mark as Featured Project (will appear in carousel)
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingProject(null);
                resetForm();
              }}
              className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Uploading...
                </>
              ) : (
                editingProject ? 'Update Project' : 'Add Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  </div>
)}
    </div>
  );
};

export default ProjectManagement;