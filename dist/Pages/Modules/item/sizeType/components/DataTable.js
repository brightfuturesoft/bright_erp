import { jsx as _jsx } from 'react/jsx-runtime';
import { Table, Tag, Space } from 'antd';
const DataTable = ({ data, renderAction }) => {
    const tableHead = [
        { title: 'SIZE TYPE', dataIndex: 'sizeType', key: 'sizeType' },
        { title: 'ADDED TYPE', dataIndex: 'addedType', key: 'addedType' },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            render: status =>
                _jsx(Tag, {
                    color: status ? 'green' : 'red',
                    children: status ? 'Active' : 'Inactive',
                }),
        },
        {
            title: 'ACTION',
            key: 'action',
            render: (_, record) =>
                _jsx(Space, {
                    size: 'middle',
                    children: renderAction ? renderAction(record) : null,
                }),
        },
    ];
    return _jsx(Table, { columns: tableHead, dataSource: data, rowKey: '_id' });
};
export default DataTable;
