import Gold_of_sold_table, { TableItem } from '../expense/Gold_of_sold_table';

const OwnersEquity: React.FC = () => {
    return (
        <div className="w-[92vw] md:w-full">
            <Gold_of_sold_table entity="Business-Owner-Contribution-and-Drawing" />
            <br />
            <Gold_of_sold_table entity="Retained-Earnings" />
        </div>
    );
};

export default OwnersEquity;
