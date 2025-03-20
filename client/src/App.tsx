import MainLayout from "./layouts/main/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
