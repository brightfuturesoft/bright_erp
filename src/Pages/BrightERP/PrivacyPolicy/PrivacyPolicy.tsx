import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function PrivacyPolicy() {
    const [showTop, setShowTop] = React.useState(false);

    React.useEffect(() => {
        const onScroll = () => setShowTop(window.scrollY > 200);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div
            className="min-h-screen 
      dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-gray-800 dark:text-gray-200 
      p-6 sm:p-12 font-sans transition-colors duration-500 relative px-8ya"
        >
            <div
                className="max-w-7xl mx-auto rounded-3xl 
        bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl 
        border border-white/20 dark:border-slate-700/30 overflow-hidden"
            >
                {/* Header with animated gradient */}
                <div
                    className="px-8 py-12 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-600 
          dark:from-slate-700 dark:via-indigo-900 dark:to-slate-900 animate-gradient-x 
          rounded-t-3xl shadow-lg"
                >
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
                        Privacy Policy
                    </h1>
                    <p className="text-sm opacity-90 text-white font-light">
                        Last Updated: 22 September, 2025
                    </p>
                </div>

                {/* Content */}
                <div className="px-8 py-12 space-y-12">
                    <p className="leading-relaxed text-lg text-gray-700 dark:text-gray-300">
                        We respect your privacy and are committed to protecting
                        your personal information. This policy outlines our
                        practices regarding data collection and use.
                    </p>

                    {/* Section */}
                    <Section title="Information We Collect">
                        <ListItem>
                            👤 Account details: name, email, phone
                        </ListItem>
                        <ListItem>🛒 Store, product, and order data</ListItem>
                        <ListItem>
                            💻 Device/browser/IP information for security and
                            analytics
                        </ListItem>
                    </Section>

                    <Section title="How We Use Information">
                        <ListItem>
                            ⚡ To provide and improve our services
                        </ListItem>
                        <ListItem>
                            🔒 To secure your account and prevent fraud
                        </ListItem>
                        <ListItem>
                            📊 To analyze platform usage and improve user
                            experience
                        </ListItem>
                    </Section>

                    <Section title="Data Sharing">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            We only share data with trusted third-party service
                            providers (hosting, payment, email) necessary to
                            deliver the service. We{' '}
                            <span className="font-bold text-gray-800 dark:text-gray-200">
                                never
                            </span>{' '}
                            sell your data.
                        </p>
                    </Section>

                    <Section title="Your Rights">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            You have the right to export, correct, or delete
                            your data. To make a request, email{' '}
                            <a
                                href="mailto:privacy@brightfuturesoft.com"
                                className="font-medium text-indigo-500 hover:text-indigo-400 transition-colors duration-300 underline"
                            >
                                privacy@brightfuturesoft.com
                            </a>
                            .
                        </p>
                    </Section>
                </div>
            </div>

            {/* Floating Scroll-to-Top Button */}
            {showTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white 
          shadow-lg hover:bg-indigo-500 transition-all duration-300"
                >
                    <ArrowUp size={20} />
                </button>
            )}
        </div>
    );
}

/* Reusable Section Component */
const Section = ({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) => (
    <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white relative pb-2">
            <span className="relative z-10">{title}</span>
            <span className="absolute left-0 bottom-0 w-14 h-1 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full"></span>
        </h2>
        <div className="space-y-3">{children}</div>
    </div>
);

/* Reusable List Item with hover effect */
const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-2 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700/40 transition-colors duration-300">
        <span className="text-xl">{children}</span>
    </li>
);
