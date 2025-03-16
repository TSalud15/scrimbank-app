import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SignInButton, useAuth } from "@clerk/clerk-react";
import { Outlet } from "react-router-dom";
import MainSidebar from "./components/MainSidebar";

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
        <SidebarProvider>
            <MainSidebar />
            <main>
                <SidebarTrigger />
                <Outlet />
            </main>
        </SidebarProvider>
    );
};
export default MainLayout;
