import {
    jsxs as _jsxs,
    jsx as _jsx,
    Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Component } from 'react';
import axios from 'axios';
import { getBaseUrl } from '@/helpers/config/envConfig';
export default class Ware_House extends Component {
    state = {
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
    fetchFilteredAreas = async warehouseId => {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error fetching filtered areas',
                loading: false,
            });
        }
    };
    fetchFilteredRacks = async areaId => {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error fetching filtered racks',
                loading: false,
            });
        }
    };
    fetchFilteredShelfs = async rackId => {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error fetching filtered shelfs',
                loading: false,
            });
        }
    };
    handleSearchChange = e => {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
            console.error('Error:', error);
            this.setState({
                error: error.message || 'Error fetching cells',
                loading: false,
            });
        }
    };
    fetchWarehouseDetails = async warehouseId => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouseId}/details`
            );
            if (response.data && response.data.data) {
                const data = response.data.data;
                const mapName = arr =>
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
        } catch (error) {
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
    openEditAreaModal = area => {
        const warehouse = this.state.warehouses.find(
            wh => wh._id === area.warehouse
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
        } catch (error) {
            this.setState({ error: error.message || 'Error updating area' });
        }
    };
    openEditRackModal = rack => {
        const warehouse = this.state.warehouses.find(
            wh => wh._id === rack.warehouse
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
        } catch (error) {
            this.setState({ error: error.message || 'Error updating rack' });
        }
    };
    // New update handlers for Shelf and Cell
    openEditShelfModal = shelf => {
        const warehouse = this.state.warehouses.find(
            wh => wh._id === shelf.warehouse
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
        } catch (error) {
            this.setState({ error: error.message || 'Error updating shelf' });
        }
    };
    openEditCellModal = cell => {
        const warehouse = this.state.warehouses.find(
            wh => wh._id === cell.warehouse
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
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
        } catch (error) {
            this.setState({ error: error.message || 'Error adding cell' });
        }
    };
    handleDeleteWarehouse = async warehouseId => {
        if (!window.confirm('Are you sure you want to delete this warehouse?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouseId}`
            );
            await this.fetchWarehouses();
        } catch (error) {
            this.setState({
                error: error.message || 'Error deleting warehouse',
            });
        }
    };
    // New delete handlers for Area, Rack, Shelf, Cell
    handleDeleteArea = async areaId => {
        if (!window.confirm('Are you sure you want to delete this area?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/area/${areaId}`
            );
            await this.fetchAreas();
            await this.fetchWarehouses();
        } catch (error) {
            this.setState({ error: error.message || 'Error deleting area' });
        }
    };
    handleDeleteRack = async rackId => {
        if (!window.confirm('Are you sure you want to delete this rack?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/rack/${rackId}`
            );
            await this.fetchRacks();
            await this.fetchWarehouses();
        } catch (error) {
            this.setState({ error: error.message || 'Error deleting rack' });
        }
    };
    handleDeleteShelf = async shelfId => {
        if (!window.confirm('Are you sure you want to delete this shelf?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/shelf/${shelfId}`
            );
            await this.fetchShelfs();
            await this.fetchWarehouses();
        } catch (error) {
            this.setState({ error: error.message || 'Error deleting shelf' });
        }
    };
    handleDeleteCell = async cellId => {
        if (!window.confirm('Are you sure you want to delete this cell?'))
            return;
        try {
            await axios.delete(
                `${getBaseUrl}/inventory/ware_house/cell/${cellId}`
            );
            await this.fetchCells();
            await this.fetchWarehouses();
        } catch (error) {
            this.setState({ error: error.message || 'Error deleting cell' });
        }
    };
    handleUpdateWarehouseStatus = async (warehouseId, status) => {
        try {
            await axios.put(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouseId}/status`,
                { status }
            );
            await this.fetchWarehouses();
        } catch (error) {
            this.setState({
                error: error.message || 'Error updating warehouse status',
            });
        }
    };
    openEditWarehouseModal = warehouse => {
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
        return _jsxs('div', {
            className: 'overflow-x-auto bg-white rounded shadow mb-4',
            children: [
                _jsxs('h3', {
                    className: 'text-lg font-bold mb-4',
                    children: ['Warehouse: ', warehouseDetails.warehouse.name],
                }),
                _jsx('div', {
                    className: 'mb-4',
                    children: _jsx('button', {
                        onClick: this.closeView,
                        className:
                            'bg-gray-600 text-white px-4 py-2 rounded mr-2',
                        children: 'Back to Warehouses',
                    }),
                }),
                _jsxs('div', {
                    className: 'mb-4',
                    children: [
                        _jsx('h4', {
                            className: 'text-md font-semibold mb-2',
                            children: 'Areas',
                        }),
                        _jsxs('table', {
                            className: 'w-full text-sm border',
                            children: [
                                _jsx('thead', {
                                    className: 'bg-gray-200',
                                    children: _jsxs('tr', {
                                        children: [
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Name',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Status',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Action',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    children: warehouseDetails.areas.map(area =>
                                        _jsxs(
                                            'tr',
                                            {
                                                className: 'border-t',
                                                children: [
                                                    _jsx('td', {
                                                        className: 'px-4 py-2',
                                                        children: area.name,
                                                    }),
                                                    _jsx('td', {
                                                        className: 'px-4 py-2',
                                                        children:
                                                            area.status ===
                                                            'Enable'
                                                                ? _jsx('span', {
                                                                      className:
                                                                          'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                      children:
                                                                          'Enable',
                                                                  })
                                                                : _jsx('span', {
                                                                      className:
                                                                          'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                      children:
                                                                          'Disable',
                                                                  }),
                                                    }),
                                                    _jsxs('td', {
                                                        className:
                                                            'px-4 py-2 flex gap-2',
                                                        children: [
                                                            _jsx('button', {
                                                                className:
                                                                    'text-red-600',
                                                                onClick: () =>
                                                                    this.handleDeleteArea(
                                                                        area._id
                                                                    ),
                                                                children:
                                                                    '\uD83D\uDDD1\uFE0F',
                                                            }),
                                                            _jsx('button', {
                                                                className:
                                                                    'text-yellow-600',
                                                                onClick: () =>
                                                                    this.openEditAreaModal(
                                                                        area
                                                                    ),
                                                                children:
                                                                    '\u270F\uFE0F',
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            },
                                            area._id
                                        )
                                    ),
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'mb-4',
                    children: [
                        _jsx('h4', {
                            className: 'text-md font-semibold mb-2',
                            children: 'Racks',
                        }),
                        _jsxs('table', {
                            className: 'w-full text-sm border',
                            children: [
                                _jsx('thead', {
                                    className: 'bg-gray-200',
                                    children: _jsxs('tr', {
                                        children: [
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Name',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Status',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Action',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    children: warehouseDetails.racks.map(rack =>
                                        _jsxs(
                                            'tr',
                                            {
                                                className: 'border-t',
                                                children: [
                                                    _jsx('td', {
                                                        className: 'px-4 py-2',
                                                        children: rack.name,
                                                    }),
                                                    _jsx('td', {
                                                        className: 'px-4 py-2',
                                                        children:
                                                            rack.status ===
                                                            'Enable'
                                                                ? _jsx('span', {
                                                                      className:
                                                                          'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                      children:
                                                                          'Enable',
                                                                  })
                                                                : _jsx('span', {
                                                                      className:
                                                                          'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                      children:
                                                                          'Disable',
                                                                  }),
                                                    }),
                                                    _jsxs('td', {
                                                        className:
                                                            'px-4 py-2 flex gap-2',
                                                        children: [
                                                            _jsx('button', {
                                                                className:
                                                                    'text-red-600',
                                                                onClick: () =>
                                                                    this.handleDeleteRack(
                                                                        rack._id
                                                                    ),
                                                                children:
                                                                    '\uD83D\uDDD1\uFE0F',
                                                            }),
                                                            _jsx('button', {
                                                                className:
                                                                    'text-yellow-600',
                                                                onClick: () =>
                                                                    this.openEditRackModal(
                                                                        rack
                                                                    ),
                                                                children:
                                                                    '\u270F\uFE0F',
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            },
                                            rack._id
                                        )
                                    ),
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'mb-4',
                    children: [
                        _jsx('h4', {
                            className: 'text-md font-semibold mb-2',
                            children: 'Shelfs',
                        }),
                        _jsxs('table', {
                            className: 'w-full text-sm border',
                            children: [
                                _jsx('thead', {
                                    className: 'bg-gray-200',
                                    children: _jsxs('tr', {
                                        children: [
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Name',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Status',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Action',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    children: warehouseDetails.shelfs.map(
                                        shelf =>
                                            _jsxs(
                                                'tr',
                                                {
                                                    className: 'border-t',
                                                    children: [
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children:
                                                                shelf.name,
                                                        }),
                                                        _jsx('td', {
                                                            className:
                                                                'px-4 py-2',
                                                            children:
                                                                shelf.status ===
                                                                'Enable'
                                                                    ? _jsx(
                                                                          'span',
                                                                          {
                                                                              className:
                                                                                  'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                              children:
                                                                                  'Enable',
                                                                          }
                                                                      )
                                                                    : _jsx(
                                                                          'span',
                                                                          {
                                                                              className:
                                                                                  'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                              children:
                                                                                  'Disable',
                                                                          }
                                                                      ),
                                                        }),
                                                        _jsxs('td', {
                                                            className:
                                                                'px-4 py-2 flex gap-2',
                                                            children: [
                                                                _jsx('button', {
                                                                    className:
                                                                        'text-red-600',
                                                                    onClick:
                                                                        () =>
                                                                            this.handleDeleteShelf(
                                                                                shelf._id
                                                                            ),
                                                                    children:
                                                                        '\uD83D\uDDD1\uFE0F',
                                                                }),
                                                                _jsx('button', {
                                                                    className:
                                                                        'text-yellow-600',
                                                                    onClick:
                                                                        () =>
                                                                            this.openEditShelfModal(
                                                                                shelf
                                                                            ),
                                                                    children:
                                                                        '\u270F\uFE0F',
                                                                }),
                                                            ],
                                                        }),
                                                    ],
                                                },
                                                shelf._id
                                            )
                                    ),
                                }),
                            ],
                        }),
                    ],
                }),
                _jsxs('div', {
                    className: 'mb-4',
                    children: [
                        _jsx('h4', {
                            className: 'text-md font-semibold mb-2',
                            children: 'Cells',
                        }),
                        _jsxs('table', {
                            className: 'w-full text-sm border',
                            children: [
                                _jsx('thead', {
                                    className: 'bg-gray-200',
                                    children: _jsxs('tr', {
                                        children: [
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Name',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Status',
                                            }),
                                            _jsx('th', {
                                                className:
                                                    'text-left px-4 py-2',
                                                children: 'Action',
                                            }),
                                        ],
                                    }),
                                }),
                                _jsx('tbody', {
                                    children: warehouseDetails.cells.map(cell =>
                                        _jsxs(
                                            'tr',
                                            {
                                                className: 'border-t',
                                                children: [
                                                    _jsx('td', {
                                                        className: 'px-4 py-2',
                                                        children: cell.name,
                                                    }),
                                                    _jsx('td', {
                                                        className: 'px-4 py-2',
                                                        children:
                                                            cell.status ===
                                                            'Enable'
                                                                ? _jsx('span', {
                                                                      className:
                                                                          'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                      children:
                                                                          'Enable',
                                                                  })
                                                                : _jsx('span', {
                                                                      className:
                                                                          'px-3 py-1 rounded bg-green-500 text-white border-none cursor-pointer',
                                                                      children:
                                                                          'Disable',
                                                                  }),
                                                    }),
                                                    _jsxs('td', {
                                                        className:
                                                            'px-4 py-2 flex gap-2',
                                                        children: [
                                                            _jsx('button', {
                                                                className:
                                                                    'text-red-600',
                                                                onClick: () =>
                                                                    this.handleDeleteCell(
                                                                        cell._id
                                                                    ),
                                                                children:
                                                                    '\uD83D\uDDD1\uFE0F',
                                                            }),
                                                            _jsx('button', {
                                                                className:
                                                                    'text-yellow-600',
                                                                onClick: () =>
                                                                    this.openEditCellModal(
                                                                        cell
                                                                    ),
                                                                children:
                                                                    '\u270F\uFE0F',
                                                            }),
                                                        ],
                                                    }),
                                                ],
                                            },
                                            cell._id
                                        )
                                    ),
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        });
    };
    // New status update handlers for Area, Rack, Shelf, Cell
    handleUpdateAreaStatus = async (areaId, status) => {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error updating area status',
            });
        }
    };
    handleUpdateRackStatus = async (rackId, status) => {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error updating rack status',
            });
        }
    };
    handleUpdateShelfStatus = async (shelfId, status) => {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error updating shelf status',
            });
        }
    };
    handleUpdateCellStatus = async (cellId, status) => {
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
        } catch (error) {
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
        } catch (error) {
            this.setState({
                error: error.message || 'Error updating warehouse',
            });
        }
    };
    openPreviewWarehouseModal = async warehouse => {
        this.setState({ loading: true, error: null });
        try {
            const response = await axios.get(
                `${getBaseUrl}/inventory/ware_house/warehouse/${warehouse._id}/details`
            );
            if (response.data && response.data.data) {
                // Fix: map warehouseDetails areas, racks, shelfs, cells to have name from description
                const data = response.data.data;
                const mapName = arr =>
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
        } catch (error) {
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
    handleInputChange = e => {
        const { name, value, files } = e.target;
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
        } catch (error) {
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
                return _jsxs('div', {
                    className: 'p-4',
                    children: [
                        _jsx('h2', {
                            className: 'text-lg font-bold mb-4',
                            children: 'Add Warehouse',
                        }),
                        _jsx('input', {
                            type: 'text',
                            name: 'name',
                            placeholder: 'Name',
                            value: warehouseData.name,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('input', {
                            type: 'text',
                            name: 'slag',
                            placeholder: 'Slag',
                            value: warehouseData.slag,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('input', {
                            type: 'text',
                            name: 'address',
                            placeholder: 'Address',
                            value: warehouseData.address,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('textarea', {
                            name: 'description',
                            placeholder: 'Description',
                            value: warehouseData.description,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('input', {
                            type: 'file',
                            name: 'image',
                            accept: 'image/*',
                            onChange: this.handleInputChange,
                            className: 'mb-2',
                        }),
                        _jsx('button', {
                            onClick: this.handleNext,
                            className:
                                'bg-blue-600 text-white px-4 py-2 rounded',
                            children: 'Next',
                        }),
                    ],
                });
            case 2:
                return _jsxs('div', {
                    className: 'p-4',
                    children: [
                        _jsx('h2', {
                            className: 'text-lg font-bold mb-4',
                            children: 'Add Area',
                        }),
                        _jsx('textarea', {
                            name: 'description',
                            placeholder: 'Description',
                            value: areaData.description,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('button', {
                            onClick: this.handleNext,
                            className:
                                'bg-blue-600 text-white px-4 py-2 rounded',
                            children: 'Next',
                        }),
                    ],
                });
            case 3:
                return _jsxs('div', {
                    className: 'p-4',
                    children: [
                        _jsx('h2', {
                            className: 'text-lg font-bold mb-4',
                            children: 'Add Rack',
                        }),
                        _jsx('textarea', {
                            name: 'description',
                            placeholder: 'Description',
                            value: rackData.description,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('button', {
                            onClick: this.handleNext,
                            className:
                                'bg-blue-600 text-white px-4 py-2 rounded',
                            children: 'Next',
                        }),
                    ],
                });
            case 4:
                return _jsxs('div', {
                    className: 'p-4',
                    children: [
                        _jsx('h2', {
                            className: 'text-lg font-bold mb-4',
                            children: 'Add Shelf',
                        }),
                        _jsx('textarea', {
                            name: 'description',
                            placeholder: 'Description',
                            value: shelfData.description,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('button', {
                            onClick: this.handleNext,
                            className:
                                'bg-blue-600 text-white px-4 py-2 rounded',
                            children: 'Next',
                        }),
                    ],
                });
            case 5:
                return _jsxs('div', {
                    className: 'p-4',
                    children: [
                        _jsx('h2', {
                            className: 'text-lg font-bold mb-4',
                            children: 'Add Cell',
                        }),
                        _jsx('textarea', {
                            name: 'description',
                            placeholder: 'Description',
                            value: cellData.description,
                            onChange: this.handleInputChange,
                            className: 'border p-2 mb-2 w-full',
                        }),
                        _jsx('button', {
                            onClick: this.handleNext,
                            className:
                                'bg-green-600 text-white px-4 py-2 rounded',
                            children: 'Add',
                        }),
                    ],
                });
            default:
                return null;
        }
    };
    renderAreaModal = () => {
        const { warehouses, selectedWarehouse, areaDescription } = this.state;
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Add Area',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: e =>
                                    this.setState({
                                        selectedWarehouse: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleAddArea,
                                className:
                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                children: 'Add',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeAreaModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Edit Area',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: e =>
                                    this.setState({
                                        selectedWarehouse: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleUpdateArea,
                                className:
                                    'bg-green-600 text-white px-4 py-2 rounded',
                                children: 'Update',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeEditAreaModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Edit Rack',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: e =>
                                    this.setState({
                                        selectedWarehouse: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleUpdateRack,
                                className:
                                    'bg-green-600 text-white px-4 py-2 rounded',
                                children: 'Update',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeEditRackModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Edit Shelf',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: e =>
                                    this.setState({
                                        selectedWarehouse: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleUpdateShelf,
                                className:
                                    'bg-green-600 text-white px-4 py-2 rounded',
                                children: 'Update',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeEditShelfModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Edit Cell',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: e =>
                                    this.setState({
                                        selectedWarehouse: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedArea,
                                onChange: e =>
                                    this.setState({
                                        selectedArea: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Area',
                                    }),
                                    areas.map(area =>
                                        _jsx(
                                            'option',
                                            {
                                                value: area._id,
                                                children: area.name,
                                            },
                                            area._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedRack,
                                onChange: e =>
                                    this.setState({
                                        selectedRack: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Rack',
                                    }),
                                    racks.map(rack =>
                                        _jsx(
                                            'option',
                                            {
                                                value: rack._id,
                                                children: rack.name,
                                            },
                                            rack._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedShelf,
                                onChange: e =>
                                    this.setState({
                                        selectedShelf: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Shelf',
                                    }),
                                    shelfs.map(shelf =>
                                        _jsx(
                                            'option',
                                            {
                                                value: shelf._id,
                                                children: shelf.name,
                                            },
                                            shelf._id
                                        )
                                    ),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleUpdateCell,
                                className:
                                    'bg-green-600 text-white px-4 py-2 rounded',
                                children: 'Update',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeEditCellModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
    };
    // Render add warehouse modal
    renderAddWarehouseModal = () => {
        const { warehouseData, isAddWarehouseModalOpen } = this.state;
        if (!isAddWarehouseModalOpen) return null;
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Add Warehouse',
                            }),
                            _jsx('input', {
                                type: 'text',
                                name: 'name',
                                placeholder: 'Name',
                                value: warehouseData.name,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('input', {
                                type: 'text',
                                name: 'slag',
                                placeholder: 'Slag',
                                value: warehouseData.slag,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('input', {
                                type: 'text',
                                name: 'address',
                                placeholder: 'Address',
                                value: warehouseData.address,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('textarea', {
                                name: 'description',
                                placeholder: 'Description',
                                value: warehouseData.description,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('input', {
                                type: 'file',
                                name: 'image',
                                accept: 'image/*',
                                onChange: this.handleInputChange,
                                className: 'mb-2',
                            }),
                            _jsx('button', {
                                onClick: this.handleAddWarehouse,
                                className:
                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                children: 'Add',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeAddWarehouseModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Add Area',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: e =>
                                    this.setState({
                                        selectedWarehouse: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                className: 'border p-2 mb-2 w-full',
                                value: this.state.areaStatus || 'Enable',
                                onChange: e =>
                                    this.setState({
                                        areaStatus: e.target.value,
                                    }),
                                children: [
                                    _jsx('option', {
                                        value: 'Enable',
                                        children: 'Enable',
                                    }),
                                    _jsx('option', {
                                        value: 'Disable',
                                        children: 'Disable',
                                    }),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleAddArea,
                                className:
                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                children: 'Add',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeAddAreaModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Add Rack',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: async e => {
                                    const warehouseId = e.target.value;
                                    await this.setState({
                                        selectedWarehouse: warehouseId,
                                        selectedArea: '',
                                    });
                                    if (warehouseId) {
                                        await this.fetchFilteredAreas(
                                            warehouseId
                                        );
                                    } else {
                                        this.setState({ filteredAreas: [] });
                                    }
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedArea,
                                onChange: e =>
                                    this.setState({
                                        selectedArea: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Area',
                                    }),
                                    this.state.filteredAreas.map(area =>
                                        _jsx(
                                            'option',
                                            {
                                                value: area._id,
                                                children: area.name,
                                            },
                                            area._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                className: 'border p-2 mb-2 w-full',
                                value: this.state.rackStatus || 'Enable',
                                onChange: e =>
                                    this.setState({
                                        rackStatus: e.target.value,
                                    }),
                                children: [
                                    _jsx('option', {
                                        value: 'Enable',
                                        children: 'Enable',
                                    }),
                                    _jsx('option', {
                                        value: 'Disable',
                                        children: 'Disable',
                                    }),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleAddRack,
                                className:
                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                children: 'Add',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeAddRackModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Add Shelf',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: async e => {
                                    const warehouseId = e.target.value;
                                    await this.setState({
                                        selectedWarehouse: warehouseId,
                                        selectedArea: '',
                                        selectedRack: '',
                                    });
                                    if (warehouseId) {
                                        await this.fetchFilteredAreas(
                                            warehouseId
                                        );
                                    } else {
                                        this.setState({
                                            filteredAreas: [],
                                            filteredRacks: [],
                                        });
                                    }
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedArea,
                                onChange: async e => {
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
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Area',
                                    }),
                                    this.state.filteredAreas.map(area =>
                                        _jsx(
                                            'option',
                                            {
                                                value: area._id,
                                                children: area.name,
                                            },
                                            area._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedRack,
                                onChange: e =>
                                    this.setState({
                                        selectedRack: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Rack',
                                    }),
                                    this.state.filteredRacks.map(rack =>
                                        _jsx(
                                            'option',
                                            {
                                                value: rack._id,
                                                children: rack.name,
                                            },
                                            rack._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                className: 'border p-2 mb-2 w-full',
                                value: this.state.shelfStatus || 'Enable',
                                onChange: e =>
                                    this.setState({
                                        shelfStatus: e.target.value,
                                    }),
                                children: [
                                    _jsx('option', {
                                        value: 'Enable',
                                        children: 'Enable',
                                    }),
                                    _jsx('option', {
                                        value: 'Disable',
                                        children: 'Disable',
                                    }),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleAddShelf,
                                className:
                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                children: 'Add',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeAddShelfModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Add Cell',
                            }),
                            _jsxs('select', {
                                value: selectedWarehouse,
                                onChange: async e => {
                                    const warehouseId = e.target.value;
                                    await this.setState({
                                        selectedWarehouse: warehouseId,
                                        selectedArea: '',
                                        selectedRack: '',
                                        selectedShelf: '',
                                    });
                                    if (warehouseId) {
                                        await this.fetchFilteredAreas(
                                            warehouseId
                                        );
                                    } else {
                                        this.setState({
                                            filteredAreas: [],
                                            filteredRacks: [],
                                            filteredShelfs: [],
                                        });
                                    }
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Warehouse',
                                    }),
                                    warehouses.map(wh =>
                                        _jsx(
                                            'option',
                                            {
                                                value: wh._id,
                                                children: wh.name,
                                            },
                                            wh._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedArea,
                                onChange: async e => {
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
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Area',
                                    }),
                                    this.state.filteredAreas.map(area =>
                                        _jsx(
                                            'option',
                                            {
                                                value: area._id,
                                                children: area.name,
                                            },
                                            area._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedRack,
                                onChange: async e => {
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
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Rack',
                                    }),
                                    this.state.filteredRacks.map(rack =>
                                        _jsx(
                                            'option',
                                            {
                                                value: rack._id,
                                                children: rack.name,
                                            },
                                            rack._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                value: selectedShelf,
                                onChange: async e => {
                                    const shelfId = e.target.value;
                                    await this.setState({
                                        selectedShelf: shelfId,
                                    });
                                    if (shelfId) {
                                        // Pass warehouseId as well when needed (if any fetch depends on shelf)
                                        // Currently no further fetch needed after shelf selection in add cell modal
                                    }
                                },
                                className: 'border p-2 mb-2 w-full',
                                children: [
                                    _jsx('option', {
                                        value: '',
                                        children: 'Select Shelf',
                                    }),
                                    this.state.filteredShelfs.map(shelf =>
                                        _jsx(
                                            'option',
                                            {
                                                value: shelf._id,
                                                children: shelf.name,
                                            },
                                            shelf._id
                                        )
                                    ),
                                ],
                            }),
                            _jsxs('select', {
                                className: 'border p-2 mb-2 w-full',
                                value: this.state.cellStatus || 'Enable',
                                onChange: e =>
                                    this.setState({
                                        cellStatus: e.target.value,
                                    }),
                                children: [
                                    _jsx('option', {
                                        value: 'Enable',
                                        children: 'Enable',
                                    }),
                                    _jsx('option', {
                                        value: 'Disable',
                                        children: 'Disable',
                                    }),
                                ],
                            }),
                            _jsx('textarea', {
                                placeholder: 'Description',
                                value: areaDescription,
                                onChange: e =>
                                    this.setState({
                                        areaDescription: e.target.value,
                                    }),
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('button', {
                                onClick: this.handleAddCell,
                                className:
                                    'bg-blue-600 text-white px-4 py-2 rounded',
                                children: 'Add',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeAddCellModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
    };
    // Render edit warehouse modal
    renderEditWarehouseModal = () => {
        const { warehouseData, isEditWarehouseModalOpen } = this.state;
        if (!isEditWarehouseModalOpen) return null;
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className: 'bg-white rounded shadow-lg w-96 max-w-full',
                children: [
                    _jsxs('div', {
                        className: 'p-4',
                        children: [
                            _jsx('h2', {
                                className: 'text-lg font-bold mb-4',
                                children: 'Edit Warehouse',
                            }),
                            _jsx('input', {
                                type: 'text',
                                name: 'name',
                                placeholder: 'Name',
                                value: warehouseData.name,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('input', {
                                type: 'text',
                                name: 'slag',
                                placeholder: 'Slag',
                                value: warehouseData.slag,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('input', {
                                type: 'text',
                                name: 'address',
                                placeholder: 'Address',
                                value: warehouseData.address,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('textarea', {
                                name: 'description',
                                placeholder: 'Description',
                                value: warehouseData.description,
                                onChange: this.handleInputChange,
                                className: 'border p-2 mb-2 w-full',
                            }),
                            _jsx('input', {
                                type: 'file',
                                name: 'image',
                                accept: 'image/*',
                                onChange: this.handleInputChange,
                                className: 'mb-2',
                            }),
                            _jsx('button', {
                                onClick: this.handleUpdateWarehouse,
                                className:
                                    'bg-green-600 text-white px-4 py-2 rounded',
                                children: 'Update',
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closeEditWarehouseModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Cancel',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsx('div', {
            className:
                'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
            children: _jsxs('div', {
                className:
                    'bg-white rounded shadow-lg w-full max-w-4xl max-h-screen overflow-y-auto',
                children: [
                    _jsxs('div', {
                        className: 'p-6',
                        children: [
                            _jsxs('h2', {
                                className: 'text-xl font-bold mb-4',
                                children: [
                                    'Warehouse Preview: ',
                                    editingWarehouse.name,
                                ],
                            }),
                            _jsxs('div', {
                                className: 'grid grid-cols-2 gap-4 mb-6',
                                children: [
                                    _jsxs('div', {
                                        children: [
                                            _jsx('strong', {
                                                children: 'Name:',
                                            }),
                                            ' ',
                                            editingWarehouse.name,
                                        ],
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('strong', {
                                                children: 'Slag:',
                                            }),
                                            ' ',
                                            editingWarehouse.slag,
                                        ],
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('strong', {
                                                children: 'Address:',
                                            }),
                                            ' ',
                                            editingWarehouse.address,
                                        ],
                                    }),
                                    _jsxs('div', {
                                        children: [
                                            _jsx('strong', {
                                                children: 'Status:',
                                            }),
                                            _jsx('span', {
                                                className: `px-3 py-1 rounded ml-2 ${editingWarehouse.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`,
                                                children:
                                                    editingWarehouse.status ||
                                                    'Enable',
                                            }),
                                        ],
                                    }),
                                    _jsxs('div', {
                                        className: 'col-span-2',
                                        children: [
                                            _jsx('strong', {
                                                children: 'Description:',
                                            }),
                                            ' ',
                                            editingWarehouse.description,
                                        ],
                                    }),
                                    editingWarehouse.imageUrl &&
                                        _jsxs('div', {
                                            className: 'col-span-2',
                                            children: [
                                                _jsx('strong', {
                                                    children: 'Image:',
                                                }),
                                                _jsx('img', {
                                                    src: editingWarehouse.imageUrl,
                                                    alt: 'Warehouse',
                                                    className:
                                                        'w-32 h-32 object-cover mt-2',
                                                }),
                                            ],
                                        }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'mb-6',
                                children: [
                                    _jsxs('h3', {
                                        className: 'text-lg font-semibold mb-2',
                                        children: [
                                            'Areas (',
                                            warehouseDetails.areas.length,
                                            ')',
                                        ],
                                    }),
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-gray-50 rounded',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className: 'bg-gray-200',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        warehouseDetails.areas.map(
                                                            area =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            area.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsx(
                                                                                                'span',
                                                                                                {
                                                                                                    className: `px-3 py-1 rounded ${area.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`,
                                                                                                    children:
                                                                                                        area.status,
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    area._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'mb-6',
                                children: [
                                    _jsxs('h3', {
                                        className: 'text-lg font-semibold mb-2',
                                        children: [
                                            'Racks (',
                                            warehouseDetails.racks.length,
                                            ')',
                                        ],
                                    }),
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-gray-50 rounded',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className: 'bg-gray-200',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        warehouseDetails.racks.map(
                                                            rack =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            rack.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsx(
                                                                                                'span',
                                                                                                {
                                                                                                    className: `px-3 py-1 rounded ${rack.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`,
                                                                                                    children:
                                                                                                        rack.status,
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    rack._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'mb-6',
                                children: [
                                    _jsxs('h3', {
                                        className: 'text-lg font-semibold mb-2',
                                        children: [
                                            'Shelfs (',
                                            warehouseDetails.shelfs.length,
                                            ')',
                                        ],
                                    }),
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-gray-50 rounded',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className: 'bg-gray-200',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        warehouseDetails.shelfs.map(
                                                            shelf =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            shelf.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsx(
                                                                                                'span',
                                                                                                {
                                                                                                    className: `px-3 py-1 rounded ${shelf.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`,
                                                                                                    children:
                                                                                                        shelf.status,
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    shelf._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                            _jsxs('div', {
                                className: 'mb-6',
                                children: [
                                    _jsxs('h3', {
                                        className: 'text-lg font-semibold mb-2',
                                        children: [
                                            'Cells (',
                                            warehouseDetails.cells.length,
                                            ')',
                                        ],
                                    }),
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-gray-50 rounded',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className: 'bg-gray-200',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        warehouseDetails.cells.map(
                                                            cell =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            cell.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsx(
                                                                                                'span',
                                                                                                {
                                                                                                    className: `px-3 py-1 rounded ${cell.status === 'Enable' ? 'bg-green-500' : 'bg-red-500'} text-white`,
                                                                                                    children:
                                                                                                        cell.status,
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    cell._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                ],
                            }),
                        ],
                    }),
                    _jsx('div', {
                        className: 'flex justify-end p-4 border-t',
                        children: _jsx('button', {
                            onClick: this.closePreviewWarehouseModal,
                            className:
                                'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                            children: 'Close',
                        }),
                    }),
                ],
            }),
        });
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
        return _jsxs('div', {
            className: 'p-4  min-h-screen',
            children: [
                _jsxs('div', {
                    className: 'flex gap-2 mb-4',
                    children: [
                        _jsx('button', {
                            className:
                                'px-4 py-2 bg-gray-900 text-white rounded',
                            onClick: this.openAddModal,
                            children: 'Add New',
                        }),
                        _jsx('button', {
                            className:
                                'px-4 py-2 bg-gray-900 text-white rounded',
                            onClick: this.openWarehouseView,
                            children: 'Warehouse',
                        }),
                        _jsx('button', {
                            className:
                                'px-4 py-2 bg-gray-900 text-white rounded',
                            onClick: this.openAreaView,
                            children: 'Area',
                        }),
                        _jsx('button', {
                            className:
                                'px-4 py-2 bg-gray-900 text-white rounded',
                            onClick: this.openRackView,
                            children: 'Rack',
                        }),
                        _jsx('button', {
                            className:
                                'px-4 py-2 bg-gray-900 text-white rounded',
                            onClick: this.openShelfView,
                            children: 'Shelf',
                        }),
                        _jsx('button', {
                            className:
                                'px-4 py-2 bg-gray-900 text-white rounded',
                            onClick: this.openCellView,
                            children: 'Cell',
                        }),
                        _jsxs('div', {
                            className: 'ml-auto flex items-center gap-2',
                            children: [
                                _jsx('input', {
                                    type: 'text',
                                    placeholder: 'Search for...',
                                    className: 'px-3 py-2 border rounded',
                                    value: this.state.searchTerm,
                                    onChange: this.handleSearchChange,
                                }),
                                _jsxs('select', {
                                    className: 'border rounded px-2 py-2',
                                    children: [
                                        _jsx('option', { children: '15' }),
                                        _jsx('option', { children: '25' }),
                                        _jsx('option', { children: '50' }),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
                error &&
                    _jsx('div', {
                        className: 'mb-4 p-2 bg-red-200 text-red-800 rounded',
                        children: error,
                    }),
                loading &&
                    _jsx('div', {
                        className: 'mb-4 p-2 bg-blue-200 text-blue-800 rounded',
                        children: 'Loading...',
                    }),
                isWarehouseDetailsView
                    ? this.renderWarehouseDetailsTable()
                    : this.state.isWarehouseView
                      ? _jsx('div', {
                            className:
                                'overflow-x-auto bg-white rounded shadow',
                            children: _jsxs('table', {
                                className: 'w-full text-sm',
                                children: [
                                    _jsx('thead', {
                                        className: 'bg-gray-800 text-white',
                                        children: _jsxs('tr', {
                                            children: [
                                                _jsx('th', {
                                                    className:
                                                        'text-left px-4 py-2',
                                                    children: 'Name',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'text-left px-4 py-2',
                                                    children: 'List',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'text-left px-4 py-2',
                                                    children: 'Address',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'text-left px-4 py-2',
                                                    children: 'Status',
                                                }),
                                                _jsx('th', {
                                                    className:
                                                        'text-left px-4 py-2',
                                                    children: 'Action',
                                                }),
                                            ],
                                        }),
                                    }),
                                    _jsx('tbody', {
                                        children:
                                            this.getFilteredWarehouses().map(
                                                (wh, idx) =>
                                                    _jsxs(
                                                        'tr',
                                                        {
                                                            className:
                                                                'border-t hover:bg-gray-50 transition cursor-pointer',
                                                            onClick: () =>
                                                                this.fetchWarehouseDetails(
                                                                    wh._id
                                                                ),
                                                            children: [
                                                                _jsxs('td', {
                                                                    className:
                                                                        'px-4 py-2',
                                                                    children: [
                                                                        _jsx(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'font-medium',
                                                                                children:
                                                                                    wh.name,
                                                                            }
                                                                        ),
                                                                        _jsx(
                                                                            'div',
                                                                            {
                                                                                className:
                                                                                    'text-xs text-gray-500',
                                                                                children:
                                                                                    wh.address,
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                                _jsxs('td', {
                                                                    className:
                                                                        'px-4 py-2 text-gray-600',
                                                                    children: [
                                                                        'Area: ',
                                                                        wh.areaCount,
                                                                        ' ',
                                                                        _jsx(
                                                                            'br',
                                                                            {}
                                                                        ),
                                                                        'Racks: ',
                                                                        wh.rackCount,
                                                                        ' ',
                                                                        _jsx(
                                                                            'br',
                                                                            {}
                                                                        ),
                                                                        'Selfs: ',
                                                                        wh.shelfCount,
                                                                        ' ',
                                                                        _jsx(
                                                                            'br',
                                                                            {}
                                                                        ),
                                                                        'Cells: ',
                                                                        wh.cellCount,
                                                                    ],
                                                                }),
                                                                _jsx('td', {
                                                                    className:
                                                                        'px-4 py-2',
                                                                    children:
                                                                        wh.address,
                                                                }),
                                                                _jsx('td', {
                                                                    className:
                                                                        'px-4 py-2',
                                                                    children:
                                                                        _jsx(
                                                                            'button',
                                                                            {
                                                                                onClick:
                                                                                    async e => {
                                                                                        e.stopPropagation();
                                                                                        await this.handleUpdateWarehouseStatus(
                                                                                            wh._id,
                                                                                            wh.status ===
                                                                                                'active'
                                                                                                ? 'inactive'
                                                                                                : 'active'
                                                                                        );
                                                                                        // Reset to default warehouse table view after status update
                                                                                        this.setState(
                                                                                            {
                                                                                                isWarehouseDetailsView: false,
                                                                                                isWarehouseView: true,
                                                                                            }
                                                                                        );
                                                                                    },
                                                                                className: `px-3 py-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${wh.status === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`,
                                                                                children:
                                                                                    wh.status ||
                                                                                    'Enable',
                                                                            }
                                                                        ),
                                                                }),
                                                                _jsxs('td', {
                                                                    className:
                                                                        'px-4 py-2 flex gap-2',
                                                                    children: [
                                                                        _jsx(
                                                                            'button',
                                                                            {
                                                                                className:
                                                                                    'text-red-600',
                                                                                onClick:
                                                                                    () =>
                                                                                        this.handleDeleteWarehouse(
                                                                                            wh._id
                                                                                        ),
                                                                                children:
                                                                                    '\uD83D\uDDD1\uFE0F',
                                                                            }
                                                                        ),
                                                                        _jsx(
                                                                            'button',
                                                                            {
                                                                                className:
                                                                                    'text-yellow-600',
                                                                                onClick:
                                                                                    () =>
                                                                                        this.openEditWarehouseModal(
                                                                                            wh
                                                                                        ),
                                                                                children:
                                                                                    '\u270F\uFE0F',
                                                                            }
                                                                        ),
                                                                        _jsx(
                                                                            'button',
                                                                            {
                                                                                className:
                                                                                    'px-3 py-1 rounded bg-yellow-700 text-white',
                                                                                onClick:
                                                                                    () =>
                                                                                        this.openPreviewWarehouseModal(
                                                                                            wh
                                                                                        ),
                                                                                children:
                                                                                    'Show Preview',
                                                                            }
                                                                        ),
                                                                    ],
                                                                }),
                                                            ],
                                                        },
                                                        idx
                                                    )
                                            ),
                                    }),
                                ],
                            }),
                        })
                      : _jsxs(_Fragment, {
                            children: [
                                this.state.isAreaView &&
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-white rounded shadow mb-4',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className:
                                                        'bg-gray-800 text-white',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Warehouse',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Action',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        this.getFilteredAreas().map(
                                                            area =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t hover:bg-gray-50 transition',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            area.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            area.warehouse,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsxs(
                                                                                                'select',
                                                                                                {
                                                                                                    value: area.status,
                                                                                                    onChange:
                                                                                                        e =>
                                                                                                            this.handleUpdateAreaStatus(
                                                                                                                area._id,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            ),
                                                                                                    className:
                                                                                                        'px-3 py-1 rounded bg-green-500 text-black border-none',
                                                                                                    children:
                                                                                                        [
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Enable',
                                                                                                                    children:
                                                                                                                        'Enable',
                                                                                                                }
                                                                                                            ),
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Disable',
                                                                                                                    children:
                                                                                                                        'Disable',
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsxs(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2 flex gap-2',
                                                                                        children:
                                                                                            [
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-red-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.handleDeleteArea(
                                                                                                                    area._id
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\uD83D\uDDD1\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-yellow-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.openEditAreaModal(
                                                                                                                    area
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\u270F\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    area._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                this.state.isRackView &&
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-white rounded shadow mb-4',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className:
                                                        'bg-gray-800 text-white',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Warehouse',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Action',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        this.getFilteredRacks().map(
                                                            rack =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t hover:bg-gray-50 transition',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            rack.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            rack.warehouse,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsxs(
                                                                                                'select',
                                                                                                {
                                                                                                    value: rack.status,
                                                                                                    onChange:
                                                                                                        e =>
                                                                                                            this.handleUpdateRackStatus(
                                                                                                                rack._id,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            ),
                                                                                                    className:
                                                                                                        'px-3 py-1 rounded bg-green-500 text-black border-none',
                                                                                                    children:
                                                                                                        [
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Enable',
                                                                                                                    children:
                                                                                                                        'Enable',
                                                                                                                }
                                                                                                            ),
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Disable',
                                                                                                                    children:
                                                                                                                        'Disable',
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsxs(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2 flex gap-2',
                                                                                        children:
                                                                                            [
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-red-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.handleDeleteRack(
                                                                                                                    rack._id
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\uD83D\uDDD1\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-yellow-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.openEditRackModal(
                                                                                                                    rack
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\u270F\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    rack._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                this.state.isShelfView &&
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-white rounded shadow mb-4',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className:
                                                        'bg-gray-800 text-white',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Warehouse',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Action',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        this.getFilteredShelfs().map(
                                                            shelf =>
                                                                _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t hover:bg-gray-50 transition',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            shelf.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            shelf.warehouse,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsxs(
                                                                                                'select',
                                                                                                {
                                                                                                    value: shelf.status,
                                                                                                    onChange:
                                                                                                        e =>
                                                                                                            this.handleUpdateShelfStatus(
                                                                                                                shelf._id,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            ),
                                                                                                    className:
                                                                                                        'px-3 py-1 rounded bg-green-500 text-black border-none',
                                                                                                    children:
                                                                                                        [
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Enable',
                                                                                                                    children:
                                                                                                                        'Enable',
                                                                                                                }
                                                                                                            ),
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Disable',
                                                                                                                    children:
                                                                                                                        'Disable',
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsxs(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2 flex gap-2',
                                                                                        children:
                                                                                            [
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-red-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.handleDeleteShelf(
                                                                                                                    shelf._id
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\uD83D\uDDD1\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-yellow-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.openEditShelfModal(
                                                                                                                    shelf
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\u270F\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    shelf._id
                                                                )
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                                this.state.isCellView &&
                                    _jsx('div', {
                                        className:
                                            'overflow-x-auto bg-white rounded shadow mb-4',
                                        children: _jsxs('table', {
                                            className: 'w-full text-sm',
                                            children: [
                                                _jsx('thead', {
                                                    className:
                                                        'bg-gray-800 text-white',
                                                    children: _jsxs('tr', {
                                                        children: [
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Cell Name',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Warehouse',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Area',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Shelf',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Rack',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Status',
                                                            }),
                                                            _jsx('th', {
                                                                className:
                                                                    'text-left px-4 py-2',
                                                                children:
                                                                    'Action',
                                                            }),
                                                        ],
                                                    }),
                                                }),
                                                _jsx('tbody', {
                                                    children:
                                                        this.getFilteredCells().map(
                                                            cell => {
                                                                const areaObj =
                                                                    this.state.areas.find(
                                                                        a =>
                                                                            a._id ===
                                                                            cell.area
                                                                    );
                                                                const areaName =
                                                                    areaObj
                                                                        ? areaObj.name
                                                                        : '';
                                                                const shelfObj =
                                                                    this.state.shelfs.find(
                                                                        s =>
                                                                            s._id ===
                                                                            cell.shelf
                                                                    );
                                                                const shelfName =
                                                                    shelfObj
                                                                        ? shelfObj.name
                                                                        : '';
                                                                const rackObj =
                                                                    this.state.racks.find(
                                                                        r =>
                                                                            r._id ===
                                                                            cell.rack
                                                                    );
                                                                const rackName =
                                                                    rackObj
                                                                        ? rackObj.name
                                                                        : '';
                                                                return _jsxs(
                                                                    'tr',
                                                                    {
                                                                        className:
                                                                            'border-t hover:bg-gray-50 transition',
                                                                        children:
                                                                            [
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            cell.name,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            cell.warehouse,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            areaName,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            shelfName,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            rackName,
                                                                                    }
                                                                                ),
                                                                                _jsx(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2',
                                                                                        children:
                                                                                            _jsxs(
                                                                                                'select',
                                                                                                {
                                                                                                    value: cell.status,
                                                                                                    onChange:
                                                                                                        e =>
                                                                                                            this.handleUpdateCellStatus(
                                                                                                                cell._id,
                                                                                                                e
                                                                                                                    .target
                                                                                                                    .value
                                                                                                            ),
                                                                                                    className:
                                                                                                        'px-3 py-1 rounded bg-green-500 text-black border-none',
                                                                                                    children:
                                                                                                        [
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Enable',
                                                                                                                    children:
                                                                                                                        'Enable',
                                                                                                                }
                                                                                                            ),
                                                                                                            _jsx(
                                                                                                                'option',
                                                                                                                {
                                                                                                                    value: 'Disable',
                                                                                                                    children:
                                                                                                                        'Disable',
                                                                                                                }
                                                                                                            ),
                                                                                                        ],
                                                                                                }
                                                                                            ),
                                                                                    }
                                                                                ),
                                                                                _jsxs(
                                                                                    'td',
                                                                                    {
                                                                                        className:
                                                                                            'px-4 py-2 flex gap-2',
                                                                                        children:
                                                                                            [
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-red-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.handleDeleteCell(
                                                                                                                    cell._id
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\uD83D\uDDD1\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                                _jsx(
                                                                                                    'button',
                                                                                                    {
                                                                                                        className:
                                                                                                            'text-yellow-600',
                                                                                                        onClick:
                                                                                                            () =>
                                                                                                                this.openEditCellModal(
                                                                                                                    cell
                                                                                                                ),
                                                                                                        children:
                                                                                                            '\u270F\uFE0F',
                                                                                                    }
                                                                                                ),
                                                                                            ],
                                                                                    }
                                                                                ),
                                                                            ],
                                                                    },
                                                                    cell._id
                                                                );
                                                            }
                                                        ),
                                                }),
                                            ],
                                        }),
                                    }),
                            ],
                        }),
                isModalOpen &&
                    _jsx('div', {
                        className:
                            'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
                        children: _jsxs('div', {
                            className:
                                'bg-white rounded shadow-lg w-96 max-w-full',
                            children: [
                                this.renderModalContent(),
                                _jsx('div', {
                                    className: 'flex justify-end p-4 border-t',
                                    children: _jsx('button', {
                                        onClick: this.closeModal,
                                        className:
                                            'px-4 py-2 bg-gray-300 rounded hover:bg-gray-400',
                                        children: 'Cancel',
                                    }),
                                }),
                            ],
                        }),
                    }),
                this.state.isAreaModalOpen && this.renderAreaModal(),
                this.state.isEditAreaModalOpen && this.renderEditAreaModal(),
                this.state.isEditRackModalOpen && this.renderEditRackModal(),
                this.state.isEditShelfModalOpen && this.renderEditShelfModal(),
                this.state.isEditCellModalOpen && this.renderEditCellModal(),
                this.renderAddWarehouseModal(),
                this.renderAddAreaModal(),
                this.renderAddRackModal(),
                this.renderAddShelfModal(),
                this.renderAddCellModal(),
                this.renderEditWarehouseModal(),
                this.renderPreviewWarehouseModal(),
            ],
        });
    }
}
