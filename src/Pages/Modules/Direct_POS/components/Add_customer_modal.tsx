import React from 'react';
import { Modal, Input } from 'antd';

const Add_customer_modal = ({
    is_customer_modal_visible,
    set_is_customer_modal_visible,
    save_new_customer,
    newCustomer,
    setNewCustomer,
}: any) => (
    <Modal
        title="Add Customer"
        open={is_customer_modal_visible}
        onOk={save_new_customer}
        onCancel={() => set_is_customer_modal_visible(false)}
        okText="Save"
        cancelText="Cancel"
        className="dark:bg-gray-800 dark:text-white rounded"
        bodyStyle={{ backgroundColor: 'inherit' }}
    >
        <div className="space-y-3">
            <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Name *
                </label>
                <Input
                    placeholder="Customer name"
                    value={newCustomer.name}
                    onChange={e =>
                        setNewCustomer((c: any) => ({
                            ...c,
                            name: e.target.value,
                        }))
                    }
                    required
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Phone *
                </label>
                <Input
                    placeholder="Phone number"
                    value={newCustomer.phone}
                    required
                    onChange={e =>
                        setNewCustomer((c: any) => ({
                            ...c,
                            phone: e.target.value,
                        }))
                    }
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>
                <Input
                    type="email"
                    placeholder="Email address"
                    value={newCustomer.email}
                    onChange={e =>
                        setNewCustomer((c: any) => ({
                            ...c,
                            email: e.target.value,
                        }))
                    }
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
            <div>
                <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    Address
                </label>
                <Input.TextArea
                    rows={3}
                    placeholder="Address"
                    value={newCustomer.address}
                    onChange={e =>
                        setNewCustomer((c: any) => ({
                            ...c,
                            address: e.target.value,
                        }))
                    }
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
            </div>
        </div>
    </Modal>
);

export default Add_customer_modal;
