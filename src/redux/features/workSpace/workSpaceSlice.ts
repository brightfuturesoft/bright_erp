import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store'; // Replace with your actual import path
import { IWorkSpaceDataType } from 'src/types/workspace'; // Replace with your actual import path

// Retrieve workspace data from localStorage if available
const storedWorkspaceData = localStorage.getItem('workspaceData');
let initialState: IWorkSpaceDataType = {
    _id: '',
    name: '',
    description: '',
    image: '',
    createdAt: new Date(),
    updatedAt: new Date(),
};

if (storedWorkspaceData) {
    initialState = JSON.parse(storedWorkspaceData);
}

const workSpaceSlice = createSlice({
    name: 'workSpace',
    initialState,
    reducers: {
        setWorkSpace(state, action: PayloadAction<IWorkSpaceDataType>) {
            return {
                ...state,
                ...action.payload,
            };
        },
        // clearWorkSpace(state) {
        //     return {
        //         _id: '',
        //         permission: [],
        //         name: '',
        //         description: '',
        //         image: '',
        //         createdAt: '',
        //         updatedAt: '',
        //     };
        // },
    },
});

export const { setWorkSpace } = workSpaceSlice.actions;

export const selectWorkSpace = (state: RootState) => state.workSpace;

export default workSpaceSlice.reducer;
