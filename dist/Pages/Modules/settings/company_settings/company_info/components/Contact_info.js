import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useEffect, useContext } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { save_company_info } from '@/helpers/local-storage';
import { Item } from '../Company_info';
export default function Contact_info({ value, onUpdate }) {
    const [edit, setEdit] = useState(false);
    const { user, workspace, set_workspace } = useContext(Erp_context);
    const [form] = Form.useForm();
    const [phones, setPhones] = useState([...(value?.phone_number || [])]);
    // Update phones if value changes
    useEffect(() => {
        setPhones([...(value?.phone_number || [])]);
    }, [value]);
    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue({ ...value, phone_number: phones });
    };
    const handleCancel = () => {
        setEdit(false);
        setPhones([...(value?.phone_number || [])]);
    };
    const handleFinish = vals => {
        // onUpdate({ ...vals, phone_number: phones });
        const data = {
            contact_info: {
                official_email: vals.official_email,
                support_email: vals.support_email,
                phone_number: phones,
                fax: vals.fax,
            },
        };
        console.log(data, 'data');
        fetch(
            `${import.meta.env.VITE_BASE_URL}settings/company/update-company`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
                body: JSON.stringify(data),
            }
        )
            .then(response => response.json())
            .then(data => {
                console.log(data, 'data');
                if (!data.error) {
                    save_company_info(data.data);
                    set_workspace(data.data);
                    message.success(data.message);
                    setEdit(false);
                } else {
                    message.error(data.message);
                }
            });
        // setEdit(false);
    };
    const addPhone = () => setPhones([...phones, '']);
    const removePhone = idx => setPhones(phones.filter((_, i) => i !== idx));
    const handlePhoneChange = (val, idx) => {
        const arr = [...phones];
        arr[idx] = val;
        setPhones(arr);
    };
    return _jsx('div', {
        children: !edit
            ? _jsxs('div', {
                  children: [
                      _jsxs('div', {
                          className:
                              'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2',
                          children: [
                              _jsx(Item, {
                                  label: 'Official Email',
                                  value: value?.official_email,
                              }),
                              _jsx(Item, {
                                  label: 'Support Email',
                                  value: value?.support_email,
                              }),
                              _jsx('div', {
                                  className: 'sm:col-span-2',
                                  children: _jsx(Item, {
                                      label: 'Phone Number(s)',
                                      value: phones.filter(Boolean).join(', '),
                                  }),
                              }),
                              _jsx(Item, { label: 'Fax', value: value?.fax }),
                          ],
                      }),
                      _jsx(Button, {
                          className: 'mt-6',
                          onClick: handleEdit,
                          type: 'primary',
                          children: 'Edit',
                      }),
                  ],
              })
            : _jsxs(Form, {
                  layout: 'vertical',
                  form: form,
                  initialValues: value,
                  onFinish: handleFinish,
                  className: 'mt-2',
                  children: [
                      _jsx(Form.Item, {
                          required: true,
                          label: 'Official Email',
                          name: 'official_email',
                          rules: [{ type: 'email' }],
                          children: _jsx(Input, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                          }),
                      }),
                      _jsx(Form.Item, {
                          label: 'Support Email',
                          name: 'support_email',
                          rules: [{ type: 'email' }],
                          children: _jsx(Input, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                          }),
                      }),
                      _jsxs(Form.Item, {
                          label: 'Phone Number',
                          required: true,
                          children: [
                              phones.map((num, idx) =>
                                  _jsxs(
                                      Space,
                                      {
                                          className: 'flex mb-2',
                                          children: [
                                              _jsx(Input, {
                                                  value: num,
                                                  onChange: e =>
                                                      handlePhoneChange(
                                                          e.target.value,
                                                          idx
                                                      ),
                                                  className:
                                                      'dark:bg-neutral-800 dark:text-white',
                                                  placeholder: `Phone #${idx + 1}`,
                                              }),
                                              phones.length > 1 &&
                                                  _jsx(Button, {
                                                      danger: true,
                                                      type: 'text',
                                                      onClick: () =>
                                                          removePhone(idx),
                                                      className: 'ml-2',
                                                      children: 'Remove',
                                                  }),
                                          ],
                                      },
                                      idx
                                  )
                              ),
                              _jsx(Button, {
                                  type: 'dashed',
                                  onClick: addPhone,
                                  className: 'mt-2',
                                  children: 'Add Phone',
                              }),
                          ],
                      }),
                      _jsx(Form.Item, {
                          label: 'Fax',
                          name: 'fax',
                          children: _jsx(Input, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                          }),
                      }),
                      _jsxs(Space, {
                          className: 'mt-6',
                          children: [
                              _jsx(Button, {
                                  htmlType: 'submit',
                                  type: 'primary',
                                  children: 'Update',
                              }),
                              _jsx(Button, {
                                  htmlType: 'button',
                                  onClick: handleCancel,
                                  children: 'Cancel',
                              }),
                          ],
                      }),
                  ],
              }),
    });
}
