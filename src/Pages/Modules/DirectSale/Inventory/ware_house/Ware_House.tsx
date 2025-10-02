import React, { Component } from 'react';
import axios from 'axios';
import { getBaseUrl } from '@/helpers/config/envConfig';

type Props = {};

type State = {
    isModalOpen: boolean;
    isAreaModalOpen: boolean;
    isWarehouseView: boolean;
    isAreaView: boolean;
    isRackView: boolean;
    isShelfView: boolean;
    isCellView: boolean;

    currentStep: number;
    warehouseData: {
        name: string;
        slag: string;
        address: string;
        description: string;
        image: File | null;
    };
    areaData: { description: string };
    rackData: { description: string };
    shelfData: { description: string };
    cellData: { description: string };
    warehouses: Array<{
        _id?: string;
        name: string;
        address: string;
        areaCount: number;
        rackCount: number;
        shelfCount: number;
        cellCount: number;
        status?: string;
    }>;
    areas: Array<{
        _id: string;
        name: string;
        warehouse: string;
        status: string;
    }>;
    racks: Array<{
        _id: string;
        name: string;
        warehouse: string;
        status: string;
    }>;
    shelfs: Array<{
        _id: string;
        name: string;
        warehouse: string;
        status: string;
    }>;
    cells: Array<{
        _id: string;
        name: string;
        warehouse: string;
        area: string;
        shelf: string;
        rack: string;
        status: string;
    }>;
    warehouseDetails: {
        warehouse: any;
        areas: Array<any>;
        racks: Array<any>;
        shelfs: Array<any>;
        cells: Array<any>;
    };
    filteredAreas: Array<{
        _id: string;
        name: string;
        warehouse: string;
        status: string;
    }>;
    filteredRacks: Array<{
        _id: string;
        name: string;
        warehouse: string;
        status: string;
    }>;
    filteredShelfs: Array<{
        _id: string;
        name: string;
        warehouse: string;
        status: string;
    }>;
    isWarehouseDetailsView: boolean;
    loading: boolean;
    error: string | null;
    selectedWarehouse: string;
    selectedArea: string;
    selectedRack: string;
    selectedShelf: string;
    areaDescription: string;
    selectedWarehouseForDetails: string;
    activeTab: string;
    isAddModalOpen: boolean;
    isEditModalOpen: boolean;
    editingItem: any;
    modalType: string;
    // New state for edit modals and editing items
    isEditAreaModalOpen: boolean;
    isEditRackModalOpen: boolean;
    isEditShelfModalOpen: boolean;
    isEditCellModalOpen: boolean;
    isAddWarehouseModalOpen: boolean;
    isAddAreaModalOpen: boolean;
    isAddRackModalOpen: boolean;
    isAddShelfModalOpen: boolean;
    isAddCellModalOpen: boolean;
    isEditWarehouseModalOpen: boolean;
    isPreviewWarehouseModalOpen: boolean;
    editingArea: any;
    editingRack: any;
    editingShelf: any;
    editingCell: any;
    editingWarehouse: any;
    searchTerm: string;
    cellStatus: string;
    areaStatus: string;
    rackStatus: string;
    shelfStatus: string;
};

export default class Ware_House extends Component<Props, State> {
    state: State = {
        isModalOpen: false,
        isAreaModalOpen: false,
        isWarehouseView: false,
        isAreaView: false,
        isRackView: false,
        isShelfView: false,
        isCellView: false,

        currentStep: 1,
        warehouseData: {
            name: '',
            slag: '',
            address: '',
            description: '',
            image: null,
        },
        areaData: { description: '' },
        rackData: { description: '' },
        shelfData: { description: '' },
        cellData: { description: '' },
        warehouses: [],
        areas: [],
        racks: [],
        shelfs: [],
        cells: [],
        warehouseDetails: {
            warehouse: null,
            areas: [],
            racks: [],
            shelfs: [],
            cells: [],
        },
        filteredAreas: [],
        filteredRacks: [],
        filteredShelfs: [],
        isWarehouseDetailsView: false,
        loading: false,
        error: null,
        selectedWarehouse: '',
        selectedArea: '',
        selectedRack: '',
        selectedShelf: '',
        areaDescription: '',
        selectedWarehouseForDetails: '',
        activeTab: '',
        isAddModalOpen: false,
        isEditModalOpen: false,
        editingItem: null,
        modalType: '',
        // New state for edit modals and editing items
        isEditAreaModalOpen: false,
        isEditRackModalOpen: false,
        isEditShelfModalOpen: false,
        isEditCellModalOpen: false,
        isAddWarehouseModalOpen: false,
        isAddAreaModalOpen: false,
        isAddRackModalOpen: false,
        isAddShelfModalOpen: false,
        isAddCellModalOpen: false,
        isEditWarehouseModalOpen: false,
        isPreviewWarehouseModalOpen: false,
        editingArea: null,
        editingRack: null,
        editingShelf: null,
        editingCell: null,
        editingWarehouse: null,
        searchTerm: '',
        cellStatus: '',
        areaStatus: '',
        rackStatus: '',
        shelfStatus: '',
    };

    componentDidMount() {
        this.fetchWarehouses();
        this.setState({ isWarehouseView: true });
    }

