import { jsx as _jsx } from 'react/jsx-runtime';
// @ts-nocheck
import { useState } from 'react';
import { Modal, Checkbox } from 'antd';
const EditStatusModal = ({ visible, data, onOk, onCancel }) => {
    const [includeData, setIncludeData] = useState(false);
    const [dataInput, setDataInput] = useState('');
    const handleOk = () => {
        if (includeData) {
        }
        if (data?.status === 'active' && includeData) {
            onOk('inactive');
        } else {
            onOk(data?.status || 'active');
        }
        setIncludeData(false);
        setDataInput('');
    };
    const onChange = e => {
        setIncludeData(e.target.checked);
    };
    return _jsx(Modal, {
        title: `Update Status for ${data?.name}`,
        visible: visible,
        onOk: handleOk,
        onCancel: onCancel,
        children:
            data?.status === 'active'
                ? _jsx(Checkbox, {
                      checked: includeData,
                      onChange: onChange,
                      style: { marginTop: '10px' },
                      children: 'Want to inactive this Customer Type?',
                  })
                : _jsx('h2', {
                      className: '',
                      children: 'Want to active this Customer Type?',
                  }),
    });
};
export default EditStatusModal;
