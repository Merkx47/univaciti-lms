// Nigerian name pools for generating diverse data
const nigerianFirstNamesMale = [
  "Chukwuemeka", "Oluwaseun", "Babatunde", "Ikechukwu", "Adewale", "Chibueze", "Olumide", "Tochukwu",
  "Ayodele", "Obinna", "Chinedu", "Emeka", "Olalekan", "Damilare", "Kelechi", "Uchenna", "Nnamdi",
  "Oluwafemi", "Adebayo", "Chijioke", "Kayode", "Onyekachi", "Temitope", "Yusuf", "Ibrahim", "Musa",
  "Abdullahi", "Aliyu", "Suleiman", "Hassan", "Abubakar", "Usman", "Lawal", "Bello", "Garba",
  "Taiwo", "Kehinde", "Segun", "Femi", "Gbenga", "Kunle", "Tunde", "Wale", "Jide", "Sola",
  "Dayo", "Lanre", "Rotimi", "Niyi", "Bode"
];

const nigerianFirstNamesFemale = [
  "Ngozi", "Adaeze", "Folake", "Chidinma", "Oluwabunmi", "Aisha", "Fatima", "Amina", "Halima",
  "Blessing", "Chiamaka", "Chinasa", "Nneka", "Adanna", "Ifeoma", "Obiageli", "Chinyere", "Uju",
  "Nkechi", "Amarachi", "Chioma", "Adaobi", "Funmilayo", "Omolola", "Yetunde", "Titilayo", "Olayinka",
  "Mojisola", "Abimbola", "Temiloluwa", "Adeola", "Bukola", "Tolulope", "Damilola", "Jumoke",
  "Lola", "Tomi", "Sade", "Bola", "Nike", "Peju", "Ronke", "Toyin", "Bisi", "Kemi",
  "Rashida", "Zainab", "Hauwa", "Mariam", "Hadiza"
];

const nigerianLastNames = [
  "Okafor", "Adeyemi", "Afolabi", "Nwachukwu", "Ogundimu", "Balogun", "Eze", "Okoro", "Nwosu",
  "Okonkwo", "Adekunle", "Olawale", "Bakare", "Adeleke", "Akinwumi", "Olagunju", "Oyelaran",
  "Osagie", "Ugochukwu", "Chukwuma", "Nwankwo", "Onuoha", "Ikenna", "Obiora", "Azubuike",
  "Emecheta", "Achebe", "Adichie", "Chimamanda", "Okwu", "Igwe", "Obi", "Agu", "Anyanwu",
  "Nwafor", "Ogbu", "Okeke", "Uzoma", "Ezeani", "Nnamdi", "Opara", "Onyema", "Uche",
  "Abdullahi", "Yusuf", "Ibrahim", "Musa", "Bello", "Lawal", "Suleiman", "Hassan", "Aliyu",
  "Abubakar", "Usman", "Garba", "Mohammed", "Idris", "Shehu", "Danjuma", "Waziri",
  "Fashola", "Tinubu", "Sanusi", "Dangote", "Elumelu", "Adenuga", "Otedola", "Rabiu"
];

const nigerianCompanies = [
  "MTN Nigeria", "Flutterwave", "Paystack", "Kuda Bank", "Interswitch", "Dangote Group",
  "Access Bank", "GTBank", "First Bank", "Zenith Bank", "Andela", "OPay", "PalmPay", "Moniepoint",
  "Sterling Bank", "Fidelity Bank", "UBA", "Stanbic IBTC", "FCMB", "Ecobank", "TeamApt",
  "Carbon", "Cowrywise", "Piggyvest", "Bamboo", "Risevest", "Patricia", "Quidax", "Bundle",
  "AWS Nigeria", "Microsoft Nigeria", "Google Nigeria", "Meta Nigeria", "IBM Nigeria"
];

const specializations = ["cloud-engineering", "data-analytics", "software-java", "software-react", "quality-assurance", "solutions-architecture", "ai-ml"];

// Generate 25 Nigerian instructors
export const nigerianInstructors = [
  {
    id: 1,
    firstName: "Chukwuemeka",
    lastName: "Okafor",
    email: "chukwuemeka.okafor@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Senior Cloud Architect with 12 years experience at MTN Nigeria and Microsoft. AWS Solutions Architect Professional certified.",
    specialization: "cloud-engineering",
    role: "instructor" as const,
  },
  {
    id: 2,
    firstName: "Ngozi",
    lastName: "Adeyemi",
    email: "ngozi.adeyemi@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Data Science Lead at Flutterwave. Former Google Developer Expert. PhD in Computer Science from University of Lagos.",
    specialization: "data-analytics",
    role: "instructor" as const,
  },
  {
    id: 3,
    firstName: "Oluwaseun",
    lastName: "Afolabi",
    email: "oluwaseun.afolabi@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Principal Software Engineer at Paystack. 10+ years Java/Spring experience. Oracle Certified Professional.",
    specialization: "software-java",
    role: "instructor" as const,
  },
  {
    id: 4,
    firstName: "Adaeze",
    lastName: "Nwachukwu",
    email: "adaeze.nwachukwu@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Frontend Architect at Kuda Bank. React contributor and conference speaker. Andela alumni.",
    specialization: "software-react",
    role: "instructor" as const,
  },
  {
    id: 5,
    firstName: "Babatunde",
    lastName: "Ogundimu",
    email: "babatunde.ogundimu@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "QA Director at Interswitch. ISTQB certified. 15 years in software testing and quality assurance.",
    specialization: "quality-assurance",
    role: "instructor" as const,
  },
  {
    id: 6,
    firstName: "Folake",
    lastName: "Balogun",
    email: "folake.balogun@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Solutions Architect at AWS Nigeria. Previously at Dangote Group IT. Multi-cloud certified.",
    specialization: "solutions-architecture",
    role: "instructor" as const,
  },
  {
    id: 7,
    firstName: "Ikechukwu",
    lastName: "Eze",
    email: "ikechukwu.eze@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "AI Research Lead at Data Science Nigeria. PhD from MIT. Published researcher in NLP and computer vision.",
    specialization: "ai-ml",
    role: "instructor" as const,
  },
  {
    id: 8,
    firstName: "Adewale",
    lastName: "Adekunle",
    email: "adewale.adekunle@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "DevOps Lead at OPay. Kubernetes expert. Previously at Google Cloud Nigeria.",
    specialization: "cloud-engineering",
    role: "instructor" as const,
  },
  {
    id: 9,
    firstName: "Chidinma",
    lastName: "Okoro",
    email: "chidinma.okoro@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/55.jpg",
    bio: "Senior Data Engineer at Carbon. ETL specialist. MSc from University of Ibadan.",
    specialization: "data-analytics",
    role: "instructor" as const,
  },
  {
    id: 10,
    firstName: "Olumide",
    lastName: "Fashola",
    email: "olumide.fashola@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/38.jpg",
    bio: "Backend Lead at Piggyvest. 8 years Java experience. Spring certified developer.",
    specialization: "software-java",
    role: "instructor" as const,
  },
  {
    id: 11,
    firstName: "Aisha",
    lastName: "Abdullahi",
    email: "aisha.abdullahi@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/42.jpg",
    bio: "Frontend Lead at Cowrywise. React Native specialist. Women in Tech advocate.",
    specialization: "software-react",
    role: "instructor" as const,
  },
  {
    id: 12,
    firstName: "Tochukwu",
    lastName: "Nwosu",
    email: "tochukwu.nwosu@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    bio: "QA Manager at TeamApt. Automation testing expert. ISTQB Advanced Level certified.",
    specialization: "quality-assurance",
    role: "instructor" as const,
  },
  {
    id: 13,
    firstName: "Fatima",
    lastName: "Bello",
    email: "fatima.bello@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    bio: "Enterprise Architect at Zenith Bank. 15 years banking technology experience.",
    specialization: "solutions-architecture",
    role: "instructor" as const,
  },
  {
    id: 14,
    firstName: "Damilare",
    lastName: "Olawale",
    email: "damilare.olawale@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/41.jpg",
    bio: "ML Engineer at Data Science Nigeria. TensorFlow certified. PhD candidate at LAUTECH.",
    specialization: "ai-ml",
    role: "instructor" as const,
  },
  {
    id: 15,
    firstName: "Chibueze",
    lastName: "Anyanwu",
    email: "chibueze.anyanwu@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
    bio: "Cloud Security Architect at Access Bank. AWS Security Specialty certified.",
    specialization: "cloud-engineering",
    role: "instructor" as const,
  },
  {
    id: 16,
    firstName: "Oluwabunmi",
    lastName: "Tinubu",
    email: "oluwabunmi.tinubu@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/51.jpg",
    bio: "BI Director at Sterling Bank. Power BI expert. 12 years analytics experience.",
    specialization: "data-analytics",
    role: "instructor" as const,
  },
  {
    id: 17,
    firstName: "Kelechi",
    lastName: "Igwe",
    email: "kelechi.igwe@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/53.jpg",
    bio: "Staff Engineer at Moniepoint. Microservices architect. Java Champion.",
    specialization: "software-java",
    role: "instructor" as const,
  },
  {
    id: 18,
    firstName: "Chiamaka",
    lastName: "Obi",
    email: "chiamaka.obi@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/57.jpg",
    bio: "UI/UX Engineer at Risevest. Next.js expert. Figma community advocate.",
    specialization: "software-react",
    role: "instructor" as const,
  },
  {
    id: 19,
    firstName: "Ayodele",
    lastName: "Bakare",
    email: "ayodele.bakare@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/59.jpg",
    bio: "Test Architect at Ecobank. Performance testing specialist. JMeter expert.",
    specialization: "quality-assurance",
    role: "instructor" as const,
  },
  {
    id: 20,
    firstName: "Amina",
    lastName: "Lawal",
    email: "amina.lawal@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/61.jpg",
    bio: "Technical Architect at First Bank. Azure certified. 18 years IT experience.",
    specialization: "solutions-architecture",
    role: "instructor" as const,
  },
  {
    id: 21,
    firstName: "Obinna",
    lastName: "Emecheta",
    email: "obinna.emecheta@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/63.jpg",
    bio: "Computer Vision Lead at Zindi. PyTorch specialist. Published AI researcher.",
    specialization: "ai-ml",
    role: "instructor" as const,
  },
  {
    id: 22,
    firstName: "Nnamdi",
    lastName: "Opara",
    email: "nnamdi.opara@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
    bio: "Platform Engineer at Bamboo. Terraform expert. HashiCorp Ambassador.",
    specialization: "cloud-engineering",
    role: "instructor" as const,
  },
  {
    id: 23,
    firstName: "Halima",
    lastName: "Suleiman",
    email: "halima.suleiman@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    bio: "Analytics Manager at GTBank. SQL expert. Tableau certified professional.",
    specialization: "data-analytics",
    role: "instructor" as const,
  },
  {
    id: 24,
    firstName: "Uchenna",
    lastName: "Nwankwo",
    email: "uchenna.nwankwo@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/men/69.jpg",
    bio: "Engineering Manager at Patricia. Full-stack developer. Node.js contributor.",
    specialization: "software-react",
    role: "instructor" as const,
  },
  {
    id: 25,
    firstName: "Zainab",
    lastName: "Mohammed",
    email: "zainab.mohammed@univaciti.com",
    avatar: "https://randomuser.me/api/portraits/women/71.jpg",
    bio: "NLP Researcher at Instadeep. PhD from Cambridge. Multilingual AI specialist.",
    specialization: "ai-ml",
    role: "instructor" as const,
  },
];

// Generate 120 Nigerian students with realistic data
const generateNigerianStudents = () => {
  const students = [];
  const allFirstNames = [...nigerianFirstNamesMale, ...nigerianFirstNamesFemale];

  for (let i = 0; i < 120; i++) {
    const isFemale = i % 2 === 0;
    const firstNames = isFemale ? nigerianFirstNamesFemale : nigerianFirstNamesMale;
    const firstName = firstNames[i % firstNames.length];
    const lastName = nigerianLastNames[i % nigerianLastNames.length];

    // Generate realistic points (higher ranked students have more points)
    const basePoints = 2500 - (i * 15);
    const points = Math.max(500, basePoints + Math.floor(Math.random() * 100));

    students.push({
      id: 101 + i,
      firstName,
      lastName,
      points,
      coursesCompleted: Math.max(1, Math.floor((120 - i) / 20)),
      streak: Math.max(1, Math.floor(Math.random() * 30) + 1),
    });
  }

  return students;
};

