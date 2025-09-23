import React from 'react';

export default function TermsAndConditions() {
    return (
        <section className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-6 md:px-12 py-12 transition-colors duration-500">
            <div className="max-w-7xl mx-auto lg:px-8">
                {/* Header */}
                <div className="mb-10 border-b border-gray-200 dark:border-gray-700 pb-8">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        By accessing and using our services, you agree to the
                        following terms:
                    </p>
                </div>

                {/* Terms List */}
                <div className="space-y-8">
                    <Term
                        number="1"
                        title="Accounts & Security"
                        content="You are responsible for keeping your login credentials confidential. Any unauthorized use of your account is your responsibility."
                    />
                    <Term
                        number="2"
                        title="Subscription & Billing"
                        content="All subscriptions are billed in advance on a monthly or annual basis. Refunds are not provided for partial months of service."
                    />
                    <Term
                        number="3"
                        title="Use of Service"
                        content="You may not use the platform for illegal, fraudulent, or harmful activities. Violation may result in account suspension."
                    />
                    <Term
                        number="4"
                        title="Content & Ownership"
                        content="You retain full ownership of the data you upload (products, customer info, sales). We only process and store data for providing the service."
                    />
                    <Term
                        number="5"
                        title="Uptime & Maintenance"
                        content="We aim for 99.5% uptime. Scheduled maintenance may cause short interruptions, which will be announced in advance."
                    />
                    <Term
                        number="6"
                        title="Limitation of Liability"
                        content="We are not responsible for indirect or incidental damages. Our maximum liability is limited to the subscription fees paid in the last 3 months."
                    />
                    <Term
                        number="7"
                        title="Changes to Terms"
                        content="We may update these Terms occasionally. Updates will be posted here with a new “Last Updated” date."
                    />
                    <Term
                        number="8"
                        title="Governing Law"
                        content="These terms are governed by the laws of Bangladesh."
                    />
                </div>

                {/* Last Updated */}
                <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Last Updated:{' '}
                        <span className="font-medium">22 September, 2025</span>
                    </p>
                </div>
            </div>
        </section>
    );
}

/* Reusable Term Component */
type TermProps = {
    number: string;
    title: string;
    content: string;
};

const Term: React.FC<TermProps> = ({ number, title, content }) => (
    <div>
        <h2 className="text-xl font-semibold flex items-center gap-2 mb-2">
            <span className="text-indigo-500 dark:text-indigo-400 font-bold">
                {number}.
            </span>{' '}
            {title}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {content}
        </p>
    </div>
);
