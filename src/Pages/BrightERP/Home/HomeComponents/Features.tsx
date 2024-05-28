import React, { useState } from 'react';
import { SmileOutlined, MobileOutlined, StarOutlined, DesktopOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import Title from '../../../../Hooks/Title';
import { Button } from 'antd';

const features = [
    {
        "icon": "SmileOutlined",
        "iconClass": "text-blue-500 text-4xl",
        "title": "Automatic data backup",
        "description": [
            "Our all-in-one free GST billing software is an excellent addition to your business as it helps you automate your billing requirements. It is pretty efficient in assisting medium and small enterprises to save more time in accounting.",
            "With the help of free billing software with GST, business owners could efficiently perform various tasks, including GST return filing, inventory management, invoicing, and billing. Our free accounting app allows businesses to customise the fields per their unique requirements.",
            "You can use the app to generate GST invoices for your clients within 20 seconds and print/share them with customers. Bills are mainly recommended in the GST invoice format, and you can create them using our GST Software for billing.",
            "You can use the barcode scanner to speed up your billing process, and shortcut keys can help you do redundant tasks faster. 'Bill wise payment' in the Vyapar app is one of the essential features as it is pretty easy to link your payments with your sales invoices.",
            "The free GST mobile app creates multiple parties to manage all clients seamlessly. With the help of this feature, it is easier to track all the due dates in the invoice and track old invoices anytime. Vyapar app allows any business to identify any overdue payments quickly."
        ]
    },
    {
        "icon": "LockOutlined",
        "iconClass": "text-red-500 text-4xl",
        "title": "Enhanced Security",
        "description": [
            "Our ERP system offers enhanced security features to protect your business data. Advanced encryption methods ensure that your information is safe from unauthorized access.",
            "Regular security updates and patches keep your system secure from the latest threats. Multi-factor authentication adds an extra layer of security to your login process.",
            "User permissions and roles can be customized to control access to sensitive information. Our system monitors suspicious activities and alerts you to potential security breaches.",
            "Data backups are automated and securely stored, allowing you to recover quickly in case of data loss. Our support team is always available to assist you with any security concerns."
        ]
    },
    {
        "icon": "DatabaseOutlined",
        "iconClass": "text-green-500 text-4xl",
        "title": "Comprehensive Reporting",
        "description": [
            "Generate detailed reports with our ERP system to gain insights into your business operations. Our reporting tools are designed to be user-friendly and customizable to meet your needs.",
            "You can create various types of reports, including financial, inventory, sales, and customer reports. Real-time data analysis helps you make informed decisions quickly.",
            "Export reports in multiple formats, such as PDF, Excel, and CSV, for easy sharing and collaboration. Schedule automated reports to be delivered to your email at regular intervals.",
            "Visualize your data with charts and graphs to understand trends and patterns. Drill down into report details to get a deeper understanding of the data."
        ]
    },
    {
        "icon": "SyncOutlined",
        "iconClass": "text-purple-500 text-4xl",
        "title": "Real-time Synchronization",
        "description": [
            "Our ERP system ensures that your data is always up-to-date with real-time synchronization across all devices. This feature is crucial for businesses with multiple locations or remote teams.",
            "Changes made in one part of the system are instantly reflected throughout the entire system. This helps maintain consistency and accuracy of information.",
            "Collaborate seamlessly with team members regardless of their location. Real-time synchronization reduces the risk of errors and data discrepancies.",
            "Our system supports synchronization with various third-party applications and services. This integration capability helps streamline your business processes and improve efficiency."
        ]
    },
    {
        "icon": "MobileOutlined",
        "iconClass": "text-yellow-500 text-4xl",
        "title": "Mobile Accessibility",
        "description": [
            "Access your ERP system from anywhere with our mobile-friendly design. Our mobile app allows you to manage your business operations on the go.",
            "Perform essential tasks such as invoicing, inventory management, and customer relationship management from your mobile device. The mobile app is compatible with both iOS and Android platforms.",
            "Receive real-time notifications and alerts to stay updated on important activities. Our mobile app provides the same level of security and functionality as the desktop version.",
            "Easily switch between desktop and mobile versions without any loss of data. The mobile app is designed to be intuitive and user-friendly, ensuring a seamless user experience."
        ]
    },
    {
        "icon": "CustomerServiceOutlined",
        "iconClass": "text-orange-500 text-4xl",
        "title": "24/7 Customer Support",
        "description": [
            "Our ERP system comes with 24/7 customer support to assist you with any issues or queries. Our dedicated support team is always available to help you.",
            "You can reach us via multiple channels, including phone, email, and live chat. Our support team is trained to handle a wide range of technical and non-technical issues.",
            "We provide a comprehensive knowledge base and tutorials to help you get the most out of our ERP system. Our support services are included at no additional cost.",
            "We are committed to ensuring your satisfaction and success with our ERP system. Our team works tirelessly to resolve your issues as quickly as possible."
        ]
    },
    {
        "icon": "CloudOutlined",
        "iconClass": "text-blue-300 text-4xl",
        "title": "Cloud-Based Solution",
        "description": [
            "Our ERP system is a cloud-based solution, allowing you to access your data from anywhere at any time. This eliminates the need for on-premise servers and reduces IT costs.",
            "The cloud-based system is scalable, making it easy to accommodate your growing business needs. Automatic updates ensure that you always have the latest features and improvements.",
            "Data is stored securely in the cloud, with regular backups to prevent data loss. You can easily integrate our ERP system with other cloud-based applications and services.",
            "Our cloud-based ERP system offers high availability and reliability, ensuring that your business operations run smoothly. The system is designed to handle large volumes of data and users."
        ]
    },
    {
        "icon": "TeamOutlined",
        "iconClass": "text-green-300 text-4xl",
        "title": "Team Collaboration",
        "description": [
            "Enhance team collaboration with our ERP system's built-in communication tools. Share information and collaborate on projects in real-time.",
            "Our system supports team messaging, file sharing, and collaborative document editing. Create and manage tasks, assign them to team members, and track progress.",
            "Improve productivity with tools designed to streamline teamwork and project management. Our ERP system integrates with popular collaboration tools like Slack and Microsoft Teams.",
            "Set up permissions and access controls to ensure that the right people have access to the right information. Monitor team performance with detailed activity reports and analytics."
        ]
    },
    {
        "icon": "ScheduleOutlined",
        "iconClass": "text-red-300 text-4xl",
        "title": "Automated Scheduling",
        "description": [
            "Save time and reduce errors with our ERP system's automated scheduling features. Schedule tasks, appointments, and reminders effortlessly.",
            "Our system allows you to create recurring schedules and automate routine tasks. Set up notifications to remind you of important deadlines and appointments.",
            "Integrate your calendar with our ERP system to keep all your schedules in one place. Our automated scheduling tools help you stay organized and on top of your workload.",
            "Easily reschedule tasks and appointments with drag-and-drop functionality. Our system ensures that all changes are updated in real-time, keeping everyone informed."
        ]
    },
    {
        "icon": "LineChartOutlined",
        "iconClass": "text-purple-300 text-4xl",
        "title": "Performance Analytics",
        "description": [
            "Track and analyze the performance of your business with our ERP system's analytics tools. Gain insights into key performance indicators and make data-driven decisions.",
            "Our system provides customizable dashboards and reports to help you monitor business performance. Identify trends, measure progress, and set goals based on real-time data.",
            "Analyze sales, expenses, customer behavior, and more with detailed analytics. Our ERP system integrates with various data sources to provide a comprehensive view of your business.",
            "Use predictive analytics to forecast future performance and plan accordingly. Our analytics tools are designed to be user-friendly and accessible to all team members."
        ]
    }
]

interface MyFeatures {
    icon: string;
    iconClass: string;
    title: string;
    description: string
}

const Features: React.FC = () => {
    const [showInfo, setShowInfo] = useState<MyFeatures>(features[0])
    return (
        <div className="pt-20 pb-12 dark:bg-dark dark:text-white text-black">
            <Title subtitle="Features" title="Features of GST Billing and Accounting Software
" />
            <div className=" px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-wrap justify-center items-center space-x-4 space-y-4 mt-16 sm:space-y-0">
                <div className="md:grid grid-cols-3 border border-gray-400 hover:border-gray-300 w-full ">
                    <ul className='space-y-2 h-[510px] custom-scroll overflow-y-auto p-4'>
                        {
                            features?.map(itm => <li className='w-full'>
                                <Button
                                    onClick={() => setShowInfo(itm)}
                                    size='large'
                                    type='dashed'
                                    className='flex  border-b bg-white dark:bg-light-dark text-black dark:text-white duration-200 dark:hover:bg-gray-900 hover:bg-gray-200  px-3 rounded-md cursor-pointer hover:text-blue-600 items-start gap-2 w-full'>
                                    <div>
                                        {itm?.title}
                                    </div>
                                </Button>
                            </li>)
                        }
                    </ul>
                    <div className='col-span-2 md:px-2 px-4 py-4 w-full '>
                        <h1 className='text-4xl'>{showInfo?.title}</h1>
                        <p className="text-gray-500 text-justify mt-6 w-full">
                            {showInfo?.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
