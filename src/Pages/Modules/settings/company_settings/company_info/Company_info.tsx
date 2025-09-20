import React, { useContext, useState } from 'react';
import { Tabs, Button, message } from 'antd';
import Basic_info from './components/Basic_info';
import Contact_info from './components/Contact_info';
import Address_info from './components/Address_info';
import Social_links from './components/Social_links';
import { Erp_context } from '@/provider/ErpContext';

const { TabPane } = Tabs;

export default function Company_Info() {
    const { user, workspace } = useContext(Erp_context);
    const [data, setData] = useState(workspace);

    console.log(workspace, 'data');

    const handleUpdate = (category: string, values: any) => {
        const updated = { ...data, [category]: values };
        setData(updated);
        message.success('Updated successfully!');
        console.log('Updated Data:', { ...updated });
    };

    console.log(workspace, 'workspace');

    return (
        <div className=" p-6 rounded-lg text-black dark:text-white max-w-5xl">
            <div className="text-2xl font-bold mb-3">Company Profile</div>
            <Tabs
                defaultActiveKey="basic"
                type="card"
                destroyInactiveTabPane
                tabBarGutter={16}
                items={[
                    {
                        key: 'basic',
                        label: 'Basic Info',
                        children: (
                            <Basic_info
                                value={workspace?.basic_info}
                                onUpdate={values =>
                                    handleUpdate('basic', values)
                                }
                            />
                        ),
                    },
                    {
                        key: 'contact',
                        label: 'Contact Info',
                        children: (
                            <Contact_info
                                value={workspace?.contact_info}
                                onUpdate={values =>
                                    handleUpdate('contact', values)
                                }
                            />
                        ),
                    },
                    {
                        key: 'address',
                        label: 'Address Info',
                        children: (
                            <Address_info
                                value={workspace?.address_info}
                                onUpdate={values =>
                                    handleUpdate('address', values)
                                }
                            />
                        ),
                    },
                    {
                        key: 'social',
                        label: 'Social Links',
                        children: (
                            <Social_links
                                value={workspace?.social_info}
                                onUpdate={values =>
                                    handleUpdate('social', values)
                                }
                            />
                        ),
                    },
                ]}
            />
        </div>
    );
}

export function Item({
    label,
    value,
}: {
    label: string;
    value?: React.ReactNode;
}) {
    return (
        <div className="mb-2 dark:text-gray-200 text-black">
            <div className=" font-semibold ">{label}</div>
            <div className="text-base font-medium mt-0.5 dark:text-gray-400 text-black">
                {value || <span className="italic ">Not set</span>}
            </div>
        </div>
    );
}