export const nigerianStudents = generateNigerianStudents();

export const mockCourses = [
  {
    id: 1,
    title: "AWS Cloud Engineering Masterclass",
    slug: "aws-cloud-engineering-masterclass",
    specialization: "cloud-engineering",
    description: "Master cloud computing with AWS. Learn to design, deploy, and manage scalable cloud infrastructure for Nigerian enterprises. Covers EC2, S3, Lambda, VPC, and more.",
    shortDescription: "Build expertise in AWS cloud services and infrastructure",
    technologies: ["aws", "docker", "kubernetes", "terraform", "linux"],
    difficulty: "intermediate",
    duration: 80,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[0],
    enrollmentCount: 1247,
    rating: 4.8,
    learningOutcomes: [
      "Design and deploy scalable AWS architectures",
      "Implement security best practices for cloud infrastructure",
      "Automate infrastructure using Terraform and CloudFormation",
      "Prepare for AWS Solutions Architect certification",
    ],
    modules: [
      { id: 1, title: "Cloud Computing Fundamentals", lessons: 8, duration: 120 },
      { id: 2, title: "AWS Core Services", lessons: 12, duration: 180 },
      { id: 3, title: "Networking & Security", lessons: 10, duration: 150 },
      { id: 4, title: "Serverless Architecture", lessons: 8, duration: 120 },
      { id: 5, title: "DevOps & CI/CD", lessons: 10, duration: 150 },
    ],
  },
  {
    id: 2,
    title: "Data Analytics with Python & Power BI",
    slug: "data-analytics-python-powerbi",
    specialization: "data-analytics",
    description: "Transform raw data into actionable business insights. Learn Python, SQL, and Power BI to analyze data for Nigerian banks, telecoms, and fintech companies.",
    shortDescription: "Master data analysis with Python, SQL, and Power BI",
    technologies: ["python", "postgresql", "powerbi", "pandas", "jupyter"],
    difficulty: "intermediate",
    duration: 60,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[1],
    enrollmentCount: 982,
    rating: 4.9,
    learningOutcomes: [
      "Analyze complex datasets using Python and Pandas",
      "Build interactive dashboards with Power BI",
      "Write efficient SQL queries for data extraction",
      "Apply statistical analysis to business problems",
    ],
    modules: [
      { id: 1, title: "Python for Data Analysis", lessons: 10, duration: 150 },
      { id: 2, title: "SQL & Database Querying", lessons: 8, duration: 120 },
      { id: 3, title: "Data Visualization with Power BI", lessons: 10, duration: 150 },
      { id: 4, title: "Statistical Analysis", lessons: 8, duration: 120 },
      { id: 5, title: "Capstone Project", lessons: 4, duration: 60 },
    ],
  },
  {
    id: 3,
    title: "Enterprise Java Development with Spring Boot",
    slug: "java-spring-boot-development",
    specialization: "software-java",
    description: "Become a professional Java developer. Master Spring Boot, microservices, and enterprise patterns used by Nigerian banks and fintech companies like Interswitch.",
    shortDescription: "Enterprise Java development with Spring Boot",
    technologies: ["java", "spring", "maven", "postgresql", "docker", "jenkins"],
    difficulty: "intermediate",
    duration: 100,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[2],
    enrollmentCount: 756,
    rating: 4.7,
    learningOutcomes: [
      "Build production-ready Spring Boot applications",
      "Design and implement microservices architecture",
      "Implement security with Spring Security and OAuth2",
      "Deploy applications with Docker and Kubernetes",
    ],
    modules: [
      { id: 1, title: "Java Fundamentals Refresher", lessons: 8, duration: 120 },
      { id: 2, title: "Spring Boot Deep Dive", lessons: 12, duration: 180 },
      { id: 3, title: "Microservices Architecture", lessons: 10, duration: 150 },
      { id: 4, title: "Security & Authentication", lessons: 8, duration: 120 },
      { id: 5, title: "Deployment & DevOps", lessons: 10, duration: 150 },
    ],
  },
  {
    id: 4,
    title: "Modern React Development",
    slug: "modern-react-development",
    specialization: "software-react",
    description: "Build modern web applications with React and TypeScript. Learn the tech stack used by Kuda, Piggyvest, and other Nigerian fintech startups.",
    shortDescription: "Modern frontend development with React & TypeScript",
    technologies: ["react", "typescript", "tailwindcss", "nodejs", "nextjs", "git"],
    difficulty: "intermediate",
    duration: 80,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[3],
    enrollmentCount: 1523,
    rating: 4.9,
    learningOutcomes: [
      "Build responsive React applications with TypeScript",
      "Implement state management with React Query and Zustand",
      "Create beautiful UIs with Tailwind CSS",
      "Deploy full-stack applications with Next.js",
    ],
    modules: [
      { id: 1, title: "React & TypeScript Fundamentals", lessons: 10, duration: 150 },
      { id: 2, title: "State Management Patterns", lessons: 8, duration: 120 },
      { id: 3, title: "Advanced React Patterns", lessons: 10, duration: 150 },
      { id: 4, title: "Full-Stack with Next.js", lessons: 10, duration: 150 },
      { id: 5, title: "Testing & Deployment", lessons: 8, duration: 120 },
    ],
  },
  {
    id: 5,
    title: "Quality Assurance Engineering",
    slug: "quality-assurance-engineering",
    specialization: "quality-assurance",
    description: "Master software testing and QA. Learn automation testing with Selenium, Cypress, and API testing. Prepare for QA roles at Nigerian tech companies.",
    shortDescription: "Automated testing and QA best practices",
    technologies: ["selenium", "jest", "cypress", "jenkins", "jira", "postman"],
    difficulty: "intermediate",
    duration: 60,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[4],
    enrollmentCount: 634,
    rating: 4.6,
    learningOutcomes: [
      "Design comprehensive test strategies",
      "Automate testing with Selenium and Cypress",
      "Perform API testing with Postman",
      "Integrate testing into CI/CD pipelines",
    ],
    modules: [
      { id: 1, title: "Testing Fundamentals", lessons: 8, duration: 120 },
      { id: 2, title: "Selenium WebDriver", lessons: 10, duration: 150 },
      { id: 3, title: "Cypress Modern Testing", lessons: 10, duration: 150 },
      { id: 4, title: "API & Performance Testing", lessons: 8, duration: 120 },
      { id: 5, title: "CI/CD Integration", lessons: 6, duration: 90 },
    ],
  },
  {
    id: 6,
    title: "Solutions Architecture Masterclass",
    slug: "solutions-architecture-masterclass",
    specialization: "solutions-architecture",
    description: "Design enterprise-grade solutions for African businesses. Learn system design, multi-cloud architecture, and patterns used by Dangote, Access Bank, and MTN.",
    shortDescription: "Enterprise architecture and system design",
    technologies: ["aws", "azure", "kubernetes", "microservices", "mongodb", "redis"],
    difficulty: "advanced",
    duration: 100,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[5],
    enrollmentCount: 445,
    rating: 4.8,
    learningOutcomes: [
      "Design scalable distributed systems",
      "Architect multi-cloud solutions",
      "Apply enterprise integration patterns",
      "Lead technical architecture decisions",
    ],
    modules: [
      { id: 1, title: "Architecture Fundamentals", lessons: 8, duration: 120 },
      { id: 2, title: "Distributed Systems Design", lessons: 12, duration: 180 },
      { id: 3, title: "Multi-Cloud Architecture", lessons: 10, duration: 150 },
      { id: 4, title: "Enterprise Patterns", lessons: 10, duration: 150 },
      { id: 5, title: "Case Studies & Capstone", lessons: 8, duration: 120 },
    ],
  },
  {
    id: 7,
    title: "AI & Machine Learning with Python",
    slug: "ai-machine-learning-python",
    specialization: "ai-ml",
    description: "Build intelligent applications with AI/ML. Learn TensorFlow, PyTorch, and deploy ML models. Apply AI to solve Nigerian business challenges.",
    shortDescription: "Build AI applications with Python and TensorFlow",
    technologies: ["python", "tensorflow", "pytorch", "jupyter", "opencv", "numpy"],
    difficulty: "advanced",
    duration: 120,
    isPublished: true,
    isFeatured: true,
    instructor: nigerianInstructors[6],
    enrollmentCount: 892,
    rating: 4.9,
    learningOutcomes: [
      "Build and train neural networks",
      "Implement computer vision applications",
      "Create NLP models for text analysis",
      "Deploy ML models to production",
    ],
    modules: [
      { id: 1, title: "ML Fundamentals & Python", lessons: 10, duration: 150 },
      { id: 2, title: "Deep Learning with TensorFlow", lessons: 12, duration: 180 },
      { id: 3, title: "Computer Vision", lessons: 10, duration: 150 },
      { id: 4, title: "Natural Language Processing", lessons: 10, duration: 150 },
      { id: 5, title: "ML in Production", lessons: 8, duration: 120 },
    ],
  },
];

// Note: Lesson IDs are generated as: courseId * 1000 + (moduleIndex * 10) + lessonIndex + 1
// So for course 4, module 0, lesson 0: 4 * 1000 + 0 * 10 + 1 = 4001
export const mockEnrollments = [
  {
    id: 1,
    courseId: 4,
    course: mockCourses[3],
    progress: 65,
    currentModuleId: 403, // Module 3 of course 4
    currentLessonId: 4021, // Lesson 1 of module 3 (4 * 1000 + 2 * 10 + 1)
    enrolledAt: "2026-01-15T10:00:00Z",
    lastAccessedAt: "2026-02-03T09:30:00Z",
  },
  {
    id: 2,
    courseId: 2,
    course: mockCourses[1],
    progress: 42,
    currentModuleId: 202, // Module 2 of course 2
    currentLessonId: 2011, // Lesson 1 of module 2 (2 * 1000 + 1 * 10 + 1)
    enrolledAt: "2026-01-20T14:00:00Z",
    lastAccessedAt: "2026-02-02T16:45:00Z",
  },
  {
    id: 3,
    courseId: 1,
    course: mockCourses[0],
    progress: 25,
    currentModuleId: 101, // Module 1 of course 1
    currentLessonId: 1001, // First lesson of course 1
    enrolledAt: "2026-01-28T11:00:00Z",
    lastAccessedAt: "2026-02-01T20:15:00Z",
  },
];

export const allAchievements = [
  { id: 1, name: "First Steps", icon: "rocket", description: "Complete your first lesson", unlockCriteria: "Complete 1 lesson" },
  { id: 2, name: "Week Warrior", icon: "flame", description: "Maintain a 7-day learning streak", unlockCriteria: "7-day streak" },
  { id: 3, name: "Quiz Master", icon: "trophy", description: "Score 100% on any quiz", unlockCriteria: "Perfect quiz score" },
  { id: 4, name: "Course Champion", icon: "award", description: "Complete your first course", unlockCriteria: "Finish 1 course" },
  { id: 5, name: "Speed Learner", icon: "zap", description: "Complete 5 lessons in one day", unlockCriteria: "5 lessons in 24hrs" },
  { id: 6, name: "Night Owl", icon: "moon", description: "Study after 10 PM", unlockCriteria: "Learn after 10 PM" },
  { id: 7, name: "Early Bird", icon: "sunrise", description: "Study before 7 AM", unlockCriteria: "Learn before 7 AM" },
  { id: 8, name: "Dedicated", icon: "target", description: "Reach 30-day learning streak", unlockCriteria: "30-day streak" },
  { id: 9, name: "Expert", icon: "star", description: "Complete 5 courses", unlockCriteria: "Finish 5 courses" },
  { id: 10, name: "Certified Pro", icon: "badge", description: "Earn your first certification", unlockCriteria: "Pass certification exam" },
];

export const mockUserStats = {
  totalPoints: 1850,
  coursesCompleted: 3,
  coursesInProgress: 2,
  lessonsCompleted: 87,
  totalLessons: 140,
  currentStreak: 18,
  longestStreak: 32,
  totalTimeSpent: 7200,
  earnedBadgeIds: [1, 2, 3, 4, 5],
  rank: 15,
  totalStudents: nigerianStudents.length,
};

// Generate leaderboard from all students, sorted by points
export const mockLeaderboard = [...nigerianStudents]
  .sort((a, b) => b.points - a.points)
  .map((student, index) => ({
    ...student,
    rank: index + 1,
    avatar: `https://randomuser.me/api/portraits/${index % 2 === 0 ? 'women' : 'men'}/${(20 + index) % 99}.jpg`,
  }));

