/**
 * Centralized Mock Data Store with localStorage Persistence
 * All CRUD operations go through this store
 */

import { mockUsers as initialUsers, mockCourses as initialCourses, mockAdminEnrollments as initialEnrollments, mockModules as initialModules, MockModule, MockLesson } from './mock-data';

// Storage keys
const STORAGE_KEYS = {
  USERS: 'univaciti_users',
  COURSES: 'univaciti_courses',
  ENROLLMENTS: 'univaciti_enrollments',
  MODULES: 'univaciti_modules',
  CURRENT_USER: 'univaciti_current_user',
};

// Types
export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  password?: string;
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  specialization: string;
  difficulty?: string;
  duration?: number;
  technologies?: string[];
  isPublished?: boolean;
  isFeatured?: boolean;
  enrollmentCount?: number;
  rating?: number;
  instructor?: any;
  modules?: any[];
  learningOutcomes?: string[];
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  user: User;
  course: Course;
  status: string;
  progress: number;
  enrolledAt: string;
}

// Initialize store from localStorage or use defaults
function loadFromStorage<T>(key: string, initialData: T[]): T[] {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn(`Failed to load ${key} from storage:`, e);
  }
  return [...initialData];
}

function saveToStorage<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to save ${key} to storage:`, e);
  }
}

// Initialize with default passwords for demo
const usersWithPasswords: User[] = initialUsers.map(u => ({
  ...u,
  password: u.role === 'admin' ? 'admin123' : u.role === 'instructor' ? 'instructor123' : 'student123'
}));

// The store singleton
class MockStore {
  private users: User[];
  private courses: Course[];
  private enrollments: Enrollment[];
  private modules: MockModule[];
  private currentUser: User | null;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.users = loadFromStorage(STORAGE_KEYS.USERS, usersWithPasswords);
    this.courses = loadFromStorage(STORAGE_KEYS.COURSES, initialCourses as Course[]);
    this.enrollments = loadFromStorage(STORAGE_KEYS.ENROLLMENTS, initialEnrollments as Enrollment[]);
    this.modules = loadFromStorage(STORAGE_KEYS.MODULES, initialModules);

    const storedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    this.currentUser = storedUser ? JSON.parse(storedUser) : null;
  }

  // Subscribe to changes
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // ==================== AUTHENTICATION ====================

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  login(username: string, password: string, requireAdmin: boolean = false): User | null {
    const user = this.users.find(u =>
      (u.username === username || u.email === username) &&
      u.password === password &&
      u.isActive
    );

    if (!user) {
      throw new Error('Invalid username or password');
    }

    if (requireAdmin && user.role !== 'admin' && user.role !== 'instructor') {
      throw new Error('Access denied. Admin or instructor role required.');
    }

    this.currentUser = user;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    this.notifyListeners();
    return user;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    this.notifyListeners();
  }

  register(data: { username: string; email: string; password: string; firstName?: string; lastName?: string }): User {
    // Check if username or email already exists
    if (this.users.some(u => u.username === data.username)) {
      throw new Error('Username already exists');
    }
    if (this.users.some(u => u.email === data.email)) {
      throw new Error('Email already exists');
    }

    const newUser: User = {
      id: Math.max(...this.users.map(u => u.id), 0) + 1,
      username: data.username,
      email: data.email,
      password: data.password,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      role: 'student',
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    this.users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, this.users);

    // Auto-login after registration
    this.currentUser = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    this.notifyListeners();

    return newUser;
  }

  // ==================== USERS ====================

  getUsers(): User[] {
    return this.users.map(u => ({ ...u, password: undefined })) as User[];
  }

  getUserById(id: number): User | undefined {
    return this.users.find(u => u.id === id);
  }

  addUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...userData,
      id: Math.max(...this.users.map(u => u.id), 0) + 1,
      createdAt: new Date().toISOString(),
      password: userData.password || 'password123',
    };
    this.users.push(newUser);
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.notifyListeners();
    return newUser;
  }

  updateUser(id: number, updates: Partial<User>): User | null {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updates };
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.notifyListeners();
    return this.users[index];
  }

  deleteUser(id: number): boolean {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.notifyListeners();
    return true;
  }

  toggleUserActive(id: number): User | null {
    const user = this.users.find(u => u.id === id);
    if (!user) return null;

    user.isActive = !user.isActive;
    saveToStorage(STORAGE_KEYS.USERS, this.users);
    this.notifyListeners();
    return user;
  }

  // ==================== COURSES ====================

  getCourses(): Course[] {
    return this.courses;
  }

  getCourseById(id: number): Course | undefined {
    return this.courses.find(c => c.id === id);
  }

  getCourseWithModules(id: number): (Course & { modules: MockModule[] }) | null {
    const course = this.courses.find(c => c.id === id);
    if (!course) return null;
    return {
      ...course,
      modules: this.modules.filter(m => m.courseId === id),
    };
  }

  addCourse(courseData: Omit<Course, 'id'>): Course {
    const newCourse: Course = {
      ...courseData,
      id: Math.max(...this.courses.map(c => c.id), 0) + 1,
      enrollmentCount: 0,
    };
    this.courses.push(newCourse);
    saveToStorage(STORAGE_KEYS.COURSES, this.courses);
    this.notifyListeners();
    return newCourse;
  }

  updateCourse(id: number, updates: Partial<Course>): Course | null {
    const index = this.courses.findIndex(c => c.id === id);
    if (index === -1) return null;

    this.courses[index] = { ...this.courses[index], ...updates };
    saveToStorage(STORAGE_KEYS.COURSES, this.courses);
    this.notifyListeners();
    return this.courses[index];
  }

  deleteCourse(id: number): boolean {
    const index = this.courses.findIndex(c => c.id === id);
    if (index === -1) return false;

    this.courses.splice(index, 1);
    // Also delete related modules
    this.modules = this.modules.filter(m => m.courseId !== id);
    saveToStorage(STORAGE_KEYS.COURSES, this.courses);
    saveToStorage(STORAGE_KEYS.MODULES, this.modules);
    this.notifyListeners();
    return true;
  }

  // ==================== ENROLLMENTS ====================

  getEnrollments(): Enrollment[] {
    // Refresh user and course references
    return this.enrollments.map(e => ({
      ...e,
      user: this.getUserById(e.userId) || e.user,
      course: this.getCourseById(e.courseId) || e.course,
    }));
  }

  addEnrollment(userId: number, courseId: number): Enrollment | null {
    const user = this.getUserById(userId);
    const course = this.getCourseById(courseId);
    if (!user || !course) return null;

    // Check if already enrolled
    if (this.enrollments.some(e => e.userId === userId && e.courseId === courseId)) {
      throw new Error('User is already enrolled in this course');
    }

    const newEnrollment: Enrollment = {
      id: Math.max(...this.enrollments.map(e => e.id), 0) + 1,
      userId,
      courseId,
      user: user as any,
      course: course as any,
      status: 'active',
      progress: 0,
      enrolledAt: new Date().toISOString(),
    };

    this.enrollments.push(newEnrollment);
    saveToStorage(STORAGE_KEYS.ENROLLMENTS, this.enrollments);
    this.notifyListeners();
    return newEnrollment;
  }

  updateEnrollment(id: number, updates: Partial<Enrollment>): Enrollment | null {
    const index = this.enrollments.findIndex(e => e.id === id);
    if (index === -1) return null;

    this.enrollments[index] = { ...this.enrollments[index], ...updates };
    saveToStorage(STORAGE_KEYS.ENROLLMENTS, this.enrollments);
    this.notifyListeners();
    return this.enrollments[index];
  }

  deleteEnrollment(id: number): boolean {
    const index = this.enrollments.findIndex(e => e.id === id);
    if (index === -1) return false;

    this.enrollments.splice(index, 1);
    saveToStorage(STORAGE_KEYS.ENROLLMENTS, this.enrollments);
    this.notifyListeners();
    return true;
  }

  // ==================== MODULES ====================

  getModulesForCourse(courseId: number): MockModule[] {
    return this.modules.filter(m => m.courseId === courseId);
  }

  addModule(courseId: number, data: { title: string; description: string }): MockModule {
    const courseModules = this.modules.filter(m => m.courseId === courseId);
    const newModule: MockModule = {
      id: Math.max(...this.modules.map(m => m.id), 0) + 1,
      courseId,
      title: data.title,
      description: data.description,
      order: courseModules.length + 1,
      isPublished: false,
      lessons: [],
    };

    this.modules.push(newModule);
    saveToStorage(STORAGE_KEYS.MODULES, this.modules);
    this.notifyListeners();
    return newModule;
  }

  updateModule(id: number, updates: Partial<MockModule>): MockModule | null {
    const index = this.modules.findIndex(m => m.id === id);
    if (index === -1) return null;

    this.modules[index] = { ...this.modules[index], ...updates };
    saveToStorage(STORAGE_KEYS.MODULES, this.modules);
    this.notifyListeners();
    return this.modules[index];
  }

  deleteModule(id: number): boolean {
    const index = this.modules.findIndex(m => m.id === id);
    if (index === -1) return false;

    this.modules.splice(index, 1);
    saveToStorage(STORAGE_KEYS.MODULES, this.modules);
    this.notifyListeners();
    return true;
  }

  // ==================== LESSONS ====================

  getLesson(lessonId: number): MockLesson | undefined {
    for (const module of this.modules) {
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) return lesson;
    }
    return undefined;
  }

  addLesson(moduleId: number, data: { title: string; type: "text" | "video" | "code" | "quiz"; estimatedMinutes: number }): MockLesson | null {
    const moduleIndex = this.modules.findIndex(m => m.id === moduleId);
    if (moduleIndex === -1) return null;

    const allLessons = this.modules.flatMap(m => m.lessons);
    const newLesson: MockLesson = {
      id: Math.max(...allLessons.map(l => l.id), 0) + 1,
      moduleId,
      title: data.title,
      type: data.type,
      content: '',
      order: this.modules[moduleIndex].lessons.length + 1,
      isPublished: false,
      estimatedMinutes: data.estimatedMinutes,
    };

    this.modules[moduleIndex].lessons.push(newLesson);
    saveToStorage(STORAGE_KEYS.MODULES, this.modules);
    this.notifyListeners();
    return newLesson;
  }

  updateLesson(lessonId: number, updates: Partial<MockLesson>): MockLesson | null {
    for (const module of this.modules) {
      const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
      if (lessonIndex !== -1) {
        module.lessons[lessonIndex] = { ...module.lessons[lessonIndex], ...updates };
        saveToStorage(STORAGE_KEYS.MODULES, this.modules);
        this.notifyListeners();
        return module.lessons[lessonIndex];
      }
    }
    return null;
  }

  deleteLesson(lessonId: number): boolean {
    for (const module of this.modules) {
      const lessonIndex = module.lessons.findIndex(l => l.id === lessonId);
      if (lessonIndex !== -1) {
        module.lessons.splice(lessonIndex, 1);
        saveToStorage(STORAGE_KEYS.MODULES, this.modules);
        this.notifyListeners();
        return true;
      }
    }
    return false;
  }

  // ==================== RESET ====================

  resetToDefaults(): void {
    this.users = [...usersWithPasswords];
    this.courses = [...initialCourses] as Course[];
    this.enrollments = [...initialEnrollments] as Enrollment[];
    this.modules = [...initialModules];
    this.currentUser = null;

    saveToStorage(STORAGE_KEYS.USERS, this.users);
    saveToStorage(STORAGE_KEYS.COURSES, this.courses);
    saveToStorage(STORAGE_KEYS.ENROLLMENTS, this.enrollments);
    saveToStorage(STORAGE_KEYS.MODULES, this.modules);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);

    this.notifyListeners();
  }
}

// Export singleton instance
export const mockStore = new MockStore();

// React hook for subscribing to store changes
export function useMockStore() {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    return mockStore.subscribe(() => forceUpdate({}));
  }, []);

  return mockStore;
}

// We need to import useState and useEffect
import { useState, useEffect } from 'react';
