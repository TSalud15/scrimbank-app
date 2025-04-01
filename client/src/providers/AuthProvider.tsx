import { axiosInstance } from "@/lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

// const updateApiToken = (token: string | null) => {
//     if (token)
//         axiosInstance.defaults.headers.common[
//             "Authorization"
//         ] = `Bearer ${token}`;
//     else delete axiosInstance.defaults.headers.common["Authorization"];
// };

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const { getToken, isLoaded } = useAuth();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            axiosInstance.interceptors.request.use(async (config) => {
                const token = await getToken();
                if (token) {
                    // console.log("current token", token);
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            });
        };
        initAuth();
    }, [getToken]);

    if (!isLoaded) return <div>Loading...</div>;
    return <>{children}</>;
};
export default AuthProvider;
