import { Link } from 'react-router-dom';

export function Faq() {
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center py-16 px-8 md:py-20">
                {/* TEXT DIV */}
                <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
                    <p className="font-inter mb-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                        Help (FAQ)
                    </p>
                    <h2 className="mx-auto text-center font-bold text-black dark:text-white text-2xl sm:text-3xl lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="font-inter mt-4 max-w-xl px-5 text-center text-base font-light text-gray-500 dark:text-gray-400 lg:max-w-lg">
                        We understand that starting with a new platform may
                        raise questions. Here are some of the most common ones:
                    </p>
                </div>

                {/* FAQs */}
                <div className="mt-10 flex w-full flex-col divide-y divide-gray-200 dark:divide-gray-700">
                    {/* FAQ BLOCK */}
                    <div className="relative py-8 px-6 lg:px-12">
                        <h2 className="font-bold text-black dark:text-white text-xl">
                            1) How do I launch my store?
                        </h2>
                        <p className="font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300">
                            Simply sign up with your email, business name, and
                            logo. Our system will automatically create your
                            store and give you a unique subdomain. You can start
                            adding products immediately.
                        </p>
                    </div>

                    {/* FAQ BLOCK */}
                    <div className="relative py-8 px-6 lg:px-12">
                        <h2 className="font-bold text-black dark:text-white text-xl">
                            2) Can I use my own domain name?
                        </h2>
                        <p className="font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300">
                            Yes! Basic plan and above allow you to connect your
                            own domain for a fully branded store.
                        </p>
                    </div>

                    {/* FAQ BLOCK */}
                    <div className="relative py-8 px-6 lg:px-12">
                        <h2 className="font-bold text-black dark:text-white text-xl">
                            3) How do payments work?
                        </h2>
                        <p className="font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300">
                            Initially, you can accept Cash on Delivery (COD) and
                            manual bank transfer. Soon, we will integrate with
                            payment gateways such as SSLCOMMERZ, Stripe, and
                            bKash/Nagad.
                        </p>
                    </div>

                    {/* FAQ BLOCK */}
                    <div className="relative py-8 px-6 lg:px-12">
                        <h2 className="font-bold text-black dark:text-white text-xl">
                            4) How does inventory get updated?
                        </h2>
                        <p className="font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300">
                            Every time a paid order is confirmed, your stock
                            quantity automatically decreases. You can also
                            manually adjust stock for damaged or returned items.
                        </p>
                    </div>

                    {/* FAQ BLOCK */}
                    <div className="relative py-8 px-6 lg:px-12">
                        <h2 className="font-bold text-black dark:text-white text-xl">
                            5) How do I download invoices?
                        </h2>
                        <p className="font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300">
                            Go to Sales → Order Details → click “Generate
                            Invoice (PDF).” It will include your store logo,
                            product details, tax, and totals.
                        </p>
                    </div>

                    {/* FAQ BLOCK */}
                    <div className="relative py-8 px-6 lg:px-12">
                        <h2 className="font-bold text-black dark:text-white text-xl">
                            6) How can I contact support?
                        </h2>
                        <p className="font-inter mt-4 text-base font-light text-gray-600 dark:text-gray-300">
                            You can open a support ticket inside your dashboard,
                            send us an email at{' '}
                            <a
                                href="mailto:support@brightfuturesoft.com"
                                className="text-black dark:text-blue-400 font-bold underline"
                            >
                                support@brightfuturesoft.com
                            </a>
                            , or call our support line during business hours.
                        </p>
                    </div>
                </div>

                {/* FOOTER */}
                <p className="font-inter mx-auto mt-12 text-center text-base text-gray-600 dark:text-gray-400">
                    Can’t find the answer you’re looking for? Reach out to our{' '}
                    <Link
                        to="/contact-support"
                        className="text-black dark:text-blue-400 font-bold underline"
                    >
                        customer support team.
                    </Link>
                </p>
            </div>
        </section>
    );
}
