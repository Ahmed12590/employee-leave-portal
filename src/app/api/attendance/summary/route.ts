import { NextResponse } from 'next/server'
import { prisma }      from '@/lib/prisma'

export async function GET(_: Request) {
  // 1️⃣ Month bounds
  const monthStart = new Date(new Date().toISOString().slice(0, 8) + '01')
  const monthEnd   = new Date(monthStart)
  monthEnd.setMonth(monthEnd.getMonth() + 1)

  // 2️⃣ Fetch this month's attendance
  const records = await prisma.attendance.findMany({
    where: {
      date: {
        gte: monthStart,
        lt:  monthEnd,
      },
    },
    orderBy: { date: 'asc' },
  })

  // 3️⃣ Map into the shape your frontend expects
  const summary = records.map(r => ({
    date:  r.date.toISOString().slice(0, 10),
    hours:
      r.checkIn && r.checkOut
        ? +((r.checkOut.getTime() - r.checkIn.getTime()) / 3_600_000).toFixed(2)
        : 0,
  }))

  return NextResponse.json(summary)
}
