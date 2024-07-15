import { Button, DatePicker, Select } from 'antd';
import { Filter } from 'lucide-react';
import React from 'react';

interface ViewAllLedgerFilterActionProps {
    handleCustomerChange: (value: string) => void;
    handleStartDateChange: (date: moment.Moment | null) => void;
    handleEndDateChange: (date: moment.Moment | null) => void;
    customerList: { value: string; label: string }[];
}

const ViewAllLedgerFilterAction: React.FC<ViewAllLedgerFilterActionProps> = ({
    handleCustomerChange,
    handleStartDateChange,
    handleEndDateChange,
    customerList,
    setMenuOn,
    menuOn,
}) => {
    return (
        <div className="md:flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="md:block hidden select-label-container w-full">
                <label
                    htmlFor="custom-select"
                    className="select-label"
                >
                    Customer
                </label>
                <Select
                    id="custom-select"
                    className="!w-full !h-[32px] !bg-transparent"
                    defaultValue="All"
                    onChange={handleCustomerChange}
                    options={customerList}
                />
            </div>

            <div className="md:block hidden select-label-container  w-full">
                <label
                    htmlFor="start-date"
                    className="select-label"
                >
                    Start Date
                </label>
                <DatePicker
                    id="start-date"
                    className="!w-full"
                    onChange={handleStartDateChange}
                />
            </div>

            <div className="md:block hidden select-label-container w-full">
                <label
                    htmlFor="end-date"
                    className="select-label"
                >
                    End Date
                </label>
                <DatePicker
                    id="end-date"
                    className="!w-full"
                    onChange={handleEndDateChange}
                />
            </div>

            <Button
                onClick={() => setMenuOn(!menuOn)}
                icon={<Filter size={16} />}
                className="md:hidden flex items-center gap-1 rounded dark:border-dark-gray dark:!bg-light-dark px-3 !py-1 dark:text-light text-dark !bg-transparent"
            >
                Filter
            </Button>
        </div>
    );
};

export default ViewAllLedgerFilterAction;
