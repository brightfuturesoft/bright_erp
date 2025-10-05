'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext, useRef, useEffect } from 'react';
import { Button, message, Input } from 'antd';
import JoditEditor from 'jodit-react';
import { Erp_context } from '@/provider/ErpContext';
const TermEditor = ({ term, onSave }) => {
    const { user } = useContext(Erp_context);
    const editor = useRef(null);
    const [title, setTitle] = useState(term.title);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTitle(term.title);
    }, [term]);
    const handleSave = async () => {
        if (!term._id) return;
        setLoading(true);
        try {
            const description =
                editor.current?.value ||
                editor.current?.editor?.getEditorValue?.() ||
                '';
            const res = await fetch(
                `${import.meta.env.VITE_BASE_URL}ecommerce/terms/update-term`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `${user?._id}`,
                        workspace_id: `${user?.workspace_id}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: term._id,
                        title,
                        description,
                    }),
                }
            );
            const result = await res.json();
            if (result.error) message.error(result.message);
            else {
                message.success('Term updated successfully');
                onSave?.(result.data);
            }
        } catch (err) {
            console.error(err);
            message.error('Failed to update term');
        } finally {
            setLoading(false);
        }
    };
    return _jsxs('div', {
        className: 'min-h-screen p-6 bg-gray-50 dark:bg-gray-900',
        children: [
            _jsx(Input, {
                value: title,
                onChange: e => setTitle(e.target.value),
                placeholder: 'Term Title',
                className:
                    'mb-4 text-lg font-semibold dark:bg-gray-800 dark:text-white',
            }),
            _jsx(JoditEditor, {
                ref: editor,
                value: term.description || '',
                config: {
                    readonly: false,
                    height: 500,
                    toolbarSticky: true,
                    theme: 'dark',
                    toolbarButtonSize: 'middle',
                    toolbarAdaptive: false,
                    toolbarStickyOffset: 0,
                },
                className: 'jodit-editor bg-gray-900 text-white',
            }),
            _jsx('div', {
                className: 'mt-4',
                children: _jsx(Button, {
                    type: 'primary',
                    onClick: handleSave,
                    loading: loading,
                    className: 'bg-blue-600 dark:bg-blue-500',
                    children: 'Save',
                }),
            }),
        ],
    });
};
export default TermEditor;
