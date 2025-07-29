// data/mini-projects.ts
import { MiniProject } from "../types/project";

export const miniProjects: MiniProject[] = [
  // CodePen Projects (5)
  {
    id: "mp1",
    title: "CSS Art Gallery",
    description: "Pure CSS artwork collection",
    longDescription: "A curated collection of 20+ pure CSS artworks including animals, landscapes, and abstract designs. No JavaScript or images used.",
    tags: ["CSS", "Art", "Creative"],
    technologies: ["HTML", "CSS", "Sass"],
    link: "https://codepen.io/collection/css-art",
    type: "CodePen",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-05-15"
  },
  {
    id: "mp2",
    title: "Animated Loaders",
    description: "CSS loading animations",
    longDescription: "Collection of 15+ creative CSS loading animations with smooth transitions and minimal markup.",
    tags: ["CSS", "Animations"],
    technologies: ["CSS", "HTML"],
    link: "https://codepen.io/collection/loaders",
    type: "CodePen",
    imageUrl: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-04-10"
  },
  {
    id: "mp3",
    title: "3D Card Flip",
    description: "Interactive 3D card effect",
    longDescription: "Realistic 3D card flipping animation with perspective transforms and smooth backface visibility handling.",
    tags: ["CSS", "3D", "Animation"],
    technologies: ["CSS", "JavaScript"],
    link: "https://codepen.io/pen/3d-card",
    type: "CodePen",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-07-22"
  },
  {
    id: "mp4",
    title: "Neon Text Effects",
    description: "Glowing text animations",
    longDescription: "Collection of 10+ neon text effects with customizable colors and animation patterns using CSS filters.",
    tags: ["CSS", "Effects"],
    technologies: ["CSS", "SCSS"],
    link: "https://codepen.io/collection/neon-text",
    type: "CodePen",
    imageUrl: "https://images.unsplash.com/photo-1517430445951-0d8e54406419?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-03-05"
  },
  {
    id: "mp5",
    title: "SVG Path Animation",
    description: "Animated SVG drawing effects",
    longDescription: "Creative SVG path drawing animations with stroke-dasharray and JavaScript timing controls.",
    tags: ["SVG", "Animation"],
    technologies: ["SVG", "JavaScript"],
    link: "https://codepen.io/pen/svg-animation",
    type: "CodePen",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-08-18"
  },

  // GitHub Projects (5)
  {
    id: "mp6",
    title: "Password Generator",
    description: "Secure password creation tool",
    longDescription: "Customizable password generator with strength meter, copy functionality, and options for special characters, numbers, and length adjustment.",
    tags: ["Security", "Tool"],
    technologies: ["JavaScript", "React", "Tailwind CSS"],
    link: "https://github.com/username/password-generator",
    type: "GitHub",
    imageUrl: "https://images.unsplash.com/photo-1599824894697-1d42d2b535e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-06-20"
  },
  {
    id: "mp7",
    title: "Markdown Previewer",
    description: "Real-time markdown editor",
    longDescription: "Feature-rich markdown editor with live preview, syntax highlighting, and export options including PDF and HTML.",
    tags: ["Tool", "Productivity"],
    technologies: ["React", "Marked.js", "TypeScript"],
    link: "https://github.com/username/markdown-previewer",
    type: "GitHub",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-02-14"
  },
  {
    id: "mp8",
    title: "Recipe Manager",
    description: "Digital recipe organizer",
    longDescription: "Full-stack recipe management application with image uploads, search functionality, and meal planning features.",
    tags: ["Food", "Database"],
    technologies: ["Node.js", "Express", "MongoDB"],
    link: "https://github.com/username/recipe-manager",
    type: "GitHub",
    imageUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-05-30"
  },
  {
    id: "mp9",
    title: "Weather Dashboard",
    description: "Weather forecast application",
    longDescription: "Responsive weather dashboard showing current conditions and 5-day forecast with interactive maps and weather alerts.",
    tags: ["API", "Weather"],
    technologies: ["React", "OpenWeather API", "Chart.js"],
    link: "https://github.com/username/weather-dashboard",
    type: "GitHub",
    imageUrl: "https://images.unsplash.com/photo-1601134467661-3d775b99c35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-04-05"
  },
  {
    id: "mp10",
    title: "Memory Card Game",
    description: "Classic matching game",
    longDescription: "Interactive memory card game with score tracking, timer, and multiple difficulty levels. Built with React hooks for state management.",
    tags: ["Game", "React"],
    technologies: ["React", "TypeScript", "CSS Modules"],
    link: "https://github.com/username/memory-game",
    type: "GitHub",
    imageUrl: "https://images.unsplash.com/photo-1593431074633-21ef64707d29?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-09-10"
  },

  // Live Demo Projects (5)
  {
    id: "mp11",
    title: "Color Palette Tool",
    description: "Advanced color scheme generator",
    longDescription: "Professional color palette generator with WCAG contrast checking, color blindness simulation, and export options for designers.",
    tags: ["Design", "Accessibility"],
    technologies: ["JavaScript", "Canvas API", "LocalStorage"],
    link: "https://color-tool.example.com",
    type: "Live Demo",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-01-25"
  },
  {
    id: "mp12",
    title: "Pixel Art Maker",
    description: "Interactive pixel art creator",
    longDescription: "Browser-based pixel art editor with customizable grid sizes, color palettes, and export as PNG or SVG formats.",
    tags: ["Creative", "Canvas"],
    technologies: ["HTML5 Canvas", "JavaScript"],
    link: "https://pixel-art.example.com",
    type: "Live Demo",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-03-18"
  },
  {
    id: "mp13",
    title: "Typing Speed Test",
    description: "Measure your typing speed",
    longDescription: "Comprehensive typing test with accuracy statistics, words-per-minute calculation, and multiple difficulty levels with quotes.",
    tags: ["Game", "Performance"],
    technologies: ["JavaScript", "LocalStorage"],
    link: "https://typing-test.example.com",
    type: "Live Demo",
    imageUrl: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-07-05"
  },
  {
    id: "mp14",
    title: "Expense Tracker",
    description: "Personal finance manager",
    longDescription: "Visual expense tracker with category breakdowns, monthly reports, and data export capabilities for personal budgeting.",
    tags: ["Finance", "Tool"],
    technologies: ["React", "Chart.js", "Firebase"],
    link: "https://expense-tracker.example.com",
    type: "Live Demo",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-08-12"
  },
  {
    id: "mp15",
    title: "Interactive Quiz",
    description: "Customizable quiz platform",
    longDescription: "Dynamic quiz application with multiple question types, timer, score calculation, and progress tracking.",
    tags: ["Education", "Interactive"],
    technologies: ["Vue.js", "IndexedDB"],
    link: "https://quiz-app.example.com",
    type: "Live Demo",
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-06-08"
  },

  // Useful Tools (5)
  {
    id: "mp16",
    title: "Unit Converter",
    description: "Measurement conversion tool",
    longDescription: "Comprehensive unit converter supporting length, weight, volume, temperature with history and favorite conversions.",
    tags: ["Tool", "Utility"],
    technologies: ["TypeScript", "React"],
    link: "https://github.com/username/unit-converter",
    type: "Useful-Tools",
    imageUrl: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-02-28"
  },
  {
    id: "mp17",
    title: "URL Shortener",
    description: "Custom link shortener",
    longDescription: "Personal URL shortener service with custom slugs, click tracking, and QR code generation for shared links.",
    tags: ["Tool", "Productivity"],
    technologies: ["Node.js", "MongoDB", "Express"],
    link: "https://github.com/username/url-shortener",
    type: "Useful-Tools",
    imageUrl: "https://images.unsplash.com/photo-1642790554919-4006f6d05e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-04-15"
  },
  {
    id: "mp18",
    title: "Pomodoro Timer",
    description: "Focus productivity timer",
    longDescription: "Customizable Pomodoro timer with work/break intervals, notifications, and daily progress tracking.",
    tags: ["Productivity", "Tool"],
    technologies: ["JavaScript", "Web Audio API"],
    link: "https://github.com/username/pomodoro-timer",
    type: "Useful-Tools",
    imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-01-10"
  },
  {
    id: "mp19",
    title: "Bookmark Manager",
    description: "Organize your web resources",
    longDescription: "Browser extension for managing bookmarks with tags, search, and sync across devices using Firebase.",
    tags: ["Extension", "Tool"],
    technologies: ["Chrome API", "Firebase", "React"],
    link: "https://github.com/username/bookmark-manager",
    type: "Useful-Tools",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-05-22"
  },
  {
    id: "mp20",
    title: "Text Analyzer",
    description: "Writing statistics tool",
    longDescription: "Advanced text analysis tool providing readability scores, word frequency, keyword density and writing suggestions.",
    tags: ["Tool", "Writing"],
    technologies: ["Natural Language Processing", "Python"],
    link: "https://github.com/username/text-analyzer",
    type: "Useful-Tools",
    imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    date: "2023-07-30"
  }
];

export const getMiniProjectById = (id: string): MiniProject | undefined => {
  return miniProjects.find(project => project.id === id);
};