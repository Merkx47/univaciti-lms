import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockCourses } from "@/lib/mock-data";

const THEME_PRIMARY = "#1E9AD6";

interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  type: string;
  order: number;
  isPublished: boolean;
  estimatedMinutes: number;
}

interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
  lessons: Lesson[];
}

const generateInitialModules = (courseId: number): Module[] => {
  return [
    {
      id: 1,
      courseId,
      title: "Getting Started",
      description: "Introduction to the course",
      order: 1,
      isPublished: true,
      lessons: [
        { id: 1, moduleId: 1, title: "Welcome & Course Overview", type: "video", order: 1, isPublished: true, estimatedMinutes: 10 },
        { id: 2, moduleId: 1, title: "Setting Up Your Environment", type: "text", order: 2, isPublished: true, estimatedMinutes: 15 },
        { id: 3, moduleId: 1, title: "First Hands-On Exercise", type: "code", order: 3, isPublished: true, estimatedMinutes: 20 },
      ]
    },
    {
      id: 2,
      courseId,
      title: "Core Fundamentals",
      description: "Essential concepts and techniques",
      order: 2,
      isPublished: true,
      lessons: [
        { id: 4, moduleId: 2, title: "Understanding Key Concepts", type: "text", order: 1, isPublished: true, estimatedMinutes: 20 },
        { id: 5, moduleId: 2, title: "Practical Application Demo", type: "video", order: 2, isPublished: true, estimatedMinutes: 25 },
        { id: 6, moduleId: 2, title: "Knowledge Check Quiz", type: "quiz", order: 3, isPublished: true, estimatedMinutes: 15 },
      ]
    },
    {
      id: 3,
      courseId,
      title: "Advanced Techniques",
      description: "Deep dive into advanced topics",
      order: 3,
      isPublished: false,
      lessons: [
        { id: 7, moduleId: 3, title: "Advanced Patterns & Best Practices", type: "text", order: 1, isPublished: false, estimatedMinutes: 30 },
        { id: 8, moduleId: 3, title: "Real-World Case Study", type: "video", order: 2, isPublished: false, estimatedMinutes: 35 },
      ]
    },
  ];
};

