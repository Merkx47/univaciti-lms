import type { Express } from "express";
import { type Server } from "http";
import { db } from "./db";
import { requireAuth, requireAdmin, requireInstructor, hashPassword } from "./auth";
import { 
  users, courses, modules, lessons, enrollments, lessonProgress,
  quizzes, quizQuestions, quizAttempts, certificates, badges, userBadges,
  userStats, announcements, waitlistEntries,
  insertCourseSchema, insertModuleSchema, insertLessonSchema,
  insertEnrollmentSchema, insertQuizSchema, insertQuizQuestionSchema,
  insertBadgeSchema, insertWaitlistEntrySchema
} from "@shared/schema";
import { eq, and, desc, asc, sql, count, like, or } from "drizzle-orm";
import { randomBytes } from "crypto";
import * as XLSX from "xlsx";
import mammoth from "mammoth";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // ==================== WAITLIST ====================
  app.post("/api/waitlist", async (req, res) => {
    try {
      const result = insertWaitlistEntrySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ 
          error: "Invalid email address",
          details: result.error.flatten() 
        });
      }

      const [existing] = await db.select().from(waitlistEntries).where(eq(waitlistEntries.email, result.data.email));
      if (existing) {
        return res.status(200).json({ 
          message: "You're already on the waitlist!",
          entry: existing 
        });
      }

      const [entry] = await db.insert(waitlistEntries).values(result.data).returning();
      res.status(201).json({ 
        message: "Successfully joined the waitlist!",
        entry 
      });
    } catch (error) {
      console.error("Waitlist error:", error);
      res.status(500).json({ error: "Failed to join waitlist" });
    }
  });

  app.get("/api/waitlist/count", async (req, res) => {
    try {
      const [result] = await db.select({ count: count() }).from(waitlistEntries);
      res.json({ count: result.count });
    } catch (error) {
      console.error("Waitlist count error:", error);
      res.status(500).json({ error: "Failed to get waitlist count" });
    }
  });

  // ==================== ADMIN DASHBOARD STATS ====================
  app.get("/api/admin/stats", requireAdmin, async (req, res) => {
    try {
      const [userCount] = await db.select({ count: count() }).from(users);
      const [courseCount] = await db.select({ count: count() }).from(courses);
      const [enrollmentCount] = await db.select({ count: count() }).from(enrollments);
      const [completedCount] = await db.select({ count: count() }).from(enrollments).where(eq(enrollments.status, "completed"));
      
      res.json({
        totalUsers: userCount.count,
        totalCourses: courseCount.count,
        totalEnrollments: enrollmentCount.count,
        completedEnrollments: completedCount.count,
        completionRate: enrollmentCount.count > 0 ? Math.round((completedCount.count / enrollmentCount.count) * 100) : 0,
      });
    } catch (error) {
      console.error("Admin stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  // ==================== USER MANAGEMENT (ADMIN) ====================
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const { search, role, limit = 50, offset = 0 } = req.query;
      
      let query = db.select().from(users);
      
      if (search) {
        query = query.where(
          or(
            like(users.username, `%${search}%`),
            like(users.email, `%${search}%`),
            like(users.firstName, `%${search}%`),
            like(users.lastName, `%${search}%`)
          )
        ) as any;
      }
      
      if (role) {
        query = query.where(eq(users.role, role as string)) as any;
      }
      
      const result = await query.orderBy(desc(users.createdAt)).limit(Number(limit)).offset(Number(offset));
      const [total] = await db.select({ count: count() }).from(users);
      
      res.json({ users: result, total: total.count });
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Failed to get users" });
    }
  });

  app.post("/api/admin/users", requireAdmin, async (req, res) => {
    try {
      const { username, email, password, firstName, lastName, role } = req.body;
      
      if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
      }

      const [user] = await db.insert(users).values({
        username,
        email,
        password: await hashPassword(password),
        firstName,
        lastName,
        role: role || "student",
      }).returning();

      res.status(201).json(user);
    } catch (error: any) {
      console.error("Create user error:", error);
      if (error.code === '23505') {
        return res.status(400).json({ error: "Username or email already exists" });
      }
      res.status(500).json({ error: "Failed to create user" });
    }
  });

  app.patch("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      if (updates.password) {
        updates.password = await hashPassword(updates.password);
      }
      
      updates.updatedAt = new Date();
      
      const [user] = await db.update(users).set(updates).where(eq(users.id, Number(id))).returning();
      res.json(user);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  });

  app.delete("/api/admin/users/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(users).where(eq(users.id, Number(id)));
      res.sendStatus(204);
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  });

  // ==================== COURSE MANAGEMENT ====================
  app.get("/api/courses", async (req, res) => {
    try {
      const { specialization, published, featured } = req.query;
      
      let query = db.select().from(courses);
      
      if (specialization) {
        query = query.where(eq(courses.specialization, specialization as string)) as any;
      }
      
      if (published === 'true') {
        query = query.where(eq(courses.isPublished, true)) as any;
      }
      
      if (featured === 'true') {
        query = query.where(eq(courses.isFeatured, true)) as any;
      }
      
      const result = await query.orderBy(desc(courses.createdAt));
      res.json(result);
    } catch (error) {
      console.error("Get courses error:", error);
      res.status(500).json({ error: "Failed to get courses" });
    }
  });

  app.get("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [course] = await db.select().from(courses).where(eq(courses.id, Number(id)));
      
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      // Get modules and lessons
      const courseModules = await db.select().from(modules)
        .where(eq(modules.courseId, Number(id)))
        .orderBy(asc(modules.order));

      const modulesWithLessons = await Promise.all(
        courseModules.map(async (module) => {
          const moduleLessons = await db.select().from(lessons)
            .where(eq(lessons.moduleId, module.id))
            .orderBy(asc(lessons.order));
          return { ...module, lessons: moduleLessons };
        })
      );

      res.json({ ...course, modules: modulesWithLessons });
    } catch (error) {
      console.error("Get course error:", error);
      res.status(500).json({ error: "Failed to get course" });
    }
  });

  app.post("/api/admin/courses", requireInstructor, async (req, res) => {
    try {
      const courseData = req.body;
      courseData.instructorId = (req.user as any).id;
      courseData.slug = courseData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      const [course] = await db.insert(courses).values(courseData).returning();
      res.status(201).json(course);
    } catch (error: any) {
      console.error("Create course error:", error);
      if (error.code === '23505') {
        return res.status(400).json({ error: "Course with this title already exists" });
      }
      res.status(500).json({ error: "Failed to create course" });
    }
  });

  app.patch("/api/admin/courses/:id", requireInstructor, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      updates.updatedAt = new Date();
      
      if (updates.title) {
        updates.slug = updates.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }
      
      const [course] = await db.update(courses).set(updates).where(eq(courses.id, Number(id))).returning();
      res.json(course);
    } catch (error) {
      console.error("Update course error:", error);
      res.status(500).json({ error: "Failed to update course" });
    }
  });

  app.delete("/api/admin/courses/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(courses).where(eq(courses.id, Number(id)));
      res.sendStatus(204);
    } catch (error) {
      console.error("Delete course error:", error);
      res.status(500).json({ error: "Failed to delete course" });
    }
  });

  // ==================== MODULE MANAGEMENT ====================
  app.post("/api/admin/courses/:courseId/modules", requireInstructor, async (req, res) => {
    try {
      const { courseId } = req.params;
      const moduleData = { ...req.body, courseId: Number(courseId) };
      
      // Get max order
      const [maxOrder] = await db.select({ max: sql`COALESCE(MAX(${modules.order}), 0)` })
        .from(modules)
        .where(eq(modules.courseId, Number(courseId)));
      
      moduleData.order = (maxOrder.max as number) + 1;
      
      const [module] = await db.insert(modules).values(moduleData).returning();
      res.status(201).json(module);
    } catch (error) {
      console.error("Create module error:", error);
      res.status(500).json({ error: "Failed to create module" });
    }
  });

  app.patch("/api/admin/modules/:id", requireInstructor, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      updates.updatedAt = new Date();
      
      const [module] = await db.update(modules).set(updates).where(eq(modules.id, Number(id))).returning();
      res.json(module);
    } catch (error) {
      console.error("Update module error:", error);
      res.status(500).json({ error: "Failed to update module" });
    }
  });

  app.delete("/api/admin/modules/:id", requireInstructor, async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(modules).where(eq(modules.id, Number(id)));
      res.sendStatus(204);
    } catch (error) {
      console.error("Delete module error:", error);
      res.status(500).json({ error: "Failed to delete module" });
    }
  });

  // Reorder modules
  app.post("/api/admin/courses/:courseId/modules/reorder", requireInstructor, async (req, res) => {
    try {
      const { moduleIds } = req.body; // Array of module IDs in new order
      
      await Promise.all(
        moduleIds.map((id: number, index: number) =>
          db.update(modules).set({ order: index }).where(eq(modules.id, id))
        )
      );
      
      res.json({ success: true });
    } catch (error) {
      console.error("Reorder modules error:", error);
      res.status(500).json({ error: "Failed to reorder modules" });
    }
  });

  // ==================== LESSON MANAGEMENT ====================
  app.post("/api/admin/modules/:moduleId/lessons", requireInstructor, async (req, res) => {
    try {
      const { moduleId } = req.params;
      const lessonData = { ...req.body, moduleId: Number(moduleId) };
      lessonData.slug = lessonData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      
      // Get max order
      const [maxOrder] = await db.select({ max: sql`COALESCE(MAX(${lessons.order}), 0)` })
        .from(lessons)
        .where(eq(lessons.moduleId, Number(moduleId)));
      
      lessonData.order = (maxOrder.max as number) + 1;
      
      const [lesson] = await db.insert(lessons).values(lessonData).returning();
      
      // Update course total lessons count
      const [module] = await db.select().from(modules).where(eq(modules.id, Number(moduleId)));
      if (module) {
        const [lessonCount] = await db.select({ count: count() }).from(lessons)
          .innerJoin(modules, eq(lessons.moduleId, modules.id))
          .where(eq(modules.courseId, module.courseId));
        
        await db.update(courses).set({ totalLessons: lessonCount.count }).where(eq(courses.id, module.courseId));
      }
      
      res.status(201).json(lesson);
    } catch (error) {
      console.error("Create lesson error:", error);
      res.status(500).json({ error: "Failed to create lesson" });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const [lesson] = await db.select().from(lessons).where(eq(lessons.id, Number(id)));
      
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      res.json(lesson);
    } catch (error) {
      console.error("Get lesson error:", error);
      res.status(500).json({ error: "Failed to get lesson" });
    }
  });

  app.patch("/api/admin/lessons/:id", requireInstructor, async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      updates.updatedAt = new Date();
      
      if (updates.title) {
        updates.slug = updates.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      }
      
      const [lesson] = await db.update(lessons).set(updates).where(eq(lessons.id, Number(id))).returning();
      res.json(lesson);
    } catch (error) {
      console.error("Update lesson error:", error);
      res.status(500).json({ error: "Failed to update lesson" });
    }
  });

  app.delete("/api/admin/lessons/:id", requireInstructor, async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(lessons).where(eq(lessons.id, Number(id)));
      res.sendStatus(204);
    } catch (error) {
      console.error("Delete lesson error:", error);
      res.status(500).json({ error: "Failed to delete lesson" });
    }
  });

  // Reorder lessons
  app.post("/api/admin/modules/:moduleId/lessons/reorder", requireInstructor, async (req, res) => {
    try {
      const { lessonIds } = req.body;
      
      await Promise.all(
        lessonIds.map((id: number, index: number) =>
          db.update(lessons).set({ order: index }).where(eq(lessons.id, id))
        )
      );
      
      res.json({ success: true });
    } catch (error) {
      console.error("Reorder lessons error:", error);
      res.status(500).json({ error: "Failed to reorder lessons" });
    }
  });

  // ==================== ENROLLMENT MANAGEMENT ====================
  app.get("/api/enrollments", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      
      const result = await db.select({
        enrollment: enrollments,
        course: courses,
      })
        .from(enrollments)
        .innerJoin(courses, eq(enrollments.courseId, courses.id))
        .where(eq(enrollments.userId, userId))
        .orderBy(desc(enrollments.enrolledAt));
      
      res.json(result);
    } catch (error) {
      console.error("Get enrollments error:", error);
      res.status(500).json({ error: "Failed to get enrollments" });
    }
  });

  // Admin get all enrollments with pagination
  app.get("/api/admin/enrollments", requireAdmin, async (req, res) => {
    try {
      const { search, status, limit = 50, offset = 0 } = req.query;

      const result = await db.select({
        enrollment: enrollments,
        user: users,
        course: courses,
      })
        .from(enrollments)
        .innerJoin(users, eq(enrollments.userId, users.id))
        .innerJoin(courses, eq(enrollments.courseId, courses.id))
        .orderBy(desc(enrollments.enrolledAt))
        .limit(Number(limit))
        .offset(Number(offset));

      const [total] = await db.select({ count: count() }).from(enrollments);

      const formattedEnrollments = result.map(r => ({
        id: r.enrollment.id,
        userId: r.enrollment.userId,
        courseId: r.enrollment.courseId,
        status: r.enrollment.status,
        progress: r.enrollment.progress || 0,
        enrolledAt: r.enrollment.enrolledAt,
        completedAt: r.enrollment.completedAt,
        user: {
          id: r.user.id,
          firstName: r.user.firstName,
          lastName: r.user.lastName,
          email: r.user.email,
        },
        course: {
          id: r.course.id,
          title: r.course.title,
          specialization: r.course.specialization,
        },
      }));

      res.json({ enrollments: formattedEnrollments, total: total.count });
    } catch (error) {
      console.error("Get admin enrollments error:", error);
      res.status(500).json({ error: "Failed to get enrollments" });
    }
  });

  // Delete enrollment
  app.delete("/api/admin/enrollments/:id", requireAdmin, async (req, res) => {
    try {
      const { id } = req.params;
      await db.delete(enrollments).where(eq(enrollments.id, Number(id)));
      res.sendStatus(204);
    } catch (error) {
      console.error("Delete enrollment error:", error);
      res.status(500).json({ error: "Failed to delete enrollment" });
    }
  });

  app.post("/api/admin/enrollments", requireAdmin, async (req, res) => {
    try {
      const { userId, courseId } = req.body;
      
      // Check if already enrolled
      const [existing] = await db.select().from(enrollments)
        .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
      
      if (existing) {
        return res.status(400).json({ error: "User is already enrolled in this course" });
      }
      
      const [enrollment] = await db.insert(enrollments).values({
        userId,
        courseId,
        status: "active",
      }).returning();
      
      res.status(201).json(enrollment);
    } catch (error) {
      console.error("Create enrollment error:", error);
      res.status(500).json({ error: "Failed to create enrollment" });
    }
  });

  // Bulk enroll users
  app.post("/api/admin/enrollments/bulk", requireAdmin, async (req, res) => {
    try {
      const { userIds, courseId } = req.body;
      
      const results = await Promise.all(
        userIds.map(async (userId: number) => {
          const [existing] = await db.select().from(enrollments)
            .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
          
          if (existing) return null;
          
          const [enrollment] = await db.insert(enrollments).values({
            userId,
            courseId,
            status: "active",
          }).returning();
          
          return enrollment;
        })
      );
      
      res.status(201).json({ enrolled: results.filter(Boolean).length });
    } catch (error) {
      console.error("Bulk enrollment error:", error);
      res.status(500).json({ error: "Failed to enroll users" });
    }
  });

  // Get enrollment progress for a specific course
  app.get("/api/enrollments/:courseId/progress", requireAuth, async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = (req.user as any).id;

      // Get the enrollment
      const [enrollment] = await db.select().from(enrollments)
        .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, Number(courseId))));

      // Get completed lessons for this course
      const completedLessonProgress = await db.select({
        lessonId: lessonProgress.lessonId,
      })
        .from(lessonProgress)
        .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
        .innerJoin(modules, eq(lessons.moduleId, modules.id))
        .where(and(
          eq(lessonProgress.userId, userId),
          eq(modules.courseId, Number(courseId)),
          eq(lessonProgress.status, "completed")
        ));

      const completedLessons = completedLessonProgress.map(p => p.lessonId);

      res.json({
        enrollment,
        completedLessons,
        progress: enrollment?.progress || 0,
      });
    } catch (error) {
      console.error("Get enrollment progress error:", error);
      res.status(500).json({ error: "Failed to get enrollment progress" });
    }
  });

  // ==================== PROGRESS TRACKING ====================
  app.post("/api/progress/lesson/:lessonId", requireAuth, async (req, res) => {
    try {
      const { lessonId } = req.params;
      const userId = (req.user as any).id;
      const { status, progressPercent, videoPosition, notes } = req.body;
      
      const [existing] = await db.select().from(lessonProgress)
        .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, Number(lessonId))));
      
      const progressData: any = {
        status: status || "in_progress",
        progressPercent: progressPercent || 0,
        lastAccessedAt: new Date(),
      };
      
      if (videoPosition !== undefined) progressData.videoPosition = videoPosition;
      if (notes !== undefined) progressData.notes = notes;
      if (status === "completed" && !existing?.completedAt) progressData.completedAt = new Date();
      if (!existing?.startedAt) progressData.startedAt = new Date();
      
      let progress;
      if (existing) {
        [progress] = await db.update(lessonProgress)
          .set(progressData)
          .where(eq(lessonProgress.id, existing.id))
          .returning();
      } else {
        [progress] = await db.insert(lessonProgress)
          .values({
            userId,
            lessonId: Number(lessonId),
            ...progressData,
          })
          .returning();
      }
      
      // Update enrollment progress
      const [lesson] = await db.select().from(lessons).where(eq(lessons.id, Number(lessonId)));
      if (lesson) {
        const [module] = await db.select().from(modules).where(eq(modules.id, lesson.moduleId));
        if (module) {
          const [completed] = await db.select({ count: count() })
            .from(lessonProgress)
            .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
            .innerJoin(modules, eq(lessons.moduleId, modules.id))
            .where(and(
              eq(lessonProgress.userId, userId),
              eq(modules.courseId, module.courseId),
              eq(lessonProgress.status, "completed")
            ));
          
          const [total] = await db.select({ count: count() })
            .from(lessons)
            .innerJoin(modules, eq(lessons.moduleId, modules.id))
            .where(eq(modules.courseId, module.courseId));
          
          const progressPct = Math.round((completed.count / total.count) * 100);
          
          await db.update(enrollments)
            .set({
              progress: progressPct,
              completedLessons: completed.count,
              lastAccessedAt: new Date(),
              status: progressPct === 100 ? "completed" : "active",
              completedAt: progressPct === 100 ? new Date() : null,
            })
            .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, module.courseId)));
        }
      }
      
      res.json(progress);
    } catch (error) {
      console.error("Update progress error:", error);
      res.status(500).json({ error: "Failed to update progress" });
    }
  });

  app.get("/api/progress/course/:courseId", requireAuth, async (req, res) => {
    try {
      const { courseId } = req.params;
      const userId = (req.user as any).id;
      
      const progress = await db.select({
        lessonProgress: lessonProgress,
        lesson: lessons,
      })
        .from(lessonProgress)
        .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
        .innerJoin(modules, eq(lessons.moduleId, modules.id))
        .where(and(eq(lessonProgress.userId, userId), eq(modules.courseId, Number(courseId))));
      
      res.json(progress);
    } catch (error) {
      console.error("Get course progress error:", error);
      res.status(500).json({ error: "Failed to get progress" });
    }
  });

  // Mark lesson as complete
  app.post("/api/lessons/:lessonId/complete", requireAuth, async (req, res) => {
    try {
      const { lessonId } = req.params;
      const userId = (req.user as any).id;

      // Check if there's existing progress
      const [existing] = await db.select().from(lessonProgress)
        .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.lessonId, Number(lessonId))));

      let progress;
      // Check if this lesson was already completed (for idempotent stats updates)
      const wasAlreadyCompleted = existing?.status === "completed";
      
      if (existing) {
        [progress] = await db.update(lessonProgress)
          .set({ status: "completed", progressPercent: 100, completedAt: new Date() })
          .where(eq(lessonProgress.id, existing.id))
          .returning();
      } else {
        [progress] = await db.insert(lessonProgress)
          .values({
            userId,
            lessonId: Number(lessonId),
            status: "completed",
            progressPercent: 100,
            startedAt: new Date(),
            completedAt: new Date(),
          })
          .returning();
      }

      // Update enrollment progress
      const [lesson] = await db.select().from(lessons).where(eq(lessons.id, Number(lessonId)));
      if (lesson) {
        const [module] = await db.select().from(modules).where(eq(modules.id, lesson.moduleId));
        if (module) {
          const [total] = await db.select({ count: count() }).from(lessons)
            .innerJoin(modules, eq(lessons.moduleId, modules.id))
            .where(eq(modules.courseId, module.courseId));
          
          const [completed] = await db.select({ count: count() }).from(lessonProgress)
            .innerJoin(lessons, eq(lessonProgress.lessonId, lessons.id))
            .innerJoin(modules, eq(lessons.moduleId, modules.id))
            .where(and(
              eq(lessonProgress.userId, userId),
              eq(modules.courseId, module.courseId),
              eq(lessonProgress.status, "completed")
            ));

          const progressPct = Math.round((completed.count / total.count) * 100);
          const wasCompleted = progressPct === 100;
          
          // Check if course was already completed before
          const [enrollment] = await db.select().from(enrollments)
            .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, module.courseId)));
          const courseWasAlreadyCompleted = enrollment?.status === "completed";
          
          await db.update(enrollments)
            .set({ 
              progress: progressPct,
              status: wasCompleted ? "completed" : "active",
              completedAt: wasCompleted ? new Date() : null,
            })
            .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, module.courseId)));

          // Only update user stats if this is a new lesson completion (idempotent)
          if (!wasAlreadyCompleted) {
            const [existingStats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
            const pointsEarned = 10; // Points per lesson
            const shouldIncrementCourses = wasCompleted && !courseWasAlreadyCompleted;
            
            if (existingStats) {
              await db.update(userStats)
                .set({
                  totalPoints: existingStats.totalPoints + pointsEarned,
                  lessonsCompleted: existingStats.lessonsCompleted + 1,
                  coursesCompleted: shouldIncrementCourses ? existingStats.coursesCompleted + 1 : existingStats.coursesCompleted,
                  updatedAt: new Date(),
                })
                .where(eq(userStats.userId, userId));
            } else {
              await db.insert(userStats).values({
                userId,
                totalPoints: pointsEarned,
                lessonsCompleted: 1,
                coursesCompleted: shouldIncrementCourses ? 1 : 0,
              });
            }
          }
        }
      }

      res.json(progress);
    } catch (error) {
      console.error("Mark lesson complete error:", error);
      res.status(500).json({ error: "Failed to mark lesson complete" });
    }
  });

  // ==================== QUIZ MANAGEMENT ====================
  app.post("/api/admin/quizzes", requireInstructor, async (req, res) => {
    try {
      const [quiz] = await db.insert(quizzes).values(req.body).returning();
      res.status(201).json(quiz);
    } catch (error) {
      console.error("Create quiz error:", error);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  });

  app.post("/api/admin/quizzes/:quizId/questions", requireInstructor, async (req, res) => {
    try {
      const { quizId } = req.params;
      const questionData = { ...req.body, quizId: Number(quizId) };
      
      const [question] = await db.insert(quizQuestions).values(questionData).returning();
      res.status(201).json(question);
    } catch (error) {
      console.error("Create question error:", error);
      res.status(500).json({ error: "Failed to create question" });
    }
  });

  app.get("/api/quizzes/:quizId", requireAuth, async (req, res) => {
    try {
      const { quizId } = req.params;
      const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, Number(quizId)));
      
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      
      const questions = await db.select().from(quizQuestions)
        .where(eq(quizQuestions.quizId, Number(quizId)))
        .orderBy(asc(quizQuestions.order));
      
      // Remove correct answers from response (for student view)
      const sanitizedQuestions = questions.map(q => ({
        ...q,
        correctAnswer: undefined,
        options: q.options?.map(opt => ({ ...opt, isCorrect: undefined })),
      }));
      
      res.json({ ...quiz, questions: sanitizedQuestions });
    } catch (error) {
      console.error("Get quiz error:", error);
      res.status(500).json({ error: "Failed to get quiz" });
    }
  });

  app.post("/api/quizzes/:quizId/submit", requireAuth, async (req, res) => {
    try {
      const { quizId } = req.params;
      const userId = (req.user as any).id;
      const { answers, timeTaken } = req.body;
      
      const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, Number(quizId)));
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }
      
      const questions = await db.select().from(quizQuestions)
        .where(eq(quizQuestions.quizId, Number(quizId)));
      
      let score = 0;
      let maxScore = 0;
      const gradedAnswers = answers.map((answer: any) => {
        const question = questions.find(q => q.id === answer.questionId);
        if (!question) return { ...answer, isCorrect: false, points: 0 };
        
        maxScore += question.points;
        
        let isCorrect = false;
        if (question.type === "multiple_choice") {
          const correctOptions = question.options?.filter(o => o.isCorrect).map(o => o.id) || [];
          isCorrect = Array.isArray(answer.answer)
            ? correctOptions.every(id => answer.answer.includes(id)) && answer.answer.length === correctOptions.length
            : correctOptions.includes(answer.answer);
        } else if (question.type === "true_false" || question.type === "short_answer") {
          isCorrect = answer.answer?.toLowerCase() === question.correctAnswer?.toLowerCase();
        }
        
        if (isCorrect) score += question.points;
        
        return { ...answer, isCorrect, points: isCorrect ? question.points : 0 };
      });
      
      const percentage = Math.round((score / maxScore) * 100);
      const passed = percentage >= quiz.passingScore;
      
      const [attempt] = await db.insert(quizAttempts).values({
        userId,
        quizId: Number(quizId),
        score,
        maxScore,
        percentage,
        passed,
        answers: gradedAnswers,
        timeTaken,
        completedAt: new Date(),
      }).returning();
      
      res.json({ ...attempt, questions });
    } catch (error) {
      console.error("Submit quiz error:", error);
      res.status(500).json({ error: "Failed to submit quiz" });
    }
  });

  // ==================== CERTIFICATES ====================
  app.post("/api/certificates/generate", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const { courseId } = req.body;
      
      // Check if course is completed
      const [enrollment] = await db.select().from(enrollments)
        .where(and(eq(enrollments.userId, userId), eq(enrollments.courseId, courseId)));
      
      if (!enrollment || enrollment.status !== "completed") {
        return res.status(400).json({ error: "Course must be completed to generate certificate" });
      }
      
      // Check if certificate already exists
      const [existing] = await db.select().from(certificates)
        .where(and(eq(certificates.userId, userId), eq(certificates.courseId, courseId)));
      
      if (existing) {
        return res.json(existing);
      }
      
      const uniqueId = `CERT-${randomBytes(8).toString('hex').toUpperCase()}`;
      
      const [certificate] = await db.insert(certificates).values({
        uniqueId,
        userId,
        courseId,
        grade: "Pass",
      }).returning();
      
      res.status(201).json(certificate);
    } catch (error) {
      console.error("Generate certificate error:", error);
      res.status(500).json({ error: "Failed to generate certificate" });
    }
  });

  app.get("/api/certificates", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      
      const result = await db.select({
        certificate: certificates,
        course: courses,
      })
        .from(certificates)
        .innerJoin(courses, eq(certificates.courseId, courses.id))
        .where(eq(certificates.userId, userId));
      
      res.json(result);
    } catch (error) {
      console.error("Get certificates error:", error);
      res.status(500).json({ error: "Failed to get certificates" });
    }
  });

  // ==================== GAMIFICATION ====================
  app.get("/api/user/stats", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      
      let [stats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
      
      if (!stats) {
        [stats] = await db.insert(userStats).values({ userId }).returning();
      }
      
      const earnedBadges = await db.select({
        userBadge: userBadges,
        badge: badges,
      })
        .from(userBadges)
        .innerJoin(badges, eq(userBadges.badgeId, badges.id))
        .where(eq(userBadges.userId, userId));
      
      res.json({ ...stats, badges: earnedBadges });
    } catch (error) {
      console.error("Get user stats error:", error);
      res.status(500).json({ error: "Failed to get stats" });
    }
  });

  app.get("/api/leaderboard", async (req, res) => {
    try {
      const { category = "points" } = req.query;
      
      let orderByColumn = userStats.totalPoints;
      if (category === "courses") orderByColumn = userStats.coursesCompleted as any;
      if (category === "streak") orderByColumn = userStats.currentStreak as any;
      
      const result = await db.select({
        stats: userStats,
        user: {
          id: users.id,
          username: users.username,
          firstName: users.firstName,
          lastName: users.lastName,
          avatar: users.avatar,
        },
      })
        .from(userStats)
        .innerJoin(users, eq(userStats.userId, users.id))
        .orderBy(desc(orderByColumn))
        .limit(50);
      
      const formatted = result.map((r, index) => ({
        rank: index + 1,
        userId: r.user.id,
        username: r.user.username,
        firstName: r.user.firstName,
        lastName: r.user.lastName,
        avatarUrl: r.user.avatar,
        totalPoints: r.stats.totalPoints,
        coursesCompleted: r.stats.coursesCompleted,
        currentStreak: r.stats.currentStreak,
        badges: 0,
      }));
      
      res.json(formatted);
    } catch (error) {
      console.error("Get leaderboard error:", error);
      res.status(500).json({ error: "Failed to get leaderboard" });
    }
  });

  app.get("/api/leaderboard/me", requireAuth, async (req, res) => {
    try {
      const userId = (req.user as any).id;
      const user = req.user as any;
      
      const allStats = await db.select({
        stats: userStats,
      })
        .from(userStats)
        .orderBy(desc(userStats.totalPoints));
      
      let [myStats] = await db.select().from(userStats).where(eq(userStats.userId, userId));
      
      if (!myStats) {
        [myStats] = await db.insert(userStats).values({ userId }).returning();
      }
      
      const rank = allStats.findIndex(s => s.stats.userId === userId) + 1;
      
      const [badgeCount] = await db.select({ count: count() }).from(userBadges).where(eq(userBadges.userId, userId));
      
      res.json({
        rank: rank || allStats.length + 1,
        userId,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatarUrl: user.avatar,
        totalPoints: myStats.totalPoints,
        coursesCompleted: myStats.coursesCompleted,
        currentStreak: myStats.currentStreak,
        badges: badgeCount.count,
      });
    } catch (error) {
      console.error("Get my leaderboard rank error:", error);
      res.status(500).json({ error: "Failed to get rank" });
    }
  });

  // ==================== BADGES MANAGEMENT (ADMIN) ====================
  app.get("/api/badges", async (req, res) => {
    try {
      const result = await db.select().from(badges).where(eq(badges.isActive, true));
      res.json(result);
    } catch (error) {
      console.error("Get badges error:", error);
      res.status(500).json({ error: "Failed to get badges" });
    }
  });

  app.post("/api/admin/badges", requireAdmin, async (req, res) => {
    try {
      const [badge] = await db.insert(badges).values(req.body).returning();
      res.status(201).json(badge);
    } catch (error) {
      console.error("Create badge error:", error);
      res.status(500).json({ error: "Failed to create badge" });
    }
  });

  // ==================== ANNOUNCEMENTS ====================
  app.get("/api/announcements", async (req, res) => {
    try {
      const { courseId } = req.query;
      
      let query = db.select().from(announcements).where(eq(announcements.isPublished, true));
      
      if (courseId) {
        query = query.where(or(
          eq(announcements.courseId, Number(courseId)),
          sql`${announcements.courseId} IS NULL`
        )) as any;
      }
      
      const result = await query.orderBy(desc(announcements.createdAt)).limit(20);
      res.json(result);
    } catch (error) {
      console.error("Get announcements error:", error);
      res.status(500).json({ error: "Failed to get announcements" });
    }
  });

  app.post("/api/admin/announcements", requireInstructor, async (req, res) => {
    try {
      const announcementData = {
        ...req.body,
        authorId: (req.user as any).id,
      };
      
      const [announcement] = await db.insert(announcements).values(announcementData).returning();
      res.status(201).json(announcement);
    } catch (error) {
      console.error("Create announcement error:", error);
      res.status(500).json({ error: "Failed to create announcement" });
    }
  });

  // ==================== FILE TEMPLATES ====================
  app.get("/api/templates/quiz-questions.xlsx", (req, res) => {
    const workbook = XLSX.utils.book_new();
    const data = [
      ["Question", "Option A", "Option B", "Option C", "Option D", "Correct Answer", "Points", "Explanation"],
      ["What is cloud computing?", "Local storage", "On-premise servers", "Internet-based computing services", "Personal computers", "C", "10", "Cloud computing delivers services over the internet"],
      ["Which is an AWS service?", "Azure Blob", "Google Compute", "EC2", "DigitalOcean", "C", "10", "EC2 (Elastic Compute Cloud) is an AWS service"],
      ["What does API stand for?", "Application Programming Interface", "Advanced Program Integration", "Automated Process Integration", "Application Process Interface", "A", "5", ""],
    ];
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    worksheet["!cols"] = [{ wch: 40 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 15 }, { wch: 8 }, { wch: 50 }];
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quiz Questions");
    
    const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=quiz-questions-template.xlsx");
    res.send(buffer);
  });

  app.get("/api/templates/course-content.docx", async (req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Disposition", "attachment; filename=course-content-template.txt");
    res.send(`COURSE CONTENT TEMPLATE
======================

# Module 1: Getting Started

## Lesson 1.1: Introduction
Welcome to the course! In this lesson, you will learn the fundamentals.

### Key Concepts
- Concept 1: Explanation here
- Concept 2: Explanation here

### Practical Exercise
Complete the following exercise to test your understanding.

---

# Module 2: Core Concepts

## Lesson 2.1: Deep Dive
This lesson covers advanced topics in detail.

### Learning Objectives
1. Understand the core principles
2. Apply concepts in real scenarios
3. Build practical skills

---

INSTRUCTIONS:
- Use # for Module titles
- Use ## for Lesson titles
- Use ### for subsections
- Separate modules with ---
- Images can be embedded (they will be extracted and stored)
`);
  });

  // Parse Excel file for quiz questions
  app.post("/api/admin/parse-quiz-excel", requireInstructor, async (req, res) => {
    try {
      const { base64Data } = req.body;
      if (!base64Data) {
        return res.status(400).json({ error: "No file data provided" });
      }
      
      const buffer = Buffer.from(base64Data, "base64");
      const workbook = XLSX.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
      
      const questions = [];
      for (let i = 1; i < jsonData.length; i++) {
        const row = jsonData[i];
        if (row[0]) {
          questions.push({
            question: row[0] || "",
            options: [row[1] || "", row[2] || "", row[3] || "", row[4] || ""],
            correctAnswer: (row[5] || "A").toUpperCase().charCodeAt(0) - 65,
            points: parseInt(row[6] as string) || 10,
            explanation: row[7] || "",
          });
        }
      }
      
      res.json({ questions, totalQuestions: questions.length });
    } catch (error) {
      console.error("Parse quiz excel error:", error);
      res.status(500).json({ error: "Failed to parse Excel file" });
    }
  });

  // Parse Word document for course content
  app.post("/api/admin/parse-word-content", requireInstructor, async (req, res) => {
    try {
      const { base64Data } = req.body;
      if (!base64Data) {
        return res.status(400).json({ error: "No file data provided" });
      }
      
      const buffer = Buffer.from(base64Data, "base64");
      const result = await mammoth.convertToHtml({ buffer });
      const html = result.value;
      
      const moduleMatches = html.split(/<h1[^>]*>/i).slice(1);
      const parsedModules = [];
      
      for (const moduleContent of moduleMatches) {
        const moduleEndIndex = moduleContent.indexOf("</h1>");
        const moduleTitle = moduleContent.substring(0, moduleEndIndex).replace(/<[^>]*>/g, "").trim();
        const restContent = moduleContent.substring(moduleEndIndex + 5);
        
        const lessonMatches = restContent.split(/<h2[^>]*>/i).slice(1);
        const parsedLessons = [];
        
        for (const lessonContent of lessonMatches) {
          const lessonEndIndex = lessonContent.indexOf("</h2>");
          const lessonTitle = lessonContent.substring(0, lessonEndIndex).replace(/<[^>]*>/g, "").trim();
          const lessonBody = lessonContent.substring(lessonEndIndex + 5);
          
          parsedLessons.push({
            title: lessonTitle,
            content: lessonBody.trim(),
            type: "text",
            estimatedMinutes: Math.max(5, Math.ceil(lessonBody.length / 500)),
          });
        }
        
        if (moduleTitle) {
          parsedModules.push({
            title: moduleTitle,
            lessons: parsedLessons,
          });
        }
      }
      
      res.json({ 
        modules: parsedModules, 
        totalModules: parsedModules.length,
        rawHtml: html,
        messages: result.messages 
      });
    } catch (error) {
      console.error("Parse word content error:", error);
      res.status(500).json({ error: "Failed to parse Word document" });
    }
  });

  return httpServer;
}
