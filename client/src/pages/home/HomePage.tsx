import { Button } from "@/components/ui/button";
import {
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/clerk-react";

const HomePage = () => {
    return (
        <div>
            <SignedOut>
                <SignInButton>
                    <Button>Hello world!</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    );
};
export default HomePage;
