import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import './index.css'
import router from './routes/Routes.jsx';
import ContextProvider from './Context/ContextProvider.jsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>

    <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
