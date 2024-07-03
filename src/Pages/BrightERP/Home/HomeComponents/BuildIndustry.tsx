import React from 'react';
import Title from '../../../../Hooks/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'antd/dist/reset.css'; // or 'antd/dist/antd.css'

const industryData = [
    {
        id: 1,
        title: 'Enhance Efficiency',
        description:
            "Streamline your processes and boost productivity with our tailored ERP solutions. Our innovative software optimizes workflows, automates repetitive tasks, and eliminates bottlenecks, allowing your team to focus on high-value activities. With real-time data analytics and reporting, you'll have insights into your operations, enabling informed decision-making for further efficiency gains. Experience seamless integration with existing systems, ensuring a smooth transition and maximizing your ROI. Invest in efficiency today and unlock your business's full potential.",
    },
    {
        id: 2,
        title: 'Customized Solutions',
        description:
            'Tailor-made ERP solutions designed to fit the unique needs and challenges of your industry. Our team works closely with yours to understand your business requirements, processes, and goals. Leveraging our deep industry expertise, we develop customized software solutions that address your specific pain points and drive growth. From module customization to UI/UX design, we ensure that every aspect of the solution aligns with your vision. Experience the power of personalized technology solutions tailored to your success.',
    },
    {
        id: 3,
        title: 'Scalable Platform',
        description:
            "Grow your business with confidence using our scalable ERP platform that adapts to your evolving needs. Whether you're a startup or a multinational corporation, our software scales seamlessly to accommodate your growth trajectory. With flexible licensing options and modular architecture, you can add new features and users as your business expands. Stay agile in a rapidly changing market landscape and future-proof your operations with our scalable ERP solution.",
    },
    {
        id: 4,
        title: 'Real-time Insights',
        description:
            "Gain valuable insights into your industry's performance with our real-time analytics and reporting tools. Our ERP solution provides comprehensive data dashboards, allowing you to monitor key metrics and KPIs at a glance. Track inventory levels, sales trends, customer behavior, and more in real-time, empowering you to make data-driven decisions. With predictive analytics capabilities, anticipate market trends and stay ahead of the competition. Unlock the power of actionable insights with our advanced reporting features.",
    },
    {
        id: 5,
        title: 'Optimize Operations',
        description:
            "Optimize your operations and make data-driven decisions to stay ahead in your industry. Our ERP software streamlines your business processes, reducing manual errors and increasing operational efficiency. From order management to supply chain optimization, we help you identify areas for improvement and implement best practices. With workflow automation and intelligent resource allocation, you'll minimize waste and maximize productivity. Take your operations to the next level with our optimization tools.",
    },
    {
        id: 6,
        title: 'Secure Data Management',
        description:
            'Rest assured knowing that your sensitive data is securely managed and protected with our robust security measures. Our ERP platform employs state-of-the-art encryption protocols and multi-layered security features to safeguard your information. From user authentication to data encryption, we prioritize data integrity and confidentiality. With regular security updates and proactive monitoring, we stay ahead of emerging threats and compliance requirements. Trust us to keep your data safe and secure.',
    },
    // Add more industry data items here...
];

const BuildIndustry: React.FC = () => {
    return (
        <div className="pt-20 pb-12 dark:bg-dark dark:text-white text-black">
            <div className=" px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-wrap justify-center items-center space-x-4 space-y-4  sm:space-y-0">
                <Title
                    subtitle="Build"
                    title="Build for your Industry"
                />
                <p className="md:w-[700px] md:pb-12 text-sm w-[97%]   text-center m-auto mt-2">
                    Build your industry with confidence using our ERP app.
                </p>
                <Swiper
                    navigation={false}
                    pagination={{ clickable: true }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        waitForTransition: true,
                        reverseDirection: true,
                    }}
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 1, spaceBetween: 40 },
                        1024: { slidesPerView: 1, spaceBetween: 50 },
                    }}
                >
                    {industryData.map(item => (
                        <SwiperSlide key={item.id}>
                            <div className="text-center pb-12">
                                <h1 className="font-bold text-xl">
                                    {item.title}
                                </h1>
                                <p className="text-gray-500 mt-3">
                                    {item.description}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default BuildIndustry;
