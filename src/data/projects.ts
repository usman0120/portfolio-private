import { Project } from "../types/project";

export const projects: Project[] = [
  // Existing projects (1, 2, 6, 15)...
  {
    id: "1",
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    type: "Website",
    shortDescription: "Full-featured online store with payment integration",
    fullDescription: "A complete e-commerce solution with product management, cart functionality, and Stripe payment processing.",
    overview: "Built to demonstrate modern e-commerce capabilities with React and Node.js",
    challenges: "Handling inventory synchronization in real-time across multiple users",
    solutions: "Implemented WebSocket connections for live updates and Redis for caching",
    results: "Reduced cart abandonment by 35% with optimized checkout flow",
    tags: ["ecommerce", "fullstack"],
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    githubUrl: "https://github.com/username/ecommerce-platform",
    liveUrl: "https://ecommerce-demo.example.com",
    imageUrl: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-05-15",
    services: ["Frontend Development", "Backend API"],
    gallery: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "2",
    title: "Task Management App",
    slug: "task-management-app",
    type: "App",
    shortDescription: "Mobile-first productivity application with offline support",
    fullDescription: "A PWA task manager with drag-and-drop interface and offline capabilities using service workers.",
    overview: "Designed to help teams collaborate on projects effectively",
    challenges: "Implementing real-time sync between online and offline changes",
    solutions: "Used IndexedDB for local storage and conflict resolution algorithms",
    results: "Achieved 4.8/5 rating in productivity category on app stores",
    tags: ["productivity", "pwa"],
    technologies: ["React", "TypeScript", "Firebase", "PWA"],
    githubUrl: "https://github.com/username/task-manager",
    liveUrl: "https://tasks.example.com",
    imageUrl: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-08-22",
    services: ["Full Stack Development", "UX Design"],
    gallery: [
      "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "3",
    title: "Healthcare Portal",
    slug: "healthcare-portal",
    type: "Website",
    shortDescription: "Patient management system for clinics",
    fullDescription: "A HIPAA-compliant portal for healthcare providers to manage patient records, appointments, and telemedicine sessions.",
    overview: "Developed to streamline clinic operations and improve patient care",
    challenges: "Ensuring data security and compliance with healthcare regulations",
    solutions: "Implemented end-to-end encryption and strict access controls",
    results: "Adopted by 15+ clinics, reducing administrative workload by 40%",
    tags: ["healthcare", "security"],
    technologies: ["Angular", "NestJS", "PostgreSQL", "AWS"],
    githubUrl: "https://github.com/username/healthcare-portal",
    liveUrl: "https://health.example.com",
    imageUrl: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-02-10",
    services: ["Full Stack Development", "Security"],
    gallery: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1581056771107-24ca5f033842?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "4",
    title: "Fitness Tracker",
    slug: "fitness-tracker",
    type: "App",
    shortDescription: "Mobile app for workout logging and health monitoring",
    fullDescription: "Cross-platform fitness app with exercise database, progress tracking, and Apple Health/Google Fit integration.",
    overview: "Created to help users maintain consistent workout routines",
    challenges: "Syncing data across devices with different sensor capabilities",
    solutions: "Developed adaptive algorithms to normalize sensor data",
    results: "100,000+ downloads with 4.6-star average rating",
    tags: ["health", "mobile"],
    technologies: ["Flutter", "Firebase", "BLoC", "HealthKit"],
    githubUrl: "https://github.com/username/fitness-tracker",
    liveUrl: "https://fitness.example.com",
    imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-04-18",
    services: ["Mobile Development", "UI/UX Design"],
    gallery: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "5",
    title: "Design System",
    slug: "design-system",
    type: "Design",
    shortDescription: "Comprehensive UI kit for enterprise applications",
    fullDescription: "A modular design system with React components, Figma templates, and style guidelines for consistent UI development.",
    overview: "Built to unify design across multiple products in an organization",
    challenges: "Maintaining design consistency across different teams",
    solutions: "Created documentation and automated style checking tools",
    results: "Reduced UI development time by 60% across products",
    tags: ["design", "components"],
    technologies: ["Figma", "Storybook", "Sass", "React"],
    githubUrl: "https://github.com/username/design-system",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-06-05",
    services: ["UI Design", "Frontend Architecture"],
    gallery: [
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1541462608143-67571c6738dd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "6",
    title: "UI Component Library",
    slug: "ui-component-library",
    type: "Open Source",
    shortDescription: "Reusable React components with Storybook documentation",
    fullDescription: "An open-source collection of accessible React components following WAI-ARIA standards.",
    overview: "Created to help developers build accessible applications faster",
    challenges: "Ensuring cross-browser compatibility and accessibility compliance",
    solutions: "Implemented comprehensive unit and integration testing",
    results: "Adopted by 500+ developers with 98% satisfaction rating",
    tags: ["components", "accessibility"],
    technologies: ["React", "TypeScript", "Storybook", "Jest"],
    githubUrl: "https://github.com/username/ui-library",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-11-10",
    services: ["Component Design", "Documentation"],
    gallery: [
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "7",
    title: "Restaurant Finder",
    slug: "restaurant-finder",
    type: "App",
    shortDescription: "Location-based restaurant discovery with reviews",
    fullDescription: "Mobile app that helps users find nearby restaurants with filters for cuisine, price range, and dietary restrictions.",
    overview: "Developed to solve the 'where to eat' dilemma with data-driven recommendations",
    challenges: "Processing and displaying large volumes of location data efficiently",
    solutions: "Optimized geospatial queries and implemented lazy loading",
    results: "Featured as 'App of the Day' in 5 countries",
    tags: ["food", "location"],
    technologies: ["React Native", "GraphQL", "MongoDB", "Google Maps API"],
    githubUrl: "https://github.com/username/restaurant-finder",
    liveUrl: "https://restaurants.example.com",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-07-30",
    services: ["Mobile Development", "Backend API"],
    gallery: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "8",
    title: "Blockchain Explorer",
    slug: "blockchain-explorer",
    type: "Website",
    shortDescription: "Real-time visualization of cryptocurrency transactions",
    fullDescription: "Web application for exploring blockchain data with interactive graphs and transaction history.",
    overview: "Built to make blockchain data more accessible to non-technical users",
    challenges: "Processing and displaying real-time blockchain data",
    solutions: "Used WebSockets for live updates and D3.js for visualizations",
    results: "Processed 1M+ daily transactions with sub-second latency",
    tags: ["blockchain", "data"],
    technologies: ["Vue.js", "Node.js", "WebSocket", "D3.js"],
    githubUrl: "https://github.com/username/blockchain-explorer",
    liveUrl: "https://blockchain.example.com",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-09-12",
    services: ["Frontend Development", "Data Visualization"],
    gallery: [
      "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621570072959-9f59a1b5a0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "9",
    title: "AI Content Generator",
    slug: "ai-content-generator",
    type: "Website",
    shortDescription: "GPT-powered writing assistant",
    fullDescription: "Web application that helps content creators generate articles, social media posts, and marketing copy using AI.",
    overview: "Developed to automate repetitive writing tasks while maintaining quality",
    challenges: "Balancing AI output with human creativity and style",
    solutions: "Implemented fine-tuning and style transfer techniques",
    results: "Helped users create content 5x faster with 90% satisfaction",
    tags: ["ai", "writing"],
    technologies: ["Next.js", "Python", "OpenAI API", "Tailwind CSS"],
    githubUrl: "https://github.com/username/ai-writer",
    liveUrl: "https://aiwriter.example.com",
    imageUrl: "https://images.unsplash.com/photo-1655720828013-97b679f7b1c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-10-05",
    services: ["Full Stack Development", "AI Integration"],
    gallery: [
      "https://images.unsplash.com/photo-1655720828013-97b679f7b1c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1655720827865-7b5d4a3f4a4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "10",
    title: "AR Furniture App",
    slug: "ar-furniture-app",
    type: "App",
    shortDescription: "Augmented reality for home decoration",
    fullDescription: "Mobile application that lets users visualize furniture in their space using augmented reality before purchasing.",
    overview: "Created to reduce returns in online furniture shopping",
    challenges: "Accurate sizing and placement of 3D models in real spaces",
    solutions: "Developed custom AR scaling algorithms with ARKit/ARCore",
    results: "Increased conversion rates by 28% for partner retailers",
    tags: ["ar", "shopping"],
    technologies: ["Unity", "ARKit", "ARCore", "Swift"],
    githubUrl: "https://github.com/username/ar-furniture",
    liveUrl: "https://ar-furniture.example.com",
    imageUrl: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-01-20",
    services: ["AR Development", "3D Modeling"],
    gallery: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "11",
    title: "Open Data Platform",
    slug: "open-data-platform",
    type: "Open Source",
    shortDescription: "Public datasets with visualization tools",
    fullDescription: "Platform for sharing and visualizing open government data with tools for analysis and export.",
    overview: "Developed to promote transparency and data literacy",
    challenges: "Handling large datasets with efficient querying",
    solutions: "Used columnar storage and query optimization techniques",
    results: "Used by 50+ schools for data science education",
    tags: ["data", "education"],
    technologies: ["Python", "Django", "PostgreSQL", "D3.js"],
    githubUrl: "https://github.com/username/open-data",
    liveUrl: "https://opendata.example.com",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-03-15",
    services: ["Backend Development", "Data Engineering"],
    gallery: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "12",
    title: "Travel Planner",
    slug: "travel-planner",
    type: "Website",
    shortDescription: "AI-powered itinerary generator",
    fullDescription: "Web application that creates optimized travel itineraries based on user preferences and constraints.",
    overview: "Built to simplify trip planning with smart recommendations",
    challenges: "Balancing multiple constraints in itinerary generation",
    solutions: "Implemented constraint satisfaction algorithms",
    results: "Saved users average 3 hours per trip in planning time",
    tags: ["travel", "ai"],
    technologies: ["React", "Node.js", "Mapbox", "Machine Learning"],
    githubUrl: "https://github.com/username/travel-planner",
    liveUrl: "https://travel.example.com",
    imageUrl: "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-04-22",
    services: ["Full Stack Development", "Algorithm Design"],
    gallery: [
      "https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "13",
    title: "Language Learning App",
    slug: "language-learning-app",
    type: "App",
    shortDescription: "Gamified mobile language education",
    fullDescription: "Mobile application for learning languages through interactive games and spaced repetition.",
    overview: "Designed to make language learning fun and effective",
    challenges: "Personalizing learning paths for different users",
    solutions: "Implemented adaptive learning algorithms",
    results: "Users achieved 2x faster learning compared to traditional methods",
    tags: ["education", "mobile"],
    technologies: ["Flutter", "Firebase", "TensorFlow Lite"],
    githubUrl: "https://github.com/username/language-app",
    liveUrl: "https://language.example.com",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-05-30",
    services: ["Mobile Development", "Educational Design"],
    gallery: [
      "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "14",
    title: "Sustainability Dashboard",
    slug: "sustainability-dashboard",
    type: "Website",
    shortDescription: "Corporate ESG metrics visualization",
    fullDescription: "Dashboard for companies to track and report on environmental, social, and governance (ESG) metrics.",
    overview: "Developed to help organizations measure sustainability efforts",
    challenges: "Aggregating data from multiple sources and formats",
    solutions: "Built data pipeline with transformation layer",
    results: "Helped clients reduce reporting time by 75%",
    tags: ["sustainability", "data"],
    technologies: ["TypeScript", "Next.js", "Python", "Tableau"],
    githubUrl: "https://github.com/username/esg-dashboard",
    liveUrl: "https://esg.example.com",
    imageUrl: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-07-18",
    services: ["Data Visualization", "Full Stack Development"],
    gallery: [
      "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "15",
    title: "Weather Dashboard",
    slug: "weather-dashboard",
    type: "Mini Project",
    shortDescription: "Real-time weather visualization with 3D effects",
    fullDescription: "An interactive weather dashboard showing current conditions and forecasts with Three.js animations.",
    overview: "Built as a weekend project to explore WebGL capabilities",
    challenges: "Optimizing 3D rendering performance on mobile devices",
    solutions: "Implemented level-of-detail techniques for 3D models",
    results: "Featured on CodePen's popular picks for 2 weeks",
    tags: ["visualization", "webgl"],
    technologies: ["Three.js", "React", "WeatherAPI"],
    githubUrl: "https://github.com/username/weather-viz",
    liveUrl: "https://weather.example.com",
    imageUrl: "https://images.unsplash.com/photo-1601134467661-3d775b99c35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-12-05",
    services: ["Frontend Development", "Data Visualization"],
    gallery: [
      "https://images.unsplash.com/photo-1601134467661-3d775b99c35b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1605106702734-205df224ecce?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "16",
    title: "Code Editor Extension",
    slug: "code-editor-extension",
    type: "Open Source",
    shortDescription: "VS Code extension for developer productivity",
    fullDescription: "Popular open-source extension that adds AI-powered code completions and snippets to VS Code.",
    overview: "Created to speed up development workflows",
    challenges: "Maintaining performance with real-time analysis",
    solutions: "Optimized AST parsing and caching",
    results: "50,000+ weekly active users on VS Code marketplace",
    tags: ["developer", "tools"],
    technologies: ["TypeScript", "VS Code API", "AI"],
    githubUrl: "https://github.com/username/code-extension",
    imageUrl: "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-08-10",
    services: ["Developer Tools", "Extension Development"],
    gallery: [
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "17",
    title: "Social Media Analytics",
    slug: "social-media-analytics",
    type: "Website",
    shortDescription: "Multi-platform social media dashboard",
    fullDescription: "Comprehensive analytics platform that aggregates data from Twitter, Instagram, and Facebook with sentiment analysis.",
    overview: "Built for marketers to track campaign performance",
    challenges: "Handling API rate limits from multiple platforms",
    solutions: "Implemented smart batching and caching strategy",
    results: "Processed 1M+ posts daily with 99.9% uptime",
    tags: ["analytics", "social"],
    technologies: ["React", "Node.js", "Python", "Redis"],
    githubUrl: "https://github.com/username/social-analytics",
    liveUrl: "https://social.example.com",
    imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-09-25",
    services: ["Data Processing", "Dashboard Development"],
    gallery: [
      "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "18",
    title: "Smart Home Controller",
    slug: "smart-home-controller",
    type: "App",
    shortDescription: "Unified control for IoT devices",
    fullDescription: "Mobile app that connects and controls various smart home devices from different manufacturers.",
    overview: "Developed to solve the fragmentation in smart home ecosystems",
    challenges: "Supporting multiple IoT protocols and standards",
    solutions: "Created abstraction layer for device communication",
    results: "Supported 200+ device models at launch",
    tags: ["iot", "mobile"],
    technologies: ["React Native", "MQTT", "WebSocket", "AWS IoT"],
    githubUrl: "https://github.com/username/smart-home",
    liveUrl: "https://smarthome.example.com",
    imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-10-15",
    services: ["Mobile Development", "IoT Integration"],
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "19",
    title: "Design Portfolio Template",
    slug: "design-portfolio-template",
    type: "Design",
    shortDescription: "Responsive portfolio template for creatives",
    fullDescription: "Customizable Figma template and React implementation for designers to showcase their work.",
    overview: "Created to help designers launch portfolios quickly",
    challenges: "Balancing flexibility with design consistency",
    solutions: "Built modular component system with style controls",
    results: "Used by 1,000+ designers worldwide",
    tags: ["portfolio", "template"],
    technologies: ["Figma", "React", "GSAP", "CSS Grid"],
    githubUrl: "https://github.com/username/portfolio-template",
    liveUrl: "https://portfolio.example.com",
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-11-20",
    services: ["UI Design", "Frontend Development"],
    gallery: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  },
  {
    id: "20",
    title: "Crowdfunding Platform",
    slug: "crowdfunding-platform",
    type: "Website",
    shortDescription: "Kickstarter alternative with blockchain",
    fullDescription: "Decentralized crowdfunding platform using smart contracts for transparent fund management.",
    overview: "Built to bring transparency to crowdfunding campaigns",
    challenges: "Ensuring security of funds in smart contracts",
    solutions: "Multiple audit rounds and fail-safe mechanisms",
    results: "Successfully funded 50+ projects in first month",
    tags: ["blockchain", "finance"],
    technologies: ["Solidity", "React", "Ethereum", "IPFS"],
    githubUrl: "https://github.com/username/crowdfunding",
    liveUrl: "https://crowdfund.example.com",
    imageUrl: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    date: "2023-12-10",
    services: ["Blockchain Development", "Full Stack"],
    gallery: [
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
    ]
  }
];

// Helper function to find project by slug
export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

// Helper function to get related projects
export const getRelatedProjects = (currentProject: Project): Project[] => {
  return projects.filter(
    (project) => 
      project.type === currentProject.type && 
      project.id !== currentProject.id
  ).slice(0, 3);
};