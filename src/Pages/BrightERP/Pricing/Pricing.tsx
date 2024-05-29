import { CheckCircleOutlined, DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Title from "../../../Hooks/Title";
import { Button } from "antd";
import { PlusIcon, PlusSquare } from "lucide-react";
import AddModule from "./AddModule";

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
    active,
}) => {


    return (
        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
            <div className="relative z-10 mb-10 overflow-hidden group rounded-[10px] border-2 border-stroke dark:bg-light-dark bg-white px-8 py-10 shadow-pricing dark:border-[#5b50ec] dark:bg-dark-2 sm:p-12 lg:px-6 lg:py-10 xl:p-[50px]">
                <span className="mb-3 block text-lg font-semibold text-primary">
                    {type}
                </span>
                <h2 className="mb-5 text-[42px] font-bold text-dark dark:text-light">
                    {price}
                    <span className="text-base font-medium text-body-color dark:text-dark-6">
                        / {subscription}
                    </span>
                </h2>
                <p className="mb-8 border-b border-stroke text-dark dark:text-gray-400 pb-8 text-base text-body-color dark:border-dark-3 dark:text-dark-6">
                    {description}
                </p>
                <div className="mb-9 flex flex-col gap-[14px]">{children}</div>
                <a
                    href="/#"
                    className={`block w-full rounded-md p-3 text-center text-base font-medium transition 
                    group-hover:bg-opacity-90 group-hover:bg-primary dark:group-hover:bg-dark dark:bg-gray-700 bg-primary text-light dark:text-light duration-200`}
                >
                    {buttonText}
                </a>
                <div>
                    <span className="absolute right-0 top-7 z-[-1]">
                        <svg
                            width={77}
                            height={172}
                            viewBox="0 0 77 172"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle cx={86} cy={86} r={86} fill="url(#paint0_linear)" />
                            <defs>
                                <linearGradient
                                    id="paint0_linear"
                                    x1={86}
                                    y1={0}
                                    x2={86}
                                    y2={172}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#3056D3" stopOpacity="0.09" />
                                    <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                    <span className="absolute right-4 top-4 z-[-1]">
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
    return <div className="flex items-center gap-2">
        <CheckCircleOutlined className="text-success text-xl" />
        <p className="text-base text-dark dark:text-light">{children}</p>
    </div>;
};

const pricingPlans: PricingPlan[] = [
    {
        type: "Basic",
        price: "$59",
        subscription: "year",
        description: "Perfect for using in a personal website or a client project.",
        buttonText: "Choose Personal",
        features: [
            "1 User",
            "All UI components",
            "Lifetime access",

        ],
    },
    {
        type: "Business",
        price: "$199",
        subscription: "year",
        description: "Perfect for using in a personal website or a client project.",
        buttonText: "Choose Business",
        active: true,
        features: [
            "5 Users",
            "All UI components",
            "Lifetime access",
            "Free updates",
            "Use on 3 (three) projects",
            "4 Months support",
        ],
    },
    {
        type: "Professional",
        price: "$256",
        subscription: "year",
        description: "Perfect for using in a personal website or a client project.",
        buttonText: "Choose Professional",
        features: [
            "Unlimited Users",
            "All UI components",
            "Lifetime access",
            "Free updates",
            "Unlimited projects",
            "12 Months support",
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
        return () => document.body.style.overflow = 'auto';
    }, [openModal]);

    const [selectedRows, setSelectedRows] = useState<DataType[]>([]);
    console.log('===>>: ', selectedRows);
    return (
        <div className="dark:bg-dark bg-light py-16">
            <section className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-wrap justify-center items-center space-x-4 space-y-4 mt-16 sm:space-y-0">
                <div className="container mx-auto">
                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <Title subtitle="Pricing" title="Out Pricing" description="There are many variations of passages of Lorem Ipsum available
                but the majority have suffered alteration in some form." />
                        </div>
                    </div>

                    <div className="-mx-4 mt-12 flex flex-wrap justify-center">
                        {pricingPlans.map((plan) => (
                            <PricingCard
                                key={plan.type}
                                type={plan.type}
                                price={plan.price}
                                subscription={plan.subscription}
                                description={plan.description}
                                buttonText={plan.buttonText}
                                active={plan.active}
                            >
                                <div className="h-full space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <List key={index}>{feature}</List>
                                    ))}
                                </div>
                            </PricingCard>
                        ))}
                    </div>

                    <div className="float-right">
                        <Button
                            onClick={() => setOpenModal(true)}
                            type="primary"
                            shape="default"
                            icon={<PlusOutlined />}
                            size="large"
                            className="flex capitalize items-center dark:bg-light-dark shadow-none 
                           hover:bg-[#15263a] hover:text-white"
                            style={{ backgroundColor: '#0574db', color: '#fff' }}
                        >
                            add new plan
                        </Button>
                    </div>

                    <AddModule openModal={openModal} setOpenModal={setOpenModal} selectedRows={selectedRows} setSelectedRows={setSelectedRows} />
                </div>
            </section>
        </div>
    );
};

export default Pricing;
