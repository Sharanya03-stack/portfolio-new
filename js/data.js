/**
 * Portfolio Data — Verified projects, skills, experience, education & research for Sharanya N
 */
"use strict";

const portfolioData = {
  name: "Sharanya N",
  role: "Freelance Web & Full-Stack Developer",
  tagline: "I build websites and web applications that solve real business problems.",
  aboutShort:
    "Full-stack web developer and UI/UX designer in Bangalore building responsive business websites, marketplace platforms, dashboards, and practical AI integrations.",
  aboutLong:
    "I design and engineer fast, accessible websites and web applications for businesses, startups, and student organizations. My workflow pairs Figma UI/UX prototyping with clean frontend and full-stack implementation in React, Next.js, Python/FastAPI, and modern HTML/CSS/JavaScript.",
  profileImage: "assets/images/profile.jpg",
  resume: "assets/resume/resume_3.pdf",
  phone: "+91-6362813866",
  phoneTel: "+916362813866",
  email: "sharureddy13@gmail.com",
  github: "https://github.com/Sharanya03-stack",
  linkedin: "https://www.linkedin.com/in/sharanya-n-203b7932a",
  location: "Bangalore, India",

  education: {
    institution: "Sri Sairam College of Engineering, Bangalore",
    degree: "Bachelor of Engineering (B.E.) in Computer Science Engineering",
    specialization: "Specialization: CSE (IoT, Cybersecurity including Blockchain)",
    period: "2024 – 2028",
  },

  experience: {
    role: "UI/UX Design Intern",
    company: "Edufyi Tech Solutions",
    period: "Aug 2025 – Oct 2025",
    description:
      "Designed responsive web and mobile interfaces for client products. Created structured wireframes, component libraries, and interactive Figma prototypes to improve navigation clarity and task completion.",
    tags: ["Figma", "UI Design", "UX Research", "Responsive Layouts", "Interactive Prototyping"],
  },

  research: {
    title: "The Meme Equation: Simulating Virality in the Age of Algorithms",
    authors: "Sharanya N, Arya Sham Pandit, Khan Saif S",
    department: "Department of Science and Humanities, Sri Sairam College of Engineering",
    presentation: "Presented at National-Level Conference",
    abstract:
      "Adapts the epidemiological SIR (Susceptible–Infected–Recovered) differential equation model to simulate how digital content spreads, peaks, and decays across algorithmic social networks.",
    readerUrl: "assets/research/meme_equation_research_paper.html",
    printUrl: "assets/research/meme_equation_research_paper.html?print=1",
  },

  skills: [
    {
      category: "Frontend & Web Development",
      tier: "Used in Shipped Projects",
      icon: "fa-solid fa-laptop-code",
      description: "Core technologies used to build and deploy my live web applications and responsive interfaces.",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Responsive Web Design",
      ],
    },
    {
      category: "Backend, Data & AI Workflows",
      tier: "Used in Shipped Projects",
      icon: "fa-solid fa-server",
      description: "Server-side frameworks, databases, and computer vision / AI tools applied in functional prototypes.",
      items: [
        "Python",
        "FastAPI",
        "Node.js",
        "Express.js",
        "REST APIs",
        "Streamlit",
        "OpenCV & YOLO",
        "MongoDB",
        "MySQL",
      ],
    },
    {
      category: "UI/UX, Deployment & Tooling",
      tier: "Used in Daily Workflow",
      icon: "fa-solid fa-pen-ruler",
      description: "Design, version control, and cloud hosting platforms used from wireframe to deployment.",
      items: [
        "Figma",
        "Wireframing & Prototyping",
        "Git & GitHub",
        "Vercel",
        "GitHub Pages",
        "Supabase",
        "Cloudinary",
        "Linux CLI",
        "VS Code",
      ],
    },
    {
      category: "CS Foundations & Academic Coursework",
      tier: "Academic & Certified",
      icon: "fa-solid fa-graduation-cap",
      description: "Foundational engineering languages and IBM SkillsBuild / NPTEL certified coursework.",
      items: [
        "C",
        "C++",
        "Java",
        "Data Structures & OOP",
        "IBM watsonx.ai & RAG Basics",
        "Prompt Engineering",
        "Cloud Computing Fundamentals",
        "Cybersecurity & IoT Basics",
      ],
    },
  ],

  projects: [
    {
      id: 1,
      featured: true,
      title: "NexBasket",
      categoryLabel: "E-Commerce Web Application",
      subtitle: "Hyperlocal Grocery & Smart Budget Platform",
      period: "Dec 2025 – Jan 2026",
      image: "assets/images/projects/nexbasket.png",
      category: "web",
      problem:
        "Local shoppers need a fast mobile-first ordering flow that surfaces lower-cost product alternatives without forcing them to compare items manually across categories.",
      contribution:
        "Sole developer and UI designer. Designed the storefront interface, implemented the Next.js/React component architecture, built the interactive cart and 'Smart Swap' budget calculator, and deployed the live prototype on Vercel.",
      shortDescription:
        "Responsive grocery e-commerce web app with product search, category filtering, 'Smart Swap' budget recommendations, and interactive cart checkout.",
      description:
        "NexBasket is a responsive hyperlocal grocery web application designed for quick product discovery and budget-conscious cart building. It includes category filtering, recipe kits, an automated 'Smart Swap' savings suggestion workflow, and a streamlined checkout interface.",
      scopeNote:
        "Frontend & interactive state prototype deployed on Vercel using curated product catalog data and simulated dispatch tracking.",
      features: [
        "Automated 'Smart Swap' budget comparison suggesting lower-cost alternatives in the cart",
        "Dynamic product catalog with category tabs, instant search, and recipe bundle kits",
        "Real-time shopping cart state with itemized savings breakdown and checkout flow",
        "Responsive mobile-first layout with authentication view and delivery status steps",
      ],
      technologies: ["Next.js", "React.js", "Tailwind CSS", "JavaScript (ES6+)", "Vercel"],
      github: "https://github.com/Sharanya03-stack/NexBasket",
      live: "https://nex-basket-nu.vercel.app/login",
    },
    {
      id: 2,
      featured: true,
      title: "House Hunt",
      categoryLabel: "Real Estate Discovery Platform",
      subtitle: "Property Listing, Filtering & Inquiry Web App",
      period: "Nov 2025 – Dec 2025",
      image: "assets/images/projects/househunt.png",
      category: "web",
      problem:
        "Property seekers struggle with cluttered listing portals that obscure pricing details and require multiple page reloads to filter by transaction type, city, or budget.",
      contribution:
        "Designed and built the end-to-end frontend application, including multi-criteria client-side search and filtering, property specification modals, and responsive listing cards.",
      shortDescription:
        "Real estate discovery platform featuring instant multi-criteria property filtering (Rent, Buy, Lease), pricing breakdowns, and inquiry modals.",
      description:
        "House Hunt is a real estate listing and discovery web application built to make browsing residential properties clear and fast. Users can filter properties by transaction type (Rent, Buy, Lease), location, and budget, inspect amenities in a detail view, and initiate owner inquiries.",
      scopeNote:
        "Interactive frontend web application deployed on Vercel demonstrating client-side filtering and responsive UI architecture.",
      features: [
        "Instant multi-criteria filtering across Rent, Buy, and Lease categories, cities, and price ranges",
        "Structured property cards highlighting pricing, configuration, and amenity badges",
        "Detailed property specification modal with gallery preview and inquiry form",
        "Responsive CSS grid layout tested across desktop, tablet, and mobile viewports",
      ],
      technologies: ["Next.js", "React.js", "Tailwind CSS", "JavaScript (ES6+)", "Vercel"],
      github: "https://github.com/Sharanya03-stack/house-hunt1.0",
      live: "https://house-hunt1-0.vercel.app/",
    },
    {
      id: 3,
      featured: true,
      title: "Zero Degree Cafe & Brewery",
      categoryLabel: "Hospitality & Business Website",
      subtitle: "Interactive Digital Menu & Table Reservation Site",
      period: "Sep 2025 – Oct 2025",
      image: "assets/images/projects/zerodegree.png",
      category: "web",
      problem:
        "Restaurants and cafes often rely on static PDF menus that are difficult to read on mobile phones and lack a direct table reservation request flow.",
      contribution:
        "Created the brand layout, interactive tabbed food and beverage menu, table reservation form workflow, and responsive CSS architecture.",
      shortDescription:
        "Hospitality website featuring an interactive categorized digital menu, venue showcase, and online table reservation workflow.",
      description:
        "A business website tailored for a dining and microbrewery venue. It replaces static PDF menus with a mobile-friendly, filterable digital menu, showcases the venue spaces, and provides an integrated table booking interface with location and hours information.",
      scopeNote:
        "Static frontend hospitality website hosted on GitHub Pages with client-side menu filtering and reservation form validation.",
      features: [
        "Interactive digital food and beverage menu with live category switching and pricing",
        "Table reservation request workflow with date, guest count, and seating preference inputs",
        "Venue gallery, operating hours, and location directions section",
        "Lightweight vanilla HTML, CSS, and JavaScript implementation for fast mobile loading",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "GitHub Pages", "Responsive Design"],
      github: "https://github.com/Sharanya03-stack/zero-degree",
      live: "https://sharanya03-stack.github.io/zero-degree/",
    },
    {
      id: 4,
      featured: true,
      title: "Vehicle Counter & Flow Analysis",
      categoryLabel: "AI & Computer Vision Dashboard",
      subtitle: "Automated Traffic Detection & Telemetry App",
      period: "Jul 2025 – Aug 2025",
      image: "assets/images/projects/vehicle_counter.png",
      category: "ai",
      problem:
        "Manual traffic counting from surveillance video is slow and error-prone when analyzing directional lane flow and vehicle crossing counts.",
      contribution:
        "Built the Python computer vision processing pipeline using YOLO/OpenCV and created the interactive Streamlit analytics dashboard for video upload and live telemetry visualization.",
      shortDescription:
        "Python & Streamlit computer vision dashboard for vehicle detection, multi-object tracking, and directional line-crossing counts.",
      description:
        "An applied computer vision web application deployed on Streamlit Cloud. It processes uploaded traffic videos or sample highway streams using YOLO and OpenCV to detect vehicles, track movement across virtual gate lines, and log inbound/outbound traffic counts.",
      scopeNote:
        "Live Python Streamlit application running real OpenCV/YOLO inference on uploaded or sample video streams.",
      features: [
        "Automated vehicle detection and multi-object tracking on uploaded video files",
        "Virtual gate line-crossing logic classifying Inbound and Outbound traffic flow",
        "Live processing telemetry displaying frame rate (FPS) and cumulative crossing counts",
        "Streamlit dashboard with video playback, event logs, and summary metrics",
      ],
      technologies: ["Python", "Streamlit", "OpenCV", "YOLO", "NumPy"],
      github: "https://github.com/Sharanya03-stack/Vehicle-counter",
      live: "https://vehicle-counter-q7cek3rvkrvaxnjexnvpyz.streamlit.app/",
    },
    {
      id: 5,
      featured: false,
      title: "Browser Battle — Apex University Portal",
      categoryLabel: "Competition Frontend Build",
      subtitle: "Academic & Technical Event Web Portal",
      period: "Apr 2025 – Jun 2025",
      image: "assets/images/projects/apex_university.png",
      category: "web",
      problem:
        "Built from scratch for the college Browser Battle web design competition to organize multi-department academic tracks, event timelines, and campus information into a cohesive portal.",
      contribution:
        "Designed and coded the complete multi-section institutional portal from scratch using semantic HTML, custom CSS layouts, and interactive JavaScript navigation.",
      shortDescription:
        "Competition-built academic and technical event portal featuring department tracks, event schedules, and admissions sections.",
      description:
        "Developed for the Browser Battle competition, this project presents an institutional web portal for 'Apex University' with department showcases, technical competition schedules, campus facility highlights, and responsive multi-tier navigation.",
      scopeNote:
        "Frontend competition project deployed on Vercel and hosted in the browser-battle repository.",
      features: [
        "Structured academic department tracks and research showcase sections",
        "Interactive event timeline and competition schedule layout",
        "Responsive navigation header and mobile drawer menu",
        "Built from scratch with pure HTML5, CSS3, and vanilla JavaScript",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive UI", "Vercel"],
      github: "https://github.com/Sharanya03-stack/browser-battle",
      live: "https://browser-battle-eight.vercel.app",
    },
    {
      id: 6,
      featured: false,
      title: "CI/CD Triage AI Agent",
      categoryLabel: "Developer Tooling Prototype",
      subtitle: "Pipeline Log Analysis & Failure Categorization Dashboard",
      period: "May 2025 – Aug 2025",
      image: "assets/images/projects/cicd_triage.png",
      category: "ai",
      problem:
        "Developers spend significant time scanning lengthy CI/CD build logs to isolate recurring test failures, dependency errors, and timeout issues.",
      contribution:
        "Built the FastAPI backend routes and frontend triage dashboard interface supporting log file upload, regex/LLM failure categorization, and incident history tracking.",
      shortDescription:
        "DevOps troubleshooting dashboard for ingesting CI/CD build logs, categorizing failure patterns, and reviewing incident history.",
      description:
        "An AI-assisted pipeline troubleshooting prototype that ingests CI/CD failure logs, identifies error signatures, routes incidents by severity, and displays diagnostic summaries alongside a simulated token-efficiency ledger.",
      scopeNote:
        "Prototype dashboard with local/sample simulation vaults and Python FastAPI log parsing endpoints.",
      features: [
        "Drag-and-drop CI/CD log ingestion with pattern-based error categorization",
        "Quick-test simulation presets for network timeouts and unit test failures",
        "Incident history panel for comparing recurring build failure signatures",
        "Clean dark-mode diagnostic interface built with HTML, CSS, JavaScript, and FastAPI",
      ],
      technologies: ["Python", "FastAPI", "JavaScript", "HTML5", "CSS3"],
      github: "https://github.com/Sharanya03-stack/cicd_triage_agent",
      live: null,
    },
    {
      id: 7,
      featured: false,
      title: "Skill Sync",
      categoryLabel: "Full-Stack Concept & Prototype",
      subtitle: "Student & Developer Team Matching Interface",
      period: "Mar 2025 – Apr 2025",
      image: "assets/images/projects/skillsync.png",
      category: "web",
      problem:
        "Students forming hackathon and capstone teams often lack a structured way to discover peers with complementary frontend, backend, or design skills.",
      contribution:
        "Designed the dashboard UI and built the skill-tag filtering and compatibility scoring prototype.",
      shortDescription:
        "Collaborative team-formation prototype matching students and developers by complementary technical skills and project roles.",
      description:
        "Skill Sync is a team-discovery dashboard concept designed for student hackathons and collaborative software projects. It visualizes candidate skill matrices, role requirements, and compatibility scores to help form balanced project teams.",
      scopeNote:
        "UI/UX and full-stack architecture prototype demonstrating skill-matrix visualization and role filtering.",
      features: [
        "Developer profile cards with skill matrix visualizations and role tags",
        "Compatibility scoring view for matching complementary technical skills",
        "Project workspace listing open team roles and collaboration requests",
        "Responsive dashboard layout",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com/Sharanya03-stack/SkillSync",
      live: null,
    },
  ],
};
