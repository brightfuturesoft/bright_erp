import React, { useEffect, useState } from 'react';
import { TreeSelect } from 'antd';

interface Category {
    _id: string;
    name: string;
    parentId?: string;
    children?: Category[];
}

interface Props {
    categories: Category[];
    value?: string[];
    onChange?: (val: string[]) => void;
}

// Build tree from flat category array
function buildTree(categories: Category[]) {
    const nodes: Record<string, any> = {};

    categories.forEach(cat => {
        nodes[cat._id] = { ...cat, children: [] };
    });

    categories.forEach(cat => {
        if (cat.parentId && nodes[cat.parentId]) {
            nodes[cat.parentId].children.push(nodes[cat._id]);
        }
    });

    const tree: any[] = [];
    categories.forEach(cat => {
        if (!cat.parentId) tree.push(nodes[cat._id]);
    });

    function toTreeData(node: any): any {
        return {
            title: node.name,
            value: node._id,
            key: node._id,
            children: node.children.map(toTreeData),
        };
    }

    return tree.map(toTreeData);
}

const EditCategoryTreeSelect: React.FC<Props> = ({
    categories,
    value = [],
    onChange,
}) => {
    const [selected, setSelected] = useState<string[]>(value);

    const treeData = buildTree(categories);

    // Prefill selected values in edit mode
    // useEffect(() => {
    //   setSelected(value);
    // }, [value]);

    // const handleChange = (val: string[]) => {
    //   setSelected(val);
    //   onChange?.(val);
    // };

    return (
        <TreeSelect
            treeData={treeData}
            treeCheckable
            treeCheckStrictly
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            placeholder="Select Category"
            style={{ width: '100%' }}
            allowClear
            multiple
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            value={value}
            onChange={onChange}
        />
    );
};

export default EditCategoryTreeSelect;
