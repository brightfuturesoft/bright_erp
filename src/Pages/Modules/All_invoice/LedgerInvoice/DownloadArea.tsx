import React from 'react';
import { Mail, Phone, User } from 'lucide-react';
import { Table } from 'antd';
import logoDark from '../../../../assets/logoDark.png';
import logoLight from '../../../../assets/logoLight.png';

interface InvoiceProps {
    invoiceId: string;
    customerName: string;
    items: {
        item: string;
        description: string;
        orderedQty: number;
        billedQty: number;
        deliveredQty: number;
        returnedQty: number;
        price: number;
        discount: number;
        amount: number;
    }[];
    total: number;
    grandTotal: number;
    adjustmentAmount: number;
    subtotal: number;
    invoiceRef: React.RefObject<HTMLDivElement>;
}

const DownloadArea: React.FC<InvoiceProps> = ({
    invoiceId,
    customerName,
    items,
    total,
    grandTotal,
    adjustmentAmount,
    subtotal,
    invoiceRef,
}) => {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
        },
        {
            title: 'Item & Description',
            dataIndex: 'description',
            key: 'description',
            render: (_: any, record: any) =>
                `${record.item} - ${record.description}`,
        },
        {
            title: 'Ordered Qty',
            dataIndex: 'orderedQty',
            key: 'orderedQty',
        },
        {
            title: 'Billed Qty',
            dataIndex: 'billedQty',
            key: 'billedQty',
        },
        {
            title: 'Delivered Qty',
            dataIndex: 'deliveredQty',
            key: 'deliveredQty',
        },
        {
            title: 'Returned Qty',
            dataIndex: 'returnedQty',
            key: 'returnedQty',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `$${price.toFixed(2)}`,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            render: (discount: number) => `${discount}%`,
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            render: (amount: number) => `$${amount.toFixed(2)}`,
        },
    ];

    const dataSource = items.map((item, index) => ({
        key: index + 1,
        index: index + 1,
        ...item,
    }));

    return (
        <div
            ref={invoiceRef}
            className="border mt-3 max-w-[1200px] w-[1200px] m-auto border-gray-300 dark:bg-slate-800 bg-light dark:!text-light !text-dark dark:border-light-dark"
        >
            <div className="p-[50px] ">
                {/*------------------------ bar 1 ---------------------*/}
                <div className="flex border-b dark:border-dark-gray border-gray-300 mb-3 items-start justify-between pb-6">
                    <div className=" overflow-hidden">
                        <img
                            className="w-[280px] dark:hidden block"
                            src={logoDark}
                            alt="Logo Dark"
                        />
                        <img
                            className="w-[280px] dark:block hidden"
                            src={logoLight}
                            alt="Logo Light"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="font-bold text-xl pb-1 text-right float-right">
                            BRIGHT E.RP
                        </h1>
                        <p className="text-sm text-right dark:text-gray-300 text-gray-500 float-right">
                            bright.erp@gmail.com
                        </p>
                        <p className="text-sm text-right dark:text-gray-300 text-gray-500 float-right">
                            +880171234567910
                        </p>
                        <p className="text-sm text-right dark:text-gray-300 text-gray-500 float-right">
                            Dhaka, Mymenshingh
                        </p>
                    </div>
                </div>
                {/*------------------------ bar 2 ---------------------*/}
                <div className="flex dark:border-dark-gray border-gray-300 mb-3 items-start justify-between pb-6">
                    <div className=" overflow-hidden">
                        <ul className="space-y-2">
                            <li className="dark:text-blue-400 text-primary font-semibold">
                                Order By :
                            </li>
                            <li className="flex items-center gap-1">
                                <User
                                    size={20}
                                    className="text-primary"
                                />{' '}
                                Nahid
                            </li>
                            <li className="flex items-center gap-1">
                                <Mail
                                    size={16}
                                    className="text-primary"
                                />{' '}
                                nahidd@gmail.com
                            </li>
                            <li className="flex items-center gap-1">
                                <Phone
                                    size={16}
                                    className="text-primary"
                                />{' '}
                                +8801234567891
                            </li>
                        </ul>
                    </div>
                    <div className="flex flex-col gap-1">
                        <ul className="space-y-1">
                            <li className="flex items-center gap-1">
                                <span className="w-[200px] font-semibold text-primary">
                                    Order Number
                                </span>
                                <span className="w-[100px] text-center font-bold">
                                    :
                                </span>
                                <span className="w-[200px] text-end">
                                    a7df8sfasdg7y
                                </span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="w-[200px] font-semibold text-primary">
                                    Date
                                </span>
                                <span className="w-[100px] text-center font-bold">
                                    :
                                </span>
                                <span className="w-[200px] text-end">
                                    13 Jul 2024
                                </span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="w-[200px] font-semibold text-primary">
                                    Type
                                </span>
                                <span className="w-[100px] text-center font-bold">
                                    :
                                </span>
                                <span className="w-[200px] text-end">
                                    Direct Sale
                                </span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="w-[200px] font-semibold text-primary">
                                    Sales person
                                </span>
                                <span className="w-[100px] text-center font-bold">
                                    :
                                </span>
                                <span className="w-[200px] text-end">Demo</span>
                            </li>
                            <li className="flex items-center gap-1">
                                <span className="w-[200px] font-semibold text-primary">
                                    Status
                                </span>
                                <span className="w-[100px] text-center font-bold">
                                    :
                                </span>
                                <div className="w-[200px] text-end">
                                    <div className="bg-success text-light px-2 py-1 rounded text-xs flex w-[100px] ml-auto items-center justify-center">
                                        Completed
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />

                <div className="text-right space-y-2 w-[400px] rounded ml-auto bg-primary text-light p-3 font-bold mt-3">
                    <div className="flex justify-between">
                        <span>Subtotal:</span> ${subtotal.toFixed(2)}
                    </div>
                    <div className="flex justify-between">
                        <span>Adjustment Amount:</span> $
                        {adjustmentAmount.toFixed(2)}
                    </div>
                    <div className="flex justify-between">
                        <span>Total:</span> ${total.toFixed(2)}
                    </div>
                    <div className="flex justify-between">
                        <span>Grand Total:</span> ${grandTotal.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadArea;
