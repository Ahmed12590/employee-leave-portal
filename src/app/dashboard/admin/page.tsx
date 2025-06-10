// pages/dashboard/admin.js
import { allEmployees } from "@/utils/mockData";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <h2 className="text-xl mb-2">All Employees</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Total Leaves</th> 
            <th className="p-2 border">Used Leaves</th>
          </tr>
        </thead>
        <tbody>
          {allEmployees.map((emp, index) => (
            <tr key={index}>
              <td className="p-2 border">{emp.name}</td>
              <td className="p-2 border">{emp.email}</td>
              <td className="p-2 border">{emp.totalLeaves}</td>
              <td className="p-2 border">{emp.usedLeaves}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
