import { Button } from 'antd';
import { Fullscreen, Mail, Phone } from 'lucide-react';
import React from 'react';
import RelatedInformationTabs from './RelatedInformationTabs/RelatedInformationTabs';

const CustomerInformation = () => {
    return (
        <div className="mt-12 dark:text-light text-dark">
            <div className="grid md:grid-cols-4 gap-2">
                <div>
                    <h3 className="text-md font-semibold pb-2 dark:text-light text-dark">
                        Customer Information
                    </h3>
                    <div className="border dark:border-dark-gray md:block flex gap-4 items-start p-4">
                        <img
                            src={`https://avatars.githubusercontent.com/u/76812306?v=4`}
                            alt=""
                            className="w-[120px] h-[120px] object-cover rounded"
                        />
                        <div className="flex flex-col space-y-1 md:mt-3">
                            <span className="font-bold text-2xl dark:text-light text-dark text-start">
                                Nahid
                            </span>
                            <a
                                href="mailto:mdnahid360s@gmail.com"
                                className="md:text-sm text-blue-500 mt-3 flex items-center gap-2 text-xs text-start"
                            >
                                <Mail size={14} /> mdnahid@example.com
                            </a>
                            <a
                                href="tel:+8801303531371"
                                className="md:text-sm text-xs text-green-500 text-start flex items-center gap-2"
                            >
                                <Phone size={14} /> +8801712345678
                            </a>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-3">
                    <div className="flex pb-2 items-center justify-between">
                        <h3 className="text-md font-semibold pb-3 dark:text-light text-dark">
                            Related Information
                        </h3>
                        <Button
                            type="primary"
                            icon={
                                <Fullscreen
                                    size={16}
                                    strokeWidth={2}
                                />
                            }
                            className="md:hidden flex items-center"
                        >
                            View All
                        </Button>
                    </div>

                    <div className="md:mt-[-13px]">
                        <div className=" relative">
                            <RelatedInformationTabs />
                        </div>
                        <Button
                            type="primary"
                            icon={
                                <Fullscreen
                                    size={16}
                                    strokeWidth={2}
                                />
                            }
                            className="absolute md:flex items-center hidden top-[11px] right-[10px] z-10"
                        >
                            View All
                        </Button>
                    </div>
                    <br />
                    <br />
                    <br />
                </div>
            </div>
        </div>
    );
};

export default CustomerInformation;
