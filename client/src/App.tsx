import MainLayout from "./layouts/main/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
