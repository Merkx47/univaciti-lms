import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  ArrowLeft, ChevronLeft, ChevronRight, Check, Play, Pause,
  BookOpen, Clock, Trophy, Menu, X, CheckCircle, Circle,
  FileText, Video, Code, HelpCircle, Lock, Volume2, VolumeX,
  Maximize, Settings, SkipForward
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const THEME_PRIMARY = "#1E9AD6";

const lessonTypeIcons: Record<string, any> = {
  text: FileText,
  video: Video,
  code: Code,
  quiz: HelpCircle,
  assignment: BookOpen,
};

interface Module {
  id: number;
  title: string;
  order: number;
  lessons: Lesson[];
}

interface Lesson {
  id: number;
  title: string;
  type: string;
  order: number;
  estimatedMinutes: number;
  isPublished: boolean;
  content?: any;
  videoUrl?: string;
}

interface ContentBlock {
  id: string;
  type: string;
  content?: string;
  language?: string;
  url?: string;
  caption?: string;
  level?: number;
  variant?: string;
}

export default function CoursePlayer() {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

  const { data: course, isLoading: courseLoading } = useQuery<any>({
    queryKey: [`/api/courses/${courseId}`],
    enabled: !!courseId,
  });

  const { data: lesson, isLoading: lessonLoading } = useQuery<any>({
    queryKey: [`/api/lessons/${lessonId}`],
    enabled: !!lessonId,
  });

  const { data: enrollmentData } = useQuery<any>({
    queryKey: [`/api/enrollments/${courseId}/progress`],
    enabled: !!courseId && !!user,
  });

  const markCompleteMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/lessons/${lessonId}/complete`, {});
      return res.json();
    },
    onSuccess: () => {
      setCompletedLessons(prev => new Set([...Array.from(prev), Number(lessonId)]));
      queryClient.invalidateQueries({ queryKey: [`/api/enrollments/${courseId}/progress`] });
      toast({ title: "Lesson completed!", description: "Great job! Keep going." });
    },
  });

  // Get all lessons flattened
  const allLessons: Lesson[] = course?.modules?.flatMap((m: Module) => m.lessons) || [];
  const currentIndex = allLessons.findIndex((l: Lesson) => l.id === Number(lessonId));
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  // Calculate progress
  const completedCount = completedLessons.size;
  const totalLessons = allLessons.length;
  const progressPercent = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;

  useEffect(() => {
    if (enrollmentData?.completedLessons) {
      setCompletedLessons(new Set(enrollmentData.completedLessons));
    }
  }, [enrollmentData]);

  const renderContent = () => {
    if (!lesson) return null;

    const blocks: ContentBlock[] = lesson.content?.blocks || [];

    if (lesson.type === 'video' && lesson.videoUrl) {
      return (
        <div className="space-y-6">
          {/* Video Player */}
          <div className="aspect-video bg-slate-900 rounded-xl overflow-hidden relative">
            <iframe
              src={lesson.videoUrl.replace('watch?v=', 'embed/')}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          
          {/* Video Controls Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <Clock className="w-4 h-4" />
              <span>{lesson.estimatedMinutes} minutes</span>
            </div>
          </div>

          {/* Additional Content */}
          {blocks.length > 0 && (
            <div className="mt-8 space-y-6">
              <h3 className="text-lg font-bold">Lesson Notes</h3>
              {blocks.map(block => renderBlock(block))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="prose prose-slate dark:prose-invert max-w-none">
        {blocks.map(block => renderBlock(block))}
      </div>
    );
  };

  const renderBlock = (block: ContentBlock) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag key={block.id} className="mt-8 mb-4 font-bold text-slate-900 dark:text-white">
            {block.content}
          </HeadingTag>
        );

      case 'text':
        return (
          <p key={block.id} className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 whitespace-pre-wrap">
            {block.content}
          </p>
        );

      case 'code':
        return (
          <div key={block.id} className="my-6">
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-400 text-sm">
                <span className="font-mono">{block.language || 'code'}</span>
                <button
                  className="hover:text-white"
                  onClick={() => {
                    navigator.clipboard.writeText(block.content || '');
                    toast({ title: "Copied to clipboard!" });
                  }}
                >
                  Copy
                </button>
              </div>
              <pre className="p-4 overflow-x-auto">
                <code className="text-green-400 font-mono text-sm">{block.content}</code>
              </pre>
            </div>
          </div>
        );

      case 'image':
        return (
          <figure key={block.id} className="my-6">
            <img
              src={block.url}
              alt={block.caption || ''}
              className="rounded-lg w-full"
            />
            {block.caption && (
              <figcaption className="text-center text-sm text-muted-foreground mt-2">
                {block.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'video':
        return (
          <div key={block.id} className="my-6 aspect-video bg-slate-900 rounded-lg overflow-hidden">
            <iframe
              src={block.url?.replace('watch?v=', 'embed/')}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        );

      case 'callout':
        const calloutStyles: Record<string, string> = {
          info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
          tip: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
          warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200',
          danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200',
        };
        return (
          <div key={block.id} className={`my-6 p-4 rounded-lg border-l-4 ${calloutStyles[block.variant || 'info']}`}>
            {block.content}
          </div>
        );

      case 'divider':
        return <hr key={block.id} className="my-8 border-slate-300 dark:border-slate-700" />;

      default:
        return null;
    }
  };

  if (courseLoading || lessonLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transition-all duration-300 ${
          sidebarOpen ? "w-80" : "w-0 overflow-hidden"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Course Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-700">
            <Link href="/dashboard">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-3">
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
            </Link>
            <h2 className="font-bold line-clamp-2">{course?.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Progress value={progressPercent} className="flex-1 h-2" />
              <span className="text-xs text-muted-foreground">{Math.round(progressPercent)}%</span>
            </div>
          </div>

          {/* Modules & Lessons */}
          <div className="flex-1 overflow-y-auto p-4">
            {course?.modules?.map((module: Module, moduleIndex: number) => (
              <div key={module.id} className="mb-6">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Module {moduleIndex + 1}
                </h3>
                <p className="font-medium text-sm mb-3">{module.title}</p>
                <div className="space-y-1">
                  {module.lessons?.map((l: Lesson) => {
                    const isActive = l.id === Number(lessonId);
                    const isCompleted = completedLessons.has(l.id);
                    const Icon = lessonTypeIcons[l.type] || FileText;

                    return (
                      <Link key={l.id} href={`/course/${courseId}/lesson/${l.id}`}>
                        <button
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                            isActive
                              ? "text-white"
                              : "hover:bg-slate-100 dark:hover:bg-slate-700"
                          }`}
                          style={isActive ? { backgroundColor: THEME_PRIMARY } : {}}
                        >
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                          )}
                          <Icon className="w-4 h-4 flex-shrink-0" />
                          <span className="text-sm flex-1 line-clamp-1">{l.title}</span>
                          <span className="text-xs text-muted-foreground">{l.estimatedMinutes}m</span>
                        </button>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-80" : "ml-0"}`}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <div>
                <h1 className="font-bold">{lesson?.title}</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {lesson?.estimatedMinutes} min
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {!completedLessons.has(Number(lessonId)) && (
                <Button
                  onClick={() => markCompleteMutation.mutate()}
                  disabled={markCompleteMutation.isPending}
                  className="text-white"
                  style={{ backgroundColor: THEME_PRIMARY }}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark Complete
                </Button>
              )}
              {completedLessons.has(Number(lessonId)) && (
                <span className="flex items-center gap-2 text-green-600 font-medium">
                  <CheckCircle className="w-5 h-5" />
                  Completed
                </span>
              )}
            </div>
          </div>
        </header>

        {/* Lesson Content */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          {renderContent()}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            {prevLesson ? (
              <Link href={`/course/${courseId}/lesson/${prevLesson.id}`}>
                <Button variant="outline">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous: {prevLesson.title}
                </Button>
              </Link>
            ) : (
              <div />
            )}
            {nextLesson ? (
              <Link href={`/course/${courseId}/lesson/${nextLesson.id}`}>
                <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                  Next: {nextLesson.title}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <Link href="/dashboard">
                <Button className="text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                  <Trophy className="w-4 h-4 mr-2" />
                  Complete Course
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
