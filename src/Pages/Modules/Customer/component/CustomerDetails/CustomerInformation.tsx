import { Alert } from 'antd';
import React from 'react';

const CustomerInformation = () => {
    return (
        <div>
            <br /> <br />
            <Alert
                message={'Information processing to work....'}
                description={'user information pending!!!'}
                type="warning"
                showIcon
            />
        </div>
    );
};

export default CustomerInformation;
