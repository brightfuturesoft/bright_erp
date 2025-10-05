import { jsx as _jsx } from 'react/jsx-runtime';
const ColorBox = ({ color }) => {
    return _jsx('div', {
        className: 'w-10 h-10 rounded-full border border-gray-200',
        style: { backgroundColor: color },
    });
};
export default ColorBox;
