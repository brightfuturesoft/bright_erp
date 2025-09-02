import Gold_of_sold_table, { TableItem } from '../expense/Gold_of_sold_table';

const IncomeSection: React.FC = () => {
    return (
        <div className="w-[92vw] md:w-full">
            <Gold_of_sold_table entity="discount" />
            <br />

            <Gold_of_sold_table entity="foreign-table" />
            <br />

            <Gold_of_sold_table entity="income-table" />
            <br />

            <Gold_of_sold_table entity="other-income-table" />
            <br />

            <Gold_of_sold_table entity="uncategorized-expense" />
        </div>
    );
};

export default IncomeSection;
