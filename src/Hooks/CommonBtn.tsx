import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CommonBtnProps {
    back?: boolean;
    type?: 'submit' | 'reset' | 'button' | 'primary';
    children: React.ReactNode;
}

const CommonBtn: React.FC<CommonBtnProps> = ({ back, type, children }) => {
    const navigate = useNavigate();

    return (
        <div className='flex items-center gap-2'>
            {
                back && (
                    <Button
                        size='large'
                        className='rounded bg-transparent hover:!bg-[#ff003c] hover:!text-white'
                        onClick={() => navigate(-1)}
                        danger
                    >
                        Cancel
                    </Button>
                )
            }

            <Button
                type={type === 'submit' || type === 'reset' ? undefined : type}
                htmlType={type === 'submit' || type === 'reset' ? type : undefined}
                size='large'
                className='rounded bg-blue-700 text-white border-none hover:!bg-blue-800 hover:!text-white'
            >
                {children}
            </Button>
        </div>
    );
};

export default CommonBtn;
