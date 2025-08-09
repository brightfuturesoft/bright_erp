import React from 'react';
import {
    SmileOutlined,
    MobileOutlined,
    StarOutlined,
    DesktopOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

const data = [
    {
        icon: <SmileOutlined className="text-blue-500 md:text-4xl text-2xl" />,
        title: '20 +',
        description: 'Happy customers',
    },
    {
        icon: <MobileOutlined className="text-blue-500 md:text-4xl text-2xl" />,
        title: 'FREE',
        description: 'Android Mobile App',
    },
    {
        icon: <StarOutlined className="text-blue-500 md:text-4xl text-2xl" />,
        title: 'Rated 4.7/5',
        description: 'on Google Play Store',
    },
    {
        icon: (
            <DesktopOutlined className="text-blue-500 md:text-4xl text-2xl" />
        ),
        title: 'Multi-Device',
        description: 'Use together on Mobile/Desktop',
    },
    {
        icon: (
            <UsergroupAddOutlined className="text-blue-500 md:text-4xl text-2xl" />
        ),
        title: 'Multi-User',
        description: 'User Management Feature',
    },
];

const ShortHeader: React.FC = () => {
    return (
        <div className=" px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 grid md:grid-cols-5 md:py-16 py-2 grid-cols-3 justify-center items-center space-x-4 space-y-4 sm:space-y-0">
            {data.map((feature, index) => (
                <div
                    key={index}
                    className="flex flex-col items-center text-center m-4"
                >
                    {feature.icon}
                    <h3 className="md:text-lg text-md font-semibold mt-2 text-blue-500">
                        {feature.title}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-300 text-xs">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ShortHeader;
