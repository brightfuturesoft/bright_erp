/* eslint-disable @typescript-eslint/no-explicit-any */
export type CommonDataType = {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};

export type IMeta = {
    limit: number;
    page: number;
    total: number;
};

export type ResponseSuccessType = {
    success?: string;
    message?: string;
    data: any;
    meta?: IMeta;
    statusCode?: string;
};

export type IGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
    path: string | number;
    message: string;
};
