import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/RichTextEditor";
import logoUrl from "@assets/logo_1769031259580.png";
import { mockStore } from "@/lib/mock-store";
import { MockLesson } from "@/lib/mock-data";
import {
  downloadQuizTemplate,
  downloadCourseTemplate,
  parseQuizExcel,
  parseCourseContent,
  courseContentToHTML,
} from "@/lib/templates";
import {
  ArrowLeft, Save, Download, Upload, FileSpreadsheet, FileText,
  Plus, Trash2, ChevronUp, ChevronDown, CheckCircle, AlertCircle
} from "lucide-react";

const THEME_PRIMARY = "#1E9AD6";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  explanation: string;
}

interface ContentBlock {
  id: string;
  type: "heading" | "text" | "code" | "image";
  content: string;
}

export default function LessonEditor() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const lessonId = Number(id);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("text");
  const [videoUrl, setVideoUrl] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(10);
  const [isPublished, setIsPublished] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Quiz questions state
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);

  // Content blocks state
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  // Load lesson data from mock store
  useEffect(() => {
    if (lessonId) {
      const lesson = mockStore.getLesson(lessonId);
      if (lesson) {
        setTitle(lesson.title || "");
        setContent(lesson.content || "");
        setType(lesson.type || "text");
        setVideoUrl(lesson.videoUrl || "");
        setEstimatedMinutes(lesson.estimatedMinutes || 10);
        setIsPublished(lesson.isPublished || false);

        // Parse quiz questions if this is a quiz lesson
        if (lesson.type === "quiz" && lesson.content) {
          try {
            const parsed = JSON.parse(lesson.content);
            if (Array.isArray(parsed)) {
              setQuizQuestions(parsed);
            }
          } catch {
            // Content is not JSON, that's fine
          }
        }
      }
    }
  }, [lessonId]);

  const handleSave = () => {
    setIsSaving(true);
    setError(null);

    try {
      // Prepare content - for quizzes, stringify the questions
      const contentToSave = type === "quiz"
        ? JSON.stringify(quizQuestions)
        : content;

      mockStore.updateLesson(lessonId, {
        title,
        content: contentToSave,
        type: type as "text" | "video" | "code" | "quiz",
        videoUrl,
        estimatedMinutes,
        isPublished,
      });

      setIsSaving(false);
      setSuccess("Lesson saved successfully!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setIsSaving(false);
      setError(err instanceof Error ? err.message : "Failed to save lesson");
    }
  };

  // ==================== WORD DOCUMENT UPLOAD ====================
  const handleWordUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    // For .txt files, parse using our template parser
    if (file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = () => {
        const text = reader.result as string;
        const parsed = parseCourseContent(text);
        const html = courseContentToHTML(parsed);
        setContent(html);
        setSuccess(`Content imported: ${parsed.sections.length} sections from "${parsed.title}"`);
        setTimeout(() => setSuccess(null), 3000);
      };
      reader.readAsText(file);
    } else if (file.name.endsWith('.docx')) {
      // For .docx files, use mammoth (dynamic import)
      try {
        const mammoth = await import('mammoth');
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setContent(result.value);
        if (result.messages.length > 0) {
          console.log('Mammoth messages:', result.messages);
        }
        setSuccess(`Word document imported successfully!`);
        setTimeout(() => setSuccess(null), 3000);
      } catch (err) {
        setError('Failed to parse Word document: ' + (err as Error).message);
      }
    } else {
      setError('Please upload a .docx or .txt file');
    }

    e.target.value = "";
  };

  // ==================== EXCEL QUIZ UPLOAD ====================
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    try {
      const parsed = await parseQuizExcel(file);

      if (parsed.errors.length > 0) {
        setError(`Warning: ${parsed.errors.join('; ')}`);
      }

      if (parsed.questions.length === 0) {
        setError('No valid questions found in the Excel file. Please check the format.');
        return;
      }

      // Convert parsed questions to our internal format
      const convertedQuestions: QuizQuestion[] = parsed.questions.map((q, index) => ({
        id: `q-${Date.now()}-${index}`,
        question: q.question,
        options: [q.optionA, q.optionB, q.optionC, q.optionD],
        correctAnswer: ['A', 'B', 'C', 'D'].indexOf(q.correctAnswer),
        points: q.points || 10,
        explanation: q.explanation || '',
      }));

      setQuizQuestions(convertedQuestions);
      setType("quiz");
      setSuccess(`Imported ${convertedQuestions.length} quiz questions from ${file.name}!`);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError('Failed to parse Excel file: ' + (err as Error).message);
    }

    e.target.value = "";
  };

  // ==================== CONTENT BLOCK MANAGEMENT ====================
  const addBlock = (blockType: "heading" | "text" | "code" | "image") => {
    setBlocks([
      ...blocks,
      { id: `block-${Date.now()}`, type: blockType, content: "" }
    ]);
  };

  const updateBlock = (blockId: string, newContent: string) => {
    setBlocks(blocks.map(b => b.id === blockId ? { ...b, content: newContent } : b));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(b => b.id !== blockId));
  };

  const moveBlock = (blockId: string, direction: "up" | "down") => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (direction === "up" && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
    } else if (direction === "down" && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
    }
  };

  // ==================== QUIZ QUESTION MANAGEMENT ====================
  const addQuizQuestion = () => {
    setQuizQuestions([
      ...quizQuestions,
      {
        id: `q-${Date.now()}`,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        points: 10,
        explanation: "",
      }
    ]);
  };

  const updateQuizQuestion = (id: string, field: keyof QuizQuestion, value: any) => {
    setQuizQuestions(quizQuestions.map(q =>
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const updateQuizOption = (questionId: string, optionIndex: number, value: string) => {
    setQuizQuestions(quizQuestions.map(q => {
      if (q.id === questionId) {
        const newOptions = [...q.options];
        newOptions[optionIndex] = value;
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const deleteQuizQuestion = (id: string) => {
    setQuizQuestions(quizQuestions.filter(q => q.id !== id));
  };

  const moveQuizQuestion = (id: string, direction: "up" | "down") => {
    const index = quizQuestions.findIndex(q => q.id === id);
    if (direction === "up" && index > 0) {
      const newQuestions = [...quizQuestions];
      [newQuestions[index - 1], newQuestions[index]] = [newQuestions[index], newQuestions[index - 1]];
      setQuizQuestions(newQuestions);
    } else if (direction === "down" && index < quizQuestions.length - 1) {
      const newQuestions = [...quizQuestions];
      [newQuestions[index], newQuestions[index + 1]] = [newQuestions[index + 1], newQuestions[index]];
      setQuizQuestions(newQuestions);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/courses">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Courses
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-bold">Lesson Editor</h1>
                <p className="text-sm text-muted-foreground">{title || "New Lesson"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">Preview</Button>
              <Button
                onClick={handleSave}
                disabled={isSaving}
                className="text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                {isSaving ? (
                  <>Saving...</>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Lesson
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Alerts */}
      {error && (
        <div className="max-w-4xl mx-auto px-6 pt-4">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <p className="text-red-700 dark:text-red-400">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="max-w-4xl mx-auto px-6 pt-4">
          <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <p className="text-green-700 dark:text-green-400">{success}</p>
          </div>
        </div>
      )}

      <main className="max-w-4xl mx-auto px-6 py-8">
        {/* Lesson Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="font-semibold mb-4">Lesson Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter lesson title"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              >
                <option value="text">Text Lesson</option>
                <option value="video">Video Lesson</option>
                <option value="code">Code Exercise</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Estimated Duration (minutes)</label>
              <Input
                type="number"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                min={1}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <button
                onClick={() => setIsPublished(!isPublished)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  isPublished
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                }`}
              >
                {isPublished ? "Published" : "Draft"}
              </button>
            </div>
          </div>

          {type === 'video' && (
            <div className="mt-4">
              <label className="text-sm font-medium mb-1 block">Video URL</label>
              <Input
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          )}
        </div>

        {/* Upload Tools Section */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="font-semibold mb-4">Quick Import Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Word Document Upload */}
            <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${THEME_PRIMARY}20` }}>
                  <FileText className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
                </div>
                <div>
                  <h3 className="font-medium">Import Word Document</h3>
                  <p className="text-xs text-muted-foreground">Upload a .docx file to import content</p>
                </div>
              </div>
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".docx,.txt"
                    onChange={handleWordUpload}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </span>
                  </Button>
                </label>
                <Button variant="ghost" size="sm" onClick={downloadCourseTemplate}>
                  <Download className="w-4 h-4 mr-2" />
                  Template
                </Button>
              </div>
            </div>

            {/* Excel Quiz Upload */}
            <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                  <FileSpreadsheet className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-medium">Import Quiz Questions</h3>
                  <p className="text-xs text-muted-foreground">Upload Excel with questions & answers</p>
                </div>
              </div>
              <div className="flex gap-2">
                <label className="flex-1">
                  <input
                    type="file"
                    accept=".xlsx,.xls"
                    onChange={handleExcelUpload}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload .xlsx
                    </span>
                  </Button>
                </label>
                <Button variant="ghost" size="sm" onClick={downloadQuizTemplate}>
                  <Download className="w-4 h-4 mr-2" />
                  Template
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiz Questions Editor */}
        {type === "quiz" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Quiz Questions ({quizQuestions.length})</h2>
              <Button onClick={addQuizQuestion} size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Question
              </Button>
            </div>

            {quizQuestions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p className="mb-2">No quiz questions yet</p>
                <p className="text-sm">Upload an Excel file or add questions manually</p>
              </div>
            ) : (
              <div className="space-y-6">
                {quizQuestions.map((question, qIndex) => (
                  <div key={question.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-sm font-medium px-2 py-1 rounded" style={{ backgroundColor: `${THEME_PRIMARY}20`, color: THEME_PRIMARY }}>
                        Question {qIndex + 1}
                      </span>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveQuizQuestion(question.id, "up")}
                          disabled={qIndex === 0}
                        >
                          <ChevronUp className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveQuizQuestion(question.id, "down")}
                          disabled={qIndex === quizQuestions.length - 1}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => deleteQuizQuestion(question.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Question</label>
                        <Textarea
                          value={question.question}
                          onChange={(e) => updateQuizQuestion(question.id, "question", e.target.value)}
                          placeholder="Enter your question..."
                          rows={2}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        {question.options.map((option, optIndex) => (
                          <div key={optIndex} className="relative">
                            <label className="text-sm font-medium mb-1 block">
                              Option {String.fromCharCode(65 + optIndex)}
                              {question.correctAnswer === optIndex && (
                                <span className="ml-2 text-green-600 text-xs">(Correct)</span>
                              )}
                            </label>
                            <div className="flex gap-2">
                              <Input
                                value={option}
                                onChange={(e) => updateQuizOption(question.id, optIndex, e.target.value)}
                                placeholder={`Option ${String.fromCharCode(65 + optIndex)}`}
                                className={question.correctAnswer === optIndex ? "border-green-500" : ""}
                              />
                              <Button
                                type="button"
                                variant={question.correctAnswer === optIndex ? "default" : "outline"}
                                size="sm"
                                onClick={() => updateQuizQuestion(question.id, "correctAnswer", optIndex)}
                                className={question.correctAnswer === optIndex ? "bg-green-600 hover:bg-green-700" : ""}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-1 block">Points</label>
                          <Input
                            type="number"
                            value={question.points}
                            onChange={(e) => updateQuizQuestion(question.id, "points", Number(e.target.value))}
                            min={1}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-1 block">Explanation (shown after answer)</label>
                          <Input
                            value={question.explanation}
                            onChange={(e) => updateQuizQuestion(question.id, "explanation", e.target.value)}
                            placeholder="Why this answer is correct..."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rich Text Content Editor */}
        {type !== "quiz" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 mb-6">
            <h2 className="font-semibold mb-4">Lesson Content</h2>
            <RichTextEditor
              content={content}
              onChange={setContent}
              placeholder="Start writing your lesson content..."
            />
          </div>
        )}

        {/* Content Blocks (Alternative Editor) */}
        {type !== "quiz" && (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Content Blocks</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => addBlock('heading')}>
                  + Heading
                </Button>
                <Button variant="outline" size="sm" onClick={() => addBlock('text')}>
                  + Text
                </Button>
                <Button variant="outline" size="sm" onClick={() => addBlock('code')}>
                  + Code
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div key={block.id} className="border border-slate-200 dark:border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      {block.type}
                    </span>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveBlock(block.id, 'up')}
                        disabled={index === 0}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveBlock(block.id, 'down')}
                        disabled={index === blocks.length - 1}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600"
                        onClick={() => deleteBlock(block.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {block.type === 'heading' ? (
                    <Input
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      placeholder="Enter heading..."
                      className="font-semibold text-lg"
                    />
                  ) : block.type === 'code' ? (
                    <Textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      placeholder="// Enter code here..."
                      className="font-mono text-sm"
                      rows={6}
                    />
                  ) : (
                    <Textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      placeholder="Enter text content..."
                      rows={4}
                    />
                  )}
                </div>
              ))}

              {blocks.length === 0 && (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                  <p>No content blocks yet. Add a heading, text, or code block to get started.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
