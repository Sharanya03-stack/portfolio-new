/**
 * Portfolio Data — Strictly Factual & Resume Aligned
 * Sharanya N — Computer Science Engineer & UI/UX Designer
 */

const portfolioData = {
  name: "Sharanya N",
  role: "Computer Science Engineer & UI/UX Designer",
  status: "Available for Projects & Engineering Roles",
  aboutShort:
    "Computer Science Engineering student specializing in IoT, Cybersecurity, and UI/UX design — engineering scalable, high-performance digital products with architectural discipline.",
  aboutLong:
    "Passionate Computer Science student and web engineer driven by modern web development, UI/UX design, and cybersecurity fundamentals. I focus on engineering clean, accessible, and high-performance applications with user-centered precision. Alongside academic rigor at Sri Sairam College of Engineering, I have delivered real-world client engagements as an independent freelance developer and gained hands-on design experience during my UI/UX internship at Edufyi Tech Solutions.",
  profileImage: "assets/images/profile.jpeg.jpg.jpeg",
  resume: "assets/resume/resume_3.pdf",
  phone: "+91-6362813866",
  phoneTel: "+916362813866",
  email: "sharureddy13@gmail.com",
  github: "https://github.com/Sharanya03-stack",
  linkedin: "https://www.linkedin.com/in/sharanya-n-203b7932a",
  whatsapp: "https://wa.me/916362813866?text=Hi%20Sharanya%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20connect%20regarding%20a%20project.",
  location: "Bangalore, India",

  education: {
    institution: "Sri Sairam College of Engineering, Bangalore",
    degree: "Bachelor of Engineering (B.E.) in Computer Science Engineering",
    specialization: "Specialization: CSE (IoT, Cybersecurity including Blockchain)",
    period: "2024 – 2028",
    highlights: [
      "Core focus on IoT architecture, network security, cryptographic blockchain protocols, and data structures.",
      "Active participant in technical symposiums, hackathons, and academic research paper presentations.",
    ],
  },

  experiences: [
    {
      role: "Freelance Web Developer",
      organization: "Independent Practice",
      period: "2025 – Present",
      type: "Client Engagements",
      description:
        "Delivering bespoke digital products, responsive web applications, and modern interface systems for independent clients. Focused on performance optimization, semantic web standards, and clean user experience.",
      engagement: "Client Engagement: ACS Energy — Engineered responsive web interface solutions with modern typography, cross-device usability, and clean information architecture.",
      tags: ["Frontend Architecture", "UI/UX", "Client Solutions", "Responsive Design", "Web Performance"],
    },
    {
      role: "UI/UX Design Intern",
      organization: "Edufyi Tech Solutions",
      period: "Aug 2025 – Oct 2025",
      type: "Internship",
      description:
        "Designed user-friendly interfaces for web and mobile platforms. Created high-fidelity wireframes, design components, and interactive prototypes in Figma while applying user-centered research principles.",
      engagement: "Collaborated on design system components, user journey mapping, and usability enhancements.",
      tags: ["Figma", "UI Design", "UX Research", "Responsive Design", "Prototyping"],
    },
  ],

  research: {
    title: "Meme Equation: Simulating Virality in the Age of Algorithms",
    venue: "National Conference on Emerging Technologies",
    summary:
      "Academic research paper examining the dynamics of algorithmic content distribution, AI-driven recommendation loops, and computational modeling of digital content virality.",
    tags: ["Artificial Intelligence", "Algorithms", "Machine Learning", "Virality Modeling", "Academic Research"],
    pdf: "assets/research/The_Meme_Equation_Simulating_Virality.pdf",
    link: "https://github.com/Sharanya03-stack",
  },

  achievements: [
    {
      id: "hackathon",
      title: "IBM AI Hackathon Winner",
      organization: "IBM",
      description: "Recognized with 1st place honors for innovative AI-assisted problem solving and technical implementation.",
      badge: "Winner",
      icon: "trophy",
    },
    {
      id: "conference",
      title: "National Conference Presenter",
      organization: "National Conference on Emerging Technologies",
      description: "Selected to present original academic research on algorithmic virality simulation and AI dynamics.",
      badge: "Research",
      icon: "award",
    },
    {
      id: "skillsbuild",
      title: "IBM SkillsBuild Certification",
      organization: "IBM",
      description: "Earned industry-recognized credentials covering modern cloud paradigms, artificial intelligence, and developer fundamentals.",
      badge: "Certified",
      icon: "medal",
    },
    {
      id: "fullstack",
      title: "Full-Stack Project Deployments",
      organization: "Engineering Practice",
      description: "Architected and deployed 5+ functional web and AI systems spanning full-stack frameworks, authentication, and databases.",
      badge: "Production",
      icon: "code",
    },
  ],

  metrics: [
    { label: "Engineering Projects", value: "05", detail: "Full-Stack & AI Systems" },
    { label: "Research Paper", value: "01", detail: "National Conference" },
    { label: "Hackathon Honors", value: "01", detail: "IBM AI Challenge Winner" },
    { label: "Academic Degree", value: "B.E.", detail: "CSE 2024 – 2028" },
  ],

  skills: [
    {
      category: "Systems & Core Programming",
      code: "SYS-01",
      icon: "code",
      items: ["C", "Python", "C++", "Data Structures", "Object-Oriented Design", "Algorithms"],
    },
    {
      category: "Modern Web & Interface Engineering",
      code: "WEB-02",
      icon: "layout",
      items: ["JavaScript (ES6+)", "HTML5", "CSS3 / Modern CSS", "React", "Tailwind CSS", "GSAP Animations"],
    },
    {
      category: "Backend, APIs & Persistence",
      code: "SRV-03",
      icon: "server",
      items: ["Node.js", "Express.js", "FastAPI (Python)", "Supabase / PostgreSQL", "MongoDB", "Cloudinary", "Firebase"],
    },
    {
      category: "Product Design, Tools & Workflows",
      code: "TLS-04",
      icon: "tool",
      items: ["Figma UI/UX", "Wireframing & Prototyping", "Git & GitHub", "Vercel", "VS Code", "Responsive Auditing"],
    },
  ],

  projects: [
    {
      id: "01",
      number: "01",
      title: "APEX University | Browser Battle",
      shortTitle: "Browser Battle",
      tagline: "Corporate-Academic Web Portal & Interactive Event Platform",
      category: "Frontend Architecture & Motion",
      image: "assets/images/project1.jpeg.jpg.jpeg",
      shortDescription:
        "Multi-page responsive university portal engineered with GSAP ScrollTrigger timeline reveals, dynamic Chart.js placement dashboards, and tailored SaaS branding.",
      description:
        "Designed and engineered a multi-page responsive web portal featuring a contemporary SaaS-inspired layout and corporate-academic branding. Implemented complex JavaScript animation sequences using GSAP, including ScrollTrigger clip-path reveals, smooth staggered load timelines, and an interactive custom cursor. Integrated dynamic data visualization components using Chart.js to display multi-year placement statistics and interactive recruitment tickers.",
      features: [
        "GSAP ScrollTrigger timeline animations with hardware-accelerated transitions",
        "Dynamic Chart.js data visualization for placement statistics and performance trends",
        "Multi-page responsive layout engineered with Tailwind CSS and semantic HTML5",
        "Google Translate integration and accessibility considerations across breakpoints",
        "Interactive navigation systems with responsive mobile drawer architecture",
      ],
      technologies: ["JavaScript (ES6+)", "GSAP", "Tailwind CSS", "HTML5", "Chart.js", "AOS"],
      challenges: "Balancing rich GSAP scroll animations with smooth 60fps performance across mobile and lower-spec hardware.",
      solution: "Employed ScrollTrigger with debounced timelines, deferred non-critical assets, and responsive media breakpoints.",
      github: "https://github.com/Sharanya03-stack/browser-battle",
      live: null, // No separate deployment; button points to GitHub repository
    },
    {
      id: "02",
      number: "02",
      title: "CI/CD Triage Agent",
      shortTitle: "CI/CD Triage Agent",
      tagline: "AI-Powered DevOps Pipeline Diagnosis & Automated Recovery Assistant",
      category: "AI Engineering & Backend Services",
      image: "assets/images/project2.jpeg.jpg.jpeg",
      shortDescription:
        "Automated CI/CD pipeline failure diagnosis system with asynchronous log parsing, root-cause categorization, and interactive chatbot assistance.",
      description:
        "Built an intelligent CI/CD pipeline failure diagnosis and recovery system designed to streamline DevOps debugging workflows. Automatically analyzes complex build logs, pinpoints precise failure root causes, and categorizes system issues in real-time. Features an interactive developer chatbot interface delivering context-aware remediation suggestions.",
      features: [
        "Automated log ingestion with intelligent pattern recognition for failure isolation",
        "Contextual failure classification engine with actionable remediation steps",
        "Interactive developer assistance chatbot interface for real-time troubleshooting",
        "FastAPI backend architecture with asynchronous processing routines",
        "Chart.js pipeline reliability and build health metric dashboards",
      ],
      technologies: ["Python", "FastAPI", "JavaScript", "HTML5", "CSS3", "Chart.js"],
      challenges: "Ingesting diverse, verbose CI/CD log dumps without blocking backend response times.",
      solution: "Engineered modular FastAPI asynchronous endpoints with regex-optimized token stream extractors.",
      github: "https://github.com/Sharanya03-stack/AI-agent",
      live: null,
    },
    {
      id: "03",
      number: "03",
      title: "Zero Degree Cafe & Brewery",
      shortTitle: "Zero Degree Cafe",
      tagline: "High-End Hospitality Web Experience & Reservation Platform",
      category: "Interface Design & Luxury Branding",
      image: "assets/images/project3.jpeg.jpg.jpeg",
      shortDescription:
        "High-performance hospitality web interface featuring an ultra-dark editorial hero, dynamic menu category filtering, and modal table reservations.",
      description:
        "Engineered a mobile-responsive web UI using HTML5, Tailwind CSS, and vanilla JavaScript, crafted for a luxury hospitality brand. Features an ultra-dark hero composition with custom typography, Ken Burns image-zoom CSS keyframe animations, dynamic menu filtering, and accessible table reservation modal workflows.",
      features: [
        "Ultra-dark editorial layout with balanced typography and high-contrast imagery",
        "Real-time menu category filtering by cuisine and dietary preferences",
        "Interactive table reservation modal dialogs with client validation",
        "Ken Burns CSS keyframe animations with hardware GPU compositing",
        "Strict mobile-first layout tested across diverse viewports",
      ],
      technologies: ["HTML5", "Tailwind CSS", "JavaScript (ES6+)", "CSS3 Transitions"],
      challenges: "Creating an atmospheric luxury look and feel without compromising page load speeds or text readability.",
      solution: "Used layered SVG accents, modern CSS variables for lighting contrast, and optimized asset delivery.",
      github: "https://github.com/Sharanya03-stack/zero-degree",
      live: null,
    },
    {
      id: "04",
      number: "04",
      title: "House Hunt (StayFind)",
      shortTitle: "House Hunt",
      tagline: "Full-Stack Property Rental Platform with Role-Based Authentication",
      category: "Full-Stack Application & Cloud Persistence",
      image: "assets/images/project4.jpeg.jpg.jpeg",
      shortDescription:
        "Comprehensive rental marketplace with Express/JWT authentication, Supabase PostgreSQL persistence, Cloudinary asset uploads, and React state management.",
      description:
        "Developed a responsive full-stack rental platform featuring dual role-based workflows for property owners and tenants. Architected an Express.js backend with JSON Web Token (JWT) authorization, custom security middleware, and modular routing. Integrated Supabase/PostgreSQL for relational persistence and Cloudinary for property photo uploads.",
      features: [
        "Role-based authentication & route authorization for landlords and prospective tenants",
        "JWT-secured Express.js REST API with input sanitation and custom middleware",
        "Relational data persistence and querying powered by Supabase / PostgreSQL",
        "Cloudinary multi-image upload pipeline with asset transformation",
        "React Context state management with synchronized filter queries",
      ],
      technologies: ["React", "Node.js", "Express.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Cloudinary"],
      challenges: "Managing complex property filter states and synchronous media uploads across distributed services.",
      solution: "Implemented modular REST controllers, Axios request interceptors, and optimistic UI updates.",
      github: "https://github.com/Sharanya03-stack/house-hunt1.0",
      live: null,
    },
    {
      id: "05",
      number: "05",
      title: "Skill Sync",
      shortTitle: "Skill Sync",
      tagline: "Career Readiness & Curriculum Skill-Gap Analysis Platform",
      category: "Product Design & Algorithm Engineering",
      image: "assets/images/project5.jpeg.jpg.jpeg",
      shortDescription:
        "Student industry-readiness platform providing automated skill-gap analysis, curriculum mapping, and personalized technology learning roadmaps.",
      description:
        "Engineered a digital platform to help computer science students benchmark their proficiencies against rapidly evolving software industry requirements. Implemented algorithmic skill-gap mapping to identify deficiencies, generating custom structured technology learning paths and career milestones.",
      features: [
        "Skill-gap evaluation logic comparing student skill sets against current tech job descriptions",
        "Personalized learning roadmaps with progressive milestone checkpoints",
        "Accessible, human-centered user interface designed with clear typographic hierarchy",
        "Interactive skill assessment modules with instant visual feedback",
        "Responsive cross-device layout with accessible contrast ratios",
      ],
      technologies: ["JavaScript (ES6+)", "UI/UX Design", "HTML5", "CSS3", "Figma"],
      challenges: "Designing an intuitive, non-intimidating visual experience for complex skill-gap matrices.",
      solution: "Built clean card components, clear step-by-step roadmaps, and prioritized essential metrics.",
      github: "https://github.com/Sharanya03-stack",
      live: null,
    },
  ],
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = portfolioData;
}
