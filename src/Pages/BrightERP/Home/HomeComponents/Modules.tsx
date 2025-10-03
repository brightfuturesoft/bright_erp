import React from 'react';
import Title from '../../../../Hooks/Title';

interface ModuleProps {
    title?: string;
    description?: string;
    svgColor?: string;
    svgPath?: string;
    svgIconColor?: string;
    svgIconPath?: string;
}

const Modules: React.FC<ModuleProps> = () => {
    const moduleData = [
        {
            title: 'Inventory Management',
            description:
                'Easily track, organize, and update your products in real time. From low-stock alerts to warehouse-level monitoring, everything is designed to give you full control over your stock without the hassle of manual spreadsheets.',
            svgColor: 'text-blue-100',
            svgPath:
                'M63.6911 28.8569C68.0911 48.8121 74.6037 61.2674 53.2349 65.9792C31.8661 70.6909 11.6224 61.2632 7.22232 41.308C2.82229 21.3528 3.6607 12.3967 25.0295 7.68503C46.3982 2.97331 59.2911 8.90171 63.6911 28.8569Z',
            svgIconColor: 'text-blue-600',
            svgIconPath:
                'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4',
        },
        {
            title: 'Sales & Invoicing',
            description:
                'Handle your entire sales cycle in one place. Create professional invoices, manage order statuses, and track payments so you can fulfill customer orders faster and more accurately.',
            svgColor: 'text-orange-100',
            svgPath:
                'M62 13.001C62 33.4355 53.9345 64.001 33.5 64.001C13.0655 64.001 0 50.435 0 30.0005C0 9.56596 2.56546 4.00021 23 4.00021C43.4345 4.00021 62 -7.43358 62 13.001Z',
            svgIconColor: 'text-orange-600',
            svgIconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
        },
        {
            title: 'Accounting (Basic)',
            description:
                'A simple yet powerful tool to keep an eye on your finances. Record expenses, log payments, and instantly see your revenue and balance without needing complicated accounting software.',
            svgColor: 'text-green-100',
            svgPath:
                'M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z',
            svgIconColor: 'text-green-600',
            svgIconPath:
                'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
        },
        {
            title: 'Ecommerce Storefront',
            description:
                'Launch your own branded online store within minutes. Customize the look, showcase your products beautifully, and let customers browse, add to cart, and checkout with ease.',
            svgColor: 'text-purple-100',
            svgPath:
                'M65.5 30C65.5 50.4345 46.4345 68 26 68C5.56546 68 0 50.4345 0 30C0 9.56546 12.5655 0 33 0C53.4345 0 65.5 9.56546 65.5 30Z',
            svgIconColor: 'text-purple-600',
            svgIconPath:
                'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
        },
        {
            title: 'Direct POS',
            description:
                'Sell directly from your physical store using a built-in Point of Sale system. Accept payments, print receipts, and keep inventory in sync between online and offline sales.',
            svgColor: 'text-gray-100',
            svgPath:
                'M64.5 26C64.5 46.4345 56.4345 70 36 70C15.5655 70 0 53.9345 0 33.5C0 13.0655 13.0655 0 33.5 0C53.9345 0 64.5 5.56546 64.5 26Z',
            svgIconColor: 'text-gray-600',
            svgIconPath: 'M13 10V3L4 14h7v7l9-11h-7z',
        },
        {
            title: 'Reports & Insights',
            description:
                'Get the numbers that matter. View real-time sales summaries, stock reports, and top-performing products to help you make smarter business decisions.',
            svgColor: 'text-yellow-100',
            svgPath:
                'M8.49996 28.0002C4.09993 47.9554 14.1313 66.7885 35.5 71.5002C56.8688 76.2119 68.0999 58.4553 72.5 38.5001C76.9 18.5449 68.3688 12.711 47 7.99931C25.6312 3.28759 12.9 8.04499 8.49996 28.0002Z',
            svgIconColor: 'text-yellow-500',
            svgIconPath:
                'M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017',
        },
    ];

    return (
        <section className="py-10 bg-gray-50 dark:bg-dark dark:text-light text-black sm:py-16 lg:py-24">
            <Title
                subtitle="Our Modules"
                title="Modules"
            />
            <div className="px-4 mt-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 text-center sm:grid-cols-2 md:grid-cols-3 lg:gap-y-16">
                    {moduleData.map((module, index) => (
                        <div key={index}>
                            <div className="relative flex items-center justify-center mx-auto">
                                <svg
                                    className={module.svgColor}
                                    width="72"
                                    height="75"
                                    viewBox="0 0 72 75"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d={module.svgPath} />
                                </svg>
                                <svg
                                    className={`absolute ${module.svgIconColor} w-9 h-9`}
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d={module.svgIconPath}
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-8 text-lg font-semibold">
                                {module.title}
                            </h3>
                            <p className="mt-4 text-base text-gray-600">
                                {module.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Modules;
