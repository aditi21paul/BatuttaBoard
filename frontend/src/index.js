import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import { AuthContextProvider } from "./context/AuthContext";
import { TripsContextProvider } from "./context/TripsContext";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthContextProvider>
            <TripsContextProvider>
                <App />
            </TripsContextProvider>
        </AuthContextProvider>
    </StrictMode>
)
