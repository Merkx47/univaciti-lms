import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  ArrowLeft, Check, X, ChevronLeft, ChevronRight, Clock,
  AlertCircle, Trophy, RotateCcw, CheckCircle2, XCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const THEME_PRIMARY = "#1E9AD6";

interface Question {
  id: number;
  question: string;
  questionType: string;
  options: string[];
  points: number;
  explanation?: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  passingScore: number;
  timeLimit: number;
  questions: Question[];
}

interface AnswerResult {
  questionId: number;
  correct: boolean;
  correctAnswer: string;
  userAnswer: string;
}

export default function QuizPage() {
  const { quizId } = useParams<{ quizId: string }>();
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [startTime] = useState(Date.now());

  const { data: quiz, isLoading } = useQuery<Quiz>({
    queryKey: [`/api/quizzes/${quizId}`],
    enabled: !!quizId,
  });

  const submitMutation = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/quizzes/${quizId}/submit`, {
        answers,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
      });
      return res.json();
    },
    onSuccess: (data) => {
      setSubmitted(true);
      setResults(data);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to submit quiz", variant: "destructive" });
    },
  });

  // Timer
  useEffect(() => {
    if (quiz?.timeLimit && !submitted) {
      setTimeLeft(quiz.timeLimit * 60); // Convert minutes to seconds
    }
  }, [quiz, submitted]);

  useEffect(() => {
    if (timeLeft === null || submitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) {
          clearInterval(timer);
          if (prev === 0) {
            submitMutation.mutate();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, submitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <p>Quiz not found</p>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  // Results view
  if (submitted && results) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl text-center">
            {results.passed ? (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Trophy className="w-12 h-12 text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-green-600 mb-2">Congratulations!</h1>
                <p className="text-muted-foreground mb-6">You passed the quiz!</p>
              </>
            ) : (
              <>
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">Keep Trying!</h1>
                <p className="text-muted-foreground mb-6">You didn't pass this time, but you can try again!</p>
              </>
            )}

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold" style={{ color: THEME_PRIMARY }}>{results.score}</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold" style={{ color: THEME_PRIMARY }}>{results.percentage}%</div>
                <div className="text-sm text-muted-foreground">Percentage</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
                <div className="text-3xl font-bold" style={{ color: THEME_PRIMARY }}>{results.correctAnswers}/{results.totalQuestions}</div>
                <div className="text-sm text-muted-foreground">Correct</div>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              {!results.passed && (
                <Button
                  size="lg"
                  className="text-white"
                  style={{ backgroundColor: THEME_PRIMARY }}
                  onClick={() => window.location.reload()}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to leave? Your progress will be lost.")) {
                  setLocation("/dashboard");
                }
              }}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-bold">{quiz.title}</h1>
              <p className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </p>
            </div>
          </div>
          {timeLeft !== null && (
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              timeLeft < 60 ? "bg-red-100 text-red-600" : "bg-slate-100 dark:bg-slate-700"
            }`}>
              <Clock className="w-4 h-4" />
              <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
            </div>
          )}
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-2">
        <div className="max-w-4xl mx-auto">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg">
          {/* Question Number & Points */}
          <div className="flex items-center justify-between mb-6">
            <span className="px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: `${THEME_PRIMARY}20`, color: THEME_PRIMARY }}>
              Question {currentQuestionIndex + 1}
            </span>
            <span className="text-sm text-muted-foreground">
              {currentQuestion.points} point{currentQuestion.points > 1 ? "s" : ""}
            </span>
          </div>

          {/* Question Text */}
          <h2 className="text-xl font-semibold mb-8">{currentQuestion.question}</h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option;
              const optionLetter = String.fromCharCode(65 + index); // A, B, C, D...

              return (
                <button
                  key={index}
                  onClick={() => setAnswers({ ...answers, [currentQuestion.id]: option })}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                    isSelected
                      ? "border-primary bg-primary/5"
                      : "border-slate-200 dark:border-slate-700 hover:border-primary/50"
                  }`}
                >
                  <span
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      isSelected
                        ? "text-white"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                    style={isSelected ? { backgroundColor: THEME_PRIMARY } : {}}
                  >
                    {optionLetter}
                  </span>
                  <span className="flex-1">{option}</span>
                  {isSelected && (
                    <Check className="w-5 h-5" style={{ color: THEME_PRIMARY }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-lg">
          <p className="text-sm text-muted-foreground mb-3">Quick Navigation</p>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    isCurrent
                      ? "text-white"
                      : isAnswered
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                  }`}
                  style={isCurrent ? { backgroundColor: THEME_PRIMARY } : {}}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
            disabled={currentQuestionIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <div className="text-sm text-muted-foreground">
            {answeredCount} of {quiz.questions.length} answered
          </div>

          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <Button
              onClick={() => {
                if (answeredCount < quiz.questions.length) {
                  if (!confirm(`You have ${quiz.questions.length - answeredCount} unanswered questions. Submit anyway?`)) {
                    return;
                  }
                }
                submitMutation.mutate();
              }}
              disabled={submitMutation.isPending}
              className="text-white"
              style={{ backgroundColor: THEME_PRIMARY }}
            >
              {submitMutation.isPending ? "Submitting..." : "Submit Quiz"}
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestionIndex(Math.min(quiz.questions.length - 1, currentQuestionIndex + 1))}
              className="text-white"
              style={{ backgroundColor: THEME_PRIMARY }}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
