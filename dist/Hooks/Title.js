import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const Title = ({ subtitle, title, description }) => {
    return _jsxs('div', {
        className:
            'flex flex-col gap-2 dark:text-light text-gray-800  md:w-[600px] m-auto w-[320px] items-center',
        children: [
            subtitle &&
                _jsx('div', {
                    className:
                        'inline-flex px-4 py-1.5 mx-auto rounded-full bg-gradient-to-r from-fuchsia-600 to-blue-600',
                    children: _jsx('p', {
                        className:
                            'text-xs font-semibold tracking-widest text-gray-50 uppercase',
                        children: subtitle,
                    }),
                }),
            title &&
                _jsx('h1', {
                    className:
                        'md:text-4xl text-xl font-black uppercase text-center',
                    children: title,
                }),
            description &&
                _jsx('p', {
                    className:
                        'text-base text-center text-body-color dark:text-gray-400 text-dark',
                    children: description,
                }),
        ],
    });
};
export default Title;
