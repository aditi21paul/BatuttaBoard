import React from 'react';

export default function TravelCard({ card, index, currentUser, onDelete, onEditClick }) {
  return (
    <div className="card">
      <strong>{card.src}</strong> → <strong>{card.dst}</strong>
      <br />
      {card.date} at {card.time}
      <br />
      👤 {card.user}
      <br />
      📞 {card.contact}
      <br />
      <em>{card.notes}</em>
      {card.user === currentUser && (
        <>
          <br />
          <button onClick={() => onEditClick(index)}>Edit</button>
          <button onClick={() => onDelete(index)}>Delete</button>
        </>
      )}
    </div>
  );
}
