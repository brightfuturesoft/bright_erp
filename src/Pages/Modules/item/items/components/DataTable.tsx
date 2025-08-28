// import React from 'react';
// import { Dropdown, Space, Table, TableProps, Tag } from 'antd';

// // import { tableData } from '../Items.demo';
// import { EllipsisVertical } from 'lucide-react';
// import { DataType } from '../Items.type';
// import { useItemsData } from './data_get_api';
// import ItemsFilterTable from './ItemsFilter';

// const items = [
//     {
//         key: '1',
//         label: (
//             <div onClick={() => console.log('details clicked')}>Details</div>
//         ),
//     },
//     {
//         key: '2',
//         label: <div onClick={() => console.log('edit clicked')}>Edit</div>,
//     },
//     {
//         key: '3',
//         label: (
//             <div onClick={() => console.log('inactive clicked')}>
//                 Make Inactive
//             </div>
//         ),
//     },
//     {
//         key: '4',
//         label: <div onClick={() => console.log('Delete clicked')}>Delete</div>,
//     },
// ];

// const tableHead: TableProps<DataType>['columns'] = [
//     {
//         title: 'NAME',
//         dataIndex: 'name',
//         key: 'name',
//         render: text => <a>{text}</a>,
//     },
//     // {
//     //     title: 'CODE',
//     //     dataIndex: 'code',
//     //     key: 'code',
//     // },
//     {
//         title: 'CATEGORIES',
//         dataIndex: 'categories',
//         key: 'categories',
//     },
//     {
//         title: 'TYPE',
//         dataIndex: 'type',
//         key: 'type',
//     },
//     {
//         title: 'BRAND',
//         dataIndex: 'brand',
//         key: 'brand',
//     },
//     {
//         title: 'COLOR',
//         dataIndex: 'color',
//         key: 'color',
//     },
//     {
//         title: 'SIZE',
//         dataIndex: 'size',
//         key: 'size',
//     },
//     {
//         title: 'SALE PRICE',
//         dataIndex: 'salePrice',
//         key: 'salePrice',
//     },
//     {
//         title: 'STOCK',
//         dataIndex: 'stock',
//         key: 'stock',
//     },
//     {
//         title: 'STATUS',
//         dataIndex: 'status',
//         key: 'status',
//         render: (status: boolean) => (
//             <Tag color={status ? 'green' : 'red'}>
//                 {status ? 'Active' : 'Inactive'}
//             </Tag>
//         ),
//     },
//     {
//         title: 'ACTION',
//         key: 'action',
//         render: () => (
//             <Space size="middle">
//                 <Dropdown
//                     menu={{ items }}
//                     trigger={['click']}
//                 >
//                     <a>
//                         <EllipsisVertical className="hover:cursor-pointer" />
//                     </a>
//                 </Dropdown>
//             </Space>
//         ),
//     },
// ];

// const DataTable: React.FC = () => {
//   const {
//     itemsData,
//     isLoading,
//     isError,
//   } = useItemsData();

//   console.log(itemsData)

//   const tableData = itemsData?.map((item: any) => ({
//     key: item._id,
//     name: item.item_name,
//     code: item.sku || "N/A",
//     categories: item.categories.map((c: any) => c.label).join(", "),
//     type: item.item_type,
//     brand: item.brand || "N/A",
//     color: item.color || "N/A",
//     size: item.size || "N/A",
//     salePrice: item.selling_price || 0,
//     stock: item.low_stock || 0,
//     status: !item.delete,
//   })) || [];

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading items</div>;

//   return (
//     <h1>ddd</h1>
// //    <ItemsFilterTable/>
//   );
// };

// export default DataTable;
