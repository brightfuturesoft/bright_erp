import Gold_of_sold_table, { TableItem } from '../expense/Gold_of_sold_table';

const IncomeSection: React.FC = () => {
    return (
        <div className="w-[92vw] md:w-full">
            <Gold_of_sold_table entity="income-discount" />
            <br />

            <Gold_of_sold_table entity="foreign" />
            <br />

            <Gold_of_sold_table entity="income" />
            <br />

            <Gold_of_sold_table entity="other-income" />
            <br />

            <Gold_of_sold_table entity="income-uncategorized-expense" />
        </div>
    );
};

export default IncomeSection;
