import { useAuthContext } from "./useAuthContext";
import { useTripsContext } from "./useTripsContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchT } = useTripsContext();
    const navigate = useNavigate();
    const logout = () => {
        // remove user from storage
        localStorage.removeItem("user");

        // dispatch logout action
        dispatch({ type: "LOGOUT" });
        dispatchT({ type: "SET_QUESTIONS", payload: null });
        navigate("/login");
    };

    return { logout };
};
