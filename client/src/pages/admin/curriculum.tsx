import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  ArrowLeft, Plus, GripVertical, Edit, Trash2, ChevronDown, ChevronRight,
  Video, FileText, Code, HelpCircle, Save, Eye, BookOpen, Settings,
  Loader2, CheckCircle, Play
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";

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

interface Module {
  id: number;
  courseId: number;
  title: string;
  description: string;
  order: number;
  isPublished: boolean;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  moduleId: number;
  title: string;
  slug: string;
  type: string;
  order: number;
  isPublished: boolean;
  estimatedMinutes: number;
}

export default function CurriculumBuilder() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set());
  const [editingModule, setEditingModule] = useState<number | null>(null);
  const [editingLesson, setEditingLesson] = useState<number | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonType, setNewLessonType] = useState("text");
  const [addingLessonToModule, setAddingLessonToModule] = useState<number | null>(null);

  const { data: course, isLoading } = useQuery<any>({
    queryKey: [`/api/courses/${id}`],
    enabled: !!id,
  });

  const createModuleMutation = useMutation({
    mutationFn: async (title: string) => {
      const res = await apiRequest("POST", `/api/admin/courses/${id}/modules`, {
        title,
        description: "",
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}`] });
      setNewModuleTitle("");
    },
  });

  const updateModuleMutation = useMutation({
    mutationFn: async ({ moduleId, data }: { moduleId: number; data: any }) => {
      const res = await apiRequest("PATCH", `/api/admin/modules/${moduleId}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}`] });
      setEditingModule(null);
    },
  });

  const deleteModuleMutation = useMutation({
    mutationFn: async (moduleId: number) => {
      await apiRequest("DELETE", `/api/admin/modules/${moduleId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}`] });
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: async ({ moduleId, title, type }: { moduleId: number; title: string; type: string }) => {
      const res = await apiRequest("POST", `/api/admin/modules/${moduleId}/lessons`, {
        title,
        type,
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}`] });
      setNewLessonTitle("");
      setAddingLessonToModule(null);
    },
  });

  const deleteLessonMutation = useMutation({
    mutationFn: async (lessonId: number) => {
      await apiRequest("DELETE", `/api/admin/lessons/${lessonId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/courses/${id}`] });
    },
  });

  const toggleModule = (moduleId: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // Expand all modules by default
  useEffect(() => {
    if (course?.modules) {
      setExpandedModules(new Set(course.modules.map((m: Module) => m.id)));
    }
  }, [course?.modules]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const modules = course?.modules || [];

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
                <p className="text-sm text-muted-foreground">{course?.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
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
            <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>
              {modules.reduce((acc: number, m: Module) => acc + (m.lessons?.length || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">Lessons</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
            <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>{course?.duration || 0}h</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.map((module: Module, moduleIndex: number) => (
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
                      defaultValue={module.title}
                      className="w-full px-2 py-1 border border-slate-200 dark:border-slate-600 rounded"
                      onClick={(e) => e.stopPropagation()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          updateModuleMutation.mutate({
                            moduleId: module.id,
                            data: { title: e.currentTarget.value },
                          });
                        }
                        if (e.key === "Escape") setEditingModule(null);
                      }}
                      onBlur={(e) => {
                        updateModuleMutation.mutate({
                          moduleId: module.id,
                          data: { title: e.target.value },
                        });
                      }}
                      autoFocus
                    />
                  ) : (
                    <div>
                      <h3 className="font-semibold">{module.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {module.lessons?.length || 0} lessons
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    module.isPublished
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    {module.isPublished ? "Published" : "Draft"}
                  </span>
                  <button
                    className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-600 rounded"
                    onClick={() => setEditingModule(module.id)}
                  >
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </button>
                  <button
                    className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                    onClick={() => {
                      if (confirm("Delete this module and all its lessons?")) {
                        deleteModuleMutation.mutate(module.id);
                      }
                    }}
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
                  {module.lessons?.map((lesson: Lesson, lessonIndex: number) => {
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
                            {lesson.type} • {lesson.estimatedMinutes || 10} min
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
                            onClick={() => {
                              if (confirm("Delete this lesson?")) {
                                deleteLessonMutation.mutate(lesson.id);
                              }
                            }}
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
                          onClick={() => {
                            if (newLessonTitle.trim()) {
                              createLessonMutation.mutate({
                                moduleId: module.id,
                                title: newLessonTitle,
                                type: newLessonType,
                              });
                            }
                          }}
                          disabled={createLessonMutation.isPending}
                          className="text-white"
                          style={{ backgroundColor: THEME_PRIMARY }}
                        >
                          {createLessonMutation.isPending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            "Add"
                          )}
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
              />
              <Button
                onClick={() => {
                  if (newModuleTitle.trim()) {
                    createModuleMutation.mutate(newModuleTitle);
                  }
                }}
                disabled={createModuleMutation.isPending || !newModuleTitle.trim()}
                className="text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                {createModuleMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add Module
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
