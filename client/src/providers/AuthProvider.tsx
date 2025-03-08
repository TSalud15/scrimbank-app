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
    const { getToken } = useAuth();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = await getToken();
                updateApiToken(token);
                console.log("token: ", token);
            } catch (error: any) {
                console.log("Error in AuthProvider: ", error);
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, [getToken]);

    if (loading) return <div>Loading...</div>;
    return <div>{children}</div>;
};
export default AuthProvider;
