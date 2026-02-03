import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  ArrowLeft, Save, Eye, Plus, Trash2, GripVertical,
  Type, Heading1, Code, Image, Video, AlertCircle,
  Loader2, Check, Minus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const THEME_PRIMARY = "#1E9AD6";

interface ContentBlock {
  id: string;
  type: 'text' | 'heading' | 'code' | 'image' | 'video' | 'callout' | 'divider';
  content?: string;
  language?: string;
  url?: string;
  caption?: string;
  level?: number;
  variant?: 'info' | 'warning' | 'tip' | 'danger';
}

const blockTypes = [
  { type: 'text', icon: Type, label: 'Text Block' },
  { type: 'heading', icon: Heading1, label: 'Heading' },
  { type: 'code', icon: Code, label: 'Code Block' },
  { type: 'image', icon: Image, label: 'Image' },
  { type: 'video', icon: Video, label: 'Video' },
  { type: 'callout', icon: AlertCircle, label: 'Callout' },
  { type: 'divider', icon: Minus, label: 'Divider' },
];

const codeLanguages = [
  'javascript', 'typescript', 'python', 'java', 'go', 'rust',
  'sql', 'bash', 'json', 'html', 'css', 'yaml'
];

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function LessonEditor() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [videoUrl, setVideoUrl] = useState("");
  const [estimatedMinutes, setEstimatedMinutes] = useState(10);
  const [isPublished, setIsPublished] = useState(false);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [saving, setSaving] = useState(false);

  const { data: lesson, isLoading } = useQuery<any>({
    queryKey: [`/api/lessons/${id}`],
    enabled: !!id,
  });

  useEffect(() => {
    if (lesson) {
      setTitle(lesson.title);
      setType(lesson.type);
      setVideoUrl(lesson.videoUrl || "");
      setEstimatedMinutes(lesson.estimatedMinutes || 10);
      setIsPublished(lesson.isPublished);
      setBlocks(lesson.content?.blocks || []);
    }
  }, [lesson]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("PATCH", `/api/admin/lessons/${id}`, {
        title,
        type,
        videoUrl: videoUrl || null,
        estimatedMinutes,
        isPublished,
        content: { blocks },
      });
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Saved!", description: "Lesson updated successfully" });
      queryClient.invalidateQueries({ queryKey: [`/api/lessons/${id}`] });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to save lesson", variant: "destructive" });
    },
  });

  const addBlock = (blockType: string) => {
    const newBlock: ContentBlock = {
      id: generateId(),
      type: blockType as ContentBlock['type'],
      content: "",
    };
    
    if (blockType === 'heading') newBlock.level = 2;
    if (blockType === 'code') newBlock.language = 'javascript';
    if (blockType === 'callout') newBlock.variant = 'info';
    
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const newBlocks = [...blocks];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    [newBlocks[index], newBlocks[newIndex]] = [newBlocks[newIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold">Lesson Editor</h1>
                <p className="text-sm text-muted-foreground">Edit lesson content</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded"
                />
                Published
              </label>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                size="sm"
                onClick={() => saveMutation.mutate()}
                disabled={saveMutation.isPending}
                className="text-white"
                style={{ backgroundColor: THEME_PRIMARY }}
              >
                {saveMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Lesson Settings */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 mb-6">
          <h2 className="text-lg font-bold mb-4">Lesson Settings</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lesson title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg"
              >
                <option value="text">Text</option>
                <option value="video">Video</option>
                <option value="code">Code</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
              </select>
            </div>
            {type === 'video' && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Video URL</label>
                <Input
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or Vimeo URL"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium mb-2">Estimated Duration (minutes)</label>
              <Input
                type="number"
                value={estimatedMinutes}
                onChange={(e) => setEstimatedMinutes(Number(e.target.value))}
                min={1}
              />
            </div>
          </div>
        </div>

        {/* Content Blocks */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Content</h2>
          </div>

          {/* Blocks */}
          <div className="space-y-4 mb-6">
            {blocks.map((block, index) => (
              <div
                key={block.id}
                className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden"
              >
                {/* Block Header */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  <span className="text-sm font-medium capitalize">{block.type}</span>
                  
                  {block.type === 'heading' && (
                    <select
                      value={block.level || 2}
                      onChange={(e) => updateBlock(block.id, { level: Number(e.target.value) })}
                      className="ml-2 text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded"
                    >
                      <option value={1}>H1</option>
                      <option value={2}>H2</option>
                      <option value={3}>H3</option>
                      <option value={4}>H4</option>
                    </select>
                  )}
                  
                  {block.type === 'code' && (
                    <select
                      value={block.language || 'javascript'}
                      onChange={(e) => updateBlock(block.id, { language: e.target.value })}
                      className="ml-2 text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded"
                    >
                      {codeLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  )}
                  
                  {block.type === 'callout' && (
                    <select
                      value={block.variant || 'info'}
                      onChange={(e) => updateBlock(block.id, { variant: e.target.value as ContentBlock['variant'] })}
                      className="ml-2 text-xs px-2 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded"
                    >
                      <option value="info">Info</option>
                      <option value="tip">Tip</option>
                      <option value="warning">Warning</option>
                      <option value="danger">Danger</option>
                    </select>
                  )}
                  
                  <div className="flex-1" />
                  
                  <button
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                    onClick={() => moveBlock(index, 'up')}
                    disabled={index === 0}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                  <button
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded"
                    onClick={() => moveBlock(index, 'down')}
                    disabled={index === blocks.length - 1}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <button
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500"
                    onClick={() => deleteBlock(block.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Block Content */}
                <div className="p-3">
                  {block.type === 'divider' ? (
                    <hr className="border-slate-300 dark:border-slate-600" />
                  ) : block.type === 'image' || block.type === 'video' ? (
                    <div className="space-y-2">
                      <Input
                        value={block.url || ''}
                        onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                        placeholder={block.type === 'image' ? "Image URL..." : "Video URL..."}
                      />
                      <Input
                        value={block.caption || ''}
                        onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                        placeholder="Caption (optional)"
                      />
                      {block.url && block.type === 'image' && (
                        <img src={block.url} alt={block.caption || ''} className="max-h-48 rounded-lg" />
                      )}
                    </div>
                  ) : block.type === 'code' ? (
                    <textarea
                      value={block.content || ''}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      placeholder="// Enter your code here..."
                      className="w-full min-h-32 px-3 py-2 bg-slate-900 text-green-400 font-mono text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <textarea
                      value={block.content || ''}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      placeholder="Enter content..."
                      className="w-full min-h-24 px-3 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Block Buttons */}
          <div className="flex flex-wrap gap-2">
            {blockTypes.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => addBlock(type)}
                className="flex items-center gap-2 px-3 py-2 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-primary hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors text-sm"
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
