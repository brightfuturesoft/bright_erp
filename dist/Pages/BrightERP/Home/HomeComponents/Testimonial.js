import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Link } from 'react-router-dom';
import avatarAnisha from '../assets/images/avatar-anisha.png';
import avatarAli from '../assets/images/avatar-ali.png';
import avatarRichard from '../assets/images/avatar-richard.png';
const Testimonial = () => {
    return _jsx('section', {
        id: 'testimonials',
        children: _jsxs('div', {
            className: 'max-w-6xl px-5 mx-auto mt-32 text-center',
            children: [
                _jsx('h2', {
                    className: 'text-4xl font-bold text-center',
                    children: "What's Different About Manage?",
                }),
                _jsxs('div', {
                    className: 'flex flex-col mt-24 md:flex-row md:space-x-6',
                    children: [
                        _jsxs('div', {
                            className:
                                'flex flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:w-1/3',
                            children: [
                                _jsx('img', {
                                    src: avatarAnisha,
                                    className: 'w-16 -mt-14',
                                    alt: '',
                                }),
                                _jsx('h5', {
                                    className: 'text-lg font-bold',
                                    children: 'Anisha Li',
                                }),
                                _jsx('p', {
                                    className: 'text-sm text-darkGrayishBlue',
                                    children:
                                        "\u201CManage has supercharged our team's workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.\u201D",
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className:
                                'hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3',
                            children: [
                                _jsx('img', {
                                    src: avatarAli,
                                    className: 'w-16 -mt-14',
                                    alt: '',
                                }),
                                _jsx('h5', {
                                    className: 'text-lg font-bold',
                                    children: 'Ali Bravo',
                                }),
                                _jsx('p', {
                                    className: 'text-sm text-darkGrayishBlue',
                                    children:
                                        '\u201CWe have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused.\u201D',
                                }),
                            ],
                        }),
                        _jsxs('div', {
                            className:
                                'hidden flex-col items-center p-6 space-y-6 rounded-lg bg-veryLightGray md:flex md:w-1/3',
                            children: [
                                _jsx('img', {
                                    src: avatarRichard,
                                    className: 'w-16 -mt-14',
                                    alt: '',
                                }),
                                _jsx('h5', {
                                    className: 'text-lg font-bold',
                                    children: 'Richard Watts',
                                }),
                                _jsx('p', {
                                    className: 'text-sm text-darkGrayishBlue',
                                    children:
                                        "\u201CManage has supercharged our team's workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated.\u201D",
                                }),
                            ],
                        }),
                    ],
                }),
                _jsx('div', {
                    className: 'my-16',
                    children: _jsx(Link, {
                        to: '#',
                        className:
                            'p-3 px-6 pt-2 text-white bg-brightRed rounded-full baseline hover:bg-brightRedLight',
                        children: 'Get Started',
                    }),
                }),
            ],
        }),
    });
};
export default Testimonial;
