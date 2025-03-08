import DashboardPage from "./pages/dashboard/DashboardPage";
import { Route, Routes } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DashboardPage />} />
            </Routes>
        </>
    );
}

export default App;
