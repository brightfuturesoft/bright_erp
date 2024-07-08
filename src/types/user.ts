import { CommonDataType } from '@/common/common.data.type';
import { USER_ROLE } from '@/helpers/conts';

export type IUserSchema = {
    name: string;
    email: string;
    password: string;
    phone_number: string;
    image: string;
    role: USER_ROLE;
};

export type IUSerDataType = CommonDataType & {
    workspace_id: string;
    verify: string;
    status: string;
};
