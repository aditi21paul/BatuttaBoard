import React, { useState, useEffect } from 'react';

function CardModal({ card, onClose, onSave }) {
  const [formData, setFormData] = useState({
    src: '', dst: '', date: '', time: '', contact: '', notes: ''
  });

  useEffect(() => {
    if (card) setFormData(card);
  }, [card]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { src, dst, date, time, contact } = formData;
    if (!src || !dst || !date || !time || !contact) {
      alert("Please fill all required fields.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="modal active" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>✖</span>
        <h2>{card ? 'Edit Travel Card' : 'Create Travel Card'}</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" id="src" placeholder="Source" value={formData.src} onChange={handleChange} required />
          <input type="text" id="dst" placeholder="Destination" value={formData.dst} onChange={handleChange} required />
          <input type="date" id="date" value={formData.date} onChange={handleChange} required />
          <input type="time" id="time" value={formData.time} onChange={handleChange} required />
          <input type="text" id="contact" placeholder="Contact information" value={formData.contact} onChange={handleChange} required />
          <textarea id="notes" placeholder="Other preferences / notes" value={formData.notes} onChange={handleChange}></textarea>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default CardModal;