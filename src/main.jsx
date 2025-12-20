import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import router from './routes/Routes.jsx';
import ContextProvider from './Context/ContextProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Loading from './pages/Loading/Loading.jsx';



const queryClient = new QueryClient();
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
         <Suspense fallback={<Loading></Loading>}>
         
            <RouterProvider router={router} />
         </Suspense>
      </ContextProvider>
    </QueryClientProvider>
  </StrictMode>
);
