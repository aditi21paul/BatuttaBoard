import React, { useState, useMemo, useEffect } from 'react';
import { useTripsContext } from '../hooks/useTripsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import TravelCard from '../components/TravelCard';
import CardModal from '../components/CardModal';

const Dashboard = () => {
    const { trips, dispatch } = useTripsContext();
    const { user } = useAuthContext();
    const [filterSource, setFilterSource] = useState('');
    const [filterDestination, setFilterDestination] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch trips from OTHER users
    useEffect(() => {
        if (!user) return;

        const fetchTrips = async () => {
            try {
                const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';
                const response = await fetch(`${API_BASE_URL}/api/trips`, {
                    headers: { 'Authorization': `Bearer ${user.token}` }
                });
                const data = await response.json();
                if (response.ok) {
                    dispatch({ type: 'SET_TRIPS', payload: data });
                } else {
                    console.error('Fetch error:', data.error || data.message);
                }
            } catch (err) {
                console.error('Network error:', err);
            }
        };

        fetchTrips();
    }, [user, dispatch]);

    // Handle saving a NEW trip
    const handleCreateTrip = async (formData) => {
        if (!user) return;

        const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

        try {
            const response = await fetch(`${API_BASE_URL}/api/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    source: formData.src,
                    destination: formData.dst,
                    date: formData.date,
                    time: formData.time,
                    contactNumber: formData.contact,
                    notes: formData.notes
                })
            });

            const json = await response.json();

            if (response.ok) {
                // ✅ Add new trip to context (so it appears in Personal Dashboard too)
                dispatch({ type: 'CREATE_TRIP', payload: json });
                setIsModalOpen(false);
            } else {
                alert('Failed to create trip: ' + (json.error || 'Unknown error'));
            }
        } catch (err) {
            console.error('Create error:', err);
            alert('Network error');
        }
    };

    const uniqueSources = useMemo(() =>
        [...new Set(trips.map(trip => trip.source))], [trips]
    );
    const uniqueDestinations = useMemo(() =>
        [...new Set(trips.map(trip => trip.destination))], [trips]
    );

    const filteredTrips = trips.filter(trip => {
        return (!filterSource || trip.source === filterSource) &&
            (!filterDestination || trip.destination === filterDestination);
    });

    return (
        <div className="dashboard">
            <div className="container">
                <h2>Dashboard</h2>

                {/* Create Button */}
                <button onClick={() => setIsModalOpen(true)}>
                    Create Travel Card
                </button>

                <h3>Filter Travel Cards</h3>
                <select value={filterSource} onChange={(e) => setFilterSource(e.target.value)}>
                    <option value="">Filter by Source</option>
                    {uniqueSources.map(src => (
                        <option key={src} value={src}>{src}</option>
                    ))}
                </select>
                <select value={filterDestination} onChange={(e) => setFilterDestination(e.target.value)}>
                    <option value="">Filter by Destination</option>
                    {uniqueDestinations.map(dst => (
                        <option key={dst} value={dst}>{dst}</option>
                    ))}
                </select>

                <div className="travel-cards">
                    {filteredTrips.length === 0 ? (
                        <p>No trips from other users found.</p>
                    ) : (
                        filteredTrips.map(trip => (
                            <TravelCard key={trip._id} card={trip} />
                        ))
                    )}
                </div>
            </div>

            {/* Render modal when open */}
            {isModalOpen && (
                <CardModal
                    card={null} // null = create mode
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleCreateTrip}
                />
            )}
        </div>
    );
};

export default Dashboard;