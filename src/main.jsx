import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import router from './routes/Routes.jsx';
import ContextProvider from './Context/ContextProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';



const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        
        <RouterProvider router={router} />
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
