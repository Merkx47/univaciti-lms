import { db } from "./db";
import { users, courses, badges } from "@shared/schema";
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

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
