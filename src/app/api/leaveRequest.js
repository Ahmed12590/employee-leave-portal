// pages/api/leaveRequest.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      // Prisma ke through leave request insert karna
      const leaveRequest = await prisma.leaveRequest.create({
        data: {
          employeeId,
          leaveType,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          reason,
        },
      });

      return res.status(200).json({
        message: 'Leave request submitted successfully',
        leaveRequest,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Database connection error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
