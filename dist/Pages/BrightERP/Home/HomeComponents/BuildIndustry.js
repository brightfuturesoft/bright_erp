import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import Title from '../../../../Hooks/Title';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'antd/dist/reset.css';
const industryData = [
    {
        id: 1,
        title: 'A Flexible ERP Tailored for You',
        description:
            'Our platform is not just another ERP—it’s built to adapt to your business type. Whether you’re selling products online, running a physical store, or managing both, we’ve got you covered.',
    },
    {
        id: 2,
        title: 'Retail & Ecommerce',
        description:
            'Stay on top of stock, manage online orders, and give your customers a smooth checkout experience.',
    },
    {
        id: 3,
        title: 'Wholesale & Distribution',
        description:
            'Handle large stock quantities, multiple warehouses, and bulk invoicing with ease.',
    },
    {
        id: 4,
        title: 'Service Providers',
        description:
            'Even if you don’t sell physical products, you can still manage customer records, invoices, and payments in one place.',
    },
    {
        id: 5,
        title: 'Startups & Entrepreneurs',
        description:
            'Perfect for beginners. Get a ready-made storefront, manage basic finances, and start building your brand from day one.',
    },
];
const BuildIndustry = () => {
    return _jsx('div', {
        className: 'pt-20 pb-12 dark:bg-dark dark:text-white text-black',
        children: _jsxs('div', {
            className:
                ' px-4 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-wrap justify-center items-center space-x-4 space-y-4  sm:space-y-0',
            children: [
                _jsx(Title, {
                    subtitle: 'Build',
                    title: 'Build for your Industry',
                }),
                _jsx('p', {
                    className:
                        'md:w-[700px] md:pb-12 text-sm w-[97%]   text-center m-auto mt-2',
                    children:
                        'Build your industry with confidence using our ERP app.',
                }),
                _jsx(Swiper, {
                    navigation: false,
                    pagination: { clickable: true },
                    modules: [Pagination, Navigation, Autoplay],
                    className: 'mySwiper',
                    autoplay: {
                        delay: 2000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        waitForTransition: true,
                        reverseDirection: true,
                    },
                    breakpoints: {
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 1, spaceBetween: 40 },
                        1024: { slidesPerView: 1, spaceBetween: 50 },
                    },
                    children: industryData.map(item =>
                        _jsx(
                            SwiperSlide,
                            {
                                children: _jsxs('div', {
                                    className: 'text-center pb-12',
                                    children: [
                                        _jsx('h1', {
                                            className: 'font-bold text-xl',
                                            children: item.title,
                                        }),
                                        _jsx('p', {
                                            className: 'text-gray-500 mt-3',
                                            children: item.description,
                                        }),
                                    ],
                                }),
                            },
                            item.id
                        )
                    ),
                }),
            ],
        }),
    });
};
export default BuildIndustry;
