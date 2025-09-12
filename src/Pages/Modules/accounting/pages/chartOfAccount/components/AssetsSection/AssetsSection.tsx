import Gold_of_sold_table from '../expense/Gold_of_sold_table';

const AssetsSection: React.FC = () => {
    return (
        <div className="w-[92vw] md:w-full">
            <Gold_of_sold_table entity="bank" />
            <br />
            <Gold_of_sold_table entity="cash" />
            <br />
            <Gold_of_sold_table entity="current-assets" />
            <br />
            <Gold_of_sold_table entity="depreciation" />
            <br />
            <Gold_of_sold_table entity="inventory" />
            <br />
            <Gold_of_sold_table entity="mobile-bank" />
            <br />
            <Gold_of_sold_table entity="money-transit" />
            <br />
            <Gold_of_sold_table entity="longterm-asset" />
            <br />
            <Gold_of_sold_table entity="shortterm-asset" />
        </div>
    );
};

export default AssetsSection;
