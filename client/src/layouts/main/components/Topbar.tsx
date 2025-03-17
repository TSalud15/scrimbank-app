import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const Topbar = () => {
    return (
        <header className="flex sticky top-0 z-50 w-full items-center border-b bg-background">
            <div className="flex h-[--header-height] w-full justify-between items-center gap-2 px-4">
                <div className="flex items-center space-x-3">
                    <SidebarTrigger />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:text-lg text-base"
                        asChild
                    >
                        <Link to="/dashboard">ScrimBank</Link>
                    </Button>
                </div>

                <UserButton />
            </div>
        </header>
    );
};
export default Topbar;
