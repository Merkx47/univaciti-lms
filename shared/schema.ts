import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean, jsonb, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table - supports both regular users and admins
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  role: text("role").notNull().default("student"), // 'admin', 'instructor', 'student'
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  lastLoginAt: timestamp("last_login_at"),
  isActive: boolean("is_active").default(true).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  enrollments: many(enrollments),
  progress: many(lessonProgress),
  quizAttempts: many(quizAttempts),
  certificates: many(certificates),
  badges: many(userBadges),
}));

// Courses table - main course container
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  shortDescription: text("short_description"),
  thumbnail: text("thumbnail"),
  specialization: text("specialization").notNull(), // 'cloud-engineering', 'data-analytics', 'software-java', etc.
  difficulty: text("difficulty").default("beginner"), // 'beginner', 'intermediate', 'advanced'
  duration: integer("duration"), // estimated hours
  totalLessons: integer("total_lessons").default(0),
  technologies: jsonb("technologies").$type<string[]>().default([]), // ['aws', 'python', 'docker']
  prerequisites: jsonb("prerequisites").$type<string[]>().default([]),
  learningOutcomes: jsonb("learning_outcomes").$type<string[]>().default([]),
  instructorId: integer("instructor_id").references(() => users.id),
  isPublished: boolean("is_published").default(false).notNull(),
  isFeatured: boolean("is_featured").default(false).notNull(),
  price: integer("price").default(0), // in cents
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const coursesRelations = relations(courses, ({ one, many }) => ({
  instructor: one(users, {
    fields: [courses.instructorId],
    references: [users.id],
  }),
  modules: many(modules),
  enrollments: many(enrollments),
}));

// Modules table - sections within a course
export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  order: integer("order").notNull().default(0),
  isPublished: boolean("is_published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const modulesRelations = relations(modules, ({ one, many }) => ({
  course: one(courses, {
    fields: [modules.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

// Lessons table - individual learning units
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").notNull().references(() => modules.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  type: text("type").notNull().default("text"), // 'text', 'video', 'quiz', 'assignment', 'code'
  content: jsonb("content").$type<LessonContent>(), // Rich content structure
  videoUrl: text("video_url"),
  videoDuration: integer("video_duration"), // in seconds
  order: integer("order").notNull().default(0),
  isPublished: boolean("is_published").default(false).notNull(),
  isFree: boolean("is_free").default(false).notNull(), // preview lessons
  estimatedMinutes: integer("estimated_minutes").default(10),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  module: one(modules, {
    fields: [lessons.moduleId],
    references: [modules.id],
  }),
  progress: many(lessonProgress),
  quiz: one(quizzes),
}));

// Lesson content type for rich content
export interface LessonContent {
  blocks: ContentBlock[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'code' | 'image' | 'video' | 'callout' | 'divider' | 'quiz-inline';
  content?: string;
  language?: string; // for code blocks
  url?: string; // for images/videos
  caption?: string;
  level?: number; // for headings (1-6)
  variant?: 'info' | 'warning' | 'tip' | 'danger'; // for callouts
  quizId?: number; // for inline quizzes
}

// Enrollments table - student course enrollments
export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  status: text("status").default("active").notNull(), // 'active', 'completed', 'expired', 'paused'
  progress: integer("progress").default(0).notNull(), // percentage 0-100
  completedLessons: integer("completed_lessons").default(0).notNull(),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  expiresAt: timestamp("expires_at"),
  lastAccessedAt: timestamp("last_accessed_at"),
});

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  user: one(users, {
    fields: [enrollments.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [enrollments.courseId],
    references: [courses.id],
  }),
}));

// Lesson Progress table - individual lesson completion tracking
export const lessonProgress = pgTable("lesson_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: integer("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  status: text("status").default("not_started").notNull(), // 'not_started', 'in_progress', 'completed'
  progressPercent: integer("progress_percent").default(0).notNull(),
  videoPosition: integer("video_position").default(0), // seconds watched
  notes: text("notes"),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

export const lessonProgressRelations = relations(lessonProgress, ({ one }) => ({
  user: one(users, {
    fields: [lessonProgress.userId],
    references: [users.id],
  }),
  lesson: one(lessons, {
    fields: [lessonProgress.lessonId],
    references: [lessons.id],
  }),
}));

// Quizzes table
export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessons.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  passingScore: integer("passing_score").default(70).notNull(), // percentage
  timeLimit: integer("time_limit"), // in minutes, null = no limit
  maxAttempts: integer("max_attempts").default(3),
  shuffleQuestions: boolean("shuffle_questions").default(false).notNull(),
  showCorrectAnswers: boolean("show_correct_answers").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const quizzesRelations = relations(quizzes, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [quizzes.lessonId],
    references: [lessons.id],
  }),
  questions: many(quizQuestions),
  attempts: many(quizAttempts),
}));

