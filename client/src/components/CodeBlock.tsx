import { useState } from 'react';
import { Check, Copy, Play, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  showRunButton?: boolean;
  onRun?: (code: string) => void;
  className?: string;
}

const THEME_PRIMARY = "#1E9AD6";

// Language-specific syntax highlighting colors
const languageColors: Record<string, Record<string, string>> = {
  default: {
    keyword: 'text-purple-400',
    string: 'text-green-400',
    comment: 'text-slate-500',
    function: 'text-yellow-400',
    number: 'text-orange-400',
    operator: 'text-cyan-400',
    variable: 'text-blue-400',
  },
};

// Simple syntax highlighting
const highlightCode = (code: string, language?: string): string => {
  if (!language) return code;

  let highlighted = code;

  // Escape HTML
  highlighted = highlighted
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Comments
  highlighted = highlighted.replace(
    /(\/\/.*$|#.*$|\/\*[\s\S]*?\*\/)/gm,
    '<span class="text-slate-500 italic">$1</span>'
  );

  // Strings
  highlighted = highlighted.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span class="text-green-400">$1</span>'
  );

  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'class', 'extends', 'new', 'this', 'async', 'await', 'try', 'catch', 'throw', 'public', 'private', 'protected', 'static', 'void', 'int', 'string', 'boolean', 'interface', 'type', 'enum', 'SELECT', 'FROM', 'WHERE', 'JOIN', 'GROUP', 'BY', 'ORDER', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'DROP', 'TABLE', 'def', 'class', 'import', 'from', 'as', 'True', 'False', 'None', 'and', 'or', 'not', 'in', 'is', 'resource', 'provider', 'module', 'variable', 'output', 'terraform', 'aws', 'locals'];
  const keywordRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'g');
  highlighted = highlighted.replace(
    keywordRegex,
    '<span class="text-purple-400 font-semibold">$1</span>'
  );

  // Numbers
  highlighted = highlighted.replace(
    /\b(\d+\.?\d*)\b/g,
    '<span class="text-orange-400">$1</span>'
  );

  // Functions
  highlighted = highlighted.replace(
    /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g,
    '<span class="text-yellow-400">$1</span>('
  );

  return highlighted;
};

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = true,
  showCopyButton = true,
  showRunButton = false,
  onRun,
  className = '',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleRun = () => {
    if (onRun) {
      setIsRunning(true);
      onRun(code);
      setTimeout(() => setIsRunning(false), 1000);
    }
  };

  const lines = code.split('\n');
  const highlightedCode = highlightCode(code, language);

  return (
    <div className={`relative group rounded-lg overflow-hidden bg-slate-900 border border-slate-700 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex items-center gap-2">
          {/* Traffic light dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          {filename && (
            <span className="ml-3 text-sm text-slate-400 font-mono">{filename}</span>
          )}
          {language && !filename && (
            <span className="ml-3 text-xs text-slate-500 uppercase tracking-wider">{language}</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {showRunButton && onRun && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRun}
              disabled={isRunning}
              className="h-7 px-2 text-slate-400 hover:text-white hover:bg-slate-700"
            >
              {isRunning ? (
                <span className="flex items-center gap-1">
                  <span className="animate-spin">⏳</span>
                  Running...
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Play className="w-3 h-3" />
                  Run
                </span>
              )}
            </Button>
          )}
          {showCopyButton && (
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCopy}
              className="h-7 px-2 text-slate-400 hover:text-white hover:bg-slate-700 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {copied ? (
                <span className="flex items-center gap-1 text-green-400">
                  <Check className="w-3 h-3" />
                  Copied!
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Copy className="w-3 h-3" />
                  Copy
                </span>
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          {showLineNumbers ? (
            <div className="flex">
              <div className="pr-4 text-right text-slate-600 select-none border-r border-slate-700 mr-4">
                {lines.map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <code
                className="text-slate-300"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>
          ) : (
            <code
              className="text-slate-300"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
          )}
        </pre>
      </div>
    </div>
  );
}

// Parse HTML content and extract code blocks for enhancement
export function parseAndEnhanceCodeBlocks(htmlContent: string): string {
  // This function can be used to enhance existing HTML content with better code blocks
  // For now, we'll add a data attribute that the course player can detect
  return htmlContent.replace(
    /<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    (match, attrs, code) => {
      const languageMatch = attrs.match(/class="language-(\w+)"/);
      const language = languageMatch ? languageMatch[1] : 'plaintext';
      return `<div data-code-block="true" data-language="${language}">${match}</div>`;
    }
  );
}
