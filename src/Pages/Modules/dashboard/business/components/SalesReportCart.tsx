import { Flex, Progress } from 'antd';
import React from 'react';

// Define the interface for the props
interface SalesReportCartProps {
    name: string;
    amount: number;
    percent: number;
    size: number | 'medium' | 'default';
    strokeWidth: number;
    strokeColor: string;
    trailColor: string;
}


const SalesReportCart: React.FC<SalesReportCartProps> = ({
    name,
    amount,
    percent,
    size,
    strokeWidth,
    strokeColor,
    trailColor
}) => {
    return (
        <div>
            <div className="w-full flex dark:shadow-none shadow-xl shadow-[#8080800e] justify-between p-6 bg-white dark:bg-light-dark dark:border-gray-700 border rounded-lg dark:text-gray-400 text-dark">
                <div>
                    <h1 className="text-2xl font-[200] dark:text-gray-300 uppercase">{name}</h1>
                    <h1 className="text-gray-500 text-md">Today</h1>
                    <p className="mt-5 font-bold text-green-500">BDT <span className="text-red-500">{amount}</span></p>
                </div>

                <Flex align="center" wrap gap={0}>
                    <Progress
                        type="circle"
                        percent={percent}
                        size={size}
                        strokeWidth={strokeWidth}
                        strokeColor={strokeColor}
                        trailColor={trailColor}
                    />
                </Flex>
            </div>
        </div>
    );
};

export default SalesReportCart;
