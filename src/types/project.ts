export interface Project {
  id: string;
  title: string;
  slug: string;
  type: "Website" | "App" | "Open Source" | "Design" | "Mini Project";
  shortDescription: string;
  fullDescription: string;
  client?: string;
  overview?: string;
  challenges?: string;
  solutions?: string;
  results?: string;
  tags: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  date?: string;
  services?: string[];
  gallery?: string[];
}

export interface MiniProject {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  longDescription?: string; // Added for more detailed info
  imageUrl?: string; // Added for background images
  technologies?: string[]; // Added for tech stack display
  date?: string; // Added for project date
  type?: "CodePen" | "GitHub" | "Live Demo" | "Useful-Tools" | "Other"; // Added for platform type
}