export default function CurriculumBuilder() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user, logoutMutation } = useAuth();
  const courseId = Number(id) || 1;
  const course = mockCourses.find(c => c.id === courseId) || mockCourses[0];

  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1, 2]));
  const [showAddModule, setShowAddModule] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState<number | null>(null);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDesc, setNewModuleDesc] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState("text");
  const [newLessonMinutes, setNewLessonMinutes] = useState(15);

  const [nextModuleId, setNextModuleId] = useState(100);
  const [nextLessonId, setNextLessonId] = useState(100);

  useEffect(() => {
    setModules(generateInitialModules(courseId));
  }, [courseId]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/admin/login");
  };

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const handleAddModule = () => {
    if (!newModuleTitle.trim()) return;
    
    const newModule: Module = {
      id: nextModuleId,
      courseId,
      title: newModuleTitle,
      description: newModuleDesc,
      order: modules.length + 1,
      isPublished: false,
      lessons: []
    };
    
    setModules([...modules, newModule]);
    setNextModuleId(nextModuleId + 1);
    setNewModuleTitle("");
    setNewModuleDesc("");
    setShowAddModule(false);
    setExpandedModules(new Set([...Array.from(expandedModules), newModule.id]));
  };

  const handleAddLesson = (moduleId: number) => {
    if (!newLessonTitle.trim()) return;
    
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const newLesson: Lesson = {
      id: nextLessonId,
      moduleId,
      title: newLessonTitle,
      type: newLessonType,
      order: module.lessons.length + 1,
      isPublished: false,
      estimatedMinutes: newLessonMinutes
    };

    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: [...m.lessons, newLesson] }
        : m
    ));
    
    setNextLessonId(nextLessonId + 1);
    setNewLessonTitle("");
    setNewLessonType("text");
    setNewLessonMinutes(15);
    setShowAddLesson(null);
  };

  const handleDeleteModule = (moduleId: number) => {
    if (confirm("Delete this module and all its lessons?")) {
      setModules(modules.filter(m => m.id !== moduleId));
    }
  };

  const handleDeleteLesson = (moduleId: number, lessonId: number) => {
    if (confirm("Delete this lesson?")) {
      setModules(modules.map(m => 
        m.id === moduleId 
          ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
          : m
      ));
    }
  };

  const handleSaveModule = () => {
    if (!editingModule) return;
    setModules(modules.map(m => m.id === editingModule.id ? editingModule : m));
    setEditingModule(null);
  };

  const handleSaveLesson = () => {
    if (!editingLesson) return;
    setModules(modules.map(m => ({
      ...m,
      lessons: m.lessons.map(l => l.id === editingLesson.id ? editingLesson : l)
    })));
    setEditingLesson(null);
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = modules.reduce((acc, m) => 
    acc + m.lessons.reduce((a, l) => a + l.estimatedMinutes, 0), 0
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
              <div>
                <span className="font-bold text-lg" style={{ color: THEME_PRIMARY }}>Univaciti</span>
                <span className="text-xs block text-muted-foreground">Admin Portal</span>
              </div>
            </div>
            
            <nav className="flex items-center gap-6">
              <Link href="/admin/dashboard">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Dashboard</span>
              </Link>
              <Link href="/admin/courses">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Courses</span>
              </Link>
              <Link href="/admin/users">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Users</span>
              </Link>
              <Link href="/admin/enrollments">
                <span className="text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white">Enrollments</span>
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user?.firstName || user?.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Link href="/admin/courses">
              <span className="hover:underline">Courses</span>
            </Link>
            <span>/</span>
            <span>{course.title}</span>
            <span>/</span>
            <span className="text-foreground">Curriculum</span>
          </div>
          <h1 className="text-2xl font-bold">Curriculum Builder</h1>
          <p className="text-muted-foreground mt-1">Organize modules and lessons for this course</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Modules</p>
            <p className="text-2xl font-bold">{modules.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Lessons</p>
            <p className="text-2xl font-bold">{totalLessons}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-muted-foreground">Total Duration</p>
            <p className="text-2xl font-bold">{Math.round(totalDuration / 60)}h {totalDuration % 60}m</p>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <div key={module.id} className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Module Header */}
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground font-mono">#{moduleIndex + 1}</span>
                  <div>
                    <h3 className="font-semibold">{module.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {module.lessons.length} lessons · {module.lessons.reduce((a, l) => a + l.estimatedMinutes, 0)} min
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    module.isPublished
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {module.isPublished ? "Published" : "Draft"}
                  </span>
                  <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setEditingModule(module); }}>
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600" onClick={(e) => { e.stopPropagation(); handleDeleteModule(module.id); }}>
                    Delete
                  </Button>
                  <span className="text-muted-foreground">{expandedModules.has(module.id) ? "▼" : "▶"}</span>
                </div>
              </div>

              {/* Lessons */}
              {expandedModules.has(module.id) && (
                <div className="border-t border-slate-200 dark:border-slate-700">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between px-4 py-3 pl-12 hover:bg-slate-50 dark:hover:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground font-mono">{moduleIndex + 1}.{lessonIndex + 1}</span>
                        <div>
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.type} · {lesson.estimatedMinutes} min
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          lesson.isPublished
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                        }`}>
                          {lesson.isPublished ? "Live" : "Draft"}
                        </span>
                        <Link href={`/admin/lesson/${lesson.id}`}>
                          <Button variant="ghost" size="sm">Edit Content</Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeleteLesson(module.id, lesson.id)}>
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* Add Lesson */}
                  {showAddLesson === module.id ? (
                    <div className="p-4 pl-12 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-200 dark:border-slate-600">
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        <Input
                          placeholder="Lesson title"
                          value={newLessonTitle}
                          onChange={(e) => setNewLessonTitle(e.target.value)}
                        />
                        <select
                          value={newLessonType}
                          onChange={(e) => setNewLessonType(e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="video">Video</option>
                          <option value="code">Code Exercise</option>
                          <option value="quiz">Quiz</option>
                        </select>
                        <Input
                          type="number"
                          placeholder="Minutes"
                          value={newLessonMinutes}
                          onChange={(e) => setNewLessonMinutes(Number(e.target.value))}
                          min={1}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleAddLesson(module.id)} className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                          Add Lesson
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setShowAddLesson(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowAddLesson(module.id)}
                      className="w-full p-3 pl-12 text-left text-sm text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-700/30 border-t border-slate-200 dark:border-slate-600"
                    >
                      + Add Lesson
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add Module */}
          {showAddModule ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="font-semibold mb-3">Add New Module</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Module title"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Module description (optional)"
                  value={newModuleDesc}
                  onChange={(e) => setNewModuleDesc(e.target.value)}
                  rows={2}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddModule} className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                    Add Module
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddModule(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddModule(true)}
              className="w-full p-4 bg-white dark:bg-slate-800 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 text-muted-foreground hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
            >
              + Add Module
            </button>
          )}
        </div>
      </main>

      {/* Edit Module Modal */}
      {editingModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Module</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  value={editingModule.title}
                  onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Description</label>
                <Textarea
                  value={editingModule.description}
                  onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <button
                  onClick={() => setEditingModule({ ...editingModule, isPublished: !editingModule.isPublished })}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    editingModule.isPublished
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {editingModule.isPublished ? "Published" : "Draft"}
                </button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setEditingModule(null)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleSaveModule} className="flex-1 text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
