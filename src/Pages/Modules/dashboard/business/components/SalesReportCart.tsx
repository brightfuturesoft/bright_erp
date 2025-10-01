import { Flex, Progress } from 'antd';

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
    trailColor,
}) => {
    return (
        <div>
            <div className="flex justify-between dark:border-gray-700 bg-white dark:bg-light-dark shadow-[#8080800e] shadow-xl dark:shadow-none p-6 border rounded-lg w-full text-dark dark:text-gray-400">
                <div>
                    <h1 className="font-[200] text-2xl dark:text-gray-300 uppercase">
                        {name}
                    </h1>
                    <h1 className="text-gray-500 text-md">This Month</h1>
                    <p className="mt-5 font-bold text-green-500">
                        BDT <span className="text-red-500">{amount}</span>
                    </p>
                </div>

                <Flex
                    align="center"
                    wrap
                    gap={0}
                >
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
