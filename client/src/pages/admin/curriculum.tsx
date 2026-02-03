import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft, Plus, GripVertical, Edit, Trash2, ChevronDown, ChevronRight,
  Video, FileText, Code, HelpCircle, Save, Eye, BookOpen, Settings,
  CheckCircle
} from "lucide-react";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockCourses } from "@/lib/mock-data";

const THEME_PRIMARY = "#1E9AD6";

const lessonTypeIcons: Record<string, any> = {
  text: FileText,
  video: Video,
  code: Code,
  quiz: HelpCircle,
  assignment: BookOpen,
};

const lessonTypeColors: Record<string, string> = {
  text: "#3B82F6",
  video: "#EF4444",
  code: "#10B981",
  quiz: "#8B5CF6",
  assignment: "#F59E0B",
};

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

// Generate initial mock modules for a course
const generateInitialModules = (courseId: number): Module[] => {
  const course = mockCourses.find(c => c.id === courseId);
  if (!course) return [];
  
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
  const courseId = Number(id);
  const course = mockCourses.find(c => c.id === courseId);
  
  const [modules, setModules] = useState<Module[]>([]);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [editingModule, setEditingModule] = useState<number | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState("");
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState("text");
  const [addingLessonToModule, setAddingLessonToModule] = useState<number | null>(null);
  const [nextModuleId, setNextModuleId] = useState(100);
  const [nextLessonId, setNextLessonId] = useState(100);
  const [saveMessage, setSaveMessage] = useState("");

  // Initialize modules
  useEffect(() => {
    if (courseId) {
      const initialModules = generateInitialModules(courseId);
      setModules(initialModules);
      setExpandedModules(new Set(initialModules.map(m => m.id)));
    }
  }, [courseId]);

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  const addModule = () => {
    if (!newModuleTitle.trim()) return;
    
    const newModule: Module = {
      id: nextModuleId,
      courseId,
      title: newModuleTitle,
      description: "",
      order: modules.length + 1,
      isPublished: false,
      lessons: [],
    };
    
    setModules([...modules, newModule]);
    setExpandedModules(new Set([...Array.from(expandedModules), nextModuleId]));
    setNextModuleId(nextModuleId + 1);
    setNewModuleTitle("");
    showSaveMessage("Module added successfully!");
  };

  const updateModuleTitle = (moduleId: number, newTitle: string) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, title: newTitle } : m
    ));
    setEditingModule(null);
    showSaveMessage("Module updated!");
  };

  const deleteModule = (moduleId: number) => {
    if (confirm("Delete this module and all its lessons?")) {
      setModules(modules.filter(m => m.id !== moduleId));
      showSaveMessage("Module deleted!");
    }
  };

  const toggleModulePublished = (moduleId: number) => {
    setModules(modules.map(m => 
      m.id === moduleId ? { ...m, isPublished: !m.isPublished } : m
    ));
  };

  const addLesson = (moduleId: number) => {
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
      estimatedMinutes: 15,
    };

    setModules(modules.map(m => 
      m.id === moduleId 
        ? { ...m, lessons: [...m.lessons, newLesson] }
        : m
    ));
    
    setNextLessonId(nextLessonId + 1);
    setNewLessonTitle("");
    setNewLessonType("text");
    setAddingLessonToModule(null);
    showSaveMessage("Lesson added successfully!");
  };

  const deleteLesson = (moduleId: number, lessonId: number) => {
    if (confirm("Delete this lesson?")) {
      setModules(modules.map(m => 
        m.id === moduleId 
          ? { ...m, lessons: m.lessons.filter(l => l.id !== lessonId) }
          : m
      ));
      showSaveMessage("Lesson deleted!");
    }
  };

  const showSaveMessage = (message: string) => {
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(""), 2000);
  };

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const totalDuration = modules.reduce((acc, m) => 
    acc + m.lessons.reduce((lAcc, l) => lAcc + l.estimatedMinutes, 0), 0
  );

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Course not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/courses">
                <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-lg font-bold">Curriculum Builder</h1>
                <p className="text-sm text-muted-foreground">{course.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {saveMessage && (
                <div className="flex items-center gap-2 text-green-600 text-sm">
                  <CheckCircle className="w-4 h-4" />
                  {saveMessage}
                </div>
              )}
              <Link href={`/admin/courses/${id}`}>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Course Settings
                </Button>
              </Link>
              <Button size="sm" className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                <Eye className="w-4 h-4 mr-2" />
                Preview Course
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>{modules.length}</div>
            <div className="text-sm text-muted-foreground">Modules</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>{totalLessons}</div>
            <div className="text-sm text-muted-foreground">Lessons</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>{Math.round(totalDuration / 60)}h {totalDuration % 60}m</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <div
              key={module.id}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              {/* Module Header */}
              <div
                className="flex items-center gap-3 p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50"
                onClick={() => toggleModule(module.id)}
              >
                <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: THEME_PRIMARY }}>
                  {moduleIndex + 1}
                </div>
                <div className="flex-1">
                  {editingModule === module.id ? (
                    <input
                      type="text"
                      value={editingModuleTitle}
                      onChange={(e) => setEditingModuleTitle(e.target.value)}
                      className="w-full px-2 py-1 border border-slate-200 dark:border-slate-600 rounded bg-white dark:bg-slate-700"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateModuleTitle(module.id, editingModuleTitle);
                        }
                        if (e.key === "Escape") setEditingModule(null);
                      }}
                      autoFocus
                    />
                  ) : (
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons.length} lessons
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => toggleModulePublished(module.id)}
                    className={`px-2 py-0.5 rounded-full text-xs cursor-pointer ${
                      module.isPublished
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                    }`}
                  >
                    {module.isPublished ? "Published" : "Draft"}
                  </button>
                  <button
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                    onClick={() => {
                      setEditingModule(module.id);
                      setEditingModuleTitle(module.title);
                    }}
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                    onClick={() => deleteModule(module.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </button>
                </div>
                {expandedModules.has(module.id) ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Lessons */}
              {expandedModules.has(module.id) && (
                <div className="border-t border-slate-200 dark:border-slate-700">
                  {module.lessons.map((lesson) => {
                    const LessonIcon = lessonTypeIcons[lesson.type] || FileText;
                    const iconColor = lessonTypeColors[lesson.type] || THEME_PRIMARY;
                    
                    return (
                      <div
                        key={lesson.id}
                        className="flex items-center gap-3 px-4 py-3 border-b border-slate-100 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/30"
                      >
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab ml-8" />
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${iconColor}20` }}
                        >
                          <LessonIcon className="w-4 h-4" style={{ color: iconColor }} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {lesson.type} • {lesson.estimatedMinutes} min
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/admin/lessons/${lesson.id}/edit`}>
                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded">
                              <Edit className="w-4 h-4 text-muted-foreground" />
                            </button>
                          </Link>
                          <button
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                            onClick={() => deleteLesson(module.id, lesson.id)}
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Add Lesson Form */}
                  {addingLessonToModule === module.id ? (
                    <div className="p-4 bg-slate-50 dark:bg-slate-700/30 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex gap-3">
                        <Input
                          placeholder="Lesson title..."
                          value={newLessonTitle}
                          onChange={(e) => setNewLessonTitle(e.target.value)}
                          className="flex-1"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") addLesson(module.id);
                          }}
                        />
                        <select
                          value={newLessonType}
                          onChange={(e) => setNewLessonType(e.target.value)}
                          className="px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-sm"
                        >
                          <option value="text">Text</option>
                          <option value="video">Video</option>
                          <option value="code">Code</option>
                          <option value="quiz">Quiz</option>
                          <option value="assignment">Assignment</option>
                        </select>
                        <Button
                          size="sm"
                          onClick={() => addLesson(module.id)}
                          disabled={!newLessonTitle.trim()}
                          className="text-white"
                          style={{ backgroundColor: THEME_PRIMARY }}
                        >
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setAddingLessonToModule(null);
                            setNewLessonTitle("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="w-full p-3 text-sm text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-700/30 border-t border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2"
                      onClick={() => setAddingLessonToModule(module.id)}
                    >
                      <Plus className="w-4 h-4" />
                      Add Lesson
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* Add New Module */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-4">
            <div className="flex gap-3">
              <Input
                placeholder="New module title..."
                value={newModuleTitle}
                onChange={(e) => setNewModuleTitle(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addModule();
                }}
              />
              <Button
                onClick={addModule}
                disabled={!newModuleTitle.trim()}
                className="text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
