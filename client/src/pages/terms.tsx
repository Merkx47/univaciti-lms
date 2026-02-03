import { Link } from "wouter";
import logoUrl from "@assets/logo_1769031259580.png";

const THEME_PRIMARY = "#1E9AD6";

export default function TermsOfService() {
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
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: January 2025</p>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using Univaciti's learning platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Services</h2>
            <p>You may use our services only for lawful purposes and in accordance with these Terms. You agree not to use our services in any way that violates any applicable law or regulation.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">3. User Accounts</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">4. Course Content</h2>
            <p>All course materials, including videos, documents, and assessments, are protected by copyright. You may not reproduce, distribute, or create derivative works without our express permission.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">5. Payment and Refunds</h2>
            <p>Payment for courses is required at the time of enrollment. Refund requests must be submitted within 7 days of purchase and are subject to our refund policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mt-8 mb-4">6. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at legal@univaciti.com</p>
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
