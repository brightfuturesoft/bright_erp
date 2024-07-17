import { Modal, Input, Button } from 'antd';
import React, { useState } from 'react';

const CancelOrderModal = ({
    cancelOrderVisible,
    handleCancelOrder,
    setCancelOrderVisible,
    selectedOrder,
}) => {
    const [cancellationReason, setCancellationReason] = useState('');

    const handleOk = () => {
        handleCancelOrder(cancellationReason);
        setCancellationReason('');
    };

    const handleCancel = () => {
        setCancelOrderVisible(false);
        setCancellationReason('');
    };

    return (
        <Modal
            title="Cancel Order"
            visible={cancelOrderVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button
                    key="back"
                    onClick={handleCancel}
                >
                    No, keep it
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    onClick={handleOk}
                >
                    Yes, cancel it!
                </Button>,
            ]}
        >
            <p className="text-md font-semibold">Are you sure?</p>
            <p className="text-md">
                This order will be canceled permanently!. Enter cancellation
                reason:
            </p>
            <Input.TextArea
                value={cancellationReason}
                onChange={e => setCancellationReason(e.target.value)}
                placeholder="Reason..."
                rows={4}
            />
        </Modal>
    );
};

export default CancelOrderModal;
