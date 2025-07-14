import { useEffect, useState } from 'react';
import { CheckCircleOutlined } from '@ant-design/icons';
import Title from '../../../Hooks/Title';
import AddModule from './AddModule';
import { Link } from 'react-router-dom';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
}

interface PricingPlan {
    type: string;
    price: string;
    subscription: string;
    description: string;
    buttonText: string;
    active?: boolean;
    features: string[];
}

interface PricingCardProps {
    type: string;
    price: string;
    subscription: string;
    description: string;
    buttonText: string;
    active?: boolean;
    children: React.ReactNode;
}

interface ListProps {
    children: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({
    children,
    description,
    price,
    type,
    subscription,
    buttonText,
}) => {
    return (
        <div className="px-4 w-full md:w-1/2 lg:w-1/3">
            <div className="relative z-10 border-2 border-stroke dark:border-[#5b50ec] bg-white dark:bg-light-dark dark:bg-dark-2 shadow-pricing mb-10 px-8 lg:px-6 py-10 lg:py-10 sm:p-12 xl:p-[50px] rounded-[10px] overflow-hidden group">
                <span className="block mb-3 font-semibold text-lg text-primary">
                    {type}
                </span>
                <h2 className="mb-5 font-bold text-[42px] text-dark dark:text-light">
                    {price}
                    <span className="font-medium text-base text-body-color dark:text-dark-6">
                        / {subscription}
                    </span>
                </h2>
                <p className="border-stroke dark:border-dark-3 mb-8 pb-8 border-b text-base text-body-color text-dark dark:text-gray-400 dark:text-dark-6">
                    {description}
                </p>
                <div className="flex flex-col gap-[14px] mb-9">{children}</div>
                <Link
                    to="/payment"
                    className={`block w-full rounded-md p-3 text-center text-base font-medium transition
                    group-hover:bg-opacity-90 group-hover:bg-primary dark:group-hover:bg-dark dark:bg-gray-700 bg-primary text-light dark:text-light duration-200`}
                >
                    {buttonText}
                </Link>
                <div>
                    <span className="top-7 right-0 z-[-1] absolute">
                        <svg
                            width={77}
                            height={172}
                            viewBox="0 0 77 172"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                cx={86}
                                cy={86}
                                r={86}
                                fill="url(#paint0_linear)"
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear"
                                    x1={86}
                                    y1={0}
                                    x2={86}
                                    y2={172}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop
                                        stopColor="#3056D3"
                                        stopOpacity="0.09"
                                    />
                                    <stop
                                        offset={1}
                                        stopColor="#C4C4C4"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="top-4 right-4 z-[-1] absolute">
                        <svg
                            width={41}
                            height={89}
                            viewBox="0 0 41 89"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {Array.from({ length: 8 }, (_, i) => (
                                <circle
                                    key={i}
                                    cx="38.9138"
                                    cy={87.4849 - i * 12.4978}
                                    r="1.42021"
                                    transform="rotate(180 38.9138 87.4849)"
                                    fill="#3056D3"
                                />
                            ))}
                            {Array.from({ length: 8 }, (_, i) => (
                                <circle
                                    key={i}
                                    cx="26.4157"
                                    cy={87.4849 - i * 12.4978}
                                    r="1.42021"
                                    transform="rotate(180 26.4157 87.4849)"
                                    fill="#3056D3"
                                />
                            ))}
                            {Array.from({ length: 8 }, (_, i) => (
                                <circle
                                    key={i}
                                    cx="13.9177"
                                    cy={87.4849 - i * 12.4978}
                                    r="1.42021"
                                    transform="rotate(180 13.9177 87.4849)"
                                    fill="#3056D3"
                                />
                            ))}
                            {Array.from({ length: 8 }, (_, i) => (
                                <circle
                                    key={i}
                                    cx="1.41963"
                                    cy={87.4849 - i * 12.4978}
                                    r="1.42021"
                                    transform="rotate(180 1.41963 87.4849)"
                                    fill="#3056D3"
                                />
                            ))}
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    );
};

const List: React.FC<ListProps> = ({ children }) => {
    return (
        <div className="flex items-center gap-2">
            <CheckCircleOutlined className="text-success text-xl" />
            <p className="text-base text-dark dark:text-light">{children}</p>
        </div>
    );
};

const pricingPlans: PricingPlan[] = [
    {
        type: 'Basic',
        price: '$99',
        subscription: 'year',
        description:
            'Perfect for using in a personal website or a client project.',
        buttonText: 'Choose Personal',
        features: [
            '7-Day Free Trial',
            ' Free E-Commerce Website ',
            'Access to core ERP modules',
            '5 user accounts',
            'Standard reporting tools',
            'Email support',
        ],
    },
    {
        type: 'Business',
        price: '$199',
        subscription: 'year',
        description:
            'Perfect for using in a personal website or a client project.',
        buttonText: 'Choose Business',
        active: true,
        features: [
            '7 - Day Free Trial',
            ' Free E-Commerce Website ',
            'Access to all ERP modules',
            '20 user accounts',
            'Advanced reporting and analytics',
            'Email and chat support',
            'Integration with third - party apps(e.g., PayPal, Stripe)',
        ],
    },
    {
        type: 'Professional',
        price: '$256',
        subscription: 'year',
        description:
            'Perfect for using in a personal website or a client project.',
        buttonText: 'Choose Professional',
        features: [
            '7 - Day Free Trial',
            ' Free E-Commerce Website ',
            'Unlimited access to ERP modules',
            'Unlimited user accounts',
            'Custom reporting and analytics',
            'Email, Chat and Phone support ',
            'Dedicated account manager',
            'API access for custom integrations',
            'Onboarding and training sessions',
        ],
    },
];

const Pricing: React.FC = () => {
    const [openModal, setOpenModal] = useState(false);
    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflowY = 'auto';
        }
        return () => (document.body.style.overflow = 'auto');
    }, [openModal]);

    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);

    return (
        <div className="bg-light dark:bg-dark py-16">
            <section className="md:flex flex-wrap justify-center items-center md:space-x-4 sm:space-y-0 md:space-y-4 mx-auto mt-16 px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="mx-auto container">
                    <div className="flex flex-wrap -mx-4">
                        <div className="px-4 w-full">
                            <Title
                                subtitle="Pricing"
                                title="Our Pricing"
                                description="There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form."
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center -mx-4 mt-12">
                        {pricingPlans.map(plan => (
                            <PricingCard
                                key={plan.type}
                                type={plan.type}
                                price={plan.price}
                                subscription={plan.subscription}
                                description={plan.description}
                                buttonText={plan.buttonText}
                                active={plan.active}
                            >
                                <div className="space-y-3 h-full">
                                    {plan.features.map((feature, index) => (
                                        <List key={index}>{feature}</List>
                                    ))}
                                </div>
                            </PricingCard>
                        ))}
                    </div>

                    <AddModule
                        openModal={openModal}
                        setOpenModal={setOpenModal}
                        selectedRows={selectedRows}
                        setSelectedRows={setSelectedRows}
                    />
                </div>
                <div className="md:block flex justify-center items-center md:px-4 w-full">
                    <div className="relative z-10 md:flex justify-between items-center border-2 border-stroke dark:border-[#5b50ec] bg-white dark:bg-light-dark dark:bg-dark-2 shadow-pricing mb-10 px-8 lg:px-6 py-10 lg:py-10 sm:p-12 xl:p-[50px] rounded-[10px] overflow-hidden group">
                        <div>
                            <span className="block mb-3 font-semibold text-lg text-primary">
                                Custom Plane
                            </span>
                            <h2 className="mb-5 font-bold text-[25px] text-dark dark:text-light">
                                Create Your Own Plane
                            </h2>
                        </div>

                        <button
                            onClick={() => setOpenModal(true)}
                            className={`block ml-auto float-end rounded-md p-3 text-center text-base font-medium transition
                    group-hover:bg-opacity-90 group-hover:bg-primary dark:group-hover:bg-dark dark:bg-gray-700 bg-primary text-light dark:text-light duration-200 md:w-[200px] w-full`}
                        >
                            Create
                        </button>
                        <div>
                            <span className="top-7 right-0 z-[-1] absolute">
                                <svg
                                    width={77}
                                    height={172}
                                    viewBox="0 0 77 172"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx={86}
                                        cy={86}
                                        r={86}
                                        fill="url(#paint0_linear)"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear"
                                            x1={86}
                                            y1={0}
                                            x2={86}
                                            y2={172}
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop
                                                stopColor="#3056D3"
                                                stopOpacity="0.09"
                                            />
                                            <stop
                                                offset={1}
                                                stopColor="#C4C4C4"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </span>
                            <span className="top-4 right-4 z-[-1] absolute">
                                <svg
                                    width={41}
                                    height={89}
                                    viewBox="0 0 41 89"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <circle
                                            key={i}
                                            cx="38.9138"
                                            cy={87.4849 - i * 12.4978}
                                            r="1.42021"
                                            transform="rotate(180 38.9138 87.4849)"
                                            fill="#3056D3"
                                        />
                                    ))}
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <circle
                                            key={i}
                                            cx="26.4157"
                                            cy={87.4849 - i * 12.4978}
                                            r="1.42021"
                                            transform="rotate(180 26.4157 87.4849)"
                                            fill="#3056D3"
                                        />
                                    ))}
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <circle
                                            key={i}
                                            cx="13.9177"
                                            cy={87.4849 - i * 12.4978}
                                            r="1.42021"
                                            transform="rotate(180 13.9177 87.4849)"
                                            fill="#3056D3"
                                        />
                                    ))}
                                    {Array.from({ length: 8 }, (_, i) => (
                                        <circle
                                            key={i}
                                            cx="1.41963"
                                            cy={87.4849 - i * 12.4978}
                                            r="1.42021"
                                            transform="rotate(180 1.41963 87.4849)"
                                            fill="#3056D3"
                                        />
                                    ))}
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Pricing;
