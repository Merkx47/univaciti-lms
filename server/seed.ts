import { db } from "./db";
import { users, courses, badges, modules, lessons } from "@shared/schema";
import { hashPassword } from "./auth";
import { eq } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // Create test users for all roles
  const testUsers = [
    {
      username: "admin",
      email: "admin@univaciti.com",
      password: "admin123",
      firstName: "Admin",
      lastName: "User",
      role: "admin" as const,
    },
    {
      username: "instructor",
      email: "instructor@univaciti.com",
      password: "instructor123",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "instructor" as const,
    },
    {
      username: "student",
      email: "student@univaciti.com",
      password: "student123",
      firstName: "John",
      lastName: "Smith",
      role: "student" as const,
    },
    {
      username: "demo",
      email: "demo@univaciti.com",
      password: "demo123",
      firstName: "Demo",
      lastName: "User",
      role: "student" as const,
    },
  ];

  for (const user of testUsers) {
    const [existing] = await db.select().from(users).where(eq(users.username, user.username));
    if (!existing) {
      await db.insert(users).values({
        ...user,
        password: await hashPassword(user.password),
        isActive: true,
      });
      console.log(`Created ${user.role} user: ${user.username} / ${user.password}`);
    } else {
      console.log(`${user.role} user already exists: ${user.username}`);
    }
  }

  // Create sample courses for each TESA specialization
  const specializations = [
    {
      title: "Cloud Engineering Fundamentals",
      specialization: "cloud-engineering",
      description: "Master cloud computing with AWS, Azure, and GCP. Learn to design, deploy, and manage scalable cloud infrastructure.",
      shortDescription: "Build expertise in AWS, Azure, and Google Cloud Platform",
      technologies: ["aws", "azure", "googlecloud", "docker", "kubernetes", "terraform"],
      difficulty: "intermediate",
      duration: 80,
    },
    {
      title: "Data Analytics & Visualization",
      specialization: "data-analytics",
      description: "Transform raw data into actionable insights. Learn Python, SQL, Power BI, and advanced analytics techniques.",
      shortDescription: "Master data analysis with Python, SQL, and Power BI",
      technologies: ["python", "postgresql", "powerbi", "tableau", "pandas", "jupyter"],
      difficulty: "intermediate",
      duration: 60,
    },
    {
      title: "Java Software Engineering",
      specialization: "software-java",
      description: "Become a professional Java developer. Master Spring Boot, microservices, and enterprise application development.",
      shortDescription: "Enterprise Java development with Spring Boot",
      technologies: ["java", "spring", "maven", "postgresql", "docker", "jenkins"],
      difficulty: "intermediate",
      duration: 100,
    },
    {
      title: "React Frontend Development",
      specialization: "software-react",
      description: "Build modern web applications with React. Learn TypeScript, state management, and full-stack development.",
      shortDescription: "Modern frontend development with React & TypeScript",
      technologies: ["react", "typescript", "tailwindcss", "nodejs", "nextjs", "git"],
      difficulty: "intermediate",
      duration: 80,
    },
    {
      title: "Quality Assurance Engineering",
      specialization: "quality-assurance",
      description: "Master software testing and quality assurance. Learn automation testing, CI/CD, and quality best practices.",
      shortDescription: "Automated testing and QA best practices",
      technologies: ["selenium", "jest", "cypress", "jenkins", "jira", "postman"],
      difficulty: "intermediate",
      duration: 60,
    },
    {
      title: "Solutions Architecture",
      specialization: "solutions-architecture",
      description: "Design enterprise-grade solutions. Learn system design, architecture patterns, and cloud-native development.",
      shortDescription: "Enterprise architecture and system design",
      technologies: ["aws", "azure", "kubernetes", "microservices", "mongodb", "redis"],
      difficulty: "advanced",
      duration: 100,
    },
    {
      title: "AI & Machine Learning",
      specialization: "ai-ml",
      description: "Build intelligent applications with AI/ML. Learn TensorFlow, PyTorch, and deploy ML models to production.",
      shortDescription: "Build AI applications with Python and TensorFlow",
      technologies: ["python", "tensorflow", "pytorch", "jupyter", "opencv", "numpy"],
      difficulty: "advanced",
      duration: 120,
    },
  ];

  for (const spec of specializations) {
    const [existing] = await db.select().from(courses).where(eq(courses.specialization, spec.specialization));
    
    if (!existing) {
      await db.insert(courses).values({
        ...spec,
        slug: spec.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        isPublished: true,
        isFeatured: true,
        learningOutcomes: [
          "Industry-recognized certification",
          "Hands-on project experience",
          "Career-ready portfolio",
        ],
      });
      console.log(`Created course: ${spec.title}`);
    }
  }

  // Create badges
  const badgeDefinitions = [
    { name: "First Steps", description: "Complete your first lesson", icon: "rocket", criteria: "complete_lesson", criteriaValue: 1, points: 10 },
    { name: "Week Warrior", description: "Maintain a 7-day learning streak", icon: "flame", criteria: "streak", criteriaValue: 7, points: 50 },
    { name: "Quiz Master", description: "Score 100% on any quiz", icon: "trophy", criteria: "quiz_perfect", criteriaValue: 1, points: 25 },
    { name: "Course Champion", description: "Complete your first course", icon: "award", criteria: "complete_course", criteriaValue: 1, points: 100 },
    { name: "Social Learner", description: "Help 5 other students", icon: "users", criteria: "help_others", criteriaValue: 5, points: 75 },
    { name: "Night Owl", description: "Study after midnight", icon: "moon", criteria: "night_study", criteriaValue: 1, points: 15 },
    { name: "Early Bird", description: "Study before 6 AM", icon: "sun", criteria: "early_study", criteriaValue: 1, points: 15 },
    { name: "Dedicated Learner", description: "Maintain a 30-day learning streak", icon: "star", criteria: "streak", criteriaValue: 30, points: 200 },
  ];

  for (const badge of badgeDefinitions) {
    const [existing] = await db.select().from(badges).where(eq(badges.name, badge.name));
    if (!existing) {
      await db.insert(badges).values(badge);
      console.log(`Created badge: ${badge.name}`);
    }
  }

  // Create sample modules and lessons for each course
  const allCourses = await db.select().from(courses);

  for (const course of allCourses) {
    // Check if course already has modules
    const existingModules = await db.select().from(modules).where(eq(modules.courseId, course.id));
    if (existingModules.length > 0) {
      console.log(`Course "${course.title}" already has modules`);
      continue;
    }

    // Create sample modules with lessons based on specialization
    const sampleModules = getSampleModulesForCourse(course.specialization);
    let totalLessons = 0;

    for (let i = 0; i < sampleModules.length; i++) {
      const moduleData = sampleModules[i];
      const [module] = await db.insert(modules).values({
        courseId: course.id,
        title: moduleData.title,
        description: moduleData.description,
        order: i,
        isPublished: true,
      }).returning();

      // Create lessons for this module
      for (let j = 0; j < moduleData.lessons.length; j++) {
        const lessonData = moduleData.lessons[j];
        await db.insert(lessons).values({
          moduleId: module.id,
          title: lessonData.title,
          slug: lessonData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
          type: lessonData.type,
          content: JSON.stringify({ blocks: lessonData.blocks }),
          estimatedMinutes: lessonData.estimatedMinutes,
          order: j,
          isPublished: true,
        });
        totalLessons++;
      }

      console.log(`Created module: ${moduleData.title} with ${moduleData.lessons.length} lessons`);
    }

    // Update course total lessons
    await db.update(courses).set({ totalLessons }).where(eq(courses.id, course.id));
  }

  console.log("Seeding complete!");
  process.exit(0);
}

