// pages/api/leaveApproval.js

let leaveRequests = [];  // You can replace this with actual DB logic

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { leaveRequestId, status } = req.body;

    if (!leaveRequestId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Find the leave request (here we're using a simulated in-memory array)
    const leaveRequest = leaveRequests.find((r) => r.id === leaveRequestId);

    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    // Update the leave request status
    leaveRequest.status = status;

    // Simulating an updated database
    return res.status(200).json({
      message: 'Leave request updated successfully',
      leaveRequest
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