// Quiz Questions table
export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  type: text("type").notNull().default("multiple_choice"), // 'multiple_choice', 'true_false', 'short_answer', 'code'
  question: text("question").notNull(),
  options: jsonb("options").$type<QuizOption[]>(), // for multiple choice
  correctAnswer: text("correct_answer"), // for short answer / true-false
  explanation: text("explanation"),
  points: integer("points").default(1).notNull(),
  order: integer("order").default(0).notNull(),
  codeLanguage: text("code_language"), // for code questions
  codeStarterCode: text("code_starter_code"),
  codeTestCases: jsonb("code_test_cases").$type<CodeTestCase[]>(),
});

export interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface CodeTestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export const quizQuestionsRelations = relations(quizQuestions, ({ one }) => ({
  quiz: one(quizzes, {
    fields: [quizQuestions.quizId],
    references: [quizzes.id],
  }),
}));

// Quiz Attempts table
export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  quizId: integer("quiz_id").notNull().references(() => quizzes.id, { onDelete: "cascade" }),
  score: integer("score").default(0).notNull(),
  maxScore: integer("max_score").default(0).notNull(),
  percentage: integer("percentage").default(0).notNull(),
  passed: boolean("passed").default(false).notNull(),
  answers: jsonb("answers").$type<QuizAnswer[]>(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  timeTaken: integer("time_taken"), // in seconds
});

export interface QuizAnswer {
  questionId: number;
  answer: string | string[];
  isCorrect: boolean;
  points: number;
}

export const quizAttemptsRelations = relations(quizAttempts, ({ one }) => ({
  user: one(users, {
    fields: [quizAttempts.userId],
    references: [users.id],
  }),
  quiz: one(quizzes, {
    fields: [quizAttempts.quizId],
    references: [quizzes.id],
  }),
}));

// Certificates table
export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  uniqueId: varchar("unique_id", { length: 50 }).notNull().unique(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  courseId: integer("course_id").notNull().references(() => courses.id, { onDelete: "cascade" }),
  issuedAt: timestamp("issued_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
  grade: text("grade"), // 'A', 'B', 'C' or 'Pass'
  credentialUrl: text("credential_url"),
});

export const certificatesRelations = relations(certificates, ({ one }) => ({
  user: one(users, {
    fields: [certificates.userId],
    references: [users.id],
  }),
  course: one(courses, {
    fields: [certificates.courseId],
    references: [courses.id],
  }),
}));

// Badges table - gamification
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon").notNull(), // icon name or URL
  color: text("color").default("#1E9AD6"),
  criteria: text("criteria").notNull(), // 'complete_course', 'streak_7', 'quiz_perfect', etc.
  criteriaValue: integer("criteria_value"), // e.g., 7 for streak_7
  points: integer("points").default(0).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User Badges table - earned badges
export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeId: integer("badge_id").notNull().references(() => badges.id, { onDelete: "cascade" }),
  earnedAt: timestamp("earned_at").defaultNow().notNull(),
});

export const userBadgesRelations = relations(userBadges, ({ one }) => ({
  user: one(users, {
    fields: [userBadges.userId],
    references: [users.id],
  }),
  badge: one(badges, {
    fields: [userBadges.badgeId],
    references: [badges.id],
  }),
}));

// User Points / Streaks table
export const userStats = pgTable("user_stats", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }).unique(),
  totalPoints: integer("total_points").default(0).notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastActivityDate: timestamp("last_activity_date"),
  totalLessonsCompleted: integer("total_lessons_completed").default(0).notNull(),
  totalQuizzesPassed: integer("total_quizzes_passed").default(0).notNull(),
  totalCoursesCompleted: integer("total_courses_completed").default(0).notNull(),
  totalTimeSpent: integer("total_time_spent").default(0).notNull(), // in minutes
});

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(users, {
    fields: [userStats.userId],
    references: [users.id],
  }),
}));

// Announcements table
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }), // null = global
  authorId: integer("author_id").references(() => users.id),
  isPublished: boolean("is_published").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Waitlist entries (keeping existing)
export const waitlistEntries = pgTable("waitlist_entries", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertModuleSchema = createInsertSchema(modules).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).omit({
  id: true,
  enrolledAt: true,
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions).omit({
  id: true,
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
  createdAt: true,
});

export const insertWaitlistEntrySchema = createInsertSchema(waitlistEntries).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SelectUser = typeof users.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type SelectCourse = typeof courses.$inferSelect;
export type InsertModule = z.infer<typeof insertModuleSchema>;
export type SelectModule = typeof modules.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type SelectLesson = typeof lessons.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type SelectEnrollment = typeof enrollments.$inferSelect;
export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type SelectQuiz = typeof quizzes.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
export type SelectQuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type SelectBadge = typeof badges.$inferSelect;
export type InsertWaitlistEntry = z.infer<typeof insertWaitlistEntrySchema>;
export type WaitlistEntry = typeof waitlistEntries.$inferSelect;
