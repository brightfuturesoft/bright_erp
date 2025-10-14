import { useState } from 'react';
import { Button, DatePicker, Select, Space } from 'antd';
import { Filter } from 'lucide-react';
import DashboardContentHeader from '@/wraper/DashboardContentHeader';
import DashboardTitle from '@/Pages/Modules/CommonComponents/DashboardTitle';

const FilterAction = () => {
    const [filterBox, setFilterBox] = useState(false);
    const onChange = (date, dateString) => {};

    const status = false;
    return (
        <div className="py-2 ">
            <DashboardContentHeader>
                <DashboardTitle title="Customer Details" />
                <div className="flex md:hidden gap-1">
                    <Button
                        className="!bg-transparent group dark:text-light text-dark"
                        onClick={() => setFilterBox(!filterBox)}
                        icon={
                            <Filter
                                className="text-dark dark:text-light group-hover:!text-blue-500"
                                size={18}
                            />
                        }
                    >
                        {' '}
                        Filter
                    </Button>
                </div>
            </DashboardContentHeader>

            {/* hidden area */}
            {filterBox && (
                <div className="dark:text-light text-dark">
                    <Select
                        className="w-full mt-3"
                        showSearch
                        placeholder="Select country"
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        options={[
                            { value: '1', label: 'Jack' },
                            { value: '2', label: 'Lucy' },
                            { value: '3', label: 'Tom' },
                        ]}
                    />

                    <div className="w-full flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-2">
                        <Space
                            direction="vertical"
                            className="w-full md:w-auto flex mt-2 flex-row items-center"
                        >
                            <div className="space-y-1">
                                <p className="text-xs font-semibold">
                                    Start date :
                                </p>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={onChange}
                                    className="w-full "
                                />
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs font-semibold">
                                    End date :
                                </p>
                                <DatePicker
                                    format="YYYY-MM-DD"
                                    onChange={onChange}
                                    className="w-full"
                                />
                            </div>
                        </Space>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterAction;
