// types/service.ts
export type Service = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  overview: string[];
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  technologies: string[];
  imageUrl: string;
};