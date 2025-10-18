import React, { useState } from 'react';
import Header from './Header';
import Modal from './Modal';
import TravelCard from './TravelCard';

export default function Dashboard() {
  const currentUser = localStorage.getItem('currentUser') || '';
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [filters, setFilters] = useState({ src: '', dst: '' });

  const openCreate = () => {
    setEditingIndex(null);
    setShowModal(true);
  };

  const handleSave = (card) => {
    if (editingIndex !== null) {
      const copy = [...cards];
      copy[editingIndex] = card;
      setCards(copy);
    } else {
      setCards(prev => [...prev, card]);
    }
    setShowModal(false);
  };

  const handleDelete = (index) => {
    setCards(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setShowModal(true);
  };

  const displayed = cards.filter(c =>
    (filters.src ? c.src === filters.src : true) &&
    (filters.dst ? c.dst === filters.dst : true)
  );

  return (
    <>
      <Header />
      <div id="dashboard" className="dashboard">
        <div className="container">
          <h2>Dashboard</h2>
          <button id="openCreateCardBtn" onClick={openCreate}>Create Travel Card</button>
          <h3>Filter Travel Cards</h3>
          <select id="filterSource" onChange={(e) => setFilters(f => ({...f, src: e.target.value}))}>
            <option value="">Filter by Source</option>
            {[...new Set(cards.map(c => c.src))].map(src => <option key={src} value={src}>{src}</option>)}
          </select>
          <select id="filterDestination" onChange={(e) => setFilters(f => ({...f, dst: e.target.value}))}>
            <option value="">Filter by Destination</option>
            {[...new Set(cards.map(c => c.dst))].map(dst => <option key={dst} value={dst}>{dst}</option>)}
          </select>
          <div className="travel-cards" id="travelCards">
            {displayed.map((card, i) => (
              <TravelCard
                key={i}
                index={i}
                card={card}
                currentUser={currentUser}
                onDelete={handleDelete}
                onEditClick={handleEditClick}
              />
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          initial={editingIndex !== null ? cards[editingIndex] : null}
          currentUser={currentUser}
        />
      )}
    </>
  );
}
