import { Mail, Phone } from 'lucide-react';
import RelatedInformationTabs from '../ReletedInformation/ReletedInformationTab';

const CustomerInformation = ({ customer }) => {
    if (!customer) return <p>Loading...</p>;

    return (
        <div className="mt-12 dark:text-light text-dark">
            <div className="grid md:grid-cols-4 gap-2">
                {/* Customer Info */}
                <div>
                    <h3 className="text-md font-semibold pb-2 dark:text-light text-dark">
                        Customer Information
                    </h3>
                    <div className="border dark:border-dark-gray md:block flex gap-4 items-start p-4">
                        <div className="flex flex-col space-y-1 md:mt-3">
                            <span className="font-bold text-2xl dark:text-light text-dark text-start">
                                {customer.full_name}
                            </span>
                            <a
                                href={`mailto:${customer.email}`}
                                className="md:text-sm text-blue-500 mt-3 flex items-center gap-2 text-xs text-start"
                            >
                                <Mail size={14} /> {customer.email}
                            </a>
                            <a
                                href={`tel:${customer.phone_number}`}
                                className="md:text-sm text-xs text-green-500 text-start flex items-center gap-2"
                            >
                                <Phone size={14} /> {customer.phone_number}
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Info Tabs */}
                <div className="md:col-span-3">
                    <h3 className="text-md font-semibold pb-3 dark:text-light text-dark">
                        Related Information
                    </h3>
                    <RelatedInformationTabs customerId={customer._id} />
                </div>
            </div>
        </div>
    );
};

export default CustomerInformation;
