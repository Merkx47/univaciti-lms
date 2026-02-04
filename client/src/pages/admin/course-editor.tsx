import { useState, useEffect } from "react";
import { useRoute, useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, BookOpen, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockStore } from "@/lib/mock-store";

const THEME_PRIMARY = "#1E9AD6";

const specializations = [
  { value: "cloud-engineering", label: "Cloud Engineering" },
  { value: "data-analytics", label: "Data Analytics" },
  { value: "software-java", label: "Software Engineering (Java)" },
  { value: "software-react", label: "Software Engineering (React)" },
  { value: "quality-assurance", label: "Quality Assurance" },
  { value: "solutions-architecture", label: "Solutions Architecture" },
  { value: "ai-ml", label: "AI & Machine Learning" },
];

const difficulties = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const availableTechnologies = [
  "aws", "azure", "googlecloud", "docker", "kubernetes", "terraform", "linux",
  "python", "java", "spring", "react", "typescript", "nodejs", "nextjs",
  "postgresql", "mongodb", "redis", "tensorflow", "pytorch", "selenium", "jenkins"
];

export default function CourseEditor() {
  const [, params] = useRoute("/admin/courses/:id");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";
  const courseId = isNew ? null : Number(params?.id);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    specialization: "cloud-engineering",
    description: "",
    shortDescription: "",
    difficulty: "intermediate",
    duration: 40,
    technologies: [] as string[],
    isPublished: false,
    isFeatured: false,
  });

  // Load existing course data if editing
  useEffect(() => {
    if (courseId) {
      const existingCourse = mockStore.getCourseById(courseId);
      if (existingCourse) {
        setFormData({
          title: existingCourse.title || "",
          slug: existingCourse.slug || "",
          specialization: existingCourse.specialization || "cloud-engineering",
          description: existingCourse.description || "",
          shortDescription: existingCourse.shortDescription || "",
          difficulty: existingCourse.difficulty || "intermediate",
          duration: existingCourse.duration || 40,
          technologies: existingCourse.technologies || [],
          isPublished: existingCourse.isPublished || false,
          isFeatured: existingCourse.isFeatured || false,
        });
      }
    }
  }, [courseId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSaving(true);

    try {
      if (isNew) {
        // Create new course
        const newCourse = mockStore.addCourse({
          title: formData.title,
          slug: formData.slug,
          specialization: formData.specialization,
          description: formData.description,
          shortDescription: formData.shortDescription,
          difficulty: formData.difficulty,
          duration: formData.duration,
          technologies: formData.technologies,
          isPublished: formData.isPublished,
          isFeatured: formData.isFeatured,
        });
        setIsSaving(false);
        toast({
          title: "Course Created!",
          description: "Now add modules and lessons to your course.",
        });
        // Redirect to curriculum builder so user can add content immediately
        setLocation(`/admin/courses/${newCourse.id}/curriculum`);
      } else if (courseId) {
        // Update existing course
        mockStore.updateCourse(courseId, {
          title: formData.title,
          slug: formData.slug,
          specialization: formData.specialization,
          description: formData.description,
          shortDescription: formData.shortDescription,
          difficulty: formData.difficulty,
          duration: formData.duration,
          technologies: formData.technologies,
          isPublished: formData.isPublished,
          isFeatured: formData.isFeatured,
        });
        setIsSaving(false);
        toast({
          title: "Course Updated!",
          description: "Your changes have been saved.",
        });
        setLocation("/admin/courses");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save course');
      setIsSaving(false);
    }
  };

  const handleTechnologyToggle = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.includes(tech)
        ? prev.technologies.filter(t => t !== tech)
        : [...prev.technologies, tech]
    }));
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .slice(0, 50);
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/courses">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Courses
              </Button>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="Univaciti" className="h-8 w-8" />
            <span className="font-bold text-xl" style={{ color: THEME_PRIMARY }}>
              {isNew ? "New Course" : "Edit Course"}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold mb-6">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course Title</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., AWS Cloud Engineering Masterclass"
                  required
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">URL Slug</label>
                  <div className="flex gap-2">
                    <Input
                      value={formData.slug}
                      onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                      placeholder="aws-cloud-engineering"
                      required
                    />
                    <Button type="button" variant="outline" onClick={generateSlug}>
                      Generate
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Short Description</label>
                <Input
                  value={formData.shortDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                  placeholder="Brief description for cards (max 100 chars)"
                  maxLength={100}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Full Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Detailed course description..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold mb-6">Course Details</h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Specialization</label>
                <select
                  value={formData.specialization}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  {specializations.map(spec => (
                    <option key={spec.value} value={spec.value}>{spec.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Difficulty</label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
                >
                  {difficulties.map(diff => (
                    <option key={diff.value} value={diff.value}>{diff.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration (hours)</label>
                <Input
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                  min={1}
                  max={500}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Technologies</label>
              <div className="flex flex-wrap gap-2">
                {availableTechnologies.map(tech => (
                  <button
                    key={tech}
                    type="button"
                    onClick={() => handleTechnologyToggle(tech)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      formData.technologies.includes(tech)
                        ? "text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
                    }`}
                    style={formData.technologies.includes(tech) ? { backgroundColor: THEME_PRIMARY } : {}}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h2 className="text-lg font-semibold mb-6">Publishing Options</h2>

            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isPublished}
                  onChange={(e) => setFormData(prev => ({ ...prev, isPublished: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300"
                />
                <span className="font-medium">Published</span>
                <span className="text-sm text-muted-foreground">(visible to students)</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                  className="w-5 h-5 rounded border-slate-300"
                />
                <span className="font-medium">Featured</span>
                <span className="text-sm text-muted-foreground">(highlighted on homepage)</span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Link href="/admin/courses">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <div className="flex gap-3">
              {!isNew && (
                <Link href={`/admin/courses/${courseId}/curriculum`}>
                  <Button type="button" variant="outline" className="gap-2">
                    <BookOpen className="w-4 h-4" />
                    Edit Curriculum
                  </Button>
                </Link>
              )}
              <Button
                type="submit"
                className="gap-2 text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
                disabled={isSaving}
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Course"}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
