import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ScrollToTop } from "@/components/scroll-to-top";
import { AuthProvider } from "@/hooks/use-auth";
import { AdminRoute, ProtectedRoute } from "@/lib/protected-route";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";

// Programme pages
import ProgrammesPage from "@/pages/programmes/index";
import TesaPage from "@/pages/programmes/tesa";
import StemPage from "@/pages/programmes/stem";
import NestPage from "@/pages/programmes/nest";

// Certification pages
import CertificationsPage from "@/pages/certifications/index";
import CloudEngineeringPage from "@/pages/certifications/cloud-engineering";
import DataAnalyticsPage from "@/pages/certifications/data-analytics";
import SoftwareJavaPage from "@/pages/certifications/software-java";
import QualityAssurancePage from "@/pages/certifications/quality-assurance";
import SoftwareReactPage from "@/pages/certifications/software-react";
import SolutionsArchitecturePage from "@/pages/certifications/solutions-architecture";
import AiMlPage from "@/pages/certifications/ai-ml";

// Other pages
import RecruitmentPage from "@/pages/recruitment";
import CertifyPage from "@/pages/certify";
import CommunityPage from "@/pages/community";

// Auth pages
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import ForgotPasswordPage from "@/pages/forgot-password";

// Info pages
import CareersPage from "@/pages/careers";
import ContactPage from "@/pages/contact";
import AboutPage from "@/pages/about";
import FAQPage from "@/pages/faq";
import BlogPage from "@/pages/blog";
import PrivacyPage from "@/pages/privacy";
import TermsPage from "@/pages/terms";

// Admin pages
import AdminLoginPage from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminCourses from "@/pages/admin/courses";
import AdminUsers from "@/pages/admin/users";
import AdminEnrollments from "@/pages/admin/enrollments";
import CurriculumBuilder from "@/pages/admin/curriculum";
import LessonEditor from "@/pages/admin/lesson-editor";
import CourseEditor from "@/pages/admin/course-editor";

// Student dashboard
import StudentDashboard from "@/pages/dashboard";
import CoursesPage from "@/pages/courses";
import CoursePlayer from "@/pages/course-player";
import QuizPage from "@/pages/quiz";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing}/>
      
      {/* Programme routes */}
      <Route path="/programmes" component={ProgrammesPage}/>
      <Route path="/programmes/tesa" component={TesaPage}/>
      <Route path="/programmes/stem" component={StemPage}/>
      <Route path="/programmes/nest" component={NestPage}/>

      {/* Certification routes */}
      <Route path="/certifications" component={CertificationsPage}/>
      <Route path="/certifications/cloud-engineering" component={CloudEngineeringPage}/>
      <Route path="/certifications/data-analytics" component={DataAnalyticsPage}/>
      <Route path="/certifications/software-java" component={SoftwareJavaPage}/>
      <Route path="/certifications/quality-assurance" component={QualityAssurancePage}/>
      <Route path="/certifications/software-react" component={SoftwareReactPage}/>
      <Route path="/certifications/solutions-architecture" component={SolutionsArchitecturePage}/>
      <Route path="/certifications/ai-ml" component={AiMlPage}/>
      
      {/* Other routes */}
      <Route path="/recruitment" component={RecruitmentPage}/>
      <Route path="/certify" component={CertifyPage}/>
      <Route path="/community" component={CommunityPage}/>
      
      {/* Auth routes */}
      <Route path="/login" component={LoginPage}/>
      <Route path="/register" component={RegisterPage}/>
      <Route path="/forgot-password" component={ForgotPasswordPage}/>
      
      {/* Info pages */}
      <Route path="/careers" component={CareersPage}/>
      <Route path="/contact" component={ContactPage}/>
      <Route path="/about" component={AboutPage}/>
      <Route path="/faq" component={FAQPage}/>
      <Route path="/blog" component={BlogPage}/>
      <Route path="/privacy" component={PrivacyPage}/>
      <Route path="/terms" component={TermsPage}/>
      
      {/* Admin routes */}
      <Route path="/admin/login" component={AdminLoginPage}/>
      <AdminRoute path="/admin/dashboard" component={AdminDashboard}/>
      <AdminRoute path="/admin/courses/new" component={CourseEditor}/>
      <AdminRoute path="/admin/courses/:id/curriculum" component={CurriculumBuilder}/>
      <AdminRoute path="/admin/courses/:id" component={CourseEditor}/>
      <AdminRoute path="/admin/courses" component={AdminCourses}/>
      <AdminRoute path="/admin/lessons/:id/edit" component={LessonEditor}/>
      <AdminRoute path="/admin/users" component={AdminUsers}/>
      <AdminRoute path="/admin/enrollments" component={AdminEnrollments}/>
      
      {/* Student dashboard */}
      <ProtectedRoute path="/dashboard" component={StudentDashboard}/>
      <ProtectedRoute path="/courses" component={CoursesPage}/>
      <ProtectedRoute path="/course/:courseId/lesson/:lessonId" component={CoursePlayer}/>
      <ProtectedRoute path="/quiz/:quizId" component={QuizPage}/>
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="univaciti-ui-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <ScrollToTop />
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
