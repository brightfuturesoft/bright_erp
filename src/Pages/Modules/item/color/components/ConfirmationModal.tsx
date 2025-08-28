import { Modal } from 'antd';

interface ConfirmModalProps {
    open: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    okText?: string;
    cancelText?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    open,
    title,
    message,
    onClose,
    onConfirm,
    okText = 'Yes',
    cancelText = 'No',
}) => {
    return (
        <Modal
            centered
            title={title}
            open={open}
            onCancel={onClose}
            onOk={onConfirm}
            okText={okText}
            cancelText={cancelText}
            destroyOnClose
        >
            <p>{message}</p>
        </Modal>
    );
};

export default ConfirmModal;