    fetchFilteredAreas = async (warehouseId: string) => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/areas`,
                {
                    params: { warehouseId },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({
                    filteredAreas: response.data.data,
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error fetching filtered areas',
                loading: false,
            });
        }
    };

    fetchFilteredRacks = async (areaId: string) => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/racks/filtered`,
                {
                    params: {
                        areaId,
                        warehouseId: this.state.selectedWarehouse,
                    },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({
                    filteredRacks: response.data.data,
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error fetching filtered racks',
                loading: false,
            });
        }
    };

    fetchFilteredShelfs = async (rackId: string) => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/shelfs`,
                {
                    params: {
                        rackId,
                        warehouseId: this.state.selectedWarehouse,
                    },
                }
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({
                    filteredShelfs: response.data.data,
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error fetching filtered shelfs',
                loading: false,
            });
        }
    };

    handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ searchTerm: e.target.value });
    };

    getFilteredWarehouses = () => {
        const { warehouses, searchTerm } = this.state;
        if (!searchTerm) return warehouses;
        return warehouses.filter(
            wh =>
                wh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                wh.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    getFilteredAreas = () => {
        const { areas, searchTerm, warehouses } = this.state;
        if (!searchTerm) return areas;
        return areas.filter(area => {
            const warehouse = warehouses.find(wh => wh._id === area.warehouse);
            return (
                area.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (warehouse &&
                    warehouse.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
            );
        });
    };

    getFilteredRacks = () => {
        const { racks, searchTerm, warehouses } = this.state;
        if (!searchTerm) return racks;
        return racks.filter(rack => {
            const warehouse = warehouses.find(wh => wh._id === rack.warehouse);
            return (
                rack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (warehouse &&
                    warehouse.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
            );
        });
    };

    getFilteredShelfs = () => {
        const { shelfs, searchTerm, warehouses } = this.state;
        if (!searchTerm) return shelfs;
        return shelfs.filter(shelf => {
            const warehouse = warehouses.find(wh => wh._id === shelf.warehouse);
            return (
                shelf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (warehouse &&
                    warehouse.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
            );
        });
    };

    getFilteredCells = () => {
        const { cells, searchTerm, warehouses } = this.state;
        if (!searchTerm) return cells;
        return cells.filter(cell => {
            const warehouse = warehouses.find(wh => wh._id === cell.warehouse);
            return (
                cell.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (warehouse &&
                    warehouse.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()))
            );
        });
    };

    fetchWarehouses = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house`
            );
            console.log('Response data:', response.data);
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({
                    warehouses: response.data.data,
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching warehouses',
                loading: false,
            });
        }
    };

    fetchAreas = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/areas`
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({ areas: response.data.data, loading: false });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching areas',
                loading: false,
            });
        }
    };

    fetchRacks = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/racks`
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({ racks: response.data.data, loading: false });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching racks',
                loading: false,
            });
        }
    };

    fetchShelfs = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/shelfs`
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({ shelfs: response.data.data, loading: false });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching shelfs',
                loading: false,
            });
        }
    };

    fetchCells = async () => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/cells`
            );
            if (response.data && Array.isArray(response.data.data)) {
                this.setState({ cells: response.data.data, loading: false });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching cells',
                loading: false,
            });
        }
    };

    fetchWarehouseDetails = async (warehouseId: string) => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouseId}/details`
            );
            if (response.data && response.data.data) {
                const data = response.data.data;
                const mapName = (arr: any[]) =>
                    arr.map(item => ({
                        ...item,
                        name: item.name || item.description || '',
                    }));
                this.setState({
                    warehouseDetails: {
                        warehouse: data.warehouse,
                        areas: mapName(data.areas),
                        racks: mapName(data.racks),
                        shelfs: mapName(data.shelfs),
                        cells: mapName(data.cells),
                    },
                    isWarehouseDetailsView: true,
                    isWarehouseView: false,
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching warehouse details',
                loading: false,
            });
        }
    };

    openAddModal = () => {
        if (this.state.isWarehouseView) {
            this.setState({ isAddWarehouseModalOpen: true });
        } else if (this.state.isAreaView) {
            this.setState({ isAddAreaModalOpen: true });
        } else if (this.state.isRackView) {
            this.setState({ isAddRackModalOpen: true });
        } else if (this.state.isShelfView) {
            this.setState({ isAddShelfModalOpen: true });
        } else if (this.state.isCellView) {
            this.setState({ isAddCellModalOpen: true });
        }
    };

    closeModal = () => {
        this.setState({ isModalOpen: false, currentStep: 1 });
    };

    closeAddWarehouseModal = () => {
        this.setState({
            isAddWarehouseModalOpen: false,
            warehouseData: {
                name: '',
                slag: '',
                address: '',
                description: '',
                image: null,
            },
        });
    };

    closeAddAreaModal = () => {
        this.setState({
            isAddAreaModalOpen: false,
            selectedWarehouse: '',
            areaDescription: '',
        });
    };

    closeAddRackModal = () => {
        this.setState({
            isAddRackModalOpen: false,
            selectedWarehouse: '',
            selectedArea: '',
            areaDescription: '',
            rackStatus: '',
        });
    };

    closeAddShelfModal = () => {
        this.setState({
            isAddShelfModalOpen: false,
            selectedWarehouse: '',
            selectedArea: '',
            selectedRack: '',
            areaDescription: '',
            shelfStatus: '',
        });
    };

    closeAddCellModal = () => {
        this.setState({
            isAddCellModalOpen: false,
            selectedWarehouse: '',
            selectedArea: '',
            selectedRack: '',
            selectedShelf: '',
            areaDescription: '',
        });
    };

    openWarehouseView = () => {
        this.setState({
            isWarehouseView: true,
            isAreaView: false,
            isRackView: false,
            isShelfView: false,
            isCellView: false,
            isWarehouseDetailsView: false,
        });
    };

    openAreaView = () => {
        this.setState({
            isWarehouseView: false,
            isAreaView: true,
            isRackView: false,
            isShelfView: false,
            isCellView: false,
            isWarehouseDetailsView: false,
        });
        this.fetchAreas();
    };

    openRackView = () => {
        this.setState({
            isWarehouseView: false,
            isAreaView: false,
            isRackView: true,
            isShelfView: false,
            isCellView: false,
            isWarehouseDetailsView: false,
        });
        this.fetchRacks();
    };

    openShelfView = () => {
        this.setState({
            isWarehouseView: false,
            isAreaView: false,
            isRackView: false,
            isShelfView: true,
            isCellView: false,
            isWarehouseDetailsView: false,
        });
        this.fetchShelfs();
    };

    openCellView = () => {
        this.setState({
            isWarehouseView: false,
            isAreaView: false,
            isRackView: false,
            isShelfView: false,
            isCellView: true,
            isWarehouseDetailsView: false,
        });
        this.fetchCells();
    };

    closeView = () => {
        this.setState({
            isWarehouseView: false,
            isAreaView: false,
            isRackView: false,
            isShelfView: false,
            isCellView: false,
            isWarehouseDetailsView: false,
        });
    };

    openAreaModal = () => {
        this.setState({ isAreaModalOpen: true });
    };

    closeAreaModal = () => {
        this.setState({
            isAreaModalOpen: false,
            selectedWarehouse: '',
            areaDescription: '',
        });
    };

    // New methods to open edit modals
    openEditAreaModal = (area: any) => {
        const warehouse = this.state.warehouses.find(
            (wh: any) => wh._id === area.warehouse
        );
        this.setState({
            isEditAreaModalOpen: true,
            editingArea: area,
            selectedWarehouse: warehouse ? warehouse._id : '',
            areaDescription: area.name,
        });
    };

    closeEditAreaModal = () => {
        this.setState({
            isEditAreaModalOpen: false,
            editingArea: null,
            selectedWarehouse: '',
            areaDescription: '',
        });
    };

    handleUpdateArea = async () => {
        const { editingArea, selectedWarehouse, areaDescription } = this.state;
        if (!editingArea || !selectedWarehouse || !areaDescription) {
            this.setState({
                error: 'Please select warehouse and enter description',
            });
            return;
        }
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/area/${editingArea._id}`,
                {
                    warehouseId: selectedWarehouse,
                    description: areaDescription,
                }
            );
            await this.fetchAreas();
            await this.fetchWarehouses(); // Refresh counts
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
            this.closeEditAreaModal();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error updating area' });
        }
    };

    openEditRackModal = (rack: any) => {
        const warehouse = this.state.warehouses.find(
            (wh: any) => wh._id === rack.warehouse
        );
        this.setState({
            isEditRackModalOpen: true,
            editingRack: rack,
            selectedWarehouse: warehouse ? warehouse._id : '',
            areaDescription: rack.name, // reusing areaDescription for simplicity
        });
    };

    closeEditRackModal = () => {
        this.setState({
            isEditRackModalOpen: false,
            editingRack: null,
            selectedWarehouse: '',
            areaDescription: '',
        });
    };

    handleUpdateRack = async () => {
        const { editingRack, selectedWarehouse, areaDescription } = this.state;
        if (!editingRack || !selectedWarehouse || !areaDescription) {
            this.setState({
                error: 'Please select warehouse and enter description',
            });
            return;
        }
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/rack/${editingRack._id}`,
                {
                    warehouseId: selectedWarehouse,
                    description: areaDescription,
                }
            );
            await this.fetchRacks();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
            this.closeEditRackModal();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error updating rack' });
        }
    };

    // New update handlers for Shelf and Cell
    openEditShelfModal = (shelf: any) => {
        const warehouse = this.state.warehouses.find(
            (wh: any) => wh._id === shelf.warehouse
        );
        this.setState({
            isEditShelfModalOpen: true,
            editingShelf: shelf,
            selectedWarehouse: warehouse ? warehouse._id : '',
            areaDescription: shelf.name,
        });
    };

    closeEditShelfModal = () => {
        this.setState({
            isEditShelfModalOpen: false,
            editingShelf: null,
            selectedWarehouse: '',
            areaDescription: '',
        });
    };

    handleUpdateShelf = async () => {
        const { editingShelf, selectedWarehouse, areaDescription } = this.state;
        if (!editingShelf || !selectedWarehouse || !areaDescription) {
            this.setState({
                error: 'Please select warehouse and enter description',
            });
            return;
        }
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/shelf/${editingShelf._id}`,
                {
                    warehouseId: selectedWarehouse,
                    description: areaDescription,
                }
            );
            await this.fetchShelfs();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
            this.closeEditShelfModal();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error updating shelf' });
        }
    };

    openEditCellModal = (cell: any) => {
        const warehouse = this.state.warehouses.find(
            (wh: any) => wh._id === cell.warehouse
        );
        this.setState({
            isEditCellModalOpen: true,
            editingCell: cell,
            selectedWarehouse: warehouse ? warehouse._id : '',
            selectedArea: cell.area || '',
            selectedRack: cell.rack || '',
            selectedShelf: cell.shelf || '',
            areaDescription: cell.name,
        });
    };

    closeEditCellModal = () => {
        this.setState({
            isEditCellModalOpen: false,
            editingCell: null,
            selectedWarehouse: '',
            selectedArea: '',
            selectedRack: '',
            selectedShelf: '',
            areaDescription: '',
        });
    };

    handleUpdateCell = async () => {
        const {
            editingCell,
            selectedWarehouse,
            selectedArea,
            selectedRack,
            selectedShelf,
            areaDescription,
        } = this.state;
        if (!editingCell || !selectedWarehouse || !areaDescription) {
            this.setState({
                error: 'Please select warehouse and enter description',
            });
            return;
        }
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/cell/${editingCell._id}`,
                {
                    warehouseId: selectedWarehouse,
                    areaId: selectedArea,
                    shelfId: selectedShelf,
                    rackId: selectedRack,
                    description: areaDescription,
                }
            );
            await this.fetchCells();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
            this.closeEditCellModal();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error updating cell' });
        }
    };

    handleAddWarehouse = async () => {
        const { warehouseData } = this.state;
        if (
            !warehouseData.name ||
            !warehouseData.slag ||
            !warehouseData.address ||
            !warehouseData.description
        ) {
            this.setState({ error: 'Please fill all required fields' });
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', warehouseData.name);
            formData.append('slag', warehouseData.slag);
            formData.append('address', warehouseData.address);
            formData.append('description', warehouseData.description);
            if (warehouseData.image) {
                formData.append('image', warehouseData.image);
            }
            await axios.post(
                `${getBaseUrl}/inventory/ware_house/warehouse`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            await this.fetchWarehouses();
            this.closeAddWarehouseModal();
            this.openWarehouseView(); // Stay on warehouse view
        } catch (error: any) {
            this.setState({ error: error.message || 'Error adding warehouse' });
        }
    };

    handleAddArea = async () => {
        const { selectedWarehouse, areaDescription } = this.state;
        if (!selectedWarehouse || !areaDescription) {
            this.setState({
                error: 'Please select warehouse and enter description',
            });
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/area`, {
                warehouseId: selectedWarehouse,
                description: areaDescription,
            });
            await this.fetchAreas();
            await this.fetchWarehouses();
            this.closeAddAreaModal();
            this.openAreaView(); // Stay on area view
        } catch (error: any) {
            this.setState({ error: error.message || 'Error adding area' });
        }
    };

    handleAddRack = async () => {
        const { selectedWarehouse, selectedArea, areaDescription } = this.state;
        if (!selectedWarehouse || !selectedArea || !areaDescription) {
            this.setState({
                error: 'Please select warehouse, area and enter description',
            });
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/rack`, {
                areaId: selectedArea,
                description: areaDescription,
                status: this.state.rackStatus || 'Enable',
            });
            await this.fetchRacks();
            await this.fetchWarehouses();
            this.closeAddRackModal();
            this.openRackView(); // Stay on rack view
        } catch (error: any) {
            this.setState({ error: error.message || 'Error adding rack' });
        }
    };

    handleAddShelf = async () => {
        const {
            selectedWarehouse,
            selectedArea,
            selectedRack,
            areaDescription,
        } = this.state;
        if (
            !selectedWarehouse ||
            !selectedArea ||
            !selectedRack ||
            !areaDescription
        ) {
            this.setState({
                error: 'Please select warehouse, area, rack and enter description',
            });
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/shelf`, {
                rackId: selectedRack,
                description: areaDescription,
                status: this.state.shelfStatus || 'Enable',
            });
            await this.fetchShelfs();
            await this.fetchWarehouses();
            this.closeAddShelfModal();
            this.openShelfView(); // Stay on shelf view
        } catch (error: any) {
            this.setState({ error: error.message || 'Error adding shelf' });
        }
    };

    handleAddCell = async () => {
        const {
            selectedWarehouse,
            selectedArea,
            selectedRack,
            selectedShelf,
            areaDescription,
        } = this.state;
        if (!selectedWarehouse || !areaDescription) {
            this.setState({
                error: 'Please select warehouse and enter description',
            });
            return;
        }
        try {
            await axios.post(`${getBaseUrl}/inventory/ware_house/cell`, {
                warehouseId: selectedWarehouse,
                areaId: selectedArea,
                shelfId: selectedShelf,
                rackId: selectedRack,
                description: areaDescription,
            });
            await this.fetchCells();
            await this.fetchWarehouses();
            this.closeAddCellModal();
            this.openCellView(); // Stay on cell view
        } catch (error: any) {
            this.setState({ error: error.message || 'Error adding cell' });
        }
    };

    handleDeleteWarehouse = async (warehouseId: string) => {
        if (!window.confirm('Are you sure you want to delete this warehouse?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouseId}`
            );
            await this.fetchWarehouses();
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error deleting warehouse',
            });
        }
    };

    // New delete handlers for Area, Rack, Shelf, Cell
    handleDeleteArea = async (areaId: string) => {
        if (!window.confirm('Are you sure you want to delete this area?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/area/${areaId}`
            );
            await this.fetchAreas();
            await this.fetchWarehouses();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error deleting area' });
        }
    };

    handleDeleteRack = async (rackId: string) => {
        if (!window.confirm('Are you sure you want to delete this rack?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/rack/${rackId}`
            );
            await this.fetchRacks();
            await this.fetchWarehouses();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error deleting rack' });
        }
    };

    handleDeleteShelf = async (shelfId: string) => {
        if (!window.confirm('Are you sure you want to delete this shelf?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/shelf/${shelfId}`
            );
            await this.fetchShelfs();
            await this.fetchWarehouses();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error deleting shelf' });
        }
    };

    handleDeleteCell = async (cellId: string) => {
        if (!window.confirm('Are you sure you want to delete this cell?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/cell/${cellId}`
            );
            await this.fetchCells();
            await this.fetchWarehouses();
        } catch (error: any) {
            this.setState({ error: error.message || 'Error deleting cell' });
        }
    };

    handleUpdateWarehouseStatus = async (
        warehouseId: string,
        status: string
    ) => {
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouseId}/status`,
                { status }
            );
            await this.fetchWarehouses();
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error updating warehouse status',
            });
        }
    };

    openEditWarehouseModal = (warehouse: any) => {
        this.setState({
            isEditWarehouseModalOpen: true,
            editingWarehouse: warehouse,
            warehouseData: {
                name: warehouse.name || '',
                slag: warehouse.slag || '',
                address: warehouse.address || '',
                description: warehouse.description || '',
                image: null,
            },
        });
    };

    closeEditWarehouseModal = () => {
        this.setState({
            isEditWarehouseModalOpen: false,
            editingWarehouse: null,
            warehouseData: {
                name: '',
                slag: '',
                address: '',
                description: '',
                image: null,
            },
        });
    };

    // Add onClick handlers for edit buttons for Area, Rack, Shelf, Cell
    renderWarehouseDetailsTable = () => {
        const { warehouseDetails } = this.state;
        if (!warehouseDetails) return null;
        return (
            <div className="overflow-x-auto bg-white rounded shadow mb-4">
                <h3 className="text-lg font-bold mb-4">
                    Warehouse: {warehouseDetails.warehouse.name}
                </h3>
                <div className="mb-4">
                    <button
                        onClick={this.closeView}
                        className="bg-gray-600 text-white px-4 py-2 rounded mr-2"
                    >
                        Back to Warehouses
                    </button>
                </div>
                <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">Areas</h4>
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-left px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseDetails.areas.map(area => (
                                <tr
                                    key={area._id}
                                    className="border-t"
                                >
                                    <td className="px-4 py-2">{area.name}</td>
                                    <td className="px-4 py-2">
                                        {area.status === 'Enable' ? (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Enable
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Disable
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="text-red-600"
                                            onClick={() =>
                                                this.handleDeleteArea(area._id)
                                            }
                                        >
                                            🗑️
                                        </button>
                                        <button
                                            className="text-yellow-600"
                                            onClick={() =>
                                                this.openEditAreaModal(area)
                                            }
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">Racks</h4>
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-left px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseDetails.racks.map(rack => (
                                <tr
                                    key={rack._id}
                                    className="border-t"
                                >
                                    <td className="px-4 py-2">{rack.name}</td>
                                    <td className="px-4 py-2">
                                        {rack.status === 'Enable' ? (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Enable
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Disable
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="text-red-600"
                                            onClick={() =>
                                                this.handleDeleteRack(rack._id)
                                            }
                                        >
                                            🗑️
                                        </button>
                                        <button
                                            className="text-yellow-600"
                                            onClick={() =>
                                                this.openEditRackModal(rack)
                                            }
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">Shelfs</h4>
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-left px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseDetails.shelfs.map(shelf => (
                                <tr
                                    key={shelf._id}
                                    className="border-t"
                                >
                                    <td className="px-4 py-2">{shelf.name}</td>
                                    <td className="px-4 py-2">
                                        {shelf.status === 'Enable' ? (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Enable
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Disable
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="text-red-600"
                                            onClick={() =>
                                                this.handleDeleteShelf(
                                                    shelf._id
                                                )
                                            }
                                        >
                                            🗑️
                                        </button>
                                        <button
                                            className="text-yellow-600"
                                            onClick={() =>
                                                this.openEditShelfModal(shelf)
                                            }
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-4">
                    <h4 className="text-md font-semibold mb-2">Cells</h4>
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="text-left px-4 py-2">Name</th>
                                <th className="text-left px-4 py-2">Status</th>
                                <th className="text-left px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {warehouseDetails.cells.map(cell => (
                                <tr
                                    key={cell._id}
                                    className="border-t"
                                >
                                    <td className="px-4 py-2">{cell.name}</td>
                                    <td className="px-4 py-2">
                                        {cell.status === 'Enable' ? (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Enable
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer">
                                                Disable
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-4 py-2 flex gap-2">
                                        <button
                                            className="text-red-600"
                                            onClick={() =>
                                                this.handleDeleteCell(cell._id)
                                            }
                                        >
                                            🗑️
                                        </button>
                                        <button
                                            className="text-yellow-600"
                                            onClick={() =>
                                                this.openEditCellModal(cell)
                                            }
                                        >
                                            ✏️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };

    // New status update handlers for Area, Rack, Shelf, Cell
    handleUpdateAreaStatus = async (areaId: string, status: string) => {
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/area/${areaId}/status`,
                { status }
            );
            await this.fetchAreas();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error updating area status',
            });
        }
    };

    handleUpdateRackStatus = async (rackId: string, status: string) => {
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/rack/${rackId}/status`,
                { status }
            );
            await this.fetchRacks();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error updating rack status',
            });
        }
    };

    handleUpdateShelfStatus = async (shelfId: string, status: string) => {
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/shelf/${shelfId}/status`,
                { status }
            );
            await this.fetchShelfs();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error updating shelf status',
            });
        }
    };

    handleUpdateCellStatus = async (cellId: string, status: string) => {
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/cell/${cellId}/status`,
                { status }
            );
            await this.fetchCells();
            await this.fetchWarehouses();
            if (
                this.state.isWarehouseDetailsView &&
                this.state.warehouseDetails
            ) {
                await this.fetchWarehouseDetails(
                    this.state.warehouseDetails.warehouse._id
                );
            }
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error updating cell status',
            });
        }
    };

    handleUpdateWarehouse = async () => {
        const { editingWarehouse, warehouseData } = this.state;
        if (
            !editingWarehouse ||
            !warehouseData.name ||
            !warehouseData.slag ||
            !warehouseData.address ||
            !warehouseData.description
        ) {
            this.setState({ error: 'Please fill all required fields' });
            return;
        }
        try {
            const formData = new FormData();
            formData.append('name', warehouseData.name);
            formData.append('slag', warehouseData.slag);
            formData.append('address', warehouseData.address);
            formData.append('description', warehouseData.description);
            if (warehouseData.image) {
                formData.append('image', warehouseData.image);
            }
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/warehouse/${editingWarehouse._id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            await this.fetchWarehouses();
            this.closeEditWarehouseModal();
        } catch (error: any) {
            this.setState({
                error: error.message || 'Error updating warehouse',
            });
        }
    };

    openPreviewWarehouseModal = async (warehouse: any) => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouse._id}/details`
            );
            if (response.data && response.data.data) {
                // Fix: map warehouseDetails areas, racks, shelfs, cells to have name from description
                const data = response.data.data;
                const mapName = (arr: any[]) =>
                    arr.map(item => ({
                        ...item,
                        name: item.name || item.description || '',
                    }));
                this.setState({
                    isPreviewWarehouseModalOpen: true,
                    editingWarehouse: warehouse,
                    warehouseDetails: {
                        warehouse: data.warehouse,
                        areas: mapName(data.areas),
                        racks: mapName(data.racks),
                        shelfs: mapName(data.shelfs),
                        cells: mapName(data.cells),
                    },
                    loading: false,
                });
            } else {
                this.setState({
                    error: 'Invalid data format from server',
                    loading: false,
                });
            }
        } catch (error: any) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching warehouse details',
                loading: false,
            });
        }
    };

    closePreviewWarehouseModal = () => {
        this.setState({
            isPreviewWarehouseModalOpen: false,
            editingWarehouse: null,
        });
    };

    handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, files } = e.target as HTMLInputElement;
        const {
            currentStep,
            warehouseData,
            areaData,
            rackData,
            shelfData,
            cellData,
        } = this.state;
        if (currentStep === 1) {
            if (name === 'image' && files) {
                this.setState({
                    warehouseData: { ...warehouseData, image: files[0] },
                });
            } else {
                this.setState({
                    warehouseData: { ...warehouseData, [name]: value },
                });
            }
        } else if (currentStep === 2) {
            this.setState({ areaData: { description: value } });
        } else if (currentStep === 3) {
            this.setState({ rackData: { description: value } });
        } else if (currentStep === 4) {
            this.setState({ shelfData: { description: value } });
        } else if (currentStep === 5) {
            this.setState({ cellData: { description: value } });
        }
    };

    handleNext = async () => {
        const {
            currentStep,
            warehouseData,
            areaData,
            rackData,
            shelfData,
            cellData,
        } = this.state;
        try {
            if (currentStep === 1) {
                // Add warehouse
                const formData = new FormData();
                formData.append('name', warehouseData.name);
                formData.append('slag', warehouseData.slag);
                formData.append('address', warehouseData.address);
                formData.append('description', warehouseData.description);
                if (warehouseData.image) {
                    formData.append('image', warehouseData.image);
                }
                await axios.post(
                    `${getBaseUrl}/inventory/ware_house/warehouse`,
                    formData,
                    {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    }
                );
            } else if (currentStep === 2) {
                // Add area
                await axios.post(
                    `${getBaseUrl}/inventory/ware_house/area`,
                    areaData
                );
            } else if (currentStep === 3) {
                // Add rack
                await axios.post(
                    `${getBaseUrl}/inventory/ware_house/rack`,
                    rackData
                );
            } else if (currentStep === 4) {
                // Add shelf
                await axios.post(
                    `${getBaseUrl}/inventory/ware_house/shelf`,
                    shelfData
                );
            } else if (currentStep === 5) {
                // Add cell
                await axios.post(
                    `${getBaseUrl}/inventory/ware_house/cell`,
                    cellData
                );
            }

            if (currentStep < 5) {
                this.setState({ currentStep: currentStep + 1 });
            } else {
                // Final step: refresh warehouses list and close modal
                await this.fetchWarehouses();
                this.setState({
                    isModalOpen: false,
                    currentStep: 1,
                    warehouseData: {
                        name: '',
                        slag: '',
                        address: '',
                        description: '',
                        image: null,
                    },
                    areaData: { description: '' },
                    rackData: { description: '' },
                    shelfData: { description: '' },
                    cellData: { description: '' },
                });
            }
        } catch (error: any) {
            this.setState({ error: error.message || 'Error adding data' });
        }
    };

    renderModalContent = () => {
        const {
            currentStep,
            warehouseData,
            areaData,
            rackData,
            shelfData,
            cellData,
        } = this.state;
        switch (currentStep) {
            case 1:
                return (
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">
                            Add Warehouse
                        </h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={warehouseData.name}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="slag"
                            placeholder="Slag"
                            value={warehouseData.slag}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={warehouseData.address}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={warehouseData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={this.handleInputChange}
                            className="mb-2"
                        />
                        <button
                            onClick={this.handleNext}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Area</h2>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={areaData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleNext}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                );
            case 3:
                return (
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Rack</h2>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={rackData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleNext}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Shelf</h2>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={shelfData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleNext}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Next
                        </button>
                    </div>
                );
            case 5:
                return (
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Cell</h2>
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={cellData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleNext}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    renderAreaModal = () => {
        const { warehouses, selectedWarehouse, areaDescription } = this.state;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Area</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={e =>
                                this.setState({
                                    selectedWarehouse: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleAddArea}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeAreaModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // New render method for edit area modal
    renderEditAreaModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            areaDescription,
            isEditAreaModalOpen,
        } = this.state;
        if (!isEditAreaModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Edit Area</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={e =>
                                this.setState({
                                    selectedWarehouse: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleUpdateArea}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeEditAreaModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render edit rack modal
    renderEditRackModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            areaDescription,
            isEditRackModalOpen,
        } = this.state;
        if (!isEditRackModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Edit Rack</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={e =>
                                this.setState({
                                    selectedWarehouse: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleUpdateRack}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeEditRackModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render edit shelf modal
    renderEditShelfModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            areaDescription,
            isEditShelfModalOpen,
        } = this.state;
        if (!isEditShelfModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Edit Shelf</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={e =>
                                this.setState({
                                    selectedWarehouse: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleUpdateShelf}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeEditShelfModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render edit cell modal
    renderEditCellModal = () => {
        const {
            warehouses,
            areas,
            racks,
            shelfs,
            selectedWarehouse,
            selectedArea,
            selectedRack,
            selectedShelf,
            areaDescription,
            isEditCellModalOpen,
        } = this.state;
        if (!isEditCellModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Edit Cell</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={e =>
                                this.setState({
                                    selectedWarehouse: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedArea}
                            onChange={e =>
                                this.setState({ selectedArea: e.target.value })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Area</option>
                            {areas.map(area => (
                                <option
                                    key={area._id}
                                    value={area._id}
                                >
                                    {area.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedRack}
                            onChange={e =>
                                this.setState({ selectedRack: e.target.value })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Rack</option>
                            {racks.map(rack => (
                                <option
                                    key={rack._id}
                                    value={rack._id}
                                >
                                    {rack.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedShelf}
                            onChange={e =>
                                this.setState({ selectedShelf: e.target.value })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Shelf</option>
                            {shelfs.map(shelf => (
                                <option
                                    key={shelf._id}
                                    value={shelf._id}
                                >
                                    {shelf.name}
                                </option>
                            ))}
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleUpdateCell}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeEditCellModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render add warehouse modal
    renderAddWarehouseModal = () => {
        const { warehouseData, isAddWarehouseModalOpen } = this.state;
        if (!isAddWarehouseModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">
                            Add Warehouse
                        </h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={warehouseData.name}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="slag"
                            placeholder="Slag"
                            value={warehouseData.slag}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={warehouseData.address}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={warehouseData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={this.handleInputChange}
                            className="mb-2"
                        />
                        <button
                            onClick={this.handleAddWarehouse}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeAddWarehouseModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render add area modal
    renderAddAreaModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            areaDescription,
            isAddAreaModalOpen,
        } = this.state;
        if (!isAddAreaModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Area</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={e =>
                                this.setState({
                                    selectedWarehouse: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border p-2 mb-2 w-full"
                            value={this.state.areaStatus || 'Enable'}
                            onChange={e =>
                                this.setState({ areaStatus: e.target.value })
                            }
                        >
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleAddArea}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeAddAreaModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render add rack modal
    renderAddRackModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            selectedArea,
            areaDescription,
            isAddRackModalOpen,
        } = this.state;
        if (!isAddRackModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Rack</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={async e => {
                                const warehouseId = e.target.value;
                                await this.setState({
                                    selectedWarehouse: warehouseId,
                                    selectedArea: '',
                                });
                                if (warehouseId) {
                                    await this.fetchFilteredAreas(warehouseId);
                                } else {
                                    this.setState({ filteredAreas: [] });
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedArea}
                            onChange={e =>
                                this.setState({ selectedArea: e.target.value })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Area</option>
                            {this.state.filteredAreas.map(area => (
                                <option
                                    key={area._id}
                                    value={area._id}
                                >
                                    {area.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border p-2 mb-2 w-full"
                            value={this.state.rackStatus || 'Enable'}
                            onChange={e =>
                                this.setState({ rackStatus: e.target.value })
                            }
                        >
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleAddRack}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeAddRackModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render add shelf modal
    renderAddShelfModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            selectedArea,
            selectedRack,
            areaDescription,
            isAddShelfModalOpen,
        } = this.state;
        if (!isAddShelfModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Shelf</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={async e => {
                                const warehouseId = e.target.value;
                                await this.setState({
                                    selectedWarehouse: warehouseId,
                                    selectedArea: '',
                                    selectedRack: '',
                                });
                                if (warehouseId) {
                                    await this.fetchFilteredAreas(warehouseId);
                                } else {
                                    this.setState({
                                        filteredAreas: [],
                                        filteredRacks: [],
                                    });
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedArea}
                            onChange={async e => {
                                const areaId = e.target.value;
                                await this.setState({
                                    selectedArea: areaId,
                                    selectedRack: '',
                                });
                                if (areaId) {
                                    await this.fetchFilteredRacks(areaId);
                                } else {
                                    this.setState({ filteredRacks: [] });
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Area</option>
                            {this.state.filteredAreas.map(area => (
                                <option
                                    key={area._id}
                                    value={area._id}
                                >
                                    {area.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedRack}
                            onChange={e =>
                                this.setState({ selectedRack: e.target.value })
                            }
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Rack</option>
                            {this.state.filteredRacks.map(rack => (
                                <option
                                    key={rack._id}
                                    value={rack._id}
                                >
                                    {rack.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border p-2 mb-2 w-full"
                            value={this.state.shelfStatus || 'Enable'}
                            onChange={e =>
                                this.setState({ shelfStatus: e.target.value })
                            }
                        >
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleAddShelf}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeAddShelfModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render add cell modal
    renderAddCellModal = () => {
        const {
            warehouses,
            selectedWarehouse,
            selectedArea,
            selectedRack,
            selectedShelf,
            areaDescription,
            isAddCellModalOpen,
            areas,
            racks,
            shelfs,
        } = this.state;
        if (!isAddCellModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">Add Cell</h2>
                        <select
                            value={selectedWarehouse}
                            onChange={async e => {
                                const warehouseId = e.target.value;
                                await this.setState({
                                    selectedWarehouse: warehouseId,
                                    selectedArea: '',
                                    selectedRack: '',
                                    selectedShelf: '',
                                });
                                if (warehouseId) {
                                    await this.fetchFilteredAreas(warehouseId);
                                } else {
                                    this.setState({
                                        filteredAreas: [],
                                        filteredRacks: [],
                                        filteredShelfs: [],
                                    });
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Warehouse</option>
                            {warehouses.map(wh => (
                                <option
                                    key={wh._id}
                                    value={wh._id}
                                >
                                    {wh.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedArea}
                            onChange={async e => {
                                const areaId = e.target.value;
                                await this.setState({
                                    selectedArea: areaId,
                                    selectedRack: '',
                                    selectedShelf: '',
                                });
                                if (areaId) {
                                    // Pass warehouseId as well when fetching filtered racks
                                    await this.fetchFilteredRacks(areaId);
                                } else {
                                    this.setState({
                                        filteredRacks: [],
                                        filteredShelfs: [],
                                    });
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Area</option>
                            {this.state.filteredAreas.map(area => (
                                <option
                                    key={area._id}
                                    value={area._id}
                                >
                                    {area.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedRack}
                            onChange={async e => {
                                const rackId = e.target.value;
                                await this.setState({
                                    selectedRack: rackId,
                                    selectedShelf: '',
                                });
                                if (rackId) {
                                    // Pass warehouseId as well when fetching filtered shelfs
                                    await this.fetchFilteredShelfs(rackId);
                                } else {
                                    this.setState({ filteredShelfs: [] });
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Rack</option>
                            {this.state.filteredRacks.map(rack => (
                                <option
                                    key={rack._id}
                                    value={rack._id}
                                >
                                    {rack.name}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedShelf}
                            onChange={async e => {
                                const shelfId = e.target.value;
                                await this.setState({ selectedShelf: shelfId });
                                if (shelfId) {
                                    // Pass warehouseId as well when needed (if any fetch depends on shelf)
                                    // Currently no further fetch needed after shelf selection in add cell modal
                                }
                            }}
                            className="border p-2 mb-2 w-full"
                        >
                            <option value="">Select Shelf</option>
                            {this.state.filteredShelfs.map(shelf => (
                                <option
                                    key={shelf._id}
                                    value={shelf._id}
                                >
                                    {shelf.name}
                                </option>
                            ))}
                        </select>
                        <select
                            className="border p-2 mb-2 w-full"
                            value={this.state.cellStatus || 'Enable'}
                            onChange={e =>
                                this.setState({ cellStatus: e.target.value })
                            }
                        >
                            <option value="Enable">Enable</option>
                            <option value="Disable">Disable</option>
                        </select>
                        <textarea
                            placeholder="Description"
                            value={areaDescription}
                            onChange={e =>
                                this.setState({
                                    areaDescription: e.target.value,
                                })
                            }
                            className="border p-2 mb-2 w-full"
                        />
                        <button
                            onClick={this.handleAddCell}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Add
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeAddCellModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render edit warehouse modal
    renderEditWarehouseModal = () => {
        const { warehouseData, isEditWarehouseModalOpen } = this.state;
        if (!isEditWarehouseModalOpen) return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-96 max-w-full">
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-4">
                            Edit Warehouse
                        </h2>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={warehouseData.name}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="slag"
                            placeholder="Slag"
                            value={warehouseData.slag}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={warehouseData.address}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <textarea
                            name="description"
                            placeholder="Description"
                            value={warehouseData.description}
                            onChange={this.handleInputChange}
                            className="border p-2 mb-2 w-full"
                        />
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={this.handleInputChange}
                            className="mb-2"
                        />
                        <button
                            onClick={this.handleUpdateWarehouse}
                            className="bg-green-600 text-white px-4 py-2 rounded"
                        >
                            Update
                        </button>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closeEditWarehouseModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Render preview warehouse modal
    renderPreviewWarehouseModal = () => {
        const {
            editingWarehouse,
            isPreviewWarehouseModalOpen,
            warehouseDetails,
        } = this.state;
        if (
            !isPreviewWarehouseModalOpen ||
            !editingWarehouse ||
            !warehouseDetails
        )
            return null;
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto">
                    <div className="p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Warehouse Preview: {editingWarehouse.name}
                        </h2>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div>
                                <strong>Name:</strong> {editingWarehouse.name}
                            </div>
                            <div>
                                <strong>Slag:</strong> {editingWarehouse.slag}
                            </div>
                            <div>
                                <strong>Address:</strong>{' '}
                                {editingWarehouse.address}
                            </div>
                            <div>
                                <strong>Status:</strong>
                                <span
                                    className={`px-3 py-1 rounded ml-2 ${editingWarehouse.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                >
                                    {editingWarehouse.status || 'Enable'}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <strong>Description:</strong>{' '}
                                {editingWarehouse.description}
                            </div>
                            {editingWarehouse.imageUrl && (
                                <div className="col-span-2">
                                    <strong>Image:</strong>
                                    <img
                                        src={editingWarehouse.imageUrl}
                                        alt="Warehouse"
                                        className="w-32 h-32 object-cover mt-2"
                                    />
                                </div>
                            )}
                        </div>

                        {/* Areas */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Areas ({warehouseDetails.areas.length})
                            </h3>
                            <div className="overflow-x-auto bg-gray-50 rounded">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouseDetails.areas.map(area => (
                                            <tr
                                                key={area._id}
                                                className="border-t"
                                            >
                                                <td className="px-4 py-2">
                                                    {area.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`px-3 py-1 rounded ${area.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                                    >
                                                        {area.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Racks */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Racks ({warehouseDetails.racks.length})
                            </h3>
                            <div className="overflow-x-auto bg-gray-50 rounded">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouseDetails.racks.map(rack => (
                                            <tr
                                                key={rack._id}
                                                className="border-t"
                                            >
                                                <td className="px-4 py-2">
                                                    {rack.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`px-3 py-1 rounded ${rack.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                                    >
                                                        {rack.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Shelfs */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Shelfs ({warehouseDetails.shelfs.length})
                            </h3>
                            <div className="overflow-x-auto bg-gray-50 rounded">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouseDetails.shelfs.map(shelf => (
                                            <tr
                                                key={shelf._id}
                                                className="border-t"
                                            >
                                                <td className="px-4 py-2">
                                                    {shelf.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`px-3 py-1 rounded ${shelf.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                                    >
                                                        {shelf.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Cells */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">
                                Cells ({warehouseDetails.cells.length})
                            </h3>
                            <div className="overflow-x-auto bg-gray-50 rounded">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {warehouseDetails.cells.map(cell => (
                                            <tr
                                                key={cell._id}
                                                className="border-t"
                                            >
                                                <td className="px-4 py-2">
                                                    {cell.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <span
                                                        className={`px-3 py-1 rounded ${cell.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                                    >
                                                        {cell.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end p-4 border-t">
                        <button
                            onClick={this.closePreviewWarehouseModal}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        const {
            warehouses,
            isModalOpen,
            loading,
            error,
            isWarehouseDetailsView,
            warehouseDetails,
        } = this.state;

        return (
            <div className="p-4  min-h-screen">
                {/* Top buttons */}
                <div className="flex gap-2 mb-4">
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                        onClick={this.openAddModal}
                    >
                        Add New
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                        onClick={this.openWarehouseView}
                    >
                        Warehouse
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                        onClick={this.openAreaView}
                    >
                        Area
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                        onClick={this.openRackView}
                    >
                        Rack
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                        onClick={this.openShelfView}
                    >
                        Shelf
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-900 text-white rounded"
                        onClick={this.openCellView}
                    >
                        Cell
                    </button>
                    <div className="ml-auto flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Search for..."
                            className="px-3 py-2 border rounded"
                            value={this.state.searchTerm}
                            onChange={this.handleSearchChange}
                        />
                        <select className="border rounded px-2 py-2">
                            <option>15</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
                        {error}
                    </div>
                )}

                {/* Loading */}
                {loading && (
                    <div className="mb-4 p-2 bg-blue-200 text-blue-800 rounded">
                        Loading...
                    </div>
                )}

                {/* Table */}
                {isWarehouseDetailsView ? (
                    this.renderWarehouseDetailsTable()
                ) : this.state.isWarehouseView ? (
                    <div className="overflow-x-auto bg-white rounded shadow">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    <th className="text-left px-4 py-2">
                                        Name
                                    </th>
                                    <th className="text-left px-4 py-2">
                                        List
                                    </th>
                                    <th className="text-left px-4 py-2">
                                        Address
                                    </th>
                                    <th className="text-left px-4 py-2">
                                        Status
                                    </th>
                                    <th className="text-left px-4 py-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.getFilteredWarehouses().map((wh, idx) => (
                                    <tr
                                        key={idx}
                                        className="border-t hover:bg-gray-50 transition cursor-pointer"
                                        onClick={() =>
                                            this.fetchWarehouseDetails(wh._id!)
                                        }
                                    >
                                        <td className="px-4 py-2">
                                            <div className="font-medium">
                                                {wh.name}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {wh.address}
                                            </div>
                                        </td>
                                        <td className="px-4 py-2 text-gray-600">
                                            Area: {wh.areaCount} <br />
                                            Racks: {wh.rackCount} <br />
                                            Selfs: {wh.shelfCount} <br />
                                            Cells: {wh.cellCount}
                                        </td>
                                        <td className="px-4 py-2">
                                            {wh.address}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={async e => {
                                                    e.stopPropagation();
                                                    await this.handleUpdateWarehouseStatus(
                                                        wh._id!,
                                                        wh.status === 'active'
                                                            ? 'inactive'
                                                            : 'active'
                                                    );
                                                    // Reset to default warehouse table view after status update
                                                    this.setState({
                                                        isWarehouseDetailsView: false,
                                                        isWarehouseView: true,
                                                    });
                                                }}
                                                className={`px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${wh.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}
                                            >
                                                {wh.status || 'Enable'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-2 flex gap-2">
                                            <button
                                                className="text-red-600"
                                                onClick={() =>
                                                    this.handleDeleteWarehouse(
                                                        wh._id!
                                                    )
                                                }
                                            >
                                                🗑️
                                            </button>
                                            <button
                                                className="text-yellow-600"
                                                onClick={() =>
                                                    this.openEditWarehouseModal(
                                                        wh
                                                    )
                                                }
                                            >
                                                ✏️
                                            </button>
                                            <button
                                                className="px-3 py-1 rounded bg-yellow-700 text-white"
                                                onClick={() =>
                                                    this.openPreviewWarehouseModal(
                                                        wh
                                                    )
                                                }
                                            >
                                                Show Preview
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <>
                        {this.state.isAreaView && (
                            <div className="overflow-x-auto bg-white rounded shadow mb-4">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Warehouse
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getFilteredAreas().map(area => (
                                            <tr
                                                key={area._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="px-4 py-2">
                                                    {area.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {area.warehouse}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <select
                                                        value={area.status}
                                                        onChange={e =>
                                                            this.handleUpdateAreaStatus(
                                                                area._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="px-3 py-1 rounded bg-green-500 text-black border-none"
                                                    >
                                                        <option value="Enable">
                                                            Enable
                                                        </option>
                                                        <option value="Disable">
                                                            Disable
                                                        </option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <button
                                                        className="text-red-600"
                                                        onClick={() =>
                                                            this.handleDeleteArea(
                                                                area._id
                                                            )
                                                        }
                                                    >
                                                        🗑️
                                                    </button>
                                                    <button
                                                        className="text-yellow-600"
                                                        onClick={() =>
                                                            this.openEditAreaModal(
                                                                area
                                                            )
                                                        }
                                                    >
                                                        ✏️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {this.state.isRackView && (
                            <div className="overflow-x-auto bg-white rounded shadow mb-4">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Warehouse
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getFilteredRacks().map(rack => (
                                            <tr
                                                key={rack._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="px-4 py-2">
                                                    {rack.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {rack.warehouse}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <select
                                                        value={rack.status}
                                                        onChange={e =>
                                                            this.handleUpdateRackStatus(
                                                                rack._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="px-3 py-1 rounded bg-green-500 text-black border-none"
                                                    >
                                                        <option value="Enable">
                                                            Enable
                                                        </option>
                                                        <option value="Disable">
                                                            Disable
                                                        </option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <button
                                                        className="text-red-600"
                                                        onClick={() =>
                                                            this.handleDeleteRack(
                                                                rack._id
                                                            )
                                                        }
                                                    >
                                                        🗑️
                                                    </button>
                                                    <button
                                                        className="text-yellow-600"
                                                        onClick={() =>
                                                            this.openEditRackModal(
                                                                rack
                                                            )
                                                        }
                                                    >
                                                        ✏️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {this.state.isShelfView && (
                            <div className="overflow-x-auto bg-white rounded shadow mb-4">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Warehouse
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getFilteredShelfs().map(shelf => (
                                            <tr
                                                key={shelf._id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="px-4 py-2">
                                                    {shelf.name}
                                                </td>
                                                <td className="px-4 py-2">
                                                    {shelf.warehouse}
                                                </td>
                                                <td className="px-4 py-2">
                                                    <select
                                                        value={shelf.status}
                                                        onChange={e =>
                                                            this.handleUpdateShelfStatus(
                                                                shelf._id,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="px-3 py-1 rounded bg-green-500 text-black border-none"
                                                    >
                                                        <option value="Enable">
                                                            Enable
                                                        </option>
                                                        <option value="Disable">
                                                            Disable
                                                        </option>
                                                    </select>
                                                </td>
                                                <td className="px-4 py-2 flex gap-2">
                                                    <button
                                                        className="text-red-600"
                                                        onClick={() =>
                                                            this.handleDeleteShelf(
                                                                shelf._id
                                                            )
                                                        }
                                                    >
                                                        🗑️
                                                    </button>
                                                    <button
                                                        className="text-yellow-600"
                                                        onClick={() =>
                                                            this.openEditShelfModal(
                                                                shelf
                                                            )
                                                        }
                                                    >
                                                        ✏️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                        {this.state.isCellView && (
                            <div className="overflow-x-auto bg-white rounded shadow mb-4">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-800 text-white">
                                        <tr>
                                            <th className="text-left px-4 py-2">
                                                Cell Name
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Warehouse
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Area
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Shelf
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Rack
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Status
                                            </th>
                                            <th className="text-left px-4 py-2">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getFilteredCells().map(cell => {
                                            const areaObj =
                                                this.state.areas.find(
                                                    a => a._id === cell.area
                                                );
                                            const areaName = areaObj
                                                ? areaObj.name
                                                : '';
                                            const shelfObj =
                                                this.state.shelfs.find(
                                                    s => s._id === cell.shelf
                                                );
                                            const shelfName = shelfObj
                                                ? shelfObj.name
                                                : '';
                                            const rackObj =
                                                this.state.racks.find(
                                                    r => r._id === cell.rack
                                                );
                                            const rackName = rackObj
                                                ? rackObj.name
                                                : '';
                                            return (
                                                <tr
                                                    key={cell._id}
                                                    className="border-t hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-4 py-2">
                                                        {cell.name}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {cell.warehouse}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {areaName}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {shelfName}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        {rackName}
                                                    </td>
                                                    <td className="px-4 py-2">
                                                        <select
                                                            value={cell.status}
                                                            onChange={e =>
                                                                this.handleUpdateCellStatus(
                                                                    cell._id,
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="px-3 py-1 rounded bg-green-500 text-black border-none"
                                                        >
                                                            <option value="Enable">
                                                                Enable
                                                            </option>
                                                            <option value="Disable">
                                                                Disable
                                                            </option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 flex gap-2">
                                                        <button
                                                            className="text-red-600"
                                                            onClick={() =>
                                                                this.handleDeleteCell(
                                                                    cell._id
                                                                )
                                                            }
                                                        >
                                                            🗑️
                                                        </button>
                                                        <button
                                                            className="text-yellow-600"
                                                            onClick={() =>
                                                                this.openEditCellModal(
                                                                    cell
                                                                )
                                                            }
                                                        >
                                                            ✏️
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded shadow-lg w-96 max-w-full">
                            {this.renderModalContent()}
                            <div className="flex justify-end p-4 border-t">
                                <button
                                    onClick={this.closeModal}
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Area Modal */}
                {this.state.isAreaModalOpen && this.renderAreaModal()}

                {/* Edit Area Modal */}
                {this.state.isEditAreaModalOpen && this.renderEditAreaModal()}

                {/* Edit Rack Modal */}
                {this.state.isEditRackModalOpen && this.renderEditRackModal()}

                {/* Edit Shelf Modal */}
                {this.state.isEditShelfModalOpen && this.renderEditShelfModal()}

                {/* Edit Cell Modal */}
                {this.state.isEditCellModalOpen && this.renderEditCellModal()}

                {/* Add Warehouse Modal */}
                {this.renderAddWarehouseModal()}

                {/* Add Area Modal */}
                {this.renderAddAreaModal()}

                {/* Add Rack Modal */}
                {this.renderAddRackModal()}

                {/* Add Shelf Modal */}
                {this.renderAddShelfModal()}

                {/* Add Cell Modal */}
                {this.renderAddCellModal()}

                {/* Edit Warehouse Modal */}
                {this.renderEditWarehouseModal()}

                {/* Preview Warehouse Modal */}
                {this.renderPreviewWarehouseModal()}
            </div>
        );
    }
}
