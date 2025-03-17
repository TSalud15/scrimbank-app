import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import MainSidebar from "./components/MainSidebar";
import Topbar from "./components/Topbar";

const MainLayout = () => {
    const { isSignedIn } = useAuth();

    if (!isSignedIn) {
        //TODO: Create sign in page
        return (
            <div>
                Please sign in
                <SignInButton>
                    <Button>Sign In</Button>
                </SignInButton>
            </div>
        );
    }
    return (
        <div className="[--header-height:calc(theme(spacing.14))]">
            <SidebarProvider className="flex flex-col" defaultOpen={true}>
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
