/**
 * Portfolio Data — Strictly aligned with Sharanya N's resume & verified assets
 */
const portfolioData = {
  name: "Sharanya N",
  role: "Computer Science Engineer & UI/UX Designer",
  tagline: "Bridging intelligent computing, secure architecture, and immersive UI/UX design.",
  aboutShort:
    "Computer Science Engineering student specializing in IoT, Cybersecurity, and UI/UX design, building intelligent digital solutions.",
  aboutLong:
    "Passionate Computer Science professional driven by web development, UI/UX design, and cybersecurity fundamentals. Eager to leverage technical expertise in creating secure, high-performance, and user-centric applications. During my internship at Edufyi Tech Solutions, I gained hands-on experience in UI/UX design, prototyping, and responsive user experiences.",
  profileImage: "assets/images/profile.jpeg.jpg.jpeg",
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
      "Designed user-friendly interfaces for web and mobile applications. Created wireframes and interactive prototypes using Figma. Improved application usability through user-centered design principles.",
    tags: ["Figma", "UI Design", "UX Research", "Responsive Design", "Prototyping"],
  },

  research: {
    title: "The Meme Equation: Simulating Virality in the Age of Algorithms",
    authors: "Sharanya N, Arya Sham Pandit, Khan Saif S",
    department: "Department of Science and Humanities, Sri Sairam College of Engineering",
    presentation: "Presented at National-Level Conference",
    abstract:
      "In today's hyperconnected world, memes spread like wildfire. This study applies the epidemiological SIR (Susceptible-Infected-Recovered) differential equation model to simulate how memes rise, go viral, and decay across algorithmic social networks.",
    keyMetrics: [
      { label: "Modeling Paradigm", value: "Epidemiological SIR Dynamics" },
      { label: "Core Equations", value: "dS/dt, dI/dt, dR/dt" },
      { label: "Community Sample", value: "10,000 Network Nodes" },
      { label: "Key Outcome", value: "Algorithmic & Decay Mapping" },
    ],
    pdfUrl: "assets/research/The_Meme_Equation_Simulating_Virality.pdf",
    readerUrl: "assets/research/meme_equation_research_paper.html",
  },

  softSkills: [
    "Problem Solving",
    "Leadership",
    "Communication",
    "Team Work",
    "Time Management",
    "Creativity",
  ],

  skills: [
    {
      category: "Programming & Core",
      icon: "fa-solid fa-code",
      items: ["C", "Python", "C++", "Data Structures", "OOP", "Problem Solving"],
    },
    {
      category: "Web & Frameworks",
      icon: "fa-solid fa-laptop-code",
      items: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "React",
        "Next.js",
        "Node.js",
        "Express.js",
        "FastAPI",
        "Tailwind CSS",
      ],
    },
    {
      category: "Database & Cloud",
      icon: "fa-solid fa-database",
      items: ["MongoDB", "Vercel", "Supabase", "Cloudinary", "Firebase", "PostgreSQL"],
    },
    {
      category: "Design & Tools",
      icon: "fa-solid fa-palette",
      items: ["Figma", "UI/UX Design", "Wireframing", "Git", "GitHub", "VS Code", "GSAP", "AOS"],
    },
  ],

  projects: [
    {
      id: 1,
      title: "NexBasket",
      subtitle: "Hyperlocal Groceries Delivered at the Speed of Life",
      period: "Dec 2025 – Jan 2026",
      image: "assets/images/projects/nexbasket.png",
      category: "web",
      shortDescription:
        "Hyperlocal grocery platform featuring 15-minute express delivery, Smart Swap automated budget savings, and real-time inventory.",
      description:
        "Developed NexBasket, a next-generation hyperlocal grocery web application delivering fresh produce, bakery items, and organic essentials directly from local suppliers. Features automated 'Smart Swap' budget recommendations to help users save on everyday essentials, a lightning-fast 15-minute express delivery dispatch workflow, and a responsive glassmorphic UI.",
      features: [
        "15-Minute Express Delivery routing & area availability detection",
        "Automated 'Smart Swap' intelligence saving money on essentials",
        "Dynamic product catalogue with search, categories & recipe kits",
        "Interactive shopping cart with real-time totals & express checkout",
        "Modern responsive interface with authentication & order tracking",
      ],
      technologies: ["Next.js", "React.js", "Tailwind CSS", "JavaScript (ES6+)", "Vercel"],
      challenges: "Synchronizing rapid hyperlocal inventory updates and budget optimization calculations in real time.",
      solution: "Engineered responsive state architecture with optimistic updates and memoized savings algorithms.",
      github: "https://github.com/Sharanya03-stack/NexBasket",
      live: "https://nex-basket-nu.vercel.app/login",
    },
    {
      id: 2,
      title: "House Hunt",
      subtitle: "India's #1 Property Marketplace & Discovery",
      period: "Nov 2025 – Dec 2025",
      image: "assets/images/projects/househunt.png",
      category: "web",
      shortDescription:
        "Explore 50,000+ verified properties across India with zero brokerage, transparent pricing, and direct owner connections.",
      description:
        "Designed and engineered House Hunt, a premier real estate marketplace platform for browsing, filtering, and discovering properties across India. Features verified property listings, transparent pricing breakdown, direct owner inquiries, multi-category filters (For Rent, Buy, Lease), and interactive property detail modals with instant booking inquiry.",
      features: [
        "Interactive multi-criteria search (For Rent, For Buy, For Lease, price range, city)",
        "Dynamic property cards with verified badges, rental rates, and amenity tags",
        "Detailed property specification, high-res visual carousels, and owner contact modals",
        "Modern glassmorphism interface with dark theme and smooth micro-interactions",
        "Full responsive mobile-first architecture optimized for zero layout shift",
      ],
      technologies: ["Next.js", "React.js", "Tailwind CSS", "JavaScript (ES6+)", "Vercel"],
      challenges: "Delivering zero-latency filtering across tens of thousands of complex real estate listings.",
      solution: "Implemented client-side memoized search algorithms paired with responsive CSS grid architecture.",
      github: "https://github.com/Sharanya03-stack/house-hunt1.0",
      live: "https://house-hunt1-0.vercel.app/",
    },
    {
      id: 3,
      title: "Zero Degree Cafe & Brewery",
      subtitle: "Elevated Gastronomy on the RR Nagar Horizon",
      period: "Sep 2025 – Oct 2025",
      image: "assets/images/projects/zerodegree.png",
      category: "web",
      shortDescription:
        "Bengaluru's premium open-air microbrewery deck and precision coffee academy with live rooftop views and table reservations.",
      description:
        "Created an immersive web experience for Zero Degree Cafe & Microbrewery in Bengaluru. Features interactive digital menus, live rooftop deck views, craft beer and culinary showcases, online table booking workflows ('Secure Table Placement'), and rich ambient dark-mode styling with micro-animations.",
      features: [
        "Interactive digital food & beverage menu with live category tabs and pricing",
        "Online table reservation & deck placement booking workflow",
        "Luxury dark ambiance with glowing neon accents and smooth transitions",
        "Integrated location directions, event announcements, and opening hours",
        "Optimized image delivery and buttery smooth 60fps scrolling animations",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "GitHub Pages", "Responsive UI"],
      challenges: "Capturing a luxury sensory dining atmosphere while maintaining ultra-fast load times.",
      solution: "Structured lightweight vanilla JavaScript components with GPU-accelerated CSS effects.",
      github: "https://github.com/Sharanya03-stack/zero-degree",
      live: "https://sharanya03-stack.github.io/zero-degree/",
    },
    {
      id: 4,
      title: "Vehicle Counter & Flow Analysis",
      subtitle: "Computer Vision & Traffic Telemetry Pipeline",
      period: "Jul 2025 – Aug 2025",
      image: "assets/images/projects/vehicle_counter.png",
      category: "ai",
      shortDescription:
        "Production-grade computer vision pipeline for automated vehicle detection, multi-object tracking, and virtual gate crossing analysis.",
      description:
        "Built a production-grade traffic monitoring application utilizing computer vision models (YOLO / OpenCV) deployed via Streamlit. Processes uploaded video sources, VIRAT challenge benchmarks, and multi-lane highway simulations to compute real-time crossing counts, inbound/outbound flow directions, and throughput FPS telemetry.",
      features: [
        "Automated vehicle detection and multi-object tracking via deep learning",
        "Virtual gate line-crossing detection with direction classification (Inbound / Outbound)",
        "Real-time vision stream processing and live FPS telemetry",
        "Support for video archives, ZIP uploads, benchmark video datasets, and local streams",
        "Interactive Streamlit web dashboard with flow analytics, logs, and telemetry charts",
      ],
      technologies: ["Python", "Streamlit", "OpenCV", "YOLO", "Computer Vision", "NumPy"],
      challenges: "Maintaining high-speed inference and real-time gate crossing calculations across dense video streams.",
      solution: "Optimized detection pipelines with frame-skipping heuristics and efficient tensor operations.",
      github: "https://github.com/Sharanya03-stack/vehicle-counter",
      live: "https://vehicle-counter-q7cek3rvkrvaxnjexnvpyz.streamlit.app/",
    },
    {
      id: 5,
      title: "Apex University Web Portal",
      subtitle: "Academic & Technical Event Platform",
      period: "May 2025 – Jun 2025",
      image: "assets/images/projects/apex_university.png",
      category: "web",
      shortDescription:
        "Refining Intelligence — interactive academic portal with event timelines, department tracks, dynamic schedules, and campus admissions.",
      description:
        "Engineered an interactive web portal for Apex University (NAAC A++ Accredited) featuring academic department showcases, technical event timelines, interactive campus facilities, student achievement portals, and admissions inquiries. Designed with a clean, authoritative academic aesthetic and responsive navigation.",
      features: [
        "Academic department tracks (Engineering, Robotics, Industrial Research)",
        "Technical event timelines, rules accordions, and competition registrations",
        "Responsive multi-tier navigation menu with department dropdowns",
        "Interactive campus facility showcases and placement statistics",
        "High-performance responsive design across mobile, tablet, and desktop",
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Git"],
      challenges: "Organizing extensive multi-department institutional information with intuitive navigation.",
      solution: "Designed hierarchical modular sections and accessible dropdown navigation components.",
      github: "https://github.com/Sharanya03-stack/browser-battle",
      live: null,
    },
    {
      id: 6,
      title: "CI/CD Triage AI Agent",
      subtitle: "Autonomous DevOps Pipeline Failure Diagnosis System",
      period: "Aug 2025 – Sep 2025",
      image: "assets/images/projects/cicd_triage.png",
      category: "ai",
      shortDescription:
        "Triage control panel with multi-agent routing, CascadeFlow FinOps token savings, hindsight memory, and automated crash log root cause diagnosis.",
      description:
        "Developed an intelligent pipeline failure diagnosis and recovery assistant to automate DevOps troubleshooting. Features a Triage Control Panel with drag-and-drop log ingestion, CascadeFlow FinOps Ledger calculating speculative token savings, Hindsight Memory Ledger tracking historical incident recurrences, and quick-test simulation vaults for automated root cause categorization.",
      features: [
        "Drag & Drop CI/CD log file ingestion with regex pattern categorization",
        "CascadeFlow FinOps ledger tracking speculative token savings and inference efficiency",
        "Multi-Agent workspace routing with assigned confidence tiers",
        "Hindsight memory ledger preserving historical incident traces",
        "Interactive simulation vault for network timeouts and build test failures",
      ],
      technologies: ["Python", "FastAPI", "AI Agents", "JavaScript", "HTML5", "CSS3", "REST APIs"],
      challenges: "Parsing noisy multi-thousand line build failure dumps and identifying precise failure points with minimal latency.",
      solution: "Engineered multi-agent routing pipelines with speculative drafting and structured incident ledgers.",
      github: "https://github.com/Sharanya03-stack/AI-agent",
      live: null,
    },
    {
      id: 7,
      title: "Skill Sync",
      subtitle: "AI-Powered Talent & Collaboration Matching Platform",
      period: "Mar 2025 – Apr 2025",
      image: "assets/images/projects/skillsync.png",
      category: "web",
      shortDescription:
        "Intelligent matchmaking platform connecting developers and students based on verified skill matrices, hackathon team formation, and compatibility scoring.",
      description:
        "Designed and developed Skill Sync, a collaborative platform that pairs developers, designers, and students for hackathons and software projects. Analyzes verified skill matrices, project requirements, and working preferences to generate optimal team recommendations with real-time compatibility scores.",
      features: [
        "Verified skill matrix profiles with programming, design, and domain competencies",
        "AI-powered hackathon team matching and compatibility scoring algorithms",
        "Interactive project collaboration workspace with role-based member requests",
        "Real-time applicant filtering and skill tag search",
        "Responsive dark glassmorphism dashboard interface",
      ],
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JavaScript"],
      challenges: "Calculating multi-dimensional developer compatibility scores in real time without lag.",
      solution: "Implemented weighted graph-matching algorithms and optimized client-side state caching.",
      github: "https://github.com/Sharanya03-stack/SkillSync",
      live: null,
    },
  ],
};
