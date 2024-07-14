import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import {
    PlusOutlined,
    SearchOutlined,
    ReloadOutlined,
} from '@ant-design/icons';

interface ActionButtonsComponentProps {
    hasSelected: boolean;
    loading: boolean;
    start: () => void;
    setSearchOn: (value: boolean) => void;
    searchOn: boolean;
}

const ButtonAction: React.FC<ActionButtonsComponentProps> = ({
    hasSelected,
    loading,
    start,
    setSearchOn,
    searchOn,
}) => {
    return (
        <div className="md:hidden flex items-center gap-1">
            <Link
                className="!bg-[#3946d1] w-[32px] h-[32px] flex items-center justify-center rounded-full !border-none !text-white text-nowrap text-sm"
                to={`create-customer`}
            >
                <PlusOutlined style={{ fontSize: 14 }} />
            </Link>

            <Button
                className="!bg-[#3946d1] rounded-full !border-none !text-white"
                size="medium"
                shape={'circle'}
                type="primary"
                onClick={start}
                disabled={!hasSelected}
                loading={loading}
                icon={
                    <ReloadOutlined
                        className={`${loading ? 'rotate-45' : 'rotate-0'} duration-150`}
                    />
                }
            />
            <Button
                className="!bg-[#3946d1] rounded-full !border-none !text-white"
                size="medium"
                shape={'circle'}
                type="primary"
                loading={loading}
                icon={<SearchOutlined style={{ fontSize: 16 }} />}
            />
        </div>
    );
};

export default ButtonAction;
