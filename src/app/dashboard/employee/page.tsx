// src/app/dashboard/employee/page.tsx

import React from "react";
import { currentUser, employeeLeaves } from "@/utils/mockData"; // adjust the path if needed

export default function EmployeeDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {currentUser.name}
      </h1>
      <h2 className="text-xl mb-2">Your Leave History</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Type</th>
            <th className="p-2 border">From</th>
            <th className="p-2 border">To</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {employeeLeaves.map((leave) => (
            <tr key={leave.id}>
              <td className="p-2 border">{leave.type}</td>
              <td className="p-2 border">{leave.from}</td>
              <td className="p-2 border">{leave.to}</td>
              <td className="p-2 border">{leave.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
