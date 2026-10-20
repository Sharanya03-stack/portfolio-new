/**
 * Portfolio Data — Curated projects, skills, experience, education & research for Sharanya N
 * Positioned for freelance client acquisition and practical web engineering.
 */
"use strict";

const portfolioData = {
  name: "Sharanya N",
  role: "Freelance Web Developer & UI/UX Designer",
  tagline: "I design and build websites that help businesses grow.",
  aboutShort:
    "I build responsive business websites, full-stack web applications, and intuitive dashboards that turn ideas into practical digital products. I combine thoughtful UI/UX design with clean, maintainable code.",
  aboutLong:
    "I work on practical web development projects, helping turn requirements into responsive interfaces and functional applications. My experience includes building project features, integrating backend services, refining user experiences, and improving existing software.",
  profileImage: "assets/images/profile.jpg",
  resume: "assets/resume/resume_3.pdf",
  researchPdf: "assets/research/The_Meme_Equation_Simulating_Virality.pdf",
  phone: "+91-6362813866",
  phoneTel: "+916362813866",
  email: "sharureddy13@gmail.com",
  github: "https://github.com/Sharanya03-stack",
  linkedin: "https://www.linkedin.com/in/sharanya-n-203b7932a",
  location: "Bangalore, India",

  services: [
    {
      id: "business-websites",
      title: "Business Websites & Landing Pages",
      icon: "fa-solid fa-display",
      description:
        "Fast, mobile-first websites with clean typography, clear information architecture, and lead capture workflows that build client credibility and drive inquiries.",
      deliverables: ["Responsive Multi-Page Sites", "Interactive Digital Menus", "Lead Capture & Booking Forms", "SEO & Speed Optimization"],
    },
    {
      id: "fullstack-apps",
      title: "Full-Stack Web Applications",
      icon: "fa-solid fa-layer-group",
      description:
        "Custom web applications engineered with Next.js, React, and FastAPI, featuring multi-criteria search, dynamic state management, and reliable API integrations.",
      deliverables: ["Product Discovery & Catalogs", "Interactive Shopping Carts", "RESTful API Integration", "Authentication & Relational DBs"],
    },
    {
      id: "dashboards",
      title: "Dashboards & Admin Panels",
      icon: "fa-solid fa-chart-line",
      description:
        "Data-focused administrative dashboards and telemetry consoles that organize complex datasets into intuitive charts, real-time metrics, and manageable workflows.",
      deliverables: ["Operational Metric Cards", "Interactive Charting (Recharts)", "Real-Time Activity Logs", "Clean Data Tables & Filters"],
    },
    {
      id: "uiux-design",
      title: "UI/UX Design & Prototyping",
      icon: "fa-solid fa-pen-ruler",
      description:
        "User-centered design systems, structured wireframes, and interactive Figma prototypes that validate application flows and layout before writing code.",
      deliverables: ["Figma Wireframes & User Flows", "Component Design Systems", "Interactive Clickable Prototypes", "Usability & Layout Audits"],
    },
    {
      id: "practical-ai",
      title: "Practical AI & API Integrations",
      icon: "fa-solid fa-brain",
      description:
        "Purposeful integrations of machine learning models, telemetry classification, and third-party APIs that solve real domain problems without unnecessary complexity.",
      deliverables: ["Scikit-learn / ML Pipelines", "Anomaly Detection Telemetry", "Third-Party REST Integrations", "FastAPI Service Endpoints"],
    },
  ],

  freelanceExperience: [
    {
      role: "Freelance Web Developer & UI/UX Designer",
      organization: "Independent Practice",
      period: "2025 – Present",
      location: "Bangalore, India & Remote",
      description:
        "I work on practical web development projects, helping turn client and stakeholder requirements into responsive interfaces and functional applications. My experience includes building project features, integrating backend services, refining user experiences, and deploying production-ready software.",
      highlights: [
        "Delivered full-stack applications and business websites including NexBasket (e-commerce), House Hunt (real estate platform), and Zero Degree (hospitality website).",
        "Engineered end-to-end component systems in Next.js, React, TypeScript, and Tailwind CSS with strict attention to mobile responsiveness and web accessibility.",
        "Integrated Python/FastAPI backend APIs and telemetry services for data-driven dashboards like Spy-fi.",
      ],
      tags: ["Next.js", "React", "TypeScript", "Python / FastAPI", "Figma", "Tailwind CSS", "Client Delivery"],
    },
    {
      role: "UI/UX Design Intern",
      organization: "Edufyi Tech Solutions",
      period: "Aug 2025 – Oct 2025",
      location: "Bangalore, India",
      description:
        "Designed responsive user interfaces for web and mobile products. Built structured wireframes, component libraries, and interactive Figma prototypes that clarified navigation hierarchy and improved user task completion.",
      highlights: [
        "Created user flows, journey maps, and high-fidelity screen mockups aligned with product requirements.",
        "Maintained component design libraries for consistent cross-device UI implementation.",
        "Collaborated with developers and project leads during sprint design reviews.",
      ],
      tags: ["Figma", "UI/UX Design", "Component Systems", "Wireframing", "Interactive Prototyping"],
    },
  ],

  education: {
    institution: "Sri Sairam College of Engineering, Bangalore",
    degree: "Bachelor of Engineering (B.E.) in Computer Science Engineering",
    specialization: "Specialization: CSE (IoT, Cybersecurity including Blockchain)",
    period: "2024 – 2028",
  },

  certifications: [
    { title: "IBM SkillsBuild: Generative AI Fundamentals", issuer: "IBM" },
    { title: "IBM SkillsBuild: Artificial Intelligence Fundamentals", issuer: "IBM" },
    { title: "IBM SkillsBuild: Prompt Engineering", issuer: "IBM" },
    { title: "NPTEL: Cloud Computing (Elite Certificate)", issuer: "NPTEL / IIT" },
    { title: "COMEDKARES: Technical Innovation Workshop", issuer: "COMEDKARES" },
  ],

  achievements: [
    {
      title: "IBM AI Hackathon Winner",
      description: "Awarded first place for designing and building an applied AI prototype solving real workflow challenges.",
      icon: "fa-solid fa-trophy",
    },
    {
      title: "Conference Research Presenter",
      description: "Selected to present mathematical modeling research on information diffusion in algorithmic networks.",
      icon: "fa-solid fa-microphone-lines",
    },
    {
      title: "Academic Merit Recognition",
      description: "Recipient of merit-based academic scholarship and 'A' Grade in Advanced C Programming.",
      icon: "fa-solid fa-award",
    },
    {
      title: "Browser Battle Finalist",
      description: "Built the multi-department Apex University portal from scratch in competition setting.",
      icon: "fa-solid fa-medal",
    },
  ],

  research: {
    title: "The Meme Equation: Simulating Virality in the Age of Algorithms",
    authors: "Sharanya N, Arya Sham Pandit, Khan saif S",
    institution: "Department of Science and Humanities, Sri Sairam College of Engineering",
    emails: "sce24ic034@sairamtap.edu.in, sce24ic041@sairamtap.edu.in, sce24am054@sairamtap.edu.in",
    summary:
      "Applies the epidemiological SIR (Susceptible–Infected–Recovered) mathematical framework to simulate how viral internet content spreads across algorithmic social networks. Evaluates transmission rate (β) against attention decay (γ) in a 10,000-user community, demonstrating how recommendation algorithms, influencer reach, and user fatigue determine whether content peaks or vanishes.",
    keywords: ["Meme Virality", "SIR Epidemiological Model", "Social Networks", "Information Diffusion", "Differential Equations"],
    pdfUrl: "assets/research/The_Meme_Equation_Simulating_Virality.pdf",
    readerUrl: "assets/research/meme_equation_research_paper.html",
  },

  skills: [
    {
      category: "Frontend & UI/UX Design",
      icon: "fa-solid fa-laptop-code",
      description: "Modern frontend frameworks, responsive UI architecture, and component-driven user interfaces.",
      items: [
        "HTML5 & Semantic CSS3",
        "JavaScript (ES6+)",
        "TypeScript",
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "Responsive Web Design",
        "Figma (Wireframing & Prototyping)",
      ],
      relatedProjects: "NexBasket, House Hunt, Zero Degree, Spy-fi, Apex University",
    },
    {
      category: "Backend & API Integration",
      icon: "fa-solid fa-server",
      description: "Server-side routing, RESTful API architecture, and database integrations for scalable web apps.",
      items: [
        "Python",
        "FastAPI",
        "RESTful APIs",
        "PostgreSQL / SQL",
        "Node.js & Express",
        "Vercel Deployment",
        "Git & GitHub Version Control",
      ],
      relatedProjects: "Spy-fi, NexBasket",
    },
    {
      category: "Practical AI & Dashboards",
      icon: "fa-solid fa-chart-line",
      description: "Data visualization, telemetry tracking, and practical machine learning integration.",
      items: [
        "Machine Learning (scikit-learn)",
        "Interactive Dashboards",
        "Data Visualization (Recharts / Chart.js)",
        "Telemetry & Flow Classification",
        "Explainable AI Interfaces",
      ],
      relatedProjects: "Spy-fi Security Intelligence Console",
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
        "Interactive frontend prototype deployed on Vercel using curated product catalog data and simulated dispatch tracking.",
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
      title: "Spy-fi — AI-Based Cyber Threat Detection",
      categoryLabel: "AI & Cybersecurity Platform",
      subtitle: "One-Way Network Threat Detection & SOC Investigation Dashboard",
      period: "Jan 2026 – Feb 2026",
      image: "assets/images/projects/spy_fi.png",
      category: "ai",
      problem:
        "Critical industrial and enterprise networks deploy unidirectional data diodes to prevent data exfiltration, but incoming one-way traffic can still carry hidden port scans, volumetric denial-of-service bursts, and malicious payloads without allowing traditional two-way TCP handshake inspection.",
      contribution:
        "Engineered the full-stack security intelligence console in Next.js, TypeScript, and Tailwind CSS; structured the 12+ dimensional flow feature extraction contract for the FastAPI machine-learning inference pipeline; and built the real-time SOC investigation dashboard with telemetry graphs and XAI alert reasoning.",
      shortDescription:
        "AI-powered cybersecurity platform for analyzing unidirectional network traffic and identifying cyber threats, with an explainable AI security operations dashboard.",
      description:
        "Spy-fi is an AI-powered cybersecurity platform designed to inspect and classify network traffic passing into high-security unidirectional (data diode) network environments. It monitors multi-dimensional flow metrics to detect port scans, DoS volumetric bursts, brute force attempts, and protocol anomalies, providing SOC analysts with quantified confidence scores, anomaly rationales, and recommended remediation steps.",
      scopeNote:
        "Full-stack Next.js and TypeScript security intelligence console deployed on Vercel with simulated unidirectional packet stream feeds and FastAPI ML schema contracts.",
      features: [
        "Unidirectional IP telemetry inspection analyzing packet velocity, TCP flags, and connection distributions",
        "Multi-class threat detection identifying Port Scanning, DoS / DDoS, Brute Force, and Protocol Anomalies",
        "Explainable AI (XAI) security console providing anomaly rationales, confidence scores, and remediation steps",
        "Real-time SOC investigation dashboard with telemetry charts (Recharts), live alerts, and risk levels",
      ],
      technologies: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Python",
        "FastAPI",
        "scikit-learn",
        "Vercel",
      ],
      github: "https://github.com/Sharanya03-stack/Spy-fi",
      live: "https://spy-fi-liart.vercel.app/",
    },
    {
      id: 5,
      featured: true,
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
  ],
};
