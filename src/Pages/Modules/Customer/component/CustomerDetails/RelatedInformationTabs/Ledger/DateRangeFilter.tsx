import React, { useState } from 'react';
import { DatePicker, Select, Space } from 'antd';
import moment, { Moment } from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;

const DateRangeFilter: React.FC = () => {
    const [dates, setDates] = useState<[Moment | null, Moment | null]>([
        null,
        null,
    ]);

    const handleYearChange = (year: number) => {
        const start = moment().year(year).startOf('year');
        const end = moment().year(year).endOf('year');
        setDates([start, end]);
    };

    const handleMonthChange = (value: string) => {
        const [month, year] = value.split(' ');
        const start = moment(`${month} ${year}`, 'MMMM YYYY').startOf('month');
        const end = moment(`${month} ${year}`, 'MMMM YYYY').endOf('month');
        setDates([start, end]);
    };

    const handleOtherChange = (value: string) => {
        let start: Moment, end: Moment;
        switch (value) {
            case 'Today':
                start = moment().startOf('day');
                end = moment().endOf('day');
                break;
            case 'This Week':
                start = moment().startOf('week');
                end = moment().endOf('week');
                break;
            case 'Previous Week':
                start = moment().subtract(1, 'week').startOf('week');
                end = moment().subtract(1, 'week').endOf('week');
                break;
            case 'Last 7 Days':
                start = moment().subtract(6, 'days').startOf('day');
                end = moment().endOf('day');
                break;
            case 'Last 90 Days':
                start = moment().subtract(89, 'days').startOf('day');
                end = moment().endOf('day');
                break;
            default:
                return;
        }
        setDates([start, end]);
    };

    return (
        <Space
            direction="vertical"
            size={12}
        >
            <Select
                placeholder="Select Calendar Year"
                style={{ width: 200 }}
                onChange={handleYearChange}
            >
                {[2024, 2023, 2022, 2021, 2020].map(year => (
                    <Option
                        key={year}
                        value={year}
                    >
                        {year}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Select Month"
                style={{ width: 200 }}
                onChange={handleMonthChange}
            >
                {[
                    'June 2024',
                    'March 2024',
                    'February 2024',
                    'January 2024',
                    // Add more months here
                ].map(month => (
                    <Option
                        key={month}
                        value={month}
                    >
                        {month}
                    </Option>
                ))}
            </Select>

            <Select
                placeholder="Select Other"
                style={{ width: 200 }}
                onChange={handleOtherChange}
            >
                {[
                    'Today',
                    'This Week',
                    'Previous Week',
                    'Last 7 Days',
                    'Last 90 Days',
                ].map(option => (
                    <Option
                        key={option}
                        value={option}
                    >
                        {option}
                    </Option>
                ))}
            </Select>

            <RangePicker
                value={dates}
                onChange={value => setDates(value as [Moment, Moment])}
                format="YYYY/MM/DD"
            />
        </Space>
    );
};

export default DateRangeFilter;
