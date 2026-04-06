export const personalInfo = {
  name: "Gaurav Dinesh Pawar",
  title: "Software Development Engineer",
  email: "gauravpawar@csu.fullerton.edu",
  phone: "(714)-519-7299",
  linkedin: "https://www.linkedin.com/in/gaurav-pawar-10/",
  github: "https://github.com/ruiner28",
  twitter: "https://x.com/gauravasks",
  website: "gauravpawar.com",
  resume: "https://drive.google.com/file/d/1JL4JGMsUvJqmQJICa-rW4i8F6jA70F59/view",
  aboutSummary: "Software engineer transitioning into applied AI, combining 2+ years of enterprise systems experience with hands-on production work in LLM integration, real-time architectures, and vector search. MS Computer Science candidate with a track record of building and shipping full-stack AI products.",
  heroHeadline: "I build scalable software experiences with clean engineering and modern product thinking."
};

export const skills = {
  languages: ["Python", "Java", "TypeScript", "JavaScript", "SQL"],
  backend: ["FastAPI", "Spring Boot", "NestJS", "REST", "GraphQL", "gRPC", "Kafka", "OpenAPI/Swagger", "Node.js"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "pgvector", "Firestore (NoSQL)"],
  frontend: ["ReactJS", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  cloudDevOps: ["AWS (EC2, EKS, S3, EMR)", "GCP", "Docker", "Linux", "CI/CD (GitHub Actions, Jenkins)"],
  aiMl: ["LLM API integration", "Prompt Engineering", "Hugging Face Transformers", "RAG", "Gemini", "Genkit"]
};

export const experience = [
  {
    company: "MarketEQ Digital",
    role: "Software Engineer Intern",
    period: "05/2025 – 08/2025",
    location: "Miami, FL (Remote)",
    technologies: ["NestJS", "Stripe", "PostgreSQL", "Docker"],
    bullets: [
      "Engineered 4 scalable NestJS microservices (Wallet, Checkout, ACH, Wire) from the ground up, establishing core payment routing architecture.",
      "Modernized core payment flows by migrating to the Payment Intents API, ensuring 100% system compliance.",
      "Automated end-to-end financial reconciliation via QuickBooks APIs, eliminating 60% of manual accounting overhead.",
      "Reduced deployment latency by 40% and accelerated PR reviews by 30% via Docker containerization and DeepSource CI."
    ]
  },
  {
    company: "Accenture",
    role: "Software Engineer",
    period: "12/2022 – 07/2024",
    location: "Pune, India",
    technologies: ["Spring Boot", "AWS", "JavaScript", "SQL", "React"],
    bullets: [
      "Engineered premium calculation logic for Accenture Life Insurance Platform, supporting 1.6M+ policyholders.",
      "Re-architected a legacy javascript portal into a modular React application; earned the Client Value Creation Award for decreasing latency by 20%.",
      "Achieved a 40% latency reduction in policy workflows by implementing DTO projections.",
      "Automated AWS release workflows via Jenkins (CI/CD), accelerating deployment frequency by 25%."
    ]
  }
];

export const projects = [
  {
    title: "InterviewAI",
    period: "11/2025 – Present",
    techStack: ["NestJS", "Next.js", "Docker", "PostgreSQL", "Supabase", "pgvector", "Genkit"],
    github: "https://github.com/ruiner28/interviewai", // assuming from original structure
    live: "https://interviewai-web.vercel.app/",
    image: "/interviewAI.png",
    description: "Multi-modal AI interview platform with real-time feedback and sub-200ms latency.",
    bullets: [
      "Architected a modular monolith and WebSocket driven audio microservice for 6 distinct AI interview modalities.",
      "Developed a system design evaluation engine with Google Genkit and pgvector for RAG, achieving sub-50ms vector search latency.",
      "Deployed with Redis backed rate limiting and Docker, maintaining 99% uptime."
    ]
  },
  {
    title: "Lumora",
    period: "09/2025 – Present",
    techStack: ["TypeScript", "Next.js", "Node.js", "LLMs", "Firebase", "Firestore"],
    github: "https://github.com/LumoraaWellness",
    live: "https://lumoraa.app/",
    image: "/lumora.png",
    description: "Stateful LLM backend application with recursive state-compression and context management.",
    bullets: [
      "Engineered a recursive state-compression engine dynamically generating session summaries, reducing token payload by 60%.",
      "Architected an async pipeline for real-time sentiment analysis enforcing strict Firestore RBAC."
    ]
  }
];

export const education = [
  {
    degree: "Master Of Science (MS), Computer Science",
    institution: "California State University Fullerton",
    period: "08/2024 – 05/2026",
    details: "GPA: 3.94 | Courses: Artificial Intelligence, Adv. Database Management, Modern Software Management, Web-Backend"
  },
  {
    degree: "Bachelor Of Engineering (BE), Information Technology",
    institution: "Savitribai Phule Pune University",
    period: "07/2018 – 07/2022",
    details: "GPA: 3.60 | Courses: Cloud Computing, Design & Analysis of Algo., Operating Systems, Machine Learning"
  }
];

export const achievements = [
  {
    title: "Glitch by Google UCLA Hacks",
    description: "Built VisualCS, an interactive CS learning platform transforming research papers into animated diagrams using LLM-driven pipelines."
  },
  {
    title: "Hackathon Winner",
    description: "Created an AI customer service chatbot integrated into an Insurance app that reduced query resolution time by 30% against 20+ teams."
  },
  {
    title: "Graduate Teaching Associate",
    description: "Facilitated technical labs for Compilers and Languages, mentoring 100+ students on Abstract Syntax Trees and Lexical Analysis."
  }
];
