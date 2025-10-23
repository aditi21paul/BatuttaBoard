import React, { useState, useEffect } from 'react';

export default function Modal({ onClose, onSave, initial, currentUser }) {
  const [form, setForm] = useState({
    src: '',
    dst: '',
    date: '',
    time: '',
    contact: '',
    notes: ''
  });

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({
      src: '',
      dst: '',
      date: '',
      time: '',
      contact: '',
      notes: ''
    });
  }, [initial]);

  const handleChange = (e) => {
    const id = e.target.id;
    setForm(prev => ({ ...prev, [id]: e.target.value }));
  };

  const save = () => {
    if (!form.src || !form.dst || !form.date || !form.time || !form.contact) return;
    onSave({ ...form, user: currentUser });
  };

  return (
    <div className={"modal active"} onClick={(e) => e.target.className === 'modal active' && onClose()}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>✖</span>
        <h2>{initial ? 'Edit travel card' : 'Create travel card'}</h2>
        <input id="src" placeholder="Source" value={form.src} onChange={handleChange} />
        <input id="dst" placeholder="Destination" value={form.dst} onChange={handleChange} />
        <input id="date" type="date" value={form.date} onChange={handleChange} />
        <input id="time" type="time" value={form.time} onChange={handleChange} />
        <input id="contact" placeholder="Contact information" value={form.contact} onChange={handleChange} />
        <textarea id="notes" placeholder="Other preferences / notes" value={form.notes} onChange={handleChange} />
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