export const techLogos: Record<string, string> = {
  aws: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  azure: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg",
  googlecloud: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg",
  python: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  react: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  docker: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  kubernetes: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  tensorflow: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  postgresql: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  typescript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  javascript: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  nodejs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  spring: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  maven: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/maven/maven-original.svg",
  jenkins: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  git: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  linux: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
  mongodb: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  redis: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  terraform: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg",
  selenium: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  jest: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  cypress: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypressio/cypressio-original.svg",
  jira: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jira/jira-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  tailwindcss: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  pytorch: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
  jupyter: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg",
  opencv: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  numpy: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  pandas: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  powerbi: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
  postman: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  microservices: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
};

export const specializationInfo: Record<string, { name: string; color: string; icon: string }> = {
  "cloud-engineering": { name: "Cloud Engineering", color: "#FF9900", icon: "cloud" },
  "data-analytics": { name: "Data Analytics", color: "#3366CC", icon: "chart" },
  "software-java": { name: "Java Development", color: "#ED8B00", icon: "code" },
  "software-react": { name: "React Development", color: "#61DAFB", icon: "code" },
  "quality-assurance": { name: "Quality Assurance", color: "#43B02A", icon: "check" },
  "solutions-architecture": { name: "Solutions Architecture", color: "#9B59B6", icon: "layers" },
  "ai-ml": { name: "AI & Machine Learning", color: "#FF6F00", icon: "brain" },
};

// Generate comprehensive mock users (1 admin, 25 instructors, 120+ students)
const generateMockUsers = () => {
  const users = [];
  const emailDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];

  // Admin user
  users.push({
    id: 1,
    username: "admin",
    email: "admin@univaciti.com",
    firstName: "Adebayo",
    lastName: "Ogunleye",
    role: "admin",
    isActive: true,
    createdAt: "2025-01-01T10:00:00Z",
  });

  // Simple instructor shortcut (like admin shortcut)
  users.push({
    id: 2,
    username: "instructor",
    email: "instructor@univaciti.com",
    firstName: "Chukwuemeka",
    lastName: "Okafor",
    role: "instructor",
    isActive: true,
    createdAt: "2025-01-02T10:00:00Z",
  });

  // Simple student shortcut (like admin shortcut)
  users.push({
    id: 3,
    username: "student",
    email: "student@univaciti.com",
    firstName: "Ngozi",
    lastName: "Adeyemi",
    role: "student",
    isActive: true,
    createdAt: "2025-01-03T10:00:00Z",
  });

  // Add instructors from nigerianInstructors (starting from id 4)
  nigerianInstructors.forEach((instructor, index) => {
    users.push({
      id: 4 + index,
      username: `${instructor.firstName.toLowerCase()}.${instructor.lastName.toLowerCase()}`,
      email: instructor.email,
      firstName: instructor.firstName,
      lastName: instructor.lastName,
      role: "instructor",
      isActive: true,
      createdAt: new Date(2025, 0, 3 + index).toISOString(),
    });
  });

  // Add 120 students with Nigerian names
  // startId = 1 (admin) + 1 (instructor shortcut) + 1 (student shortcut) + 25 (instructors) + 1 = 29
  const startId = 4 + nigerianInstructors.length;
  for (let i = 0; i < 120; i++) {
    const student = nigerianStudents[i];
    const domain = emailDomains[i % emailDomains.length];
    const dayOffset = i % 28;
    const monthOffset = Math.floor(i / 28);
    const createdDate = new Date(2025, monthOffset, 1 + dayOffset);

    users.push({
      id: startId + i,
      username: `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}${i > 0 ? i : ''}`,
      email: `${student.firstName.toLowerCase()}.${student.lastName.toLowerCase()}${i > 0 ? i : ''}@${domain}`,
      firstName: student.firstName,
      lastName: student.lastName,
      role: "student",
      isActive: i % 10 !== 0, // 10% inactive
      createdAt: createdDate.toISOString(),
    });
  }

  return users;
};

export const mockUsers = generateMockUsers();

// Generate 250+ enrollments with realistic data
const generateMockEnrollments = () => {
  const enrollments: any[] = [];
  const statuses = ["active", "active", "active", "completed", "pending", "expired"]; // weighted towards active
  const startId = 4 + nigerianInstructors.length; // First student ID (after admin, instructor shortcut, student shortcut, and all instructors)

  let enrollmentId = 1;

  // ========== ADD DEMO STUDENT ENROLLMENTS (User ID 3 = "student") ==========
  const demoStudentId = 3;
  const demoStudent = mockUsers.find(u => u.id === demoStudentId);
  if (demoStudent) {
    // Enroll demo student in 3 courses with varied progress
    const demoEnrollments = [
      { courseIndex: 0, progress: 65, status: "active" },   // AWS Cloud Engineering
      { courseIndex: 1, progress: 42, status: "active" },   // Data Analytics
      { courseIndex: 3, progress: 25, status: "active" },   // React Development
    ];

    demoEnrollments.forEach((demo) => {
      const course = mockCourses[demo.courseIndex];
      if (course) {
        enrollments.push({
          id: enrollmentId++,
          userId: demoStudentId,
          courseId: course.id,
          user: demoStudent,
          course: course,
          status: demo.status,
          progress: demo.progress,
          // First lesson of the course: courseId * 1000 + 1
          currentLessonId: course.id * 1000 + 1,
          enrolledAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
          lastAccessedAt: new Date().toISOString(),
        });
      }
    });
  }

  // ========== GENERATE ENROLLMENTS FOR OTHER STUDENTS ==========
  // Each student enrolls in 1-3 courses
  for (let studentIndex = 0; studentIndex < 120; studentIndex++) {
    const studentUserId = startId + studentIndex;
    const student = mockUsers.find(u => u.id === studentUserId);
    if (!student) continue;

    // Number of courses this student is enrolled in (1-3)
    const numCourses = 1 + (studentIndex % 3);

    for (let c = 0; c < numCourses; c++) {
      const courseIndex = (studentIndex + c) % mockCourses.length;
      const course = mockCourses[courseIndex];

      // Generate realistic progress and status
      const statusIndex = (studentIndex + c) % statuses.length;
      const status = statuses[statusIndex];
      let progress = 0;

      if (status === "completed") {
        progress = 100;
      } else if (status === "active") {
        progress = Math.floor(Math.random() * 85) + 10;
      } else if (status === "expired") {
        progress = Math.floor(Math.random() * 40);
      } else if (status === "pending") {
        progress = 0;
      }

      // Generate realistic enrolled date
      const daysAgo = Math.floor(Math.random() * 180);
      const enrolledDate = new Date();
      enrolledDate.setDate(enrolledDate.getDate() - daysAgo);

      enrollments.push({
        id: enrollmentId++,
        userId: studentUserId,
        courseId: course.id,
        user: student,
        course: course,
        status,
        progress,
        enrolledAt: enrolledDate.toISOString(),
      });
    }
  }

  return enrollments;
};

export const mockAdminEnrollments = generateMockEnrollments();

// Mock lessons data for each course module
export interface MockLesson {
  id: number;
  moduleId: number;
  title: string;
  type: "text" | "video" | "code" | "quiz";
  content: string;
  videoUrl?: string;
  order: number;
  isPublished: boolean;
  estimatedMinutes: number;
}

export interface MockModule {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
  lessons: MockLesson[];
}

