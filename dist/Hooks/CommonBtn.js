import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const CommonBtn = ({ back, type, children }) => {
    const navigate = useNavigate();
    return _jsxs('div', {
        className: 'flex items-center gap-2',
        children: [
            back &&
                _jsx(Button, {
                    size: 'large',
                    className:
                        'rounded bg-transparent hover:!bg-[#ff003c] hover:!text-white',
                    onClick: () => navigate(-1),
                    danger: true,
                    children: 'Cancel',
                }),
            _jsx(
                Button,
                // @ts-ignore
                {
                    // @ts-ignore
                    type:
                        type === 'submit' || type === 'reset'
                            ? undefined
                            : type,
                    htmlType:
                        type === 'submit' || type === 'reset'
                            ? type
                            : undefined,
                    size: 'large',
                    className:
                        'rounded bg-blue-700 text-white border-none hover:!bg-blue-800 hover:!text-white',
                    children: children,
                }
            ),
        ],
    });
};
export default CommonBtn;
