import { Package, Boxes, Briefcase, LineChart } from 'lucide-react';
import getRandomColor from '../utils/getRandomColor';

interface InfoCardProps {
    title: string;
    amount: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, amount }) => {
    const color = getRandomColor();

    // Title অনুযায়ী icon select
    const getIcon = () => {
        switch (title.toLowerCase()) {
            case 'total variants':
                return <Package />;
            case 'total stock':
                return <Boxes />;
            case 'total orders':
                return <Briefcase />;
            case 'sales':
            case 'revenue':
                return <LineChart />;
            default:
                return <Briefcase />;
        }
    };

    const showCurrency = () => {
        const currencyTitles = ['sales', 'revenue'];
        return currencyTitles.includes(title.toLowerCase());
    };

    return (
        <div
            className={`my-2 flex divide-x-2 justify-between max-w-sm border-gray-700 p-3 border rounded-md`}
            style={{
                backgroundColor: color.bgColor,
                borderColor: color.borderColor,
            }}
        >
            <div
                className="mr-6 p-4 rounded-full"
                style={{ backgroundColor: color.iconBgColor }}
            >
                {getIcon()}
            </div>

            <div className="flex flex-1 justify-center items-center">
                <div className="mx-5">
                    <h1
                        style={{ color: color.textColor }}
                        className="font-semibold"
                    >
                        {title}
                    </h1>
                    <p className="text-gray-900">
                        {showCurrency() && (
                            <span className="kalpurush-font text-lg">৳ </span>
                        )}
                        {amount}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
