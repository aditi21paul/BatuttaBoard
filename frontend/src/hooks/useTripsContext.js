import { TripsContext } from "../context/TripsContext";
import { useContext } from "react";

export const useTripsContext = () => {
    const context = useContext(TripsContext);
    if (!context) { throw new Error("useTripsContext must be used within a TripsContextProvider"); }
    return context;
};