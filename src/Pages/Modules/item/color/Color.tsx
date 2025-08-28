import { Button, message } from 'antd';
import Section from '../../common/components/Section';
import TableController from '../../common/components/TableController';
import DataTable from './components/DataTable';
import { useContext, useEffect, useMemo, useState } from 'react';
import type { DataType } from './Color.type';
import ColorModal from './components/ColorModal';
import ConfirmModal from './components/ConfirmationModal';
import { CloudCog } from 'lucide-react';
import { Erp_context } from '@/provider/ErpContext';

const BASE = `${import.meta.env.VITE_BASE_URL}/items/color`;

const Color = () => {
    const { user } = useContext(Erp_context);
    console.log(user);
    const [searchValue, setSearchValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingColor, setEditingColor] = useState<DataType | null>(null);
    const [errorMsg, setErrorMsg] = useState('');

    const [colors, setColors] = useState<DataType[]>([]);
    const [loading, setLoading] = useState(false);

    // confirm dialog
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmTitle, setConfirmTitle] = useState('');
    const [confirmMessage, setConfirmMessage] = useState('');
    const [confirmAction, setConfirmAction] = useState<() => void>(() => {});

    const authHeaders = useMemo(
        () => ({
            'Content-Type': 'application/json',
            Authorization: `${user?._id}`,
            workspace_id: `${user?.workspace_id}`,
        }),
        [user?._id, user?.workspace_id]
    );

    // fetch colors
    const fetchColors = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${BASE}/get-color`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${user?._id}`,
                    workspace_id: `${user?.workspace_id}`,
                },
            });
            if (!res.ok) throw new Error('Failed to fetch colors');
            const json = await res.json();
            const list: DataType[] = json?.data ?? [];
            setColors(list);
        } catch (e) {
            console.error(e);
            message.error('Failed to load colors');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchColors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // local search filter
    const filteredData = useMemo(() => {
        const q = searchValue.trim().toLowerCase();
        if (!q) return colors;
        return colors.filter(
            item =>
                item.name?.toLowerCase().includes(q) ||
                item.code?.toLowerCase().includes(q)
        );
    }, [colors, searchValue]);

    // add/edit
    const handleAddClick = () => {
        setEditingColor(null);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleEditClick = (rec: DataType) => {
        setEditingColor(rec);
        setIsModalOpen(true);
        setErrorMsg('');
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingColor(null);
        setErrorMsg('');
    };

    const handleSubmit = async (values: any) => {
        const payload: any = {
            name: values.name,
            code: values.color_code,
            status: values.status, // "active" | "inactive"
        };

        let url = `${BASE}/create-color`;
        let method = 'POST';

        if (editingColor) {
            url = `${BASE}/update-color`;
            method = 'PUT';
            payload.id = editingColor._id;
        }

        try {
            const res = await fetch(url, {
                method,
                headers: authHeaders,
                body: JSON.stringify(payload),
            });
            const result = await res.json();
            if (result.error) {
                setErrorMsg(result.message || 'Operation failed');
                return;
            }
            message.success(editingColor ? 'Color updated' : 'Color added');
            setIsModalOpen(false);
            setEditingColor(null);
            setErrorMsg('');
            fetchColors();
        } catch (e) {
            console.error(e);
            setErrorMsg('Network error');
        }
    };

    // toggle active/inactive => update-color
    const doToggleStatus = async (rec: DataType) => {
        try {
            const res = await fetch(`${BASE}/update-color`, {
                method: 'PUT',
                headers: authHeaders,
                body: JSON.stringify({
                    id: rec._id,
                    status: rec.status === 'active' ? 'inactive' : 'active',
                }),
            });
            const result = await res.json();
            if (result.error) {
                message.error(result.message || 'Failed to update status');
            } else {
                message.success(
                    rec.status === 'active'
                        ? 'Color made inactive'
                        : 'Color made active'
                );
                fetchColors();
            }
        } catch (e) {
            console.error(e);
            message.error('Network error');
        }
    };

    // delete/restore => delete-color (PATCH) with { status: true|false }
    const doDeleteToggle = async (rec: DataType) => {
        const nextStatus = !(rec.deleted ?? false); // true means delete, false means restore
        try {
            const res = await fetch(`${BASE}/delete-color`, {
                method: 'PATCH',
                headers: authHeaders,
                body: JSON.stringify({ id: rec._id, status: nextStatus }),
            });
            const result = await res.json();
            if (result.error) {
                message.error(
                    result.message || 'Failed to update delete status'
                );
            } else {
                message.success(
                    nextStatus ? 'Color deleted' : 'Color restored'
                );
                fetchColors();
            }
        } catch (e) {
            console.error(e);
            message.error('Network error');
        }
    };

    // confirm wrappers
    const confirm = (title: string, msg: string, action: () => void) => {
        setConfirmTitle(title);
        setConfirmMessage(msg);
        setConfirmAction(() => action);
        setConfirmOpen(true);
    };

    return (
        <>
            <Section
                title="Colors"
                sideComponent={
                    <Button onClick={handleAddClick}>Add New</Button>
                }
            >
                <TableController
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                />
                <DataTable
                    data={filteredData}
                    loading={loading}
                    onEdit={handleEditClick}
                    onToggleStatus={rec =>
                        confirm(
                            rec.status === 'active'
                                ? 'Make Inactive'
                                : 'Make Active',
                            `Are you sure you want to set "${rec.name}" as ${
                                rec.status === 'active' ? 'Inactive' : 'Active'
                            }?`,
                            () => doToggleStatus(rec)
                        )
                    }
                    onDeleteToggle={rec =>
                        confirm(
                            rec.deleted ? 'Restore Colour' : 'Delete Colour',
                            `Are you sure you want to ${rec.deleted ? 'restore' : 'delete'} "${rec.name}"?`,
                            () => doDeleteToggle(rec)
                        )
                    }
                />
            </Section>

            <ColorModal
                open={isModalOpen}
                onClose={handleModalClose}
                onSubmit={handleSubmit}
                editingColor={editingColor}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
            />

            <ConfirmModal
                open={confirmOpen}
                title={confirmTitle}
                message={confirmMessage}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => {
                    setConfirmOpen(false);
                    confirmAction();
                }}
            />
        </>
    );
};

export default Color;
