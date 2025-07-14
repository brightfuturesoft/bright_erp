import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './Router/Router.js';
import './index.css';
import Erp_Provider from './provider/ErpContext.js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <Erp_Provider>
                <RouterProvider router={router} />
            </Erp_Provider>
        </QueryClientProvider>
    </React.StrictMode>
);
