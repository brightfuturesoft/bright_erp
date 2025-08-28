import { TreeSelect } from 'antd';
import { useMemo } from 'react';

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

const CategoryTreeSelect: React.FC<Props> = ({
    categories,
    value = [],
    onChange,
}) => {
    const treeData = useMemo(() => buildTree(categories), [categories]);

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

export default CategoryTreeSelect;
