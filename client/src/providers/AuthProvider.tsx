import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";

const updateApiToken = (token: string | null) => {
    if (token)
        axiosInstance.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${token}`;
    else delete axiosInstance.defaults.headers.common["Authorization"];
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, isLoaded } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                console.log("updated token: ", token);
            } catch (error: any) {
                updateApiToken(null);
                console.log("Error in AuthProvider: ", error);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, [getToken]);

    if (loading || !isLoaded) return <div>Loading...</div>;
    return <>{children}</>;
};
export default AuthProvider;
