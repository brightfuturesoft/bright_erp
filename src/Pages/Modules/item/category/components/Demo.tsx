import React, { useState } from 'react';
import { Button, Dropdown, Menu, Modal } from 'antd';
import { MoreVertical, ArrowRight } from 'lucide-react';
import EditCategoryModal from './EditCategoryModal';
import { categories } from '../Category.demo';
import Accordion from './Accordion';
import { CaretDownOutlined } from '@ant-design/icons';

const data = categories;

const Demo: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleButtonClick = (item: any) => {
        if (item.children && item.children.length > 1) {
            setSelectedItem(item);
            setModalVisible(true);
        }
    };

    return (
        <div className="p-6">
            <div className="grid md:grid-cols-3 grid-cols-2 grid-cols-1 gap-4 mb-8">
                {
                    data?.map((itm, index) =>
                        <div
                            onClick={() => handleButtonClick(itm)}
                            key={itm?.name} className="relative overflow-hidden transition-all duration-200 bg-gray-10 border dark:border-gray-700 border-gray-200 rounded-lg dark:hover:bg-gray-800">
                            <div className="p-2 lg:px-2 lg:py-2 flex items-start justify-between">
                                <div className="flex items-center justify-start space-x-2">
                                    <img
                                        src={itm?.img} alt={index}
                                        className="w-16 h-16 rounded border border-gray-600" />
                                    <div className="flex-shrink-0 w-px h-16 dark:bg-gray-700 bg-gray-200" />
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-500 sm:text-base lg:text-md">
                                            <a href="#" title="">
                                                {itm.name}
                                                <span className="absolute inset-0" aria-hidden="true" />
                                            </a>
                                        </h3>
                                        <p className="mt-2 text-sm font-medium text-gray-500">
                                            {itm?.type}
                                        </p>
                                    </div>
                                </div>
                                {itm.children && (
                                    <Button
                                        type="default"
                                        shape='circle'
                                        size='small'
                                        icon={<CaretDownOutlined size={10} />}
                                        className="dark:bg-light-dark bg-gray-50 !text-gray-500 shadow-none   hover:opacity-1 hover:!bg-transparent"

                                    />
                                )}
                            </div>
                        </div>
                    )
                }
            </div>

            <Modal
                title="Categories"
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                footer={null}
            >
                {selectedItem && <Accordion data={selectedItem} />}
            </Modal>
        </div>
    );
};

export default Demo;
