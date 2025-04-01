import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import MainSidebar from "./components/MainSidebar";
import Topbar from "./components/Topbar";

const MainLayout = () => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        //TODO: Create sign in page
        return <RedirectToSignIn />;
    }
    return (
        <div className="[--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex flex-col" defaultOpen={false}>
                <Topbar />
                <div className="flex flex-1">
                    <MainSidebar />
                    <SidebarInset>
                        <Outlet />
                    </SidebarInset>
                </div>
            </SidebarProvider>
        </div>
    );
};
export default MainLayout;
