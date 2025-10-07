import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useContext, useState } from 'react';
import { Form, Input, Select, Button, Space, message } from 'antd';
import { save_company_info } from '@/helpers/local-storage';
import { Erp_context } from '@/provider/ErpContext';
import { Item } from '../Company_info';
const { Option } = Select;
const countries = [
    'Bangladesh',
    'United States',
    'United Kingdom',
    'India',
    'Canada',
    'Australia',
];
export default function Address_info({ value, onUpdate }) {
    const { user, workspace, set_workspace } = useContext(Erp_context);
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();
    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue(value);
    };
    const handleCancel = () => setEdit(false);
    const handleFinish = vals => {
        const data = {
            address_info: {
                country: vals.country,
                state: vals.state,
                city: vals.city,
                zip_code: vals.zip_code,
                address: vals.address,
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
                                  label: 'Country',
                                  value: value.country,
                              }),
                              _jsx(Item, {
                                  label: 'State/Province',
                                  value: value.state,
                              }),
                              _jsx(Item, { label: 'City', value: value.city }),
                              _jsx(Item, {
                                  label: 'Postal/ZIP Code',
                                  value: value.zip_code,
                              }),
                              _jsx('div', {
                                  className: 'sm:col-span-2',
                                  children: _jsx(Item, {
                                      label: 'Full Address',
                                      value: value.address,
                                  }),
                              }),
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
                          label: 'Country',
                          name: 'country',
                          rules: [{ required: true }],
                          children: _jsx(Select, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                              dropdownClassName:
                                  'dark:bg-neutral-800 dark:text-white',
                              children: countries.map(country =>
                                  _jsx(
                                      Option,
                                      { value: country, children: country },
                                      country
                                  )
                              ),
                          }),
                      }),
                      _jsx(Form.Item, {
                          label: 'State/Province',
                          name: 'state',
                          children: _jsx(Input, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                          }),
                      }),
                      _jsx(Form.Item, {
                          label: 'City',
                          name: 'city',
                          children: _jsx(Input, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                          }),
                      }),
                      _jsx(Form.Item, {
                          label: 'Postal/ZIP Code',
                          name: 'zip_code',
                          children: _jsx(Input, {
                              className: 'dark:bg-neutral-800 dark:text-white',
                          }),
                      }),
                      _jsx(Form.Item, {
                          label: 'Full Address',
                          name: 'address',
                          children: _jsx(Input.TextArea, {
                              rows: 3,
                              className: 'dark:bg-neutral-800 dark:text-white',
                              placeholder: 'Full Address',
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
