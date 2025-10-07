import { jsx as _jsx, Fragment as _Fragment } from 'react/jsx-runtime';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
export default function SignSlide() {
    return _jsx(_Fragment, {
        children: _jsx(Swiper, {
            spaceBetween: 0,
            centeredSlides: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
            },
            navigation: false,
            // navigation={true}
            modules: [Autoplay, Navigation],
            className: 'mySwiper rounded-lg border h-full',
            children: [1, 2, 3].map(itm =>
                _jsx(
                    SwiperSlide,
                    {
                        className: '  ',
                        children: _jsx('div', {
                            className:
                                'absolute top-0  left-0 rounded-lg right-0 bottom-0 h-full w-full flex items-end px-4 pb-10 pt-60 sm:pb-16 md:justify-center lg:pb-24 sm:px-6 lg:px-8',
                            children: _jsx('div', {
                                className:
                                    'absolute inset-0 rounded-lg  top-0 bottom-0 h-full',
                                children: _jsx('img', {
                                    className:
                                        'object-cover rounded-lg  w-full h-full',
                                    src: 'https://cdn.rareblocks.xyz/collection/celebration/images/signup/4/girl-working-on-laptop.jpg',
                                    alt: '',
                                }),
                            }),
                        }),
                    },
                    itm
                )
            ),
        }),
    });
}
