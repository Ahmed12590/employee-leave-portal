// pages/api/getLeaveStatus.js

let leaveRequests = [
  // Simulate data for testing
  { employeeId: '123', leaveType: 'sick', status: 'approved', startDate: '2025-06-05', endDate: '2025-06-06' }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    const { employeeId } = req.query;

    if (!employeeId) {
      return res.status(400).json({ error: 'Missing employeeId' });
    }

    // Filter leave requests based on employeeId
    const employeeLeaveRequests = leaveRequests.filter(
      (request) => request.employeeId === employeeId
    );

    if (employeeLeaveRequests.length === 0) {
      return res.status(404).json({ error: 'No leave requests found for this employee' });
    }

    return res.status(200).json({
      message: 'Leave requests fetched successfully',
      leaveRequests: employeeLeaveRequests
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
