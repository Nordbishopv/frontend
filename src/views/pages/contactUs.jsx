import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/v1/contact/', formData);
            setStatus('Message sent successfully!');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            setStatus('Failed to send message.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Contact Us</h2>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required />
            <textarea name="message" placeholder="Message" value={formData.message} onChange={handleChange} required />
            <button type="submit">Send</button>
            <p>{status}</p>
        </form>
    );
};

export default ContactForm;
