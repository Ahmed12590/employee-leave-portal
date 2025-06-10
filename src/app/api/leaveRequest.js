// pages/api/leaveRequest.js

export default function handler(req, res) {
  if (req.method === 'POST') {
    // Simulate saving the leave request to a database
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Normally, you'd save this to a database
    // For the sake of this example, we will return the leave request
    return res.status(200).json({
      message: 'Leave request submitted successfully',
      leaveRequest: { employeeId, leaveType, startDate, endDate, reason }
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
