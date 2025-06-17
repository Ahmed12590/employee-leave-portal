'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  userId: string;
  name: string;
  role: string;
}

export default function EmployeeDashboard() {
  const { id } = useParams();
  const [leaves, setLeaves] = useState([]);
  const [form, setForm] = useState({ reason: '', fromDate: '', toDate: '' });
  const [userName, setUserName] = useState('Employee');

  const getLeaves = async () => {
    try {
      const res = await axios.get(`/api/leave/${id}`);
      setLeaves(res.data);
    } catch (error) {
      console.error('Error fetching leaves:', error);
    }
  };

  const applyLeave = async () => {
    try {
      await axios.post(`/api/leave/${id}`, form);
      setForm({ reason: '', fromDate: '', toDate: '' });
      getLeaves();
    } catch (error) {
      console.error('Error applying for leave:', error);
    }
  };

  useEffect(() => {
    getLeaves();

    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token);
        setUserName(decoded.name);
      } catch (err) {
        console.error('Token decoding failed:', err);
      }
    }
  }, []);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-blue-800">
        Welcome {userName}
      </h1>

      <h2 className="text-xl font-semibold mb-2">Apply for Leave</h2>
      <input
        type="text"
        placeholder="Reason"
        value={form.reason}
        onChange={(e) => setForm({ ...form, reason: e.target.value })}
        className="border w-full mb-2 p-2"
      />
      <input
        type="date"
        value={form.fromDate}
        onChange={(e) => setForm({ ...form, fromDate: e.target.value })}
        className="border w-full mb-2 p-2"
      />
      <input
        type="date"
        value={form.toDate}
        onChange={(e) => setForm({ ...form, toDate: e.target.value })}
        className="border w-full mb-2 p-2"
      />
      <button
        onClick={applyLeave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Leave History</h2>
      {leaves.length === 0 && <p>No leaves found.</p>}
      <ul className="list-disc ml-5">
        {leaves.map((leave: any) => (
          <li key={leave.id}>
            {leave.reason} ({leave.fromDate.slice(0, 10)} to {leave.toDate.slice(0, 10)}) - {leave.status}
          </li>
        ))}
      </ul>
    </div>
  );
}
