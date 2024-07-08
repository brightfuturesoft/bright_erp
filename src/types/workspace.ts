import { CommonDataType } from 'src/common/common.data.type';

export type IWorkSpaceSchema = {
    terms?: string;
    permission?: string[];
    name: string;
    description?: string;
    image?: string;
};

export type IWorkSpaceDataType = CommonDataType & IWorkSpaceSchema;
