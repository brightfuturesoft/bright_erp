import { jsx as _jsx } from 'react/jsx-runtime';
import { TreeSelect } from 'antd';
import { useMemo, useState, useEffect } from 'react';
function buildTree(categories) {
    const nodes = {};
    categories.forEach(cat => {
        nodes[cat._id] = { ...cat, children: [] };
    });
    categories.forEach(cat => {
        if (cat.parentId && nodes[cat.parentId]) {
            nodes[cat.parentId].children.push(nodes[cat._id]);
        }
    });
    const tree = [];
    categories.forEach(cat => {
        if (!cat.parentId) tree.push(nodes[cat._id]);
    });
    function toTreeData(node) {
        return {
            title: node.name,
            value: node._id,
            key: node._id,
            children: node.children.map(toTreeData),
        };
    }
    return tree.map(toTreeData);
}
const CategoryTreeSelect = ({ categories, value = [], onChange }) => {
    const [selected, setSelected] = useState(value);
    const treeData = useMemo(() => buildTree(categories), [categories]);
    useEffect(() => {
        setSelected(value);
    }, [value]);
    const handleChange = val => {
        setSelected(val);
        onChange?.(val);
    };
    return _jsx(TreeSelect, {
        treeData: treeData,
        treeCheckable: true,
        treeCheckStrictly: true,
        showCheckedStrategy: TreeSelect.SHOW_ALL,
        placeholder: 'Select Category',
        style: { width: '100%' },
        allowClear: true,
        multiple: true,
        dropdownStyle: { maxHeight: 400, overflow: 'auto' },
        value: selected,
        onChange: handleChange,
    });
};
export default CategoryTreeSelect;
