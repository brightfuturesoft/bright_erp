import React from 'react';
import DashboardTitle from '../CommonComponents/DashboardTitle';
import { UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FileAddFilled } from '@ant-design/icons';

const DashboardHomeModule: React.FC = () => {
    const dashboardButtons = [
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#e2ebff', // This can be any color code
            color: '#225ddb', // This can be any color code
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Quotation',
            path: '/dashboard',
            bg: '#ffe2f9', // This can be any color code
            color: '#db226f', // This can be any color code
            icon: <FileAddFilled className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#e2ebff', // This can be any color code
            color: '#225ddb', // This can be any color code
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#e2ebff', // This can be any color code
            color: '#225ddb', // This can be any color code
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#e2ebff', // This can be any color code
            color: '#225ddb', // This can be any color code
            icon: <UserPlus className='text-xl' />
        },
        {
            name: 'Create Customer',
            path: '/dashboard',
            bg: '#e2ebff', // This can be any color code
            color: '#225ddb', // This can be any color code
            icon: <UserPlus className='text-xl' />
        },
    ];

    return (
        <div className='mt-3'>
            <DashboardTitle title={'Dashboard'} />
            <div className="grid grid-cols-6 gap-2 mt-4">
                {
                    dashboardButtons.map((itm, index) => (
                        <Link to={itm.path} key={index}>
                            <div style={{ backgroundColor: itm.bg, color: itm?.color }}
                                className={` p-4 rounded-lg   flex items-center justify-center`}>
                                {itm.icon}
                                <h4 className="ml-2 font-bold text-md">{itm.name}</h4>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default DashboardHomeModule;