// Course-specific content configuration
const courseContentConfig: Record<string, {
  videoUrls: string[];
  moduleTemplates: { title: string; description: string }[];
  exercises: { title: string; content: string }[];
  quizQuestions: { question: string; options: string[]; correctAnswer: number }[];
}> = {
  "cloud-engineering": {
    videoUrls: [
      "https://www.youtube.com/watch?v=ulprqHHWlng", // AWS Tutorial
      "https://www.youtube.com/watch?v=r4YIdn2eTm4", // Docker Tutorial
      "https://www.youtube.com/watch?v=X48VuDVv0do", // Kubernetes Tutorial
      "https://www.youtube.com/watch?v=SLB_c_ayRMo", // Terraform Tutorial
      "https://www.youtube.com/watch?v=ZtqBQ68cfJc", // AWS VPC Tutorial
    ],
    moduleTemplates: [
      { title: "Cloud Computing Fundamentals", description: "Understanding cloud concepts, service models (IaaS, PaaS, SaaS), and deployment models" },
      { title: "AWS Core Services", description: "Master EC2, S3, IAM, VPC, and other essential AWS services" },
      { title: "Infrastructure as Code", description: "Automate infrastructure with Terraform and CloudFormation" },
      { title: "Containers & Orchestration", description: "Docker containerization and Kubernetes orchestration" },
      { title: "DevOps & CI/CD Pipelines", description: "Build automated deployment pipelines with Jenkins and GitHub Actions" },
    ],
    exercises: [
      { title: "Launch Your First EC2 Instance", content: `<h2>Exercise: Launch an EC2 Instance</h2>
<p>In this exercise, you'll launch your first AWS EC2 instance and configure security groups.</p>
<h3>Steps:</h3>
<ol>
  <li>Log into AWS Console and navigate to EC2</li>
  <li>Click "Launch Instance"</li>
  <li>Select Amazon Linux 2 AMI</li>
  <li>Choose t2.micro (free tier eligible)</li>
  <li>Configure security group to allow SSH (port 22)</li>
</ol>
<pre><code class="language-bash"># Connect to your instance
ssh -i "your-key.pem" ec2-user@your-public-ip

# Update the system
sudo yum update -y

# Install Docker
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user</code></pre>
<h3>Challenge:</h3>
<p>Deploy a simple nginx web server and access it via the public IP.</p>` },
      { title: "Create an S3 Bucket with Versioning", content: `<h2>Exercise: S3 Bucket Configuration</h2>
<p>Set up an S3 bucket with versioning and lifecycle policies.</p>
<pre><code class="language-bash"># Using AWS CLI
aws s3api create-bucket \\
  --bucket my-learning-bucket-$(date +%s) \\
  --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \\
  --bucket my-learning-bucket \\
  --versioning-configuration Status=Enabled

# Upload a file
aws s3 cp myfile.txt s3://my-learning-bucket/</code></pre>
<h3>Tasks:</h3>
<ul>
  <li>Enable server-side encryption</li>
  <li>Set up a lifecycle rule to move objects to Glacier after 90 days</li>
  <li>Configure bucket policy for public read access</li>
</ul>` },
      { title: "Write a Terraform Configuration", content: `<h2>Exercise: Infrastructure as Code with Terraform</h2>
<p>Create a Terraform configuration to provision AWS resources.</p>
<pre><code class="language-hcl"># main.tf
provider "aws" {
  region = "us-east-1"
}

resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  tags = {
    Name = "learning-vpc"
  }
}

resource "aws_subnet" "public" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-1a"

  tags = {
    Name = "public-subnet"
  }
}

resource "aws_instance" "web" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public.id

  tags = {
    Name = "web-server"
  }
}</code></pre>
<h3>Commands:</h3>
<pre><code class="language-bash">terraform init
terraform plan
terraform apply</code></pre>` },
      { title: "Build a Docker Container", content: `<h2>Exercise: Containerize an Application</h2>
<p>Create a Dockerfile and build a container image.</p>
<pre><code class="language-dockerfile"># Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]</code></pre>
<pre><code class="language-bash"># Build and run
docker build -t my-app:v1 .
docker run -d -p 3000:3000 my-app:v1

# Push to ECR
aws ecr get-login-password | docker login --username AWS --password-stdin YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com
docker tag my-app:v1 YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/my-app:v1
docker push YOUR_ACCOUNT.dkr.ecr.us-east-1.amazonaws.com/my-app:v1</code></pre>` },
      { title: "Set Up a CI/CD Pipeline", content: `<h2>Exercise: GitHub Actions CI/CD</h2>
<p>Create an automated deployment pipeline.</p>
<pre><code class="language-yaml"># .github/workflows/deploy.yml
name: Deploy to AWS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: \${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: \${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Build and push Docker image
        run: |
          docker build -t my-app .
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_REGISTRY
          docker push $ECR_REGISTRY/my-app:latest

      - name: Deploy to ECS
        run: |
          aws ecs update-service --cluster my-cluster --service my-service --force-new-deployment</code></pre>` },
    ],
    quizQuestions: [
      { question: "What does EC2 stand for in AWS?", options: ["Elastic Cloud Compute", "Elastic Compute Cloud", "Enterprise Cloud Computing", "Extended Compute Cluster"], correctAnswer: 1 },
      { question: "Which S3 storage class is best for infrequently accessed data?", options: ["S3 Standard", "S3 Intelligent-Tiering", "S3 Glacier", "S3 One Zone-IA"], correctAnswer: 2 },
      { question: "What is the purpose of an AWS VPC?", options: ["Virtual Private Cloud for isolated networking", "Virtual Processing Core", "Variable Price Calculator", "Verified Public Connection"], correctAnswer: 0 },
      { question: "Which tool is used for Infrastructure as Code?", options: ["Docker", "Kubernetes", "Terraform", "Jenkins"], correctAnswer: 2 },
      { question: "What port does SSH typically use?", options: ["80", "443", "22", "3306"], correctAnswer: 2 },
    ],
  },
  "data-analytics": {
    videoUrls: [
      "https://www.youtube.com/watch?v=_uQrJ0TkZlc", // Python Tutorial
      "https://www.youtube.com/watch?v=vmEHCJofslg", // Pandas Tutorial
      "https://www.youtube.com/watch?v=HXV3zeQKqGY", // SQL Tutorial
      "https://www.youtube.com/watch?v=3qDkSFl8o2I", // Power BI Tutorial
      "https://www.youtube.com/watch?v=zN2FnspV9sU", // Data Visualization
    ],
    moduleTemplates: [
      { title: "Python for Data Analysis", description: "Python fundamentals, NumPy, and Pandas for data manipulation" },
      { title: "SQL & Database Querying", description: "Write efficient SQL queries to extract and transform data" },
      { title: "Data Visualization", description: "Create compelling visualizations with Power BI and Python" },
      { title: "Statistical Analysis", description: "Apply statistical methods to derive insights from data" },
      { title: "Capstone: Business Analytics Project", description: "End-to-end analytics project with real-world data" },
    ],
    exercises: [
      { title: "Pandas Data Manipulation", content: `<h2>Exercise: Analyzing Sales Data with Pandas</h2>
<p>Practice data manipulation using Pandas on a sales dataset.</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

# Load the dataset
df = pd.read_csv('sales_data.csv')

# 1. Display basic info
print(df.info())
print(df.describe())

# 2. Filter data - sales above 10000
high_sales = df[df['amount'] > 10000]

# 3. Group by region and calculate totals
regional_sales = df.groupby('region').agg({
    'amount': 'sum',
    'quantity': 'sum',
    'order_id': 'count'
}).rename(columns={'order_id': 'num_orders'})

# 4. Create a new calculated column
df['profit_margin'] = (df['profit'] / df['amount']) * 100

# 5. Handle missing values
df['category'].fillna('Unknown', inplace=True)
df.dropna(subset=['amount'], inplace=True)

# 6. Export results
regional_sales.to_csv('regional_analysis.csv')</code></pre>
<h3>Challenge:</h3>
<p>Find the top 5 products by revenue and their average profit margin.</p>` },
      { title: "SQL Queries for Business Intelligence", content: `<h2>Exercise: SQL Analysis Queries</h2>
<p>Write SQL queries to answer business questions.</p>
<pre><code class="language-sql">-- 1. Total sales by month
SELECT
    DATE_TRUNC('month', order_date) AS month,
    SUM(amount) AS total_sales,
    COUNT(DISTINCT customer_id) AS unique_customers
FROM orders
GROUP BY DATE_TRUNC('month', order_date)
ORDER BY month;

-- 2. Top customers by lifetime value
SELECT
    c.customer_name,
    c.email,
    SUM(o.amount) AS lifetime_value,
    COUNT(o.order_id) AS total_orders
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name, c.email
ORDER BY lifetime_value DESC
LIMIT 10;

-- 3. Product category performance
SELECT
    p.category,
    SUM(oi.quantity) AS units_sold,
    SUM(oi.quantity * oi.unit_price) AS revenue,
    AVG(oi.unit_price) AS avg_price
FROM products p
JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.category
ORDER BY revenue DESC;

-- 4. Year-over-year growth
WITH yearly_sales AS (
    SELECT
        EXTRACT(YEAR FROM order_date) AS year,
        SUM(amount) AS total_sales
    FROM orders
    GROUP BY EXTRACT(YEAR FROM order_date)
)
SELECT
    year,
    total_sales,
    LAG(total_sales) OVER (ORDER BY year) AS prev_year,
    ROUND(((total_sales - LAG(total_sales) OVER (ORDER BY year)) /
           LAG(total_sales) OVER (ORDER BY year)) * 100, 2) AS growth_pct
FROM yearly_sales;</code></pre>` },
      { title: "Power BI Dashboard Creation", content: `<h2>Exercise: Build a Sales Dashboard</h2>
<p>Create an interactive Power BI dashboard for sales analysis.</p>
<h3>Steps:</h3>
<ol>
  <li><strong>Import Data:</strong> Connect to your sales data source</li>
  <li><strong>Create Relationships:</strong> Link tables (Orders, Products, Customers)</li>
  <li><strong>Build Measures:</strong></li>
</ol>
<pre><code class="language-dax">// DAX Measures
Total Sales = SUM(Orders[Amount])

YTD Sales = TOTALYTD([Total Sales], Dates[Date])

Sales Growth =
VAR CurrentSales = [Total Sales]
VAR PreviousSales = CALCULATE([Total Sales], DATEADD(Dates[Date], -1, YEAR))
RETURN DIVIDE(CurrentSales - PreviousSales, PreviousSales, 0)

Average Order Value = DIVIDE([Total Sales], DISTINCTCOUNT(Orders[OrderID]))</code></pre>
<h3>Visuals to Create:</h3>
<ul>
  <li>KPI cards for Total Sales, Orders, Customers</li>
  <li>Line chart showing sales trend over time</li>
  <li>Bar chart for sales by region</li>
  <li>Pie chart for product category distribution</li>
  <li>Table with top 10 customers</li>
</ul>` },
      { title: "Statistical Analysis with Python", content: `<h2>Exercise: Statistical Analysis</h2>
<p>Apply statistical methods to analyze customer behavior.</p>
<pre><code class="language-python">import pandas as pd
import numpy as np
from scipy import stats
import matplotlib.pyplot as plt

# Load customer data
df = pd.read_csv('customer_data.csv')

# 1. Descriptive Statistics
print("Mean purchase amount:", df['purchase_amount'].mean())
print("Median purchase amount:", df['purchase_amount'].median())
print("Std deviation:", df['purchase_amount'].std())

# 2. Hypothesis Testing
# Is there a significant difference between mobile and desktop purchases?
mobile = df[df['device'] == 'mobile']['purchase_amount']
desktop = df[df['device'] == 'desktop']['purchase_amount']

t_stat, p_value = stats.ttest_ind(mobile, desktop)
print(f"T-statistic: {t_stat:.4f}, P-value: {p_value:.4f}")

# 3. Correlation Analysis
correlation = df['time_on_site'].corr(df['purchase_amount'])
print(f"Correlation between time on site and purchase: {correlation:.4f}")

# 4. Regression Analysis
from sklearn.linear_model import LinearRegression
X = df[['time_on_site', 'pages_viewed', 'previous_purchases']]
y = df['purchase_amount']

model = LinearRegression()
model.fit(X, y)
print("R² Score:", model.score(X, y))
print("Coefficients:", dict(zip(X.columns, model.coef_)))</code></pre>` },
      { title: "End-to-End Analytics Project", content: `<h2>Capstone: Nigerian Fintech Analysis</h2>
<p>Analyze transaction data from a Nigerian fintech company.</p>
<pre><code class="language-python"># Complete analysis pipeline
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. Data Loading & Cleaning
transactions = pd.read_csv('fintech_transactions.csv')
transactions['date'] = pd.to_datetime(transactions['date'])
transactions = transactions.dropna(subset=['amount', 'user_id'])

# 2. Feature Engineering
transactions['hour'] = transactions['date'].dt.hour
transactions['day_of_week'] = transactions['date'].dt.day_name()
transactions['is_weekend'] = transactions['day_of_week'].isin(['Saturday', 'Sunday'])

# 3. Analysis
# Peak transaction hours
hourly_volume = transactions.groupby('hour')['amount'].sum()

# User segmentation by transaction frequency
user_segments = transactions.groupby('user_id').agg({
    'amount': ['sum', 'mean', 'count']
}).reset_index()
user_segments.columns = ['user_id', 'total_spent', 'avg_transaction', 'num_transactions']

# 4. Visualization
fig, axes = plt.subplots(2, 2, figsize=(14, 10))
# Add your visualizations here

# 5. Export insights
user_segments.to_csv('user_analysis.csv', index=False)</code></pre>
<h3>Deliverables:</h3>
<ul>
  <li>Cleaned dataset with documentation</li>
  <li>Power BI dashboard with key metrics</li>
  <li>Written report with recommendations</li>
</ul>` },
    ],
    quizQuestions: [
      { question: "Which Pandas function is used to read a CSV file?", options: ["pd.load_csv()", "pd.read_csv()", "pd.import_csv()", "pd.open_csv()"], correctAnswer: 1 },
      { question: "What SQL clause is used to filter grouped results?", options: ["WHERE", "FILTER", "HAVING", "GROUP BY"], correctAnswer: 2 },
      { question: "In Power BI, what language is used for creating measures?", options: ["SQL", "Python", "DAX", "M"], correctAnswer: 2 },
      { question: "What does a p-value less than 0.05 indicate?", options: ["No significant difference", "Statistically significant result", "Data is corrupted", "Sample size too small"], correctAnswer: 1 },
      { question: "Which chart type is best for showing trends over time?", options: ["Pie chart", "Bar chart", "Line chart", "Scatter plot"], correctAnswer: 2 },
    ],
  },
  "software-java": {
    videoUrls: [
      "https://www.youtube.com/watch?v=eIrMbAQSU34", // Java Tutorial
      "https://www.youtube.com/watch?v=9SGDpanrc8U", // Spring Boot Tutorial
      "https://www.youtube.com/watch?v=vtPkZShrvXQ", // Spring Security
      "https://www.youtube.com/watch?v=1aFqUvkl3mc", // Microservices
      "https://www.youtube.com/watch?v=Geq60OVyBPg", // Docker for Java
    ],
    moduleTemplates: [
      { title: "Java Fundamentals", description: "Core Java concepts, OOP principles, and best practices" },
      { title: "Spring Boot Deep Dive", description: "Build production-ready applications with Spring Boot" },
      { title: "Database & JPA", description: "Data persistence with Spring Data JPA and PostgreSQL" },
      { title: "Microservices Architecture", description: "Design and implement microservices with Spring Cloud" },
      { title: "Security & Deployment", description: "Secure applications and deploy to cloud platforms" },
    ],
    exercises: [
      { title: "Java OOP Implementation", content: `<h2>Exercise: Build a Banking System</h2>
<p>Implement a simple banking system using OOP principles.</p>
<pre><code class="language-java">// Account.java - Base class
public abstract class Account {
    private String accountNumber;
    private String accountHolder;
    protected double balance;

    public Account(String accountNumber, String accountHolder, double initialBalance) {
        this.accountNumber = accountNumber;
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
    }

    public abstract void withdraw(double amount) throws InsufficientFundsException;

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: ₦" + amount);
        }
    }

    public double getBalance() {
        return balance;
    }
}

// SavingsAccount.java
public class SavingsAccount extends Account {
    private double interestRate;

    public SavingsAccount(String accountNumber, String accountHolder,
                          double initialBalance, double interestRate) {
        super(accountNumber, accountHolder, initialBalance);
        this.interestRate = interestRate;
    }

    @Override
    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient balance");
        }
        balance -= amount;
    }

    public void applyInterest() {
        balance += balance * interestRate;
    }
}</code></pre>
<h3>Tasks:</h3>
<ul>
  <li>Implement CurrentAccount with overdraft facility</li>
  <li>Add transaction history tracking</li>
  <li>Implement fund transfer between accounts</li>
</ul>` },
      { title: "Spring Boot REST API", content: `<h2>Exercise: Build a REST API with Spring Boot</h2>
<p>Create a complete REST API for a customer management system.</p>
<pre><code class="language-java">// Customer.java - Entity
@Entity
@Table(name = "customers")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @Email(message = "Invalid email format")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    // Getters, setters, constructors
}

// CustomerRepository.java
@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
    List<Customer> findByNameContaining(String name);
}

// CustomerService.java
@Service
@Transactional
public class CustomerService {
    private final CustomerRepository repository;

    public CustomerService(CustomerRepository repository) {
        this.repository = repository;
    }

    public Customer createCustomer(CustomerDTO dto) {
        Customer customer = new Customer();
        customer.setName(dto.getName());
        customer.setEmail(dto.getEmail());
        customer.setPhoneNumber(dto.getPhoneNumber());
        return repository.save(customer);
    }

    public List<Customer> getAllCustomers() {
        return repository.findAll();
    }
}

// CustomerController.java
@RestController
@RequestMapping("/api/customers")
public class CustomerController {
    private final CustomerService service;

    @PostMapping
    public ResponseEntity<Customer> create(@Valid @RequestBody CustomerDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(service.createCustomer(dto));
    }

    @GetMapping
    public List<Customer> getAll() {
        return service.getAllCustomers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Customer> getById(@PathVariable Long id) {
        return service.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}</code></pre>` },
      { title: "Spring Data JPA Queries", content: `<h2>Exercise: Advanced JPA Queries</h2>
<p>Practice writing complex database queries with Spring Data JPA.</p>
<pre><code class="language-java">// OrderRepository.java
@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // Derived query methods
    List<Order> findByCustomerId(Long customerId);
    List<Order> findByStatusAndCreatedAtAfter(OrderStatus status, LocalDateTime date);

    // JPQL queries
    @Query("SELECT o FROM Order o WHERE o.totalAmount > :amount")
    List<Order> findHighValueOrders(@Param("amount") BigDecimal amount);

    @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.id = :id")
    Optional<Order> findByIdWithItems(@Param("id") Long id);

    // Native SQL query
    @Query(value = """
        SELECT c.name, COUNT(o.id) as order_count, SUM(o.total_amount) as total_spent
        FROM customers c
        LEFT JOIN orders o ON c.id = o.customer_id
        GROUP BY c.id, c.name
        ORDER BY total_spent DESC
        LIMIT 10
        """, nativeQuery = true)
    List<Object[]> findTopCustomers();

    // Specification for dynamic queries
    default List<Order> findByFilters(OrderSearchCriteria criteria) {
        Specification<Order> spec = Specification.where(null);

        if (criteria.getStatus() != null) {
            spec = spec.and((root, query, cb) ->
                cb.equal(root.get("status"), criteria.getStatus()));
        }
        if (criteria.getMinAmount() != null) {
            spec = spec.and((root, query, cb) ->
                cb.greaterThanOrEqualTo(root.get("totalAmount"), criteria.getMinAmount()));
        }

        return findAll(spec);
    }
}</code></pre>` },
      { title: "Microservices with Spring Cloud", content: `<h2>Exercise: Build Microservices</h2>
<p>Create a microservices architecture with Spring Cloud.</p>
<pre><code class="language-java">// UserService - application.yml
spring:
  application:
    name: user-service
  cloud:
    discovery:
      enabled: true

eureka:
  client:
    service-url:
      defaultZone: http://localhost:8761/eureka/

// OrderService calling UserService via Feign
@FeignClient(name = "user-service")
public interface UserClient {
    @GetMapping("/api/users/{id}")
    UserDTO getUserById(@PathVariable Long id);
}

// Order service implementation
@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserClient userClient;

    public OrderDTO createOrder(CreateOrderRequest request) {
        // Validate user exists via Feign client
        UserDTO user = userClient.getUserById(request.getUserId());

        Order order = new Order();
        order.setUserId(user.getId());
        order.setItems(request.getItems());
        order.setTotalAmount(calculateTotal(request.getItems()));

        Order saved = orderRepository.save(order);

        // Publish event for other services
        eventPublisher.publish(new OrderCreatedEvent(saved));

        return OrderMapper.toDTO(saved);
    }
}

// Circuit breaker with Resilience4j
@CircuitBreaker(name = "userService", fallbackMethod = "getUserFallback")
public UserDTO getUser(Long userId) {
    return userClient.getUserById(userId);
}

private UserDTO getUserFallback(Long userId, Exception e) {
    return UserDTO.builder()
        .id(userId)
        .name("Unknown User")
        .build();
}</code></pre>` },
      { title: "Spring Security Implementation", content: `<h2>Exercise: Secure Your API</h2>
<p>Implement JWT authentication with Spring Security.</p>
<pre><code class="language-java">// SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/admin/**").hasRole("ADMIN")
                .anyRequest().authenticated())
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
            .build();
    }
}

// JwtService.java
@Service
public class JwtService {
    @Value("\${jwt.secret}")
    private String secretKey;

    public String generateToken(UserDetails user) {
        return Jwts.builder()
            .setSubject(user.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 86400000))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
    }

    public boolean validateToken(String token, UserDetails user) {
        String username = extractUsername(token);
        return username.equals(user.getUsername()) && !isTokenExpired(token);
    }
}

// AuthController.java
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        Authentication auth = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(), request.getPassword()));

        String token = jwtService.generateToken((UserDetails) auth.getPrincipal());
        return ResponseEntity.ok(new AuthResponse(token));
    }
}</code></pre>` },
    ],
    quizQuestions: [
      { question: "What annotation marks a class as a Spring REST controller?", options: ["@Controller", "@RestController", "@Service", "@Component"], correctAnswer: 1 },
      { question: "Which Spring annotation injects dependencies?", options: ["@Inject", "@Autowired", "@Resource", "All of the above"], correctAnswer: 3 },
      { question: "What does JPA stand for?", options: ["Java Persistence API", "Java Programming API", "Java Platform Application", "Java Process Architecture"], correctAnswer: 0 },
      { question: "Which HTTP method is typically used for creating resources?", options: ["GET", "POST", "PUT", "PATCH"], correctAnswer: 1 },
      { question: "What is the purpose of @Transactional annotation?", options: ["Logging", "Security", "Database transaction management", "Caching"], correctAnswer: 2 },
    ],
  },
  "software-react": {
    videoUrls: [
      "https://www.youtube.com/watch?v=Ke90Tje7VS0", // React Tutorial
      "https://www.youtube.com/watch?v=gieEQFIfgYc", // TypeScript Tutorial
      "https://www.youtube.com/watch?v=mrjy92pW0kM", // React Hooks
      "https://www.youtube.com/watch?v=_8M-YVY76O8", // TailwindCSS
      "https://www.youtube.com/watch?v=mJ3bGvy0WAY", // Next.js Tutorial
    ],
    moduleTemplates: [
      { title: "React & TypeScript Fundamentals", description: "Modern React with TypeScript, hooks, and best practices" },
      { title: "State Management", description: "React Query, Zustand, and Context for state management" },
      { title: "Styling with Tailwind CSS", description: "Build beautiful UIs with utility-first CSS" },
      { title: "Full-Stack with Next.js", description: "Server-side rendering and API routes with Next.js" },
      { title: "Testing & Deployment", description: "Unit testing, E2E testing, and CI/CD deployment" },
    ],
    exercises: [
      { title: "React Component with TypeScript", content: `<h2>Exercise: Build a Product Card Component</h2>
<p>Create a reusable product card component with TypeScript.</p>
<pre><code class="language-typescript">// types.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  inStock: boolean;
}

// ProductCard.tsx
import { FC } from 'react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { name, price, image, rating, inStock } = product;

  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <p className="text-xl font-bold text-primary mt-2">
          {formatPrice(price)}
        </p>
        <button
          onClick={() => onAddToCart(product)}
          disabled={!inStock}
          className={\`w-full mt-4 py-2 rounded-lg font-medium transition
            \${inStock
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'}\`}
        >
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};</code></pre>` },
      { title: "Custom React Hooks", content: `<h2>Exercise: Build Custom Hooks</h2>
<p>Create reusable custom hooks for common functionality.</p>
<pre><code class="language-typescript">// useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue] as const;
}

// useFetch.ts
import { useState, useEffect } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        setState({ data, loading: false, error: null });
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          setState({ data: null, loading: false, error });
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return state;
}

// useDebounce.ts
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}</code></pre>` },
      { title: "State Management with React Query", content: `<h2>Exercise: Data Fetching with React Query</h2>
<p>Implement efficient data fetching and caching with React Query.</p>
<pre><code class="language-typescript">// api/products.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = '/api/products';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const res = await fetch(\`\${API_URL}/\${id}\`);
      if (!res.ok) throw new Error('Product not found');
      return res.json();
    },
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProduct: CreateProductDTO) => {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error('Failed to create product');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// ProductList.tsx
export const ProductList = () => {
  const { data: products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};</code></pre>` },
      { title: "Tailwind CSS Responsive Design", content: `<h2>Exercise: Build a Responsive Dashboard</h2>
<p>Create a responsive dashboard layout with Tailwind CSS.</p>
<pre><code class="language-tsx">// Dashboard.tsx
export const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar - hidden on mobile, visible on md+ */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-grow bg-white dark:bg-gray-800 border-r">
          <div className="flex items-center h-16 px-4 border-b">
            <Logo className="h-8 w-auto" />
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            <NavItem icon={HomeIcon} label="Dashboard" active />
            <NavItem icon={UsersIcon} label="Customers" />
            <NavItem icon={ChartIcon} label="Analytics" />
            <NavItem icon={SettingsIcon} label="Settings" />
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 shadow">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <button className="md:hidden">
              <MenuIcon className="h-6 w-6" />
            </button>
            <SearchInput className="hidden sm:block max-w-xs" />
            <UserMenu />
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard title="Total Revenue" value="₦24.5M" change="+12%" />
            <StatCard title="Orders" value="1,234" change="+8%" />
            <StatCard title="Customers" value="5,678" change="+23%" />
            <StatCard title="Conversion" value="3.2%" change="-2%" />
          </div>

          {/* Charts row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>Revenue Over Time</CardHeader>
              <RevenueChart />
            </Card>
            <Card>
              <CardHeader>Top Products</CardHeader>
              <ProductsTable />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};</code></pre>` },
      { title: "Next.js Full-Stack App", content: `<h2>Exercise: Build a Full-Stack Next.js App</h2>
<p>Create a complete application with Next.js App Router.</p>
<pre><code class="language-typescript">// app/api/products/route.ts - API Route
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const products = await prisma.product.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const product = await prisma.product.create({
    data: body,
  });
  return NextResponse.json(product, { status: 201 });
}

// app/products/page.tsx - Server Component
import { prisma } from '@/lib/prisma';
import { ProductGrid } from '@/components/ProductGrid';

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    where: { isPublished: true },
    include: { category: true },
  });

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
      <ProductGrid products={products} />
    </div>
  );
}

// app/products/[id]/page.tsx - Dynamic Route
export default async function ProductPage({
  params
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { reviews: true },
  });

  if (!product) notFound();

  return <ProductDetail product={product} />;
}

// components/AddToCartButton.tsx - Client Component
'use client';

export function AddToCartButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await addToCart(productId);
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Adding...' : 'Add to Cart'}
    </button>
  );
}</code></pre>` },
    ],
    quizQuestions: [
      { question: "What hook is used to manage state in functional components?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: 1 },
      { question: "What is the correct way to handle side effects in React?", options: ["useState", "useEffect", "useMemo", "useCallback"], correctAnswer: 1 },
      { question: "Which Tailwind class sets text color to blue-500?", options: ["color-blue-500", "text-blue-500", "font-blue-500", "blue-500"], correctAnswer: 1 },
      { question: "What does 'use client' directive do in Next.js?", options: ["Server-side rendering", "Marks component as client component", "Enables caching", "API route handler"], correctAnswer: 1 },
      { question: "What is React Query primarily used for?", options: ["Routing", "State management", "Server state & data fetching", "Styling"], correctAnswer: 2 },
    ],
  },
  "quality-assurance": {
    videoUrls: [
      "https://www.youtube.com/watch?v=Jy8VlooLMXc", // Software Testing
      "https://www.youtube.com/watch?v=A8S5saHzxlE", // Selenium Tutorial
      "https://www.youtube.com/watch?v=jIy8e_ZUNII", // Cypress Tutorial
      "https://www.youtube.com/watch?v=VywxIQ2ZXw4", // Postman Tutorial
      "https://www.youtube.com/watch?v=r9HdJ8P6GQI", // API Testing
    ],
    moduleTemplates: [
      { title: "Testing Fundamentals", description: "Test planning, test cases, and QA methodologies" },
      { title: "Selenium WebDriver", description: "Automate web testing with Selenium and Java/Python" },
      { title: "Cypress Modern Testing", description: "Fast, reliable testing with Cypress" },
      { title: "API & Performance Testing", description: "REST API testing with Postman and performance testing" },
      { title: "CI/CD Integration", description: "Integrate tests into CI/CD pipelines" },
    ],
    exercises: [
      { title: "Write Test Cases", content: `<h2>Exercise: Create Test Cases for Login</h2>
<p>Write comprehensive test cases for a login functionality.</p>
<h3>Test Case Template</h3>
<pre><code>Test Case ID: TC_LOGIN_001
Title: Verify successful login with valid credentials
Preconditions:
  - User has a registered account
  - User is on the login page

Test Steps:
1. Enter valid email in email field
2. Enter valid password in password field
3. Click the "Login" button

Expected Result:
- User is redirected to dashboard
- Welcome message displays user's name
- Session token is stored

Test Data:
- Email: test@example.com
- Password: ValidPass123!

---
Test Case ID: TC_LOGIN_002
Title: Verify error message with invalid password

Test Steps:
1. Enter valid email
2. Enter invalid password
3. Click "Login"

Expected Result:
- Error message: "Invalid email or password"
- User remains on login page
- Password field is cleared

---
Test Case ID: TC_LOGIN_003
Title: Verify account lockout after failed attempts

Test Steps:
1. Enter valid email
2. Enter wrong password
3. Repeat steps 1-2 five times

Expected Result:
- After 5 attempts, account is locked
- Message: "Account locked. Try again in 15 minutes"</code></pre>
<h3>Your Task:</h3>
<p>Create test cases for:</p>
<ul>
  <li>Password reset functionality</li>
  <li>Remember me checkbox</li>
  <li>Social login (Google/Facebook)</li>
</ul>` },
      { title: "Selenium Automation", content: `<h2>Exercise: Automate Tests with Selenium</h2>
<p>Write Selenium tests using Page Object Model pattern.</p>
<pre><code class="language-python"># pages/login_page.py
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class LoginPage:
    URL = "https://example.com/login"

    # Locators
    EMAIL_INPUT = (By.ID, "email")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON = (By.CSS_SELECTOR, "button[type='submit']")
    ERROR_MESSAGE = (By.CLASS_NAME, "error-message")

    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def navigate(self):
        self.driver.get(self.URL)
        return self

    def enter_email(self, email: str):
        self.wait.until(EC.visibility_of_element_located(self.EMAIL_INPUT))
        self.driver.find_element(*self.EMAIL_INPUT).send_keys(email)
        return self

    def enter_password(self, password: str):
        self.driver.find_element(*self.PASSWORD_INPUT).send_keys(password)
        return self

    def click_login(self):
        self.driver.find_element(*self.LOGIN_BUTTON).click()
        return self

    def login(self, email: str, password: str):
        self.enter_email(email)
        self.enter_password(password)
        self.click_login()
        return self

    def get_error_message(self) -> str:
        return self.wait.until(
            EC.visibility_of_element_located(self.ERROR_MESSAGE)
        ).text

# tests/test_login.py
import pytest
from pages.login_page import LoginPage

class TestLogin:
    @pytest.fixture(autouse=True)
    def setup(self, driver):
        self.login_page = LoginPage(driver)
        self.login_page.navigate()

    def test_successful_login(self):
        self.login_page.login("valid@email.com", "ValidPass123")
        assert "dashboard" in self.driver.current_url

    def test_invalid_password(self):
        self.login_page.login("valid@email.com", "wrongpassword")
        error = self.login_page.get_error_message()
        assert "Invalid email or password" in error

    def test_empty_fields(self):
        self.login_page.click_login()
        assert "required" in self.login_page.get_error_message().lower()</code></pre>` },
      { title: "Cypress E2E Testing", content: `<h2>Exercise: Cypress End-to-End Tests</h2>
<p>Write comprehensive E2E tests with Cypress.</p>
<pre><code class="language-javascript">// cypress/e2e/checkout.cy.ts
describe('Checkout Flow', () => {
  beforeEach(() => {
    cy.login('customer@example.com', 'password123');
    cy.visit('/products');
  });

  it('should complete a purchase successfully', () => {
    // Add product to cart
    cy.get('[data-testid="product-card"]').first()
      .find('[data-testid="add-to-cart"]')
      .click();

    // Verify cart updated
    cy.get('[data-testid="cart-count"]').should('contain', '1');

    // Go to cart
    cy.get('[data-testid="cart-icon"]').click();
    cy.url().should('include', '/cart');

    // Verify product in cart
    cy.get('[data-testid="cart-item"]').should('have.length', 1);

    // Proceed to checkout
    cy.get('[data-testid="checkout-button"]').click();

    // Fill shipping info
    cy.get('[name="address"]').type('123 Test Street, Lagos');
    cy.get('[name="phone"]').type('08012345678');

    // Select payment method
    cy.get('[data-testid="payment-card"]').click();

    // Fill card details (test card)
    cy.getIframeBody('#card-frame').within(() => {
      cy.get('[name="cardNumber"]').type('4242424242424242');
      cy.get('[name="expiry"]').type('1225');
      cy.get('[name="cvv"]').type('123');
    });

    // Complete order
    cy.get('[data-testid="place-order"]').click();

    // Verify success
    cy.get('[data-testid="order-confirmation"]').should('be.visible');
    cy.get('[data-testid="order-number"]').should('exist');
  });

  it('should handle out of stock items', () => {
    cy.intercept('POST', '/api/cart/add', {
      statusCode: 400,
      body: { error: 'Product out of stock' }
    });

    cy.get('[data-testid="add-to-cart"]').first().click();
    cy.get('[data-testid="error-toast"]')
      .should('contain', 'out of stock');
  });
});

// cypress/support/commands.ts
Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.request('POST', '/api/auth/login', { email, password })
      .then((response) => {
        window.localStorage.setItem('token', response.body.token);
      });
  });
});</code></pre>` },
      { title: "API Testing with Postman", content: `<h2>Exercise: API Test Collection</h2>
<p>Create a comprehensive API test collection in Postman.</p>
<pre><code class="language-javascript">// Pre-request Script (Collection level)
// Set environment variables
const baseUrl = pm.environment.get("baseUrl");
const timestamp = Date.now();
pm.environment.set("timestamp", timestamp);

// Generate random test data
pm.environment.set("randomEmail", \`test_\${timestamp}@example.com\`);

// Tests for POST /api/users
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Response has correct structure", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('id');
    pm.expect(response).to.have.property('email');
    pm.expect(response).to.have.property('createdAt');
});

pm.test("Email matches request", function () {
    const request = JSON.parse(pm.request.body.raw);
    const response = pm.response.json();
    pm.expect(response.email).to.equal(request.email);
});

// Store user ID for subsequent tests
pm.test("Store user ID", function () {
    const response = pm.response.json();
    pm.environment.set("userId", response.id);
});

// Tests for GET /api/users/:id
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response time is acceptable", function () {
    pm.expect(pm.response.responseTime).to.be.below(500);
});

pm.test("Content-Type is JSON", function () {
    pm.expect(pm.response.headers.get('Content-Type'))
      .to.include('application/json');
});

// Tests for authentication
pm.test("Token is returned", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('token');
    pm.environment.set("authToken", response.token);
});

// Schema validation
const schema = {
    "type": "object",
    "required": ["id", "email", "firstName", "lastName"],
    "properties": {
        "id": { "type": "string" },
        "email": { "type": "string", "format": "email" },
        "firstName": { "type": "string" },
        "lastName": { "type": "string" }
    }
};

pm.test("Schema is valid", function () {
    pm.response.to.have.jsonSchema(schema);
});</code></pre>
<h3>Test Collection Structure:</h3>
<ul>
  <li>Authentication (Login, Register, Refresh Token)</li>
  <li>Users (CRUD operations)</li>
  <li>Products (List, Create, Update, Delete)</li>
  <li>Orders (Create, Get, Cancel)</li>
</ul>` },
      { title: "CI/CD Test Integration", content: `<h2>Exercise: Integrate Tests in CI/CD</h2>
<p>Set up automated testing in GitHub Actions.</p>
<pre><code class="language-yaml"># .github/workflows/test.yml
name: Test Suite

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run unit tests
        run: npm run test:unit -- --coverage

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  e2e-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        ports:
          - 5432:5432

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Start application
        run: npm run start:test &
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/test

      - name: Wait for app
        run: npx wait-on http://localhost:3000

      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          wait-on: 'http://localhost:3000'
          record: true
        env:
          CYPRESS_RECORD_KEY: \${{ secrets.CYPRESS_RECORD_KEY }}

      - name: Upload test artifacts
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-screenshots
          path: cypress/screenshots

  api-tests:
    runs-on: ubuntu-latest
    needs: unit-tests
    steps:
      - uses: actions/checkout@v3

      - name: Run Newman tests
        run: |
          npm install -g newman
          newman run postman/collection.json \\
            -e postman/env.json \\
            --reporters cli,junit \\
            --reporter-junit-export results.xml</code></pre>` },
    ],
    quizQuestions: [
      { question: "What is the purpose of a test case?", options: ["To document bugs", "To define steps to verify functionality", "To write code", "To deploy applications"], correctAnswer: 1 },
      { question: "Which Selenium method waits for an element to be visible?", options: ["waitFor()", "sleep()", "WebDriverWait with expected_conditions", "pause()"], correctAnswer: 2 },
      { question: "What does cy.intercept() do in Cypress?", options: ["Pause test execution", "Mock API responses", "Click an element", "Navigate to URL"], correctAnswer: 1 },
      { question: "What HTTP status code indicates a successful POST request?", options: ["200", "201", "204", "301"], correctAnswer: 1 },
      { question: "What is regression testing?", options: ["Testing new features only", "Re-testing to ensure changes haven't broken existing functionality", "Load testing", "Security testing"], correctAnswer: 1 },
    ],
  },
  "solutions-architecture": {
    videoUrls: [
      "https://www.youtube.com/watch?v=8hly31xKli0", // System Design Basics
      "https://www.youtube.com/watch?v=Y-Gl4HEyeUQ", // Microservices Architecture
      "https://www.youtube.com/watch?v=UzLMhqg3_Wc", // AWS Architecture
      "https://www.youtube.com/watch?v=K4WNDNs8gEs", // Database Design
      "https://www.youtube.com/watch?v=daVK7l6hqnA", // Event-Driven Architecture
    ],
    moduleTemplates: [
      { title: "Architecture Fundamentals", description: "Design principles, patterns, and decision frameworks" },
      { title: "Distributed Systems Design", description: "Design scalable, fault-tolerant distributed systems" },
      { title: "Multi-Cloud Architecture", description: "Architect solutions across AWS, Azure, and GCP" },
      { title: "Data Architecture", description: "Design data pipelines, storage, and analytics systems" },
      { title: "Case Studies & Capstone", description: "Real-world architecture case studies and projects" },
    ],
    exercises: [
      { title: "System Design - URL Shortener", content: `<h2>Exercise: Design a URL Shortener (like Bitly)</h2>
<p>Design a scalable URL shortening service for Nigerian users.</p>
<h3>Requirements:</h3>
<ul>
  <li>Shorten URLs (long URL → short code)</li>
  <li>Redirect short URLs to original</li>
  <li>Analytics tracking</li>
  <li>100M URLs/month, 10:1 read/write ratio</li>
</ul>
<h3>Architecture Diagram:</h3>
<pre><code>┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Client    │────▶│ Load Balancer│────▶│  API Gateway │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
        ┌───────────────────────────────────────┼───────────────────┐
        │                                       │                   │
        ▼                                       ▼                   ▼
┌───────────────┐                    ┌───────────────┐     ┌───────────────┐
│ URL Service   │                    │ Analytics Svc │     │ Auth Service  │
└───────┬───────┘                    └───────┬───────┘     └───────────────┘
        │                                    │
        ▼                                    ▼
┌───────────────┐                    ┌───────────────┐
│ Redis Cache   │                    │ Kafka Queue   │
└───────┬───────┘                    └───────┬───────┘
        │                                    │
        ▼                                    ▼
┌───────────────┐                    ┌───────────────┐
│  PostgreSQL   │                    │ ClickHouse    │
│ (URL Storage) │                    │ (Analytics)   │
└───────────────┘                    └───────────────┘</code></pre>
<h3>Key Decisions:</h3>
<ol>
  <li><strong>Short Code Generation:</strong> Base62 encoding (a-z, A-Z, 0-9)</li>
  <li><strong>Storage:</strong> PostgreSQL for URLs, Redis for caching hot URLs</li>
  <li><strong>Scaling:</strong> Horizontal scaling of API servers</li>
  <li><strong>Analytics:</strong> Async processing via Kafka to ClickHouse</li>
</ol>` },
      { title: "Design a Payment System", content: `<h2>Exercise: Design a Payment Processing System</h2>
<p>Design a payment system like Paystack/Flutterwave for Nigerian businesses.</p>
<h3>High-Level Architecture:</h3>
<pre><code>┌──────────────────────────────────────────────────────────────┐
│                        API Gateway                            │
│            (Rate Limiting, Auth, Request Routing)            │
└─────────────────────────────┬────────────────────────────────┘
                              │
      ┌───────────────────────┼───────────────────────┐
      │                       │                       │
      ▼                       ▼                       ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────────┐
│ Payment API │      │ Webhook Svc │      │ Merchant Portal │
└──────┬──────┘      └──────┬──────┘      └─────────────────┘
       │                    │
       ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                   Payment Orchestrator                       │
│         (Transaction State Machine, Retry Logic)            │
└─────────────────────────────┬───────────────────────────────┘
                              │
      ┌───────────────────────┼───────────────────────┐
      │                       │                       │
      ▼                       ▼                       ▼
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│ Card Gateway│      │ Bank Gateway│      │ USSD Gateway│
│ (Visa, MC)  │      │ (NIBSS)     │      │             │
└─────────────┘      └─────────────┘      └─────────────┘

Storage Layer:
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│ PostgreSQL  │      │    Redis    │      │   Kafka     │
│(Transactions│      │ (Sessions,  │      │ (Events,    │
│  Merchants) │      │  Idempotency│      │  Webhooks)  │
└─────────────┘      └─────────────┘      └─────────────┘</code></pre>
<h3>Key Components:</h3>
<ul>
  <li><strong>Idempotency:</strong> Redis-based idempotency keys</li>
  <li><strong>PCI Compliance:</strong> Tokenization, encryption at rest</li>
  <li><strong>Reconciliation:</strong> Daily batch jobs comparing with banks</li>
  <li><strong>Fraud Detection:</strong> ML-based transaction scoring</li>
</ul>` },
      { title: "Design Netflix-like Streaming", content: `<h2>Exercise: Design a Video Streaming Platform</h2>
<p>Design a video streaming platform for African content.</p>
<pre><code>Content Delivery Architecture:

┌──────────┐    ┌─────────┐    ┌─────────────────────────────┐
│  Client  │───▶│   DNS   │───▶│   CDN (Multiple Locations)  │
└──────────┘    └─────────┘    │   - Lagos Edge Server       │
                               │   - Nairobi Edge Server     │
                               │   - Johannesburg Edge       │
                               └────────────┬────────────────┘
                                            │ Cache Miss
                                            ▼
                               ┌─────────────────────────────┐
                               │      Origin Servers         │
                               │   (S3 / CloudFront)         │
                               └─────────────────────────────┘

Video Processing Pipeline:
┌─────────┐     ┌─────────────┐     ┌───────────────┐
│ Upload  │────▶│ Transcode   │────▶│  Store HLS    │
│ Service │     │ Service     │     │  Segments     │
└─────────┘     │ (Multiple   │     │  (S3)         │
                │  qualities) │     └───────────────┘
                └─────────────┘

Recommendation Engine:
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ User Events  │────▶│ Spark/Flink │────▶│    ML Model  │
│ (Kafka)      │     │ Processing   │     │ (SageMaker)  │
└──────────────┘     └──────────────┘     └──────────────┘</code></pre>
<h3>Key Considerations:</h3>
<ul>
  <li>Adaptive bitrate streaming (HLS/DASH)</li>
  <li>Edge caching for low latency in Africa</li>
  <li>Offline viewing support</li>
  <li>Multi-tenant content management</li>
</ul>` },
      { title: "Database Sharding Strategy", content: `<h2>Exercise: Design a Sharding Strategy</h2>
<p>Design database sharding for a high-volume e-commerce platform.</p>
<pre><code>Sharding Approaches:

1. HORIZONTAL SHARDING (by user_id)
┌────────────────────────────────────────────────────┐
│                   Application                       │
│                  Shard Router                       │
└───────┬────────────────┬────────────────┬─────────┘
        │                │                │
        ▼                ▼                ▼
   ┌─────────┐      ┌─────────┐      ┌─────────┐
   │ Shard 1 │      │ Shard 2 │      │ Shard 3 │
   │ Users   │      │ Users   │      │ Users   │
   │ 1-1M    │      │ 1M-2M   │      │ 2M-3M   │
   └─────────┘      └─────────┘      └─────────┘

2. CONSISTENT HASHING
          ┌───────────────────────┐
         ╱                         ╲
        ╱    0°                     ╲
       │      ●───── Shard A         │
       │     ╱                       │
       │   90°                  270° │
       │    ●                    ●   │
       │ Shard B              Shard D│
       │                             │
        ╲    ●───── Shard C        ╱
         ╲  180°                  ╱
          └───────────────────────┘

3. IMPLEMENTATION EXAMPLE (Python)
</code></pre>
<pre><code class="language-python"># Shard router implementation
class ShardRouter:
    def __init__(self, num_shards: int):
        self.num_shards = num_shards
        self.connections = self._init_connections()

    def get_shard(self, user_id: int) -> int:
        # Consistent hashing
        return hash(str(user_id)) % self.num_shards

    def execute_query(self, user_id: int, query: str):
        shard_id = self.get_shard(user_id)
        connection = self.connections[shard_id]
        return connection.execute(query)

    def scatter_gather(self, query: str):
        """Execute query on all shards and aggregate results"""
        results = []
        for conn in self.connections.values():
            results.extend(conn.execute(query))
        return results</code></pre>
<h3>Considerations:</h3>
<ul>
  <li>Cross-shard queries</li>
  <li>Rebalancing when adding shards</li>
  <li>Handling hot spots</li>
</ul>` },
      { title: "Event-Driven Architecture", content: `<h2>Exercise: Design Event-Driven System</h2>
<p>Design an event-driven e-commerce order system.</p>
<pre><code>Event Flow:

┌────────────┐    ┌─────────────────────────────────────────────┐
│   Client   │───▶│              API Gateway                     │
└────────────┘    └──────────────────┬──────────────────────────┘
                                     │
                                     ▼
                           ┌─────────────────┐
                           │  Order Service  │
                           │   (Producer)    │
                           └────────┬────────┘
                                    │
                                    ▼ OrderCreated Event
                    ┌───────────────────────────────────┐
                    │           Kafka / EventBridge      │
                    └───┬───────────┬───────────┬───────┘
                        │           │           │
          ┌─────────────▼──┐  ┌─────▼─────┐  ┌──▼──────────┐
          │ Inventory Svc  │  │ Payment   │  │ Notification│
          │ (Reserve)      │  │ Service   │  │ Service     │
          └───────┬────────┘  └─────┬─────┘  └─────────────┘
                  │                 │
                  ▼                 ▼
          InventoryReserved    PaymentProcessed
                  │                 │
                  └────────┬────────┘
                           ▼
                    ┌─────────────┐
                    │   Saga      │
                    │ Orchestrator│
                    └──────┬──────┘
                           │
                           ▼
              ┌───────────────────────┐
              │   Fulfillment Service │
              └───────────────────────┘</code></pre>
<pre><code class="language-typescript">// Event types
interface OrderCreatedEvent {
  eventId: string;
  timestamp: Date;
  orderId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
}

// Saga pattern implementation
class OrderSaga {
  async execute(orderId: string) {
    try {
      // Step 1: Reserve inventory
      await this.inventoryService.reserve(orderId);

      // Step 2: Process payment
      await this.paymentService.charge(orderId);

      // Step 3: Confirm order
      await this.orderService.confirm(orderId);

    } catch (error) {
      // Compensating transactions
      await this.rollback(orderId, error);
    }
  }

  async rollback(orderId: string, error: Error) {
    // Reverse in opposite order
    await this.paymentService.refund(orderId);
    await this.inventoryService.release(orderId);
    await this.orderService.cancel(orderId);
  }
}</code></pre>` },
    ],
    quizQuestions: [
      { question: "What is the CAP theorem about?", options: ["Cost, Availability, Performance", "Consistency, Availability, Partition tolerance trade-offs", "Caching, API, Processing", "None of the above"], correctAnswer: 1 },
      { question: "What is horizontal scaling?", options: ["Adding more CPU/RAM to a server", "Adding more servers to handle load", "Increasing disk space", "Upgrading network bandwidth"], correctAnswer: 1 },
      { question: "What is a circuit breaker pattern used for?", options: ["Electrical safety", "Preventing cascade failures in distributed systems", "Data encryption", "Load balancing"], correctAnswer: 1 },
      { question: "What is eventual consistency?", options: ["Immediate data consistency", "Data will become consistent over time", "Data is never consistent", "Database locking"], correctAnswer: 1 },
      { question: "What is the purpose of a message queue?", options: ["Store files", "Decouple services and handle async processing", "Database backup", "User authentication"], correctAnswer: 1 },
    ],
  },
  "ai-ml": {
    videoUrls: [
      "https://www.youtube.com/watch?v=aircAruvnKk", // Neural Networks
      "https://www.youtube.com/watch?v=tPYj3fFJGjk", // TensorFlow Tutorial
      "https://www.youtube.com/watch?v=c36lUUr864M", // PyTorch Tutorial
      "https://www.youtube.com/watch?v=WUvTyaaNkzM", // CNN Tutorial
      "https://www.youtube.com/watch?v=7PNvPI4-26Y", // NLP with Transformers
    ],
    moduleTemplates: [
      { title: "ML Fundamentals & Python", description: "Core ML concepts, algorithms, and Python tools" },
      { title: "Deep Learning with TensorFlow", description: "Build neural networks with TensorFlow and Keras" },
      { title: "Computer Vision", description: "Image classification, object detection, and CNNs" },
      { title: "Natural Language Processing", description: "Text processing, sentiment analysis, and transformers" },
      { title: "ML in Production", description: "Deploy and monitor ML models in production" },
    ],
    exercises: [
      { title: "Build a Classification Model", content: `<h2>Exercise: Customer Churn Prediction</h2>
<p>Build a machine learning model to predict customer churn for a Nigerian telecom.</p>
<pre><code class="language-python">import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Load and explore data
df = pd.read_csv('telecom_churn.csv')
print(df.info())
print(df['Churn'].value_counts())

# Feature engineering
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)

# Encode categorical variables
label_encoders = {}
categorical_cols = ['gender', 'Partner', 'Dependents', 'PhoneService',
                    'InternetService', 'Contract', 'PaymentMethod']

for col in categorical_cols:
    le = LabelEncoder()
    df[col] = le.fit_transform(df[col])
    label_encoders[col] = le

# Prepare features and target
X = df.drop(['customerID', 'Churn'], axis=1)
y = df['Churn'].map({'Yes': 1, 'No': 0})

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
print(classification_report(y_test, y_pred))

# Feature importance
importance = pd.DataFrame({
    'feature': X.columns,
    'importance': model.feature_importances_
}).sort_values('importance', ascending=False)
print(importance.head(10))</code></pre>
<h3>Tasks:</h3>
<ul>
  <li>Improve model with hyperparameter tuning</li>
  <li>Try XGBoost and compare results</li>
  <li>Handle class imbalance with SMOTE</li>
</ul>` },
      { title: "Build a Neural Network", content: `<h2>Exercise: Image Classification with TensorFlow</h2>
<p>Build a CNN to classify Nigerian food images.</p>
<pre><code class="language-python">import tensorflow as tf
from tensorflow.keras import layers, models
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import matplotlib.pyplot as plt

# Data augmentation
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=20,
    width_shift_range=0.2,
    height_shift_range=0.2,
    shear_range=0.2,
    zoom_range=0.2,
    horizontal_flip=True,
    validation_split=0.2
)

# Load images
train_generator = train_datagen.flow_from_directory(
    'nigerian_food_dataset',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    'nigerian_food_dataset',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# Build CNN model
model = models.Sequential([
    # First Conv Block
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(224, 224, 3)),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),

    # Second Conv Block
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),

    # Third Conv Block
    layers.Conv2D(128, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),

    # Fourth Conv Block
    layers.Conv2D(256, (3, 3), activation='relu'),
    layers.BatchNormalization(),
    layers.MaxPooling2D((2, 2)),

    # Dense Layers
    layers.Flatten(),
    layers.Dropout(0.5),
    layers.Dense(512, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(len(train_generator.class_indices), activation='softmax')
])

# Compile
model.compile(
    optimizer='adam',
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    train_generator,
    epochs=20,
    validation_data=val_generator,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True),
        tf.keras.callbacks.ReduceLROnPlateau(factor=0.2, patience=3)
    ]
)

# Plot training history
plt.figure(figsize=(12, 4))
plt.subplot(1, 2, 1)
plt.plot(history.history['accuracy'], label='Train')
plt.plot(history.history['val_accuracy'], label='Validation')
plt.title('Model Accuracy')
plt.legend()

plt.subplot(1, 2, 2)
plt.plot(history.history['loss'], label='Train')
plt.plot(history.history['val_loss'], label='Validation')
plt.title('Model Loss')
plt.legend()
plt.show()</code></pre>` },
      { title: "Transfer Learning", content: `<h2>Exercise: Transfer Learning with Pre-trained Models</h2>
<p>Use transfer learning for better results with less data.</p>
<pre><code class="language-python">import tensorflow as tf
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras import layers, models

# Load pre-trained model (without top layers)
base_model = MobileNetV2(
    weights='imagenet',
    include_top=False,
    input_shape=(224, 224, 3)
)

# Freeze base model layers
base_model.trainable = False

# Build custom classifier on top
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.BatchNormalization(),
    layers.Dropout(0.5),
    layers.Dense(256, activation='relu'),
    layers.BatchNormalization(),
    layers.Dropout(0.3),
    layers.Dense(num_classes, activation='softmax')
])

# Initial training with frozen base
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-3),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(train_generator, epochs=10, validation_data=val_generator)

# Fine-tuning: Unfreeze some layers
base_model.trainable = True

# Freeze all layers except the last 20
for layer in base_model.layers[:-20]:
    layer.trainable = False

# Re-compile with lower learning rate
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Fine-tune
model.fit(
    train_generator,
    epochs=10,
    validation_data=val_generator,
    callbacks=[
        tf.keras.callbacks.EarlyStopping(patience=3)
    ]
)

# Save model
model.save('nigerian_food_classifier.h5')

# Convert to TensorFlow Lite for mobile deployment
converter = tf.lite.TFLiteConverter.from_keras_model(model)
tflite_model = converter.convert()
with open('model.tflite', 'wb') as f:
    f.write(tflite_model)</code></pre>` },
      { title: "NLP Sentiment Analysis", content: `<h2>Exercise: Sentiment Analysis for Nigerian Social Media</h2>
<p>Build a sentiment classifier for Naija Twitter/social media text.</p>
<pre><code class="language-python">import tensorflow as tf
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
import pandas as pd
import numpy as np

# Load pre-trained model and tokenizer
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSequenceClassification.from_pretrained(
    model_name,
    num_labels=3  # Positive, Negative, Neutral
)

# Sample Naija tweets
texts = [
    "This new feature dey fire! E sweet me die 🔥",
    "Abeg make una fix this app, e no dey work at all",
    "The service is okay sha, nothing special",
    "MTN wan kill person with their network issues",
    "Paystack payment dey quick! I like am"
]

# Preprocess and tokenize
def preprocess(text):
    # Handle Naija pidgin and slang
    text = text.lower()
    # Add more preprocessing as needed
    return text

inputs = tokenizer(
    [preprocess(t) for t in texts],
    padding=True,
    truncation=True,
    max_length=128,
    return_tensors="tf"
)

# Training loop
optimizer = tf.keras.optimizers.Adam(learning_rate=2e-5)
loss_fn = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)

@tf.function
def train_step(inputs, labels):
    with tf.GradientTape() as tape:
        outputs = model(inputs, training=True)
        loss = loss_fn(labels, outputs.logits)

    gradients = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(zip(gradients, model.trainable_variables))
    return loss

# Inference function
def predict_sentiment(text):
    inputs = tokenizer(
        preprocess(text),
        return_tensors="tf",
        padding=True,
        truncation=True,
        max_length=128
    )
    outputs = model(inputs)
    predictions = tf.nn.softmax(outputs.logits, axis=-1)
    labels = ['Negative', 'Neutral', 'Positive']
    predicted_label = labels[tf.argmax(predictions, axis=-1).numpy()[0]]
    confidence = tf.reduce_max(predictions).numpy()

    return {
        'sentiment': predicted_label,
        'confidence': float(confidence),
        'probabilities': {
            label: float(prob)
            for label, prob in zip(labels, predictions.numpy()[0])
        }
    }

# Test
result = predict_sentiment("This app dey work well well!")
print(result)</code></pre>` },
      { title: "Deploy ML Model", content: `<h2>Exercise: Deploy Model with FastAPI</h2>
<p>Deploy your trained model as a REST API.</p>
<pre><code class="language-python"># app.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
from PIL import Image
import io
import base64

app = FastAPI(title="Nigerian Food Classifier API")

# Load model at startup
model = tf.keras.models.load_model('nigerian_food_classifier.h5')

# Class labels
CLASSES = ['jollof_rice', 'egusi_soup', 'pounded_yam', 'suya', 'akara',
           'moi_moi', 'pepper_soup', 'fried_rice', 'chin_chin', 'puff_puff']

class PredictionRequest(BaseModel):
    image_base64: str

class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float
    all_probabilities: dict

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    try:
        # Decode base64 image
        image_data = base64.b64decode(request.image_base64)
        image = Image.open(io.BytesIO(image_data))

        # Preprocess
        image = image.resize((224, 224))
        image_array = np.array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        # Predict
        predictions = model.predict(image_array)[0]
        predicted_idx = np.argmax(predictions)

        return PredictionResponse(
            predicted_class=CLASSES[predicted_idx],
            confidence=float(predictions[predicted_idx]),
            all_probabilities={
                cls: float(prob)
                for cls, prob in zip(CLASSES, predictions)
            }
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
async def health():
    return {"status": "healthy"}

# Dockerfile
"""
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
"""

# Deploy to AWS Lambda with Mangum
from mangum import Mangum
handler = Mangum(app)</code></pre>
<h3>Deployment Options:</h3>
<ul>
  <li>AWS Lambda + API Gateway</li>
  <li>AWS SageMaker endpoints</li>
  <li>Google Cloud Run</li>
  <li>Self-hosted with Docker</li>
</ul>` },
    ],
    quizQuestions: [
      { question: "What is the purpose of an activation function in neural networks?", options: ["To normalize data", "To introduce non-linearity", "To reduce overfitting", "To speed up training"], correctAnswer: 1 },
      { question: "What does CNN stand for?", options: ["Computational Neural Network", "Convolutional Neural Network", "Connected Node Network", "Complex Neuron Network"], correctAnswer: 1 },
      { question: "What is overfitting?", options: ["Model performs well on training data but poorly on new data", "Model is too simple", "Model trains too fast", "Model uses too much memory"], correctAnswer: 0 },
      { question: "What is the purpose of dropout in deep learning?", options: ["Speed up training", "Reduce overfitting by randomly disabling neurons", "Increase model size", "Improve accuracy on training data"], correctAnswer: 1 },
      { question: "What is transfer learning?", options: ["Moving data between servers", "Using a pre-trained model as starting point", "Training multiple models", "Transferring weights manually"], correctAnswer: 1 },
    ],
  },
};

// Generate mock modules and lessons for each course
const generateMockModulesForCourse = (course: typeof mockCourses[0]): MockModule[] => {
  const baseModuleId = course.id * 100;
  const baseLessonId = course.id * 1000;

  // Get course-specific content or use default
  const config = courseContentConfig[course.specialization] || courseContentConfig["software-react"];

  return config.moduleTemplates.map((template, moduleIndex) => {
    const moduleId = baseModuleId + moduleIndex + 1;
    const videoUrl = config.videoUrls[moduleIndex] || config.videoUrls[0];
    const exercise = config.exercises[moduleIndex] || config.exercises[0];
    const quizQ1 = config.quizQuestions[moduleIndex * 2] || config.quizQuestions[0];
    const quizQ2 = config.quizQuestions[moduleIndex * 2 + 1] || config.quizQuestions[1];

    const lessons: MockLesson[] = [
      {
        id: baseLessonId + (moduleIndex * 10) + 1,
        moduleId,
        title: `${template.title} Overview`,
        type: "text",
        content: `<h1>${template.title}</h1>
<p class="lead">${template.description}</p>

<h2>What You'll Learn</h2>
<p>In this module of <strong>${course.title}</strong>, you will:</p>
<ul>
  ${course.learningOutcomes?.slice(0, 3).map(outcome => `<li>${outcome}</li>`).join('\n  ') || '<li>Master key concepts</li>'}
</ul>

<h2>Technologies Covered</h2>
<p>This module covers the following technologies:</p>
<div class="tech-stack">
  ${course.technologies?.slice(0, 4).map(tech => `<span class="badge">${tech.toUpperCase()}</span>`).join(' ') || ''}
</div>

<h2>Prerequisites</h2>
<p>Before starting this module, ensure you have:</p>
<ul>
  <li>Completed the previous modules (if applicable)</li>
  <li>Basic understanding of ${course.specialization.replace('-', ' ')}</li>
  <li>Your development environment set up</li>
</ul>

<h2>Module Structure</h2>
<ol>
  <li><strong>Overview</strong> - This lesson (current)</li>
  <li><strong>Video Tutorial</strong> - Visual walkthrough of concepts</li>
  <li><strong>Hands-on Exercise</strong> - Practice what you learned</li>
  <li><strong>Module Quiz</strong> - Test your understanding</li>
</ol>

<p>Let's begin your journey into ${template.title.toLowerCase()}!</p>`,
        order: 1,
        isPublished: true,
        estimatedMinutes: 15,
      },
      {
        id: baseLessonId + (moduleIndex * 10) + 2,
        moduleId,
        title: `${template.title} - Video Tutorial`,
        type: "video",
        content: "",
        videoUrl: videoUrl,
        order: 2,
        isPublished: true,
        estimatedMinutes: 25,
      },
      {
        id: baseLessonId + (moduleIndex * 10) + 3,
        moduleId,
        title: exercise.title,
        type: "code",
        content: exercise.content,
        order: 3,
        isPublished: true,
        estimatedMinutes: 30,
      },
      {
        id: baseLessonId + (moduleIndex * 10) + 4,
        moduleId,
        title: `${template.title} - Quiz`,
        type: "quiz",
        content: JSON.stringify([
          {
            id: `q1-${moduleId}`,
            question: quizQ1.question,
            options: quizQ1.options,
            correctAnswer: quizQ1.correctAnswer,
            points: 10,
            explanation: `The correct answer demonstrates understanding of ${template.title.toLowerCase()}.`
          },
          {
            id: `q2-${moduleId}`,
            question: quizQ2.question,
            options: quizQ2.options,
            correctAnswer: quizQ2.correctAnswer,
            points: 10,
            explanation: `This concept is fundamental to ${course.specialization.replace('-', ' ')}.`
          }
        ]),
        order: 4,
        isPublished: true,
        estimatedMinutes: 10,
      },
    ];

    return {
      id: moduleId,
      courseId: course.id,
      title: template.title,
      description: template.description,
      order: moduleIndex + 1,
      isPublished: moduleIndex < 3,
      lessons,
    };
  });
};

// Create mock modules for all courses
export const mockModules: MockModule[] = mockCourses.flatMap((course) =>
  generateMockModulesForCourse(course)
);

// Helper to get modules for a specific course
export const getModulesForCourse = (courseId: number): MockModule[] => {
  return mockModules.filter(m => m.courseId === courseId);
};

// Helper to get a specific lesson
export const getLesson = (lessonId: number): MockLesson | undefined => {
  for (const module of mockModules) {
    const lesson = module.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

// Helper to get course with modules
export const getCourseWithModules = (courseId: number) => {
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return null;
  return {
    ...course,
    modules: getModulesForCourse(courseId),
  };
};
