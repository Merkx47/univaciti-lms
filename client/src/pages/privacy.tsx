import { Link } from "wouter";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <img src={logoUrl} alt="Univaciti" className="h-10 w-10 rounded-full" />
            <span className="font-bold text-lg" style={{ color: THEME_PRIMARY }}>Univaciti</span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: January 2025</p>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you create an account, enroll in courses, or contact us for support. This may include your name, email address, phone number, and payment information.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. Information Sharing</h2>
            <p>We do not share your personal information with third parties except as described in this policy. We may share information with service providers who assist us in operating our platform.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at privacy@univaciti.com</p>
          </section>
        </div>

        <div className="mt-12">
          <Link href="/">
            <span className="text-sm hover:underline" style={{ color: THEME_PRIMARY }}>Back to Home</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