function getSampleModulesForCourse(specialization: string) {
  const baseLessons = [
    {
      title: "Introduction and Getting Started",
      type: "text",
      estimatedMinutes: 15,
      blocks: [
        { id: "1", type: "heading", level: 1, content: "Welcome to this Course" },
        { id: "2", type: "text", content: "In this lesson, you'll learn the foundational concepts and get your development environment set up. By the end of this lesson, you'll be ready to dive into the hands-on content." },
        { id: "3", type: "callout", variant: "info", content: "Make sure you have a stable internet connection and a modern web browser for the best experience." },
        { id: "4", type: "heading", level: 2, content: "What You'll Learn" },
        { id: "5", type: "text", content: "• Core concepts and terminology\n• Setting up your development environment\n• Best practices and industry standards\n• Hands-on exercises and real-world projects" },
      ]
    },
    {
      title: "Core Concepts Deep Dive",
      type: "text",
      estimatedMinutes: 25,
      blocks: [
        { id: "1", type: "heading", level: 1, content: "Understanding Core Concepts" },
        { id: "2", type: "text", content: "This lesson covers the fundamental building blocks you need to master before advancing to more complex topics." },
        { id: "3", type: "heading", level: 2, content: "Key Terminology" },
        { id: "4", type: "text", content: "Let's start by defining the key terms you'll encounter throughout this course." },
        { id: "5", type: "callout", variant: "tip", content: "Take notes as you go through this lesson. These concepts will be referenced throughout the course." },
      ]
    },
    {
      title: "Hands-On Practice Exercise",
      type: "code",
      estimatedMinutes: 30,
      blocks: [
        { id: "1", type: "heading", level: 1, content: "Practice Exercise" },
        { id: "2", type: "text", content: "Now it's time to put what you've learned into practice. Follow along with this hands-on exercise." },
        { id: "3", type: "code", language: "bash", content: "# Example command to get started\necho 'Hello, World!'\n\n# Check your installation\nnode --version" },
        { id: "4", type: "callout", variant: "warning", content: "Make sure to complete each step before moving to the next." },
      ]
    },
    {
      title: "Video Tutorial: Walkthrough",
      type: "video",
      estimatedMinutes: 20,
      blocks: [
        { id: "1", type: "heading", level: 1, content: "Video Walkthrough" },
        { id: "2", type: "text", content: "Watch this video tutorial for a complete walkthrough of the concepts covered in this module." },
      ]
    },
  ];

  const moduleTemplates: Record<string, { title: string; description: string; lessons: typeof baseLessons }[]> = {
    "cloud-engineering": [
      {
        title: "Introduction to Cloud Computing",
        description: "Learn the fundamentals of cloud computing and why it matters",
        lessons: [
          { ...baseLessons[0], title: "What is Cloud Computing?" },
          { ...baseLessons[1], title: "Cloud Service Models: IaaS, PaaS, SaaS" },
          { ...baseLessons[2], title: "Setting Up Your AWS Account" },
        ]
      },
      {
        title: "AWS Core Services",
        description: "Master the essential AWS services used in production",
        lessons: [
          { ...baseLessons[1], title: "EC2 and Virtual Machines" },
          { ...baseLessons[2], title: "S3 Storage and Buckets" },
          { ...baseLessons[3], title: "VPC and Networking" },
        ]
      },
      {
        title: "Infrastructure as Code",
        description: "Automate your infrastructure with Terraform and CloudFormation",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Infrastructure as Code" },
          { ...baseLessons[2], title: "Writing Your First Terraform Config" },
          { ...baseLessons[1], title: "Managing State and Variables" },
        ]
      },
    ],
    "data-analytics": [
      {
        title: "Data Analytics Fundamentals",
        description: "Understanding the basics of data analysis",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Data Analytics" },
          { ...baseLessons[1], title: "Types of Data and Data Sources" },
          { ...baseLessons[2], title: "Setting Up Python Environment" },
        ]
      },
      {
        title: "SQL for Data Analysis",
        description: "Master SQL queries for extracting insights",
        lessons: [
          { ...baseLessons[1], title: "SQL Basics: SELECT, FROM, WHERE" },
          { ...baseLessons[2], title: "JOINs and Aggregations" },
          { ...baseLessons[2], title: "Advanced SQL Queries" },
        ]
      },
      {
        title: "Data Visualization with Power BI",
        description: "Create compelling visualizations and dashboards",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Power BI" },
          { ...baseLessons[3], title: "Creating Your First Dashboard" },
          { ...baseLessons[1], title: "Best Practices for Data Visualization" },
        ]
      },
    ],
    "software-java": [
      {
        title: "Java Fundamentals",
        description: "Core Java programming concepts",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Java" },
          { ...baseLessons[1], title: "Variables, Types, and Operators" },
          { ...baseLessons[2], title: "Control Flow and Loops" },
        ]
      },
      {
        title: "Object-Oriented Programming",
        description: "Master OOP concepts in Java",
        lessons: [
          { ...baseLessons[1], title: "Classes and Objects" },
          { ...baseLessons[2], title: "Inheritance and Polymorphism" },
          { ...baseLessons[1], title: "Interfaces and Abstract Classes" },
        ]
      },
      {
        title: "Spring Boot Development",
        description: "Build enterprise applications with Spring Boot",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Spring Boot" },
          { ...baseLessons[2], title: "Creating REST APIs" },
          { ...baseLessons[3], title: "Database Integration with JPA" },
        ]
      },
    ],
    "software-react": [
      {
        title: "React Fundamentals",
        description: "Learn the basics of React development",
        lessons: [
          { ...baseLessons[0], title: "Introduction to React" },
          { ...baseLessons[1], title: "Components and JSX" },
          { ...baseLessons[2], title: "Props and State" },
        ]
      },
      {
        title: "React Hooks",
        description: "Master React hooks for state management",
        lessons: [
          { ...baseLessons[1], title: "useState and useEffect" },
          { ...baseLessons[2], title: "Custom Hooks" },
          { ...baseLessons[1], title: "Context API and useContext" },
        ]
      },
      {
        title: "Building Full-Stack Apps",
        description: "Connect React with backend APIs",
        lessons: [
          { ...baseLessons[0], title: "Fetching Data from APIs" },
          { ...baseLessons[2], title: "React Query for Data Management" },
          { ...baseLessons[3], title: "Authentication and Protected Routes" },
        ]
      },
    ],
    "quality-assurance": [
      {
        title: "QA Fundamentals",
        description: "Understanding quality assurance principles",
        lessons: [
          { ...baseLessons[0], title: "Introduction to QA" },
          { ...baseLessons[1], title: "Testing Types and Methodologies" },
          { ...baseLessons[1], title: "Writing Test Cases" },
        ]
      },
      {
        title: "Automation Testing",
        description: "Learn automated testing with Selenium",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Test Automation" },
          { ...baseLessons[2], title: "Selenium WebDriver Basics" },
          { ...baseLessons[2], title: "Writing Automated Test Scripts" },
        ]
      },
      {
        title: "CI/CD and Test Integration",
        description: "Integrate testing into your deployment pipeline",
        lessons: [
          { ...baseLessons[1], title: "Understanding CI/CD" },
          { ...baseLessons[2], title: "Setting Up Jenkins" },
          { ...baseLessons[3], title: "Running Tests in Pipeline" },
        ]
      },
    ],
    "solutions-architecture": [
      {
        title: "Architecture Fundamentals",
        description: "Core concepts of solutions architecture",
        lessons: [
          { ...baseLessons[0], title: "What is Solutions Architecture?" },
          { ...baseLessons[1], title: "Architecture Patterns" },
          { ...baseLessons[1], title: "Non-Functional Requirements" },
        ]
      },
      {
        title: "System Design",
        description: "Designing scalable systems",
        lessons: [
          { ...baseLessons[1], title: "Scalability Concepts" },
          { ...baseLessons[2], title: "Load Balancing and Caching" },
          { ...baseLessons[1], title: "Database Design Decisions" },
        ]
      },
      {
        title: "Cloud Architecture",
        description: "Designing for the cloud",
        lessons: [
          { ...baseLessons[0], title: "Cloud-Native Architecture" },
          { ...baseLessons[1], title: "Microservices Design" },
          { ...baseLessons[3], title: "Case Study: E-commerce Platform" },
        ]
      },
    ],
    "ai-ml": [
      {
        title: "AI/ML Fundamentals",
        description: "Introduction to artificial intelligence",
        lessons: [
          { ...baseLessons[0], title: "Introduction to AI and ML" },
          { ...baseLessons[1], title: "Types of Machine Learning" },
          { ...baseLessons[2], title: "Setting Up Python for ML" },
        ]
      },
      {
        title: "Building ML Models",
        description: "Hands-on machine learning",
        lessons: [
          { ...baseLessons[1], title: "Linear Regression" },
          { ...baseLessons[2], title: "Classification Algorithms" },
          { ...baseLessons[2], title: "Model Evaluation" },
        ]
      },
      {
        title: "Deep Learning",
        description: "Introduction to neural networks",
        lessons: [
          { ...baseLessons[0], title: "Introduction to Neural Networks" },
          { ...baseLessons[2], title: "Building with TensorFlow" },
          { ...baseLessons[3], title: "Image Classification Project" },
        ]
      },
    ],
  };

  return moduleTemplates[specialization] || moduleTemplates["software-react"];
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
