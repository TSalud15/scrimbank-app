import { useSessionStore } from "@/stores/useSessionStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ScrimPage = () => {
    const { scrimId } = useParams();

    const { currentScrim, fetchScrimById } = useSessionStore();

    useEffect(() => {
        if (scrimId) fetchScrimById(scrimId);
    }, [scrimId, fetchScrimById]);

    return <div>{currentScrim?.name}</div>;
};
export default ScrimPage;
