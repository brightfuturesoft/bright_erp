import React, { useState } from 'react';
import BuisnessOwnerTable from './BuisnessOwnerTable';
import RetainedEarningsTable from './RetainedEarningsTable';

const OwnersEquity: React.FC = () => {

    const data = {
        "_id": 1,
        "label": "ownerQuantity",
        "title": "Business Owner Contribution and Drawing",
        "businessOwnerTable": {
            "label": "Business Owner Contribution and Drawing",
            "data": [{
                "amount": 5000,
                "ac_name": "Ferdaos",
                "description": "this is a description",
                "status": true,
                "date": "2020-01-01",
                "category": "buisness_quantity"
            },
            {
                "amount": 2500,
                "ac_name": "Akbar",
                "description": "second entry",
                "status": true,
                "date": "2020-02-01",
                "category": "buisness_quantity"
            },
            {
                "amount": 3200,
                "ac_name": "Latif",
                "description": "third entry",
                "status": false,
                "date": "2020-03-01",
                "category": "buisness_quantity"
            },
            {
                "amount": 4100,
                "ac_name": "Nadia",
                "description": "fourth entry",
                "status": true,
                "date": "2020-04-01",
                "category": "buisness_quantity"
            },
            {
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "buisness_quantity"
            },
            {
                "amount": 3600,
                "ac_name": "Rahim",
                "description": "sixth entry",
                "status": true,
                "date": "2020-06-01",
                "category": "buisness_quantity"
            }
            ]
        },
        "retainedEarningsTable": {
            "label": "Retained Earnings",
            "data": [{
                "amount": 2800,
                "ac_name": "Omar",
                "description": "fifth entry",
                "status": false,
                "date": "2020-05-01",
                "category": "retained_earnings"
            }]

        }
    }


    return (
        <div className='md:w-full w-[92vw]'>
            <BuisnessOwnerTable data={data?.businessOwnerTable} />
            <br />
            <RetainedEarningsTable data={data?.retainedEarningsTable} />

        </div>
    );
};

export default OwnersEquity;
