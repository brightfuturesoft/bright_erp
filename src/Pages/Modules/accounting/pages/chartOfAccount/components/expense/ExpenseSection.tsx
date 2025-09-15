import Gold_of_sold_table, { TableItem } from './Gold_of_sold_table';

const ExpenseSection: React.FC = () => {
    return (
        <div className="w-[92vw] md:w-full">
            <Gold_of_sold_table entity="expense" />
            <br />
            <Gold_of_sold_table entity="discount" />
            <br />
            <Gold_of_sold_table entity="operating-expense" />
            <br />
            <Gold_of_sold_table entity="payment-processing" />
            <br />
            <Gold_of_sold_table entity="payroll-expense" />
            <br />
            <Gold_of_sold_table entity="uncategorized-expense" />
            <br />
        </div>
    );
};

export default ExpenseSection;
