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

// Generate mock modules and lessons for each course
const generateMockModulesForCourse = (courseId: number, courseTitle: string): MockModule[] => {
  const baseModuleId = courseId * 100;
  const baseLessonId = courseId * 1000;

  const moduleTemplates = [
    { title: "Introduction & Setup", description: "Get started with the fundamentals" },
    { title: "Core Concepts", description: "Master the essential concepts" },
    { title: "Advanced Topics", description: "Deep dive into advanced features" },
    { title: "Practical Projects", description: "Apply what you learned" },
    { title: "Final Assessment", description: "Test your knowledge" },
  ];

  return moduleTemplates.map((template, moduleIndex) => {
    const moduleId = baseModuleId + moduleIndex + 1;
    const lessons: MockLesson[] = [
      {
        id: baseLessonId + (moduleIndex * 10) + 1,
        moduleId,
        title: `${template.title} Overview`,
        type: "text",
        content: `<h1>${template.title}</h1><p>Welcome to this module. In this section, you will learn about ${template.description.toLowerCase()}.</p><h2>Learning Objectives</h2><ul><li>Understand the key concepts</li><li>Apply practical knowledge</li><li>Build real-world projects</li></ul>`,
        order: 1,
        isPublished: true,
        estimatedMinutes: 15,
      },
      {
        id: baseLessonId + (moduleIndex * 10) + 2,
        moduleId,
        title: "Video Tutorial",
        type: "video",
        content: "",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        order: 2,
        isPublished: true,
        estimatedMinutes: 20,
      },
      {
        id: baseLessonId + (moduleIndex * 10) + 3,
        moduleId,
        title: "Hands-on Exercise",
        type: "code",
        content: `<h2>Exercise: Practice What You Learned</h2><p>Complete the following code exercise to reinforce your understanding.</p><pre><code>// Your code here
function example() {
  console.log("Hello, World!");
}
</code></pre>`,
        order: 3,
        isPublished: true,
        estimatedMinutes: 25,
      },
      {
        id: baseLessonId + (moduleIndex * 10) + 4,
        moduleId,
        title: "Module Quiz",
        type: "quiz",
        content: JSON.stringify([
          {
            id: `q1-${moduleId}`,
            question: "What is the main purpose of this module?",
            options: ["Learning basics", "Advanced topics", "Testing", "All of the above"],
            correctAnswer: 3,
            points: 10,
            explanation: "This module covers all aspects of the topic."
          },
          {
            id: `q2-${moduleId}`,
            question: "Which best describes your learning progress?",
            options: ["Just started", "Intermediate", "Advanced", "Expert"],
            correctAnswer: 1,
            points: 10,
            explanation: "Keep learning to advance your skills!"
          }
        ]),
        order: 4,
        isPublished: true,
        estimatedMinutes: 10,
      },
    ];

    return {
      id: moduleId,
      courseId,
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
  generateMockModulesForCourse(course.id, course.title)
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
