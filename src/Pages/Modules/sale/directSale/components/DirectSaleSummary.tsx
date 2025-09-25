import { Form, Input, Select } from 'antd';

interface Props {
    form: any;
}

const DirectSaleSummary: React.FC<Props> = ({ form }) => {
    return (
        <div className="p-4 border rounded shadow-sm space-y-3 dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-lg font-semibold dark:text-white">Summary</h3>

            {/* Subtotal */}
            <Form.Item
                label="Subtotal"
                name="subtotal"
            >
                <Input
                    disabled
                    className="dark-input h-10"
                />
            </Form.Item>

            {/* Discount with Fixed/Percentage */}
            <Form.Item label="Discount">
                <Input.Group compact>
                    <div className="flex w-full">
                        <Form.Item
                            name={['global_discount', 'value']}
                            noStyle
                        >
                            <Input
                                type="number"
                                min={0}
                                max={100}
                                className="dark-input flex-1 h-10 rounded-l-md border-r-0"
                                placeholder="Amount"
                            />
                        </Form.Item>
                        <Form.Item
                            name={['global_discount', 'type']}
                            noStyle
                        >
                            <Select
                                className="dark-select h-10 w-28 rounded-r-md border-l-0"
                                options={[
                                    {
                                        label: 'Percentage',
                                        value: 'percentage',
                                    },
                                    { label: 'Fixed', value: 'fixed' },
                                ]}
                                defaultValue="percentage"
                            />
                        </Form.Item>
                    </div>
                </Input.Group>
            </Form.Item>

            {/* Adjustment Amount with + / - */}
            <Form.Item label="Adjustment Amount">
                <Input.Group compact>
                    <div className="flex w-full">
                        {/* Amount Input */}
                        <Form.Item
                            name={['adjustment', 'value']}
                            noStyle
                        >
                            <Input
                                type="number"
                                className="dark-input flex-1 h-10  rounded-l-md border-r-0"
                                placeholder="Amount"
                            />
                        </Form.Item>

                        {/* Operator Select */}
                        <Form.Item
                            name={['adjustment', 'operator']}
                            noStyle
                        >
                            <Select
                                className="dark-select h-10 w-24 rounded-r-md border-l-0"
                                options={[
                                    { label: '+', value: 'plus' },
                                    { label: '-', value: 'minus' },
                                ]}
                                defaultValue="plus"
                            />
                        </Form.Item>
                    </div>
                </Input.Group>
            </Form.Item>

            {/* Grand Total */}
            <Form.Item
                label="Grand Total"
                name="grand_total"
            >
                <Input
                    disabled
                    className="dark-input h-10"
                />
            </Form.Item>

            {/* Payment Method */}
            <Form.Item
                label="Payment Method"
                name="payment_method"
            >
                <Select
                    placeholder="Select Method"
                    className="dark-select h-10"
                    options={[
                        { label: 'Cash', value: 'cash' },
                        { label: 'Bank Transfer', value: 'bank' },
                        { label: 'Card', value: 'card' },
                    ]}
                />
            </Form.Item>

            {/* Paid Amount */}
            <Form.Item
                label="Paid Amount"
                name="paid_amount"
            >
                <Input
                    type="number"
                    className="dark-input h-10"
                />
            </Form.Item>
        </div>
    );
};

export default DirectSaleSummary;
