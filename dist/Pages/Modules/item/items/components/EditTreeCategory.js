import { jsx as _jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { TreeSelect } from 'antd';
// Build tree from flat category array
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
const EditCategoryTreeSelect = ({ categories, value = [], onChange }) => {
    const [selected, setSelected] = useState(value);
    const treeData = buildTree(categories);
    // Prefill selected values in edit mode
    // useEffect(() => {
    //   setSelected(value);
    // }, [value]);
    // const handleChange = (val: string[]) => {
    //   setSelected(val);
    //   onChange?.(val);
    // };
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
        value: value,
        onChange: onChange,
    });
};
export default EditCategoryTreeSelect;
