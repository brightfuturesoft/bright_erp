import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { useState, useContext } from 'react';
import { Form, Input, Button, Space, message } from 'antd';
import { Erp_context } from '@/provider/ErpContext';
import { save_company_info } from '@/helpers/local-storage';
import { Item } from '../Company_info';
const baseUrls = {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    twitter: 'https://twitter.com/',
    linkedin: 'https://linkedin.com/in/',
    youtube: 'https://youtube.com/',
    tiktok: 'https://tiktok.com/@',
    whatsapp: 'https://wa.me/', // WhatsApp business number
};
export default function Social_links({ value, onUpdate }) {
    const [edit, setEdit] = useState(false);
    const [form] = Form.useForm();
    const { user, workspace, set_workspace } = useContext(Erp_context);
    const handleEdit = () => {
        setEdit(true);
        form.setFieldsValue(value);
    };
    const handleCancel = () => setEdit(false);
    const handleFinish = vals => {
        const updated = Object.keys(vals).reduce((acc, key) => {
            if (vals[key]) {
                acc[key] = key === 'whatsapp' ? vals[key] : vals[key]; // keep username only
            }
            return acc;
        }, {});
        const data = {
            social_info: {
                ...updated,
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
                      _jsx('div', {
                          className:
                              'grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2',
                          children: Object.keys(baseUrls).map(key =>
                              _jsx(
                                  Item,
                                  {
                                      label:
                                          key.charAt(0).toUpperCase() +
                                          key.slice(1),
                                      value: value?.[key],
                                  },
                                  key
                              )
                          ),
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
                  className: 'mt-2 dark:text-white',
                  children: [
                      Object.keys(baseUrls).map(key =>
                          _jsx(
                              Form.Item,
                              {
                                  label:
                                      key.charAt(0).toUpperCase() +
                                      key.slice(1),
                                  name: key,
                                  className: 'dark:text-white',
                                  tooltip:
                                      key !== 'whatsapp'
                                          ? `Enter only your ${key} username`
                                          : 'Enter WhatsApp number with country code',
                                  children: _jsx(Input, {
                                      className:
                                          'dark:bg-neutral-800 dark:text-white',
                                  }),
                              },
                              key
                          )
                      ),
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
