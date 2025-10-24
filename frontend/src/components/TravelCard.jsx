import React, { useState } from 'react';
import { useTripsContext } from "../hooks/useTripsContext";
import { useAuthContext } from "../hooks/useAuthContext";

function TravelCard({ card }) {
  const { dispatch } = useTripsContext();
  const { user: currentUser } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);

  const [editData, setEditData] = useState({
    source: card.source,
    destination: card.destination,
    date: card.date ? new Date(card.date).toISOString().split('T')[0] : '',
    time: card.time,
    contactNumber: card.contactNumber || '',
    notes: card.notes || ''
  });

  const formatDate = (isoDateString) => {
    return new Date(isoDateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDelete = async () => {
    if (!currentUser) return;
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips/${card._id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${currentUser.token}` }
      });
      if (response.ok) {
        dispatch({ type: 'DELETE_TRIP', payload: card });
      } else {
        const json = await response.json();
        console.error('Delete failed:', json.error || json.message);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  const handleEdit = () => {
    if (!currentUser) return;
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      source: card.source,
      destination: card.destination,
      date: card.date ? new Date(card.date).toISOString().split('T')[0] : '',
      time: card.time,
      contactNumber: card.contactNumber || '',
      notes: card.notes || ''
    });
  };

  const handleSave = async () => {
    const { source, destination, date, time, contactNumber } = editData;
    if (!source || !destination || !date || !time || !contactNumber) {
      alert("Please fill all required fields.");
      return;
    }

    if (!currentUser) return;
    const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

    try {
      const response = await fetch(`${API_BASE_URL}/api/trips/${card._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentUser.token}`
        },
        body: JSON.stringify(editData)
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'UPDATE_TRIP', payload: json });
        setIsEditing(false);
      } else {
        alert('Update failed: ' + (json.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Network error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Edit Mode UI
  if (isEditing) {
    return (
      <div className="card">
        <input name="source" value={editData.source} onChange={handleChange} placeholder="Source" required />
        <input name="destination" value={editData.destination} onChange={handleChange} placeholder="Destination" required />
        <input name="date" type="date" value={editData.date} onChange={handleChange} required />
        <input name="time" type="time" value={editData.time} onChange={handleChange} required />
        <input name="contactNumber" value={editData.contactNumber} onChange={handleChange} placeholder="Contact Number" required />
        <textarea name="notes" value={editData.notes} onChange={handleChange} placeholder="Notes" />
        <br />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    );
  }

  const isOwner = currentUser && (currentUser.email === card.user.email);
  const cardAuthor = isOwner ? "You" : card.user.email;
  // View Mode UI
  return (
    <div className="card">
      <strong>{card.source}</strong> → <strong>{card.destination}</strong><br />
      📅 {formatDate(card.date)} at {card.time}<br />
      👤 {cardAuthor}<br />
      📞 {card.contactNumber || 'N/A'}<br />
      <em>{card.notes || 'No notes'}</em>
      <br />
      {isOwner && (<button onClick={handleEdit}>Edit</button>)}
      {isOwner && (< button onClick={handleDelete}>Delete</button>)}
    </div >
  );
}

export default TravelCard;