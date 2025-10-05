import { jsx as _jsx } from 'react/jsx-runtime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router.js';
import './index.css';
import Erp_Provider from './provider/ErpContext.js';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
    _jsx(React.StrictMode, {
        children: _jsx(QueryClientProvider, {
            client: queryClient,
            children: _jsx(Erp_Provider, {
                children: _jsx(RouterProvider, { router: router }),
            }),
        }),
    })
);
