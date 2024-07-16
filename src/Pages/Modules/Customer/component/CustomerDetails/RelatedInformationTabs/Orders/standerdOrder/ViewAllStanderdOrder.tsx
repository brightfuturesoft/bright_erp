import React from 'react';
import AllStanderdOrderAction from './AllStanderdOrderAction';
import { Alert } from 'antd';

const ViewAllStanderdOrder = () => {
    return (
        <div className="dark:!text-light !text-dark p-4">
            <AllStanderdOrderAction />
            <Alert
                message="Standard Order work in progress...."
                type="warning"
            />
        </div>
    );
};

export default ViewAllStanderdOrder;
