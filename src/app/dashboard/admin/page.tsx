'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export default function AdminDashboard() {
  const [leaves, setLeaves] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');

    const decoded: any = jwtDecode(token);
    if (decoded.role !== 'admin') return router.push('/login'); // not allowed

    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await axios.get('/api/admin/leaves');
    setLeaves(res.data);
  };

  const updateStatus = async (id: string, status: string) => {
    await axios.patch(`/api/admin/leaves`, { id, status });
    fetchLeaves();
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Leave Requests</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Employee</th>
            <th className="border p-2">Reason</th>
            <th className="border p-2">Dates</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaves.map((leave: any) => (
            <tr key={leave.id}>
              <td className="border p-2">{leave.user.name}</td>
              <td className="border p-2">{leave.reason}</td>
              <td className="border p-2">{leave.fromDate.slice(0, 10)} → {leave.toDate.slice(0, 10)}</td>
              <td className="border p-2">{leave.status}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => updateStatus(leave.id, 'Approved')}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => updateStatus(leave.id, 'Rejected')}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
