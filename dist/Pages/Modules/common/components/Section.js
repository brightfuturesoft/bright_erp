import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
const Section = ({ title, sideComponent, children }) => {
    return _jsxs('div', {
        className: 'text-black dark:text-white',
        children: [
            _jsxs('div', {
                className: 'flex justify-between items-center',
                children: [
                    _jsx('h1', {
                        className:
                            'font-semibold text-light-dark text-xl dark:text-gray-300',
                        children: title,
                    }),
                    sideComponent && sideComponent,
                ],
            }),
            _jsx('div', { children: children }),
        ],
    });
};
export default Section;
