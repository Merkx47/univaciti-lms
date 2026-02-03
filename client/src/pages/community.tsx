import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Sun, Moon, ArrowLeft, Calendar, Clock, Video, Users, Mic, MapPin } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import logoUrl from "@assets/logo_1769031259580.png";
import worldMapImg from "@assets/world_map.png";

const THEME_PRIMARY = "#1E9AD6";

function WorldMapWatermark() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <img
        src={worldMapImg}
        alt=""
        className="w-full h-full object-cover opacity-[0.12] dark:opacity-[0.15] dark:invert"
        style={{ filter: 'grayscale(100%)' }}
      />
    </div>
  );
}

function CommunityIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="40" cy="24" r="10"/>
      <circle cx="20" cy="38" r="8"/>
      <circle cx="60" cy="38" r="8"/>
      <path d="M28 58C28 50 33 44 40 44C47 44 52 50 52 58"/>
      <path d="M12 62C12 56 15 52 20 52C24 52 27 54 28 58"/>
      <path d="M68 62C68 56 65 52 60 52C56 52 53 54 52 58"/>
    </svg>
  );
}

const upcomingEvents = [
  {
    id: 1,
    title: "Cloud Architecture Masterclass",
    type: "Webinar",
    date: "Feb 15, 2026",
    time: "2:00 PM WAT",
    speaker: "Adewale Johnson",
    role: "Solutions Architect, AWS",
    attendees: 124,
    icon: Video,
  },
  {
    id: 2,
    title: "Career Panel: Breaking into Tech",
    type: "Panel Discussion",
    date: "Feb 22, 2026",
    time: "4:00 PM WAT",
    speaker: "Multiple Speakers",
    role: "Industry Professionals",
    attendees: 89,
    icon: Mic,
  },
  {
    id: 3,
    title: "Lagos Tech Meetup",
    type: "In-Person",
    date: "Mar 1, 2026",
    time: "6:00 PM WAT",
    location: "Yaba, Lagos",
    attendees: 45,
    icon: MapPin,
  },
  {
    id: 4,
    title: "React Best Practices Workshop",
    type: "Workshop",
    date: "Mar 8, 2026",
    time: "10:00 AM WAT",
    speaker: "Chioma Eze",
    role: "Frontend Lead, Paystack",
    attendees: 67,
    icon: Video,
  },
  {
    id: 5,
    title: "Data Analytics Q&A Session",
    type: "Live Q&A",
    date: "Mar 15, 2026",
    time: "3:00 PM WAT",
    speaker: "Olumide Adeyemi",
    role: "Data Engineer, Microsoft",
    attendees: 52,
    icon: Mic,
  },
  {
    id: 6,
    title: "Abuja Networking Event",
    type: "In-Person",
    date: "Mar 22, 2026",
    time: "5:00 PM WAT",
    location: "Wuse II, Abuja",
    attendees: 38,
    icon: MapPin,
  },
];

export default function CommunityPage() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

  const joinWaitlist = useMutation({
    mutationFn: async (email: string) => {
      return apiRequest("POST", "/api/waitlist", { email });
    },
    onSuccess: () => {
      toast({ title: "You're on the list!", description: "We'll notify you when Univaciti launches." });
      setEmail("");
    },
    onError: () => {
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    },
  });

  return (
    <div className="min-h-screen bg-background relative">
      <WorldMapWatermark />
      <nav className="frosted-nav border-b border-border/30 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.history.back()}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </button>
              <Link href="/" className="flex items-center gap-2">
                <img src={logoUrl} alt="Univaciti" className="h-9 w-9 rounded-full" />
                <span className="text-lg font-bold" style={{ color: THEME_PRIMARY }}>Univaciti</span>
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="text-slate-600 dark:text-slate-300"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Link href="/register">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm">Register</Button>
              </Link>
              <Link href="/login">
                <Button style={{ backgroundColor: THEME_PRIMARY }} size="sm">Sign in</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="text-center mb-10 fade-in-up">
          <div className="w-20 h-20 mx-auto mb-4 float" style={{ color: THEME_PRIMARY }}>
            <CommunityIcon className="w-full h-full" />
          </div>
          <h1 className="text-3xl font-light mb-3 gradient-text text-glow">
            COMMUNITY
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Connect with fellow learners, alumni, and industry professionals.
            Share knowledge, find mentors, and grow your network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="p-6 rounded-xl border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift shine-effect">
            <h2 className="text-xl font-semibold mb-4">Join Our Community</h2>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Peer-to-peer learning groups
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Industry mentorship programs
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Exclusive webinars and events
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Job referral network
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: THEME_PRIMARY }}></span>
                Career guidance and support
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift shine-effect">
            <h2 className="text-xl font-semibold mb-4">Alumni Network</h2>
            <p className="text-sm text-foreground/70 mb-4">
              Our alumni are working at top companies around the world.
              Join the network and benefit from their experience.
            </p>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>500+</div>
                <div className="text-xs text-foreground/60">Graduates</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>95%</div>
                <div className="text-xs text-foreground/60">Employed</div>
              </div>
              <div className="p-3 rounded-lg bg-muted/30">
                <div className="text-2xl font-bold" style={{ color: THEME_PRIMARY }}>50+</div>
                <div className="text-xs text-foreground/60">Companies</div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4 gradient-text">Upcoming Events</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {upcomingEvents.map((event, index) => (
            <div key={event.id} className={`p-4 rounded-lg border-2 border-gray-400 dark:border-slate-500 glass-card hover-lift cursor-pointer fade-in-up stagger-${(index % 6) + 1}`}>
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: THEME_PRIMARY }}>
                  {event.type}
                </span>
                <event.icon className="w-4 h-4 text-foreground/50" />
              </div>
              <h3 className="font-semibold text-sm mb-2">{event.title}</h3>
              <div className="space-y-1 text-xs text-foreground/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  <span>{event.time}</span>
                </div>
                {event.speaker && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    <span>{event.speaker}</span>
                  </div>
                )}
                {event.location && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{event.location}</span>
                  </div>
                )}
              </div>
              <div className="mt-3 pt-2 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-foreground/50">{event.attendees} registered</span>
                <span className="text-xs font-medium" style={{ color: THEME_PRIMARY }}>RSVP →</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="rounded-xl p-8 text-center border border-white/20 animated-gradient-bg"
        >
          <h2 className="text-2xl font-light text-white mb-3">
            Ready to join the Univaciti community?
          </h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto mb-6">
            Sign up to get notified about community events, new programmes, and exclusive opportunities.
          </p>
          <form
            onSubmit={(e) => { e.preventDefault(); email && joinWaitlist.mutate(email); }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
              data-testid="input-email"
            />
            <Button type="submit" variant="secondary" disabled={joinWaitlist.isPending} data-testid="button-join">
              {joinWaitlist.isPending ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
