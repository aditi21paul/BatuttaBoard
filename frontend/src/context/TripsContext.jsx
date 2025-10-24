import { createContext, useReducer } from "react";

export const TripsContext = createContext();

export const tripsReducer = (state, action) => {
    switch (action.type) {
        case "SET_TRIPS":
            return { trips: action.payload };

        case "CREATE_TRIP":
            return { trips: [action.payload, ...state.trips] };

        case "UPDATE_TRIP":
            return {
                trips: state.trips.map(trip =>
                    trip._id === action.payload._id ? action.payload : trip
                ),
            };

        case "DELETE_TRIP":
            return {
                trips: state.trips.filter((trip) => trip._id !== action.payload._id),
            };

        default:
            return state;
    }
};

export const TripsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(tripsReducer, {
        trips: [],
    });

    return (
        <TripsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TripsContext.Provider>
    );
};
