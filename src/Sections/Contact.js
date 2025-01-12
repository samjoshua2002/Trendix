import React, { useState } from 'react';
import axios from 'axios';
import { FaBug, FaEnvelope, FaPhone, FaNewspaper } from 'react-icons/fa';
import {BASE_URL} from "../App"
function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/contact`, formData);

      if (response.status === 200) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('Error sending message. Please try again later.');
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-3xl font-bold mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Form Section */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                rows="4"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-[#E23378] text-white py-2 px-4 rounded-md hover:bg-[#E23323]"
            >
              Send
            </button>
            {status && <p className="text-center mt-4 text-sm text-gray-700">{status}</p>}
          </form>

          {/* Contact Information Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mx-auto">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-[#E23378] h-6 w-6 shrink-0" />
              <div>
                <p className="font-bold text-gray-700">Technical Support</p>
                <p className="text-sm text-gray-500">trendixauth@gmail.com</p>
                <p className="text-sm text-gray-500">+91 8610866413</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhone className="text-[#E23378] h-6 w-6 shrink-0" />
              <div>
                <p className="font-bold text-gray-700">Sales Questions</p>
                <p className="text-sm text-gray-500">trendixauth@gmail.com</p>
                <p className="text-sm text-gray-500">+91 8610866413</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaNewspaper className="text-[#E23378] h-6 w-6 shrink-0" />
              <div>
                <p className="font-bold text-gray-700">Press</p>
                <p className="text-sm text-gray-500">trendixauth@gmail.com</p>
                <p className="text-sm text-gray-500">+91 8610866413</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaBug className="text-[#E23378] h-6 w-6 shrink-0" />
              <div>
                <p className="font-bold text-gray-700">Bug Report</p>
                <p className="text-sm text-gray-500">bugs@example.com</p>
                <p className="text-sm text-gray-500">+1 234-567-89</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
