// pages/api/getLeaveStatus.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { employeeId } = req.query;

    if (!employeeId) {
      return res.status(400).json({ error: 'Missing employeeId' });
    }

    try {
      // Prisma ke through leave request fetch karna
      const leaveRequests = await prisma.leaveRequest.findMany({
        where: {
          employeeId: employeeId,
        },
      });

      if (leaveRequests.length === 0) {
        return res.status(404).json({ error: 'No leave requests found for this employee' });
      }

      return res.status(200).json({
        message: 'Leave requests fetched successfully',
        leaveRequests,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Database connection error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
