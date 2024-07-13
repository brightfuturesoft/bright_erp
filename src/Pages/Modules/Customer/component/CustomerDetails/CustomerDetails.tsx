import CustomerInformation from './CustomerInformation';
import CustomerShowcase from './CustomerShowcase';
import FilterAction from './FilterAction';
const CustomerDetails = () => {
    return (
        <div className="text-dark dark:text-light">
            <FilterAction />
            <CustomerShowcase />
            <CustomerInformation />
        </div>
    );
};

export default CustomerDetails;
