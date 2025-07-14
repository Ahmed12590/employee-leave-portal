'use client';

import { useEffect, useState } from 'react';
import { useRouter }           from 'next/navigation';
import axios                    from 'axios';
import { jwtDecode }            from 'jwt-decode';

// --- 1) JWT shape ---
type DecodedToken = {
  role: string;
};

// --- 2) Leave request shape ---
type Leave = {
  id:        string;
  reason:    string;
  fromDate:  string;
  toDate:    string;
  status:    string;
  user: {
    id:   number;
    name: string;
  };
};

// --- 3) Attendance record shape ---
type AttendanceRecord = {
  id:       string;
  date:     string;    // YYYY-MM-DD
  checkIn?: string;    // ISO timestamp
  checkOut?: string;   // ISO timestamp
  user: {
    id:   number;
    name: string;
  };
};

export default function AdminDashboard() {
  const [leaves, setLeaves]           = useState<Leave[]>([]);
  const [attendance, setAttendance]   = useState<AttendanceRecord[]>([]);
  const router                        = useRouter();

  // guard: only admins
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return router.push('/login');
    const decoded = jwtDecode<DecodedToken>(token);
    if (decoded.role !== 'admin') return router.push('/login');

    fetchLeaves();
    fetchAttendance();
  }, []);

  // fetch leave requests
  const fetchLeaves = async () => {
    try {
      const { data } = await axios.get<Leave[]>('/api/admin/leaves');
      setLeaves(data);
    } catch (err) {
      console.error('Error loading leaves', err);
    }
  };

  // fetch attendance log
  const fetchAttendance = async () => {
    try {
      const { data } = await axios.get<AttendanceRecord[]>('/api/admin/attendance');
      setAttendance(data);
    } catch (err) {
      console.error('Error loading attendance', err);
    }
  };

  // approve/reject a leave
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch('/api/admin/leaves', { id, status });
      fetchLeaves();
    } catch (err) {
      console.error('Error updating leave status', err);
    }
  };

  return (
    <div className="p-8 space-y-12">
      <h1 className="text-3xl font-bold">👩‍💼 Admin Dashboard</h1>

      {/* Attendance Log */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Attendance Log</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Check‐In</th>
                <th className="px-4 py-2 text-left">Check‐Out</th>
                <th className="px-4 py-2 text-left">Hours Worked</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map(rec => (
                <tr key={rec.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{rec.date}</td>
                  <td className="px-4 py-2">{rec.user.name}</td>
                  <td className="px-4 py-2">
                    {rec.checkIn
                      ? new Date(rec.checkIn).toLocaleTimeString()
                      : '—'}
                  </td>
                  <td className="px-4 py-2">
                    {rec.checkOut
                      ? new Date(rec.checkOut).toLocaleTimeString()
                      : '—'}
                  </td>
                  <td className="px-4 py-2">
                    {rec.checkIn && rec.checkOut ? (
                      `${(
                        (new Date(rec.checkOut).getTime() - new Date(rec.checkIn).getTime()) /
                        3_600_000
                      ).toFixed(2)}h`
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
              {attendance.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    No attendance records.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Leave Requests */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Employee</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Dates</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(lv => (
                <tr key={lv.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{lv.user.name}</td>
                  <td className="px-4 py-2">{lv.reason}</td>
                  <td className="px-4 py-2">
                    {lv.fromDate.slice(0,10)} → {lv.toDate.slice(0,10)}
                  </td>
                  <td className="px-4 py-2">{lv.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <button
                      onClick={() => updateStatus(lv.id, 'Approved')}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(lv.id, 'Rejected')}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {leaves.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-2 text-center text-gray-500">
                    No leave requests.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
