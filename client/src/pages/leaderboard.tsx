import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  Trophy, Medal, Crown, Flame, Target, Zap, Star, ChevronRight,
  ArrowLeft, Users, Calendar, TrendingUp
} from "lucide-react";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

interface LeaderboardEntry {
  rank: number;
  userId: number;
  username: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  totalPoints: number;
  coursesCompleted: number;
  currentStreak: number;
  badges: number;
}

const rankIcons = [Crown, Medal, Medal];
const rankColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState<"weekly" | "monthly" | "alltime">("weekly");
  const [category, setCategory] = useState<"points" | "courses" | "streak">("points");

  const { data: leaderboard, isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard", timeframe, category],
    queryFn: async () => {
      const res = await fetch(`/api/leaderboard?timeframe=${timeframe}&category=${category}`);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      return res.json();
    },
  });

  const { data: currentUser } = useQuery<LeaderboardEntry>({
    queryKey: ["/api/leaderboard/me"],
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <button className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
            <div className="flex items-center gap-3">
              <img src={logoUrl} alt="Univaciti" className="h-8 w-8" />
              <span className="font-bold text-xl" style={{ color: THEME_PRIMARY }}>Leaderboard</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm">Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-8 h-8" />
              <span className="text-lg font-medium opacity-90">Top Performer</span>
            </div>
            {leaderboard?.[0] && (
              <div>
                <p className="text-2xl font-bold">
                  {leaderboard[0].firstName && leaderboard[0].lastName 
                    ? `${leaderboard[0].firstName} ${leaderboard[0].lastName}`
                    : leaderboard[0].username}
                </p>
                <p className="text-white/80">{leaderboard[0].totalPoints.toLocaleString()} points</p>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-8 h-8" />
              <span className="text-lg font-medium opacity-90">Longest Streak</span>
            </div>
            <p className="text-2xl font-bold">21 Days</p>
            <p className="text-white/80">@toplearner</p>
          </div>

          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8" />
              <span className="text-lg font-medium opacity-90">Active Learners</span>
            </div>
            <p className="text-2xl font-bold">{leaderboard?.length || 0}</p>
            <p className="text-white/80">This {timeframe}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            {(["weekly", "monthly", "alltime"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  timeframe === t
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                style={timeframe === t ? { backgroundColor: THEME_PRIMARY } : {}}
              >
                {t === "weekly" ? "This Week" : t === "monthly" ? "This Month" : "All Time"}
              </button>
            ))}
          </div>

          <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
            {([
              { value: "points", label: "Points", icon: Star },
              { value: "courses", label: "Courses", icon: Target },
              { value: "streak", label: "Streak", icon: Flame },
            ] as const).map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setCategory(value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  category === value
                    ? "text-white"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                }`}
                style={category === value ? { backgroundColor: THEME_PRIMARY } : {}}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Your Rank Card */}
        {currentUser && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed mb-8 overflow-hidden" style={{ borderColor: THEME_PRIMARY }}>
            <div className="p-6 flex items-center gap-6">
              <div className="text-3xl font-bold" style={{ color: THEME_PRIMARY }}>
                #{currentUser.rank}
              </div>
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{ backgroundColor: THEME_PRIMARY }}>
                {currentUser.firstName?.[0] || currentUser.username[0].toUpperCase()}
              </div>
              <div className="flex-1">
                <p className="font-bold text-lg">
                  {currentUser.firstName && currentUser.lastName
                    ? `${currentUser.firstName} ${currentUser.lastName}`
                    : currentUser.username}
                </p>
                <p className="text-sm text-muted-foreground">Your current ranking</p>
              </div>
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <p className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>{currentUser.totalPoints.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Points</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">{currentUser.coursesCompleted}</p>
                  <p className="text-xs text-muted-foreground">Courses</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-500">{currentUser.currentStreak}</p>
                  <p className="text-xs text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6" style={{ color: THEME_PRIMARY }} />
              Top Learners
            </h2>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">Loading leaderboard...</div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {/* Top 3 Podium */}
              {leaderboard?.slice(0, 3).map((entry, index) => {
                const RankIcon = rankIcons[index];
                const rankColor = rankColors[index];

                return (
                  <div 
                    key={entry.userId}
                    className={`flex items-center gap-4 p-6 ${
                      index === 0 ? "bg-amber-50/50 dark:bg-amber-900/10" : ""
                    }`}
                  >
                    <div className="w-12 flex justify-center">
                      <RankIcon className="w-8 h-8" style={{ color: rankColor }} />
                    </div>
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                      style={{ backgroundColor: THEME_PRIMARY }}
                    >
                      {entry.firstName?.[0] || entry.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold">
                        {entry.firstName && entry.lastName
                          ? `${entry.firstName} ${entry.lastName}`
                          : entry.username}
                      </p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Target className="w-3 h-3" />
                          {entry.coursesCompleted} courses
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {entry.currentStreak} day streak
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>
                        {entry.totalPoints.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                );
              })}

              {/* Rest of the leaderboard */}
              {leaderboard?.slice(3).map((entry) => (
                <div key={entry.userId} className="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <div className="w-12 text-center font-bold text-lg text-muted-foreground">
                    {entry.rank}
                  </div>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: THEME_PRIMARY }}
                  >
                    {entry.firstName?.[0] || entry.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">
                      {entry.firstName && entry.lastName
                        ? `${entry.firstName} ${entry.lastName}`
                        : entry.username}
                    </p>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-muted-foreground">{entry.coursesCompleted} courses</span>
                    <span className="flex items-center gap-1 text-orange-500">
                      <Flame className="w-4 h-4" />
                      {entry.currentStreak}
                    </span>
                    <span className="font-bold" style={{ color: THEME_PRIMARY }}>
                      {entry.totalPoints.toLocaleString()} pts
                    </span>
                  </div>
                </div>
              ))}

              {(!leaderboard || leaderboard.length === 0) && (
                <div className="p-12 text-center text-muted-foreground">
                  No rankings yet. Start learning to appear on the leaderboard!
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
