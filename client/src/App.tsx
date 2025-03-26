import MainLayout from "./layouts/main/MainLayout";
import DashboardPage from "./pages/dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";

import { Toaster } from "react-hot-toast";
import PracticeSessionPage from "./pages/practice-session/PracticeSessionPage";
import ScrimPage from "./pages/scrim/ScrimPage";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route element={<MainLayout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route
                        path="session/:sessionId"
                        element={<PracticeSessionPage />}
                    />
                    <Route path="scrim/:scrimId" element={<ScrimPage />} />
                </Route>
            </Routes>
            <Toaster />
        </>
    );
}

export default App;
