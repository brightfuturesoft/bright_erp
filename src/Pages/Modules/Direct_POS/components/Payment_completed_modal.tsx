import React from 'react';
import { Modal, Button } from 'antd';
import { BadgeCheck } from 'lucide-react';

const Payment_completed_modal = ({
    is_payment_modal_visible,
    set_is_payment_modal_visible,
    set_is_receipt_modal_visible,
    continue_without_print,
}: any) => (
    <Modal
        title="Payment Completed"
        open={is_payment_modal_visible}
        footer={null}
        onCancel={() => set_is_payment_modal_visible(false)}
        className="payment-modal dark:bg-gray-800 dark:text-white rounded"
        bodyStyle={{ backgroundColor: 'inherit' }}
    >
        <div className="text-center">
            <div className="mb-6">
                <div className="text-green-500  mb-4 flex justify-center">
                    <BadgeCheck className="text-6xl w-16 h-16" />
                </div>
                <p className="text-lg mb-4 dark:text-gray-300">
                    Do you want to Print Receipt for the Completed Order?
                </p>
            </div>
            <div className="flex gap-4 justify-center">
                <Button
                    type="primary"
                    onClick={() => {
                        (set_is_receipt_modal_visible(true),
                            set_is_payment_modal_visible(false));
                    }}
                    className="bg-blue-600"
                >
                    Print Receipt
                </Button>
                <Button
                    onClick={continue_without_print}
                    className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                    Continue
                </Button>
            </div>
        </div>
    </Modal>
);

export default Payment_completed_modal;
