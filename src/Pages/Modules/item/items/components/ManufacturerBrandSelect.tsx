import React from 'react';
import { Form, Select } from 'antd';

interface ManufacturerBrandSelectProps {
    itemType: string;
    manufacturers: any[];
    brandData: any[];
}

const ManufacturerBrandSelect: React.FC<ManufacturerBrandSelectProps> = ({
    itemType,
    manufacturers,
    brandData,
}) => {
    if (itemType !== 'product') return null;

    return (
        <div className="flex gap-3">
            {/* Manufacturer */}
            <Form.Item
                label="Manufacturer"
                name="manufacturer"
                className="flex-1 mb-0"
            >
                <Select
                    allowClear
                    placeholder="Select Manufacturer"
                    labelInValue
                    options={
                        Array.isArray(manufacturers)
                            ? manufacturers.map((m: any) => ({
                                  label: m.manufacturer,
                                  value: m._id,
                                  key: m._id,
                              }))
                            : []
                    }
                />
            </Form.Item>

            {/* Brand */}
            <Form.Item
                label="Brand"
                name="brand"
                className="flex-1 mb-0"
            >
                <Select
                    allowClear
                    placeholder="Select Brand"
                    labelInValue
                    options={
                        Array.isArray(brandData)
                            ? brandData.map((b: any) => ({
                                  label: b.brand,
                                  value: b._id,
                              }))
                            : []
                    }
                />
            </Form.Item>
        </div>
    );
};

export default ManufacturerBrandSelect;
