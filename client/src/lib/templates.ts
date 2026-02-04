/**
 * Templates utility for generating downloadable templates and parsing uploaded files
 * Supports Excel templates for quizzes and Word templates for course content
 */

import * as XLSX from 'xlsx';

// ==================== QUIZ TEMPLATE ====================

export interface QuizQuestion {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  points?: number;
}

export interface ParsedQuiz {
  questions: QuizQuestion[];
  errors: string[];
}

/**
 * Generate and download Excel template for quiz questions
 */
export function downloadQuizTemplate(): void {
  // Create sample data with headers and examples
  const data = [
    ['Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Answer', 'Explanation (Optional)', 'Points (Optional)'],
    ['What is the capital of Nigeria?', 'Lagos', 'Abuja', 'Kano', 'Port Harcourt', 'B', 'Abuja became the capital in 1991', '10'],
    ['Which protocol is used for secure web browsing?', 'HTTP', 'FTP', 'HTTPS', 'SMTP', 'C', 'HTTPS uses SSL/TLS encryption', '10'],
    ['What does CPU stand for?', 'Computer Processing Unit', 'Central Processing Unit', 'Core Processing Unit', 'Central Program Unit', 'B', 'The CPU is the brain of the computer', '10'],
    ['', '', '', '', '', '', '', ''],
    ['INSTRUCTIONS:', '', '', '', '', '', '', ''],
    ['1. Fill in your questions starting from row 2', '', '', '', '', '', '', ''],
    ['2. Options A-D are required for each question', '', '', '', '', '', '', ''],
    ['3. Correct Answer must be A, B, C, or D', '', '', '', '', '', '', ''],
    ['4. Explanation and Points are optional', '', '', '', '', '', '', ''],
    ['5. Delete these instruction rows before uploading', '', '', '', '', '', '', ''],
  ];

  // Create workbook and worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Set column widths
  ws['!cols'] = [
    { wch: 50 }, // Question
    { wch: 25 }, // Option A
    { wch: 25 }, // Option B
    { wch: 25 }, // Option C
    { wch: 25 }, // Option D
    { wch: 15 }, // Correct Answer
    { wch: 40 }, // Explanation
    { wch: 10 }, // Points
  ];

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Quiz Questions');

  // Download the file
  XLSX.writeFile(wb, 'quiz_template.xlsx');
}

/**
 * Parse uploaded Excel file for quiz questions
 */
export function parseQuizExcel(file: File): Promise<ParsedQuiz> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get first sheet
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convert to JSON
        const rows: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        const questions: QuizQuestion[] = [];
        const errors: string[] = [];

        // Skip header row, process data rows
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];

          // Skip empty rows or instruction rows
          if (!row || !row[0] || row[0].toString().startsWith('INSTRUCTIONS')) {
            continue;
          }

          const question = row[0]?.toString().trim();
          const optionA = row[1]?.toString().trim();
          const optionB = row[2]?.toString().trim();
          const optionC = row[3]?.toString().trim();
          const optionD = row[4]?.toString().trim();
          const correctAnswer = row[5]?.toString().trim().toUpperCase();
          const explanation = row[6]?.toString().trim() || '';
          const points = parseInt(row[7]?.toString()) || 10;

          // Validate
          if (!question || !optionA || !optionB || !optionC || !optionD) {
            errors.push(`Row ${i + 1}: Missing question or options`);
            continue;
          }

          if (!['A', 'B', 'C', 'D'].includes(correctAnswer)) {
            errors.push(`Row ${i + 1}: Invalid correct answer "${correctAnswer}" (must be A, B, C, or D)`);
            continue;
          }

          questions.push({
            question,
            optionA,
            optionB,
            optionC,
            optionD,
            correctAnswer: correctAnswer as 'A' | 'B' | 'C' | 'D',
            explanation,
            points,
          });
        }

        resolve({ questions, errors });
      } catch (err) {
        reject(new Error('Failed to parse Excel file: ' + (err as Error).message));
      }
    };

    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Auto-grade quiz answers
 */
