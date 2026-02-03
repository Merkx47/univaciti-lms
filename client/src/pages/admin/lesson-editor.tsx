import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'code' | 'video';
  content: string;
  language?: string;
}

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const mockLessons: Record<string, any> = {
  "1": { id: 1, title: "Welcome & Course Overview", type: "video", videoUrl: "", estimatedMinutes: 10, isPublished: true, moduleId: 1 },
  "2": { id: 2, title: "Setting Up Your Environment", type: "text", estimatedMinutes: 15, isPublished: true, moduleId: 1 },
  "3": { id: 3, title: "First Hands-On Exercise", type: "code", estimatedMinutes: 20, isPublished: true, moduleId: 1 },
  "4": { id: 4, title: "Understanding Key Concepts", type: "text", estimatedMinutes: 20, isPublished: true, moduleId: 2 },
  "5": { id: 5, title: "Practical Application Demo", type: "video", videoUrl: "", estimatedMinutes: 25, isPublished: true, moduleId: 2 },
};

export default function LessonEditor() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [videoUrl, setVideoUrl] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(10);
  const [isPublished, setIsPublished] = useState(false);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id && mockLessons[id]) {
      const lesson = mockLessons[id];
      setTitle(lesson.title);
      setType(lesson.type);
      setVideoUrl(lesson.videoUrl || "");
      setEstimatedMinutes(lesson.estimatedMinutes || 10);
      setIsPublished(lesson.isPublished);
      setBlocks([
        { id: generateId(), type: 'heading', content: lesson.title },
        { id: generateId(), type: 'text', content: 'Enter your lesson content here. You can add multiple content blocks to structure your lesson.' },
      ]);
    }
  }, [id]);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Lesson saved successfully!");
    }, 500);
  };

  const addBlock = (blockType: ContentBlock['type']) => {
    setBlocks([...blocks, { id: generateId(), type: blockType, content: '' }]);
  };

  const updateBlock = (blockId: string, content: string) => {
    setBlocks(blocks.map(b => b.id === blockId ? { ...b, content } : b));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(b => b.id !== blockId));
  };

  const moveBlock = (blockId: string, direction: 'up' | 'down') => {
    const index = blocks.findIndex(b => b.id === blockId);
    if (direction === 'up' && index > 0) {
      const newBlocks = [...blocks];
      [newBlocks[index - 1], newBlocks[index]] = [newBlocks[index], newBlocks[index - 1]];
      setBlocks(newBlocks);
    } else if (direction === 'down' && index < blocks.length - 1) {
      const newBlocks = [...blocks];
      [newBlocks[index], newBlocks[index + 1]] = [newBlocks[index + 1], newBlocks[index]];
      setBlocks(newBlocks);
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
                <Button variant="ghost" size="sm">Back to Courses</Button>
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
                disabled={saving}
                className="text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                {saving ? "Saving..." : "Save Lesson"}
              </Button>
            </div>
          </div>
        </div>
      </header>

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

        {/* Content Blocks */}
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
                      Up
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => moveBlock(block.id, 'down')}
                      disabled={index === blocks.length - 1}
                    >
                      Down
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-600"
                      onClick={() => deleteBlock(block.id)}
                    >
                      Delete
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
              <div className="text-center py-12 text-muted-foreground">
                <p>No content blocks yet. Add a heading, text, or code block to get started.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
