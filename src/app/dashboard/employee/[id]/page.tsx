'use client'

import { useEffect, useState } from 'react'
import { useParams }      from 'next/navigation'
import axios              from 'axios'
import { jwtDecode }      from 'jwt-decode'

// two levels up from [id] → dashboard → app/src/app/dashboard/components
import AttendanceChart from '../../components/AttendanceChart'

interface Leave {
  id: number
  reason: string
  fromDate: string
  toDate: string
  status: string
}

interface AttendanceSummary {
  date: string
  hours: number
}

interface DecodedToken {
  userId: string
  name:   string
  role:   string
}

export default function EmployeeDashboard() {
  const { id } = useParams()
  const userIdNum = Number(id)

  const [leaves, setLeaves]           = useState<Leave[]>([])
  const [form, setForm]               = useState({ reason: '', fromDate: '', toDate: '' })
  const [userName, setUserName]       = useState('Employee')
  const [checkedIn, setCheckedIn]     = useState(false)
  const [checkedOut, setCheckedOut]   = useState(false)

  // 1) Load leave history
  const getLeaves = async () => {
    try {
      const { data } = await axios.get<Leave[]>(`/api/leave/${id}`)
      setLeaves(data)
    } catch (err) {
      console.error('Error fetching leaves:', err)
    }
  }

  // 2) Load today’s attendance state
  const getAttendance = async () => {
    try {
      const { data } = await axios.get<AttendanceSummary[]>(`/api/attendance/summary?userId=${userIdNum}`)
      const today = new Date().toISOString().slice(0, 10)
      const rec   = data.find(d => d.date === today)
      setCheckedIn(!!rec)
      setCheckedOut(!!rec && rec.hours > 0)
    } catch (err) {
      console.error('Error fetching attendance:', err)
    }
  }

  // 3) Actions, now sending userId in payload
  const handleCheckIn = async () => {
    try {
      await axios.post('/api/attendance/check-in', { userId: userIdNum })
      setCheckedIn(true)
      setCheckedOut(false)
      getAttendance()
    } catch (err) {
      console.error('Error on check-in:', err)
    }
  }

  const handleCheckOut = async () => {
    try {
      await axios.post('/api/attendance/check-out', { userId: userIdNum })
      setCheckedIn(false)
      setCheckedOut(true)
      getAttendance()
    } catch (err) {
      console.error('Error on check-out:', err)
    }
  }

  const applyLeave = async () => {
    try {
      await axios.post(`/api/leave/${id}`, form)
      setForm({ reason: '', fromDate: '', toDate: '' })
      getLeaves()
    } catch (err) {
      console.error('Error applying for leave:', err)
    }
  }

  // 4) On mount: load leaves, attendance + decode JWT for name
  useEffect(() => {
    getLeaves()
    getAttendance()

    const token = localStorage.getItem('token')
    if (token) {
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        setUserName(decoded.name)
      } catch (e) {
        console.error('Token decoding failed:', e)
      }
    }
  }, [])

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-blue-800">Welcome {userName}</h1>

      {/* Attendance Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">My Attendance</h2>
        <div className="flex gap-4">
          <button
            onClick={handleCheckIn}
            disabled={checkedIn && !checkedOut}
            className={`px-4 py-2 rounded ${
              checkedIn && !checkedOut
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-green-600 text-white'
            }`}
          >
            {checkedIn && !checkedOut ? 'Checked In' : 'Check In'}
          </button>
          <button
            onClick={handleCheckOut}
            disabled={!checkedIn || checkedOut}
            className={`px-4 py-2 rounded ${
              checkedOut
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-red-600 text-white'
            }`}
          >
            {checkedOut ? 'Checked Out' : 'Check Out'}
          </button>
        </div>
        <AttendanceChart userId={userIdNum} />
      </section>

      {/* Leave Section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Apply for Leave</h2>
        <input
          type="text"
          placeholder="Reason"
          value={form.reason}
          onChange={e => setForm({ ...form, reason: e.target.value })}
          className="border w-full p-2"
        />
        <input
          type="date"
          value={form.fromDate}
          onChange={e => setForm({ ...form, fromDate: e.target.value })}
          className="border w-full p-2"
        />
        <input
          type="date"
          value={form.toDate}
          onChange={e => setForm({ ...form, toDate: e.target.value })}
          className="border w-full p-2"
        />
        <button
          onClick={applyLeave}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </section>

      {/* Leave History */}
      <section>
        <h2 className="text-xl font-semibold">Your Leave History</h2>
        {leaves.length === 0 && <p>No leaves found.</p>}
        <ul className="list-disc ml-5 space-y-1">
          {leaves.map(l => (
            <li key={l.id}>
              {l.reason} ({l.fromDate.slice(0, 10)} to {l.toDate.slice(0, 10)}) — {l.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
