import Gold_of_sold_table from '../expense/Gold_of_sold_table';

const LiabilitiesSection: React.FC = () => {
    return (
        <div className="w-[92vw] md:w-full">
            <Gold_of_sold_table entity="credit-card" />
            <br />
            <Gold_of_sold_table entity="customer-prepayments-and-customer-credits" />
            <br />
            <Gold_of_sold_table entity="due-for-payroll" />
            <br />
            <Gold_of_sold_table entity="Loan-and-Line-of-Credit" />
            <br />
            <Gold_of_sold_table entity="Other-Short-Term-Liability" />
            <br />
            <Gold_of_sold_table entity="sales-taxes" />
            <br />
        </div>
    );
};

export default LiabilitiesSection;
