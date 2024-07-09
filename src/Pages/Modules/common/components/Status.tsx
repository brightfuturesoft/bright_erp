import { Tag } from 'antd';

const statusList = [
    {
        title: 'Completed',
        color: 'green',
    },
    {
        title: 'Approved',
        color: 'green',
    },
    {
        title: 'Draft',
        color: 'yellow',
    },
    {
        title: 'Rejected',
        color: 'red',
    },
    {
        title: 'Pending',
        color: 'yellow',
    },
    {
        title: 'Inactive',
        color: 'red',
    },
    {
        title: 'Active',
        color: 'green',
    },
    {
        title: 'Ordered',
        color: 'blue',
    },
    {
        title: 'Not Invoiced',
        color: 'red',
    },
    {
        title: 'Invoiced',
        color: 'green',
    },
    {
        title: 'Delivered',
        color: 'orange',
    },
    {
        title: 'Paid',
        color: 'green',
    },
    {
        title: 'Unpaid',
        color: 'red',
    },
    {
        title: 'Partially Paid',
        color: 'yellow',
    },
];

interface StatusProps {
    status: string;
}

const Status: React.FC<StatusProps> = ({ status }) => {
    const color = statusList.find(item => item.title === status)?.color;
    return <Tag color={color}>{status}</Tag>;
};

export default Status;