export function gradeQuiz(
  questions: QuizQuestion[],
  answers: Record<number, string>
): { score: number; total: number; percentage: number; results: { questionIndex: number; correct: boolean; userAnswer: string; correctAnswer: string }[] } {
  let score = 0;
  let total = 0;
  const results: { questionIndex: number; correct: boolean; userAnswer: string; correctAnswer: string }[] = [];

  questions.forEach((q, index) => {
    const userAnswer = answers[index]?.toUpperCase() || '';
    const isCorrect = userAnswer === q.correctAnswer;

    if (isCorrect) {
      score += q.points || 10;
    }
    total += q.points || 10;

    results.push({
      questionIndex: index,
      correct: isCorrect,
      userAnswer,
      correctAnswer: q.correctAnswer,
    });
  });

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;

  return { score, total, percentage, results };
}

// ==================== COURSE CONTENT TEMPLATE ====================

export interface ParsedCourseContent {
  title: string;
  sections: {
    type: 'heading' | 'paragraph' | 'list' | 'code' | 'image';
    level?: number;
    content: string;
    items?: string[];
    imageUrl?: string;
  }[];
  errors: string[];
}

/**
 * Generate and download Word template for course content
 */
export function downloadCourseTemplate(): void {
  const content = `UNIVACITI COURSE CONTENT TEMPLATE
================================

INSTRUCTIONS:
-------------
Use this template to structure your course content. Follow the formatting guidelines below:

1. HEADINGS
   - Use "# Title" for main headings (H1)
   - Use "## Subtitle" for subheadings (H2)
   - Use "### Section" for sub-sections (H3)

2. PARAGRAPHS
   - Write normal text without any special formatting
   - Leave a blank line between paragraphs

3. BULLET LISTS
   - Start each item with "- " or "* "
   - Keep items on consecutive lines

4. NUMBERED LISTS
   - Start each item with "1. ", "2. ", etc.
   - Keep items on consecutive lines

5. CODE BLOCKS
   - Wrap code with triple backticks: \`\`\`
   - Example:
   \`\`\`
   function hello() {
     console.log("Hello, World!");
   }
   \`\`\`

6. IMAGES
   - Use the format: [IMAGE: description of image]
   - Upload images separately in the lesson editor

================================
START YOUR CONTENT BELOW THIS LINE
================================

# Introduction to Cloud Computing

Cloud computing is the delivery of computing services over the internet. This includes servers, storage, databases, networking, software, and analytics.

## What is Cloud Computing?

Cloud computing allows companies to avoid upfront infrastructure costs and focus on their core business instead of spending time and money on computer infrastructure.

### Key Benefits

- Cost Efficiency: Pay only for what you use
- Scalability: Easily scale resources up or down
- Reliability: Data backup and disaster recovery
- Security: Broad set of security policies and technologies

### Types of Cloud Services

1. Infrastructure as a Service (IaaS)
2. Platform as a Service (PaaS)
3. Software as a Service (SaaS)

## Getting Started with AWS

AWS (Amazon Web Services) is the world's most comprehensive cloud platform.

### Basic AWS Services

- EC2: Virtual servers in the cloud
- S3: Scalable storage in the cloud
- RDS: Managed relational database service
- Lambda: Run code without provisioning servers

\`\`\`
// Example: Creating an S3 bucket using AWS SDK
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const params = {
  Bucket: 'my-bucket-name',
  CreateBucketConfiguration: {
    LocationConstraint: 'us-west-2'
  }
};

s3.createBucket(params, (err, data) => {
  if (err) console.log(err, err.stack);
  else console.log('Bucket created:', data.Location);
});
\`\`\`

[IMAGE: AWS Console Dashboard showing main services]

## Summary

In this lesson, we covered:
- What cloud computing is and its benefits
- The main types of cloud services
- Introduction to AWS and its core services

### Next Steps

In the next lesson, we will dive deeper into AWS EC2 and learn how to launch your first virtual server.
`;

  // Create a blob and download
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'course_content_template.txt';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parse course content from text (from Word document or plain text)
 */
export function parseCourseContent(text: string): ParsedCourseContent {
  const lines = text.split('\n');
  const sections: ParsedCourseContent['sections'] = [];
  const errors: string[] = [];
  let title = '';
  let currentList: string[] = [];
  let listType: 'bullet' | 'numbered' | null = null;
  let inCodeBlock = false;
  let codeContent = '';

  const flushList = () => {
    if (currentList.length > 0) {
      sections.push({
        type: 'list',
        content: '',
        items: [...currentList],
      });
      currentList = [];
      listType = null;
    }
  };

  const flushCode = () => {
    if (codeContent) {
      sections.push({
        type: 'code',
        content: codeContent.trim(),
      });
      codeContent = '';
    }
    inCodeBlock = false;
  };

  for (const line of lines) {
    const trimmed = line.trim();

    // Skip template instructions
    if (trimmed.startsWith('UNIVACITI COURSE') ||
        trimmed.startsWith('INSTRUCTIONS:') ||
        trimmed.startsWith('================================') ||
        trimmed.startsWith('START YOUR CONTENT')) {
      continue;
    }

    // Handle code blocks
    if (trimmed.startsWith('```')) {
      if (inCodeBlock) {
        flushCode();
      } else {
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Handle headings
    if (trimmed.startsWith('###')) {
      flushList();
      const content = trimmed.replace(/^###\s*/, '');
      sections.push({ type: 'heading', level: 3, content });
      continue;
    }
    if (trimmed.startsWith('##')) {
      flushList();
      const content = trimmed.replace(/^##\s*/, '');
      sections.push({ type: 'heading', level: 2, content });
      continue;
    }
    if (trimmed.startsWith('#')) {
      flushList();
      const content = trimmed.replace(/^#\s*/, '');
      if (!title) title = content;
      sections.push({ type: 'heading', level: 1, content });
      continue;
    }

    // Handle images
    if (trimmed.startsWith('[IMAGE:')) {
      flushList();
      const description = trimmed.replace(/^\[IMAGE:\s*/, '').replace(/\]$/, '');
      sections.push({ type: 'image', content: description });
      continue;
    }

    // Handle bullet lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (listType !== 'bullet') {
        flushList();
        listType = 'bullet';
      }
      currentList.push(trimmed.replace(/^[-*]\s*/, ''));
      continue;
    }

    // Handle numbered lists
    if (/^\d+\.\s/.test(trimmed)) {
      if (listType !== 'numbered') {
        flushList();
        listType = 'numbered';
      }
      currentList.push(trimmed.replace(/^\d+\.\s*/, ''));
      continue;
    }

    // Handle paragraphs
    if (trimmed) {
      flushList();
      sections.push({ type: 'paragraph', content: trimmed });
    }
  }

  flushList();
  flushCode();

  return { title: title || 'Untitled', sections, errors };
}

/**
 * Convert parsed course content to HTML
 */
export function courseContentToHTML(content: ParsedCourseContent): string {
  let html = '';

  for (const section of content.sections) {
    switch (section.type) {
      case 'heading':
        html += `<h${section.level}>${section.content}</h${section.level}>\n`;
        break;
      case 'paragraph':
        html += `<p>${section.content}</p>\n`;
        break;
      case 'list':
        html += '<ul>\n';
        section.items?.forEach(item => {
          html += `  <li>${item}</li>\n`;
        });
        html += '</ul>\n';
        break;
      case 'code':
        html += `<pre><code>${section.content}</code></pre>\n`;
        break;
      case 'image':
        html += `<p><em>[Image placeholder: ${section.content}]</em></p>\n`;
        break;
    }
  }

  return html;
}
