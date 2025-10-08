import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { projects as jsonProjects } from '../data/projects';
import { miniProjects as jsonMiniProjects } from '../data/miniProjects';
import { Project, MiniProject } from '../types/project';

// Fetch projects from both JSON and Firebase
export const getAllProjects = async (): Promise<Project[]> => {
  try {
    // Get JSON projects
    const jsonProjectsData = jsonProjects.map(project => ({
      ...project,
      source: 'json' as const
    }));

    // Get Firebase projects
    const projectsQuery = query(collection(db, 'projects'), orderBy('date', 'desc'));
    const snapshot = await getDocs(projectsQuery);
    const firebaseProjects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      source: 'firebase' as const
    })) as (Project & { source: 'firebase' })[];

    // Combine both sources
    return [...jsonProjectsData, ...firebaseProjects];
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Fallback to JSON only if Firebase fails
    return jsonProjects.map(project => ({
      ...project,
      source: 'json' as const
    }));
  }
};

// Fetch mini projects from both JSON and Firebase
export const getAllMiniProjects = async (): Promise<MiniProject[]> => {
  try {
    // Get JSON mini projects
    const jsonMiniProjectsData = jsonMiniProjects.map(project => ({
      ...project,
      source: 'json' as const
    }));

    // Get Firebase mini projects
    const miniProjectsQuery = query(collection(db, 'miniProjects'), orderBy('date', 'desc'));
    const snapshot = await getDocs(miniProjectsQuery);
    const firebaseMiniProjects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      source: 'firebase' as const
    })) as (MiniProject & { source: 'firebase' })[];

    // Combine both sources
    return [...jsonMiniProjectsData, ...firebaseMiniProjects];
  } catch (error) {
    console.error('Error fetching mini projects:', error);
    // Fallback to JSON only if Firebase fails
    return jsonMiniProjects.map(project => ({
      ...project,
      source: 'json' as const
    }));
  }
};

// Get project by slug from combined sources
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  const allProjects = await getAllProjects();
  return allProjects.find(project => project.slug === slug) || null;
};

// Get related projects
export const getRelatedProjects = async (currentProject: Project): Promise<Project[]> => {
  const allProjects = await getAllProjects();
  return allProjects
    .filter(project => 
      project.id !== currentProject.id && 
      project.type === currentProject.type
    )
    .slice(0, 3);
};