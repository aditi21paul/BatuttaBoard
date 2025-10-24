import { useEffect } from "react";
import { useTripsContext } from "../hooks/useTripsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TravelCard from "../components/TravelCard";

const PersonalDashboard = () => {
  const { trips, dispatch } = useTripsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    const fetchMyTrips = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
        const response = await fetch(`${API_BASE_URL}/api/trips/user/me`, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });

        const data = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_TRIPS', payload: data });
        } else {
          console.error('Fetch failed:', data.error || data.message);
          if (response.status === 401) {
            // Optional: logout logic here
          }
        }
      } catch (err) {
        console.error('Network error:', err);
      }
    };

    fetchMyTrips();
  }, [user, dispatch]);

  return (
    <div className="personal-dashboard">
      <div className="container">
        <h2>My Trips</h2>
        {trips.length === 0 ? (
          <p>No trips yet.</p>
        ) : (
          trips.map(trip => <TravelCard key={trip._id} card={trip} />)
        )}
      </div>
    </div>
  );
};

export default PersonalDashboard;