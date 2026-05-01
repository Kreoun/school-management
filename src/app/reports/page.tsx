import { branches, dashboardStats } from "../../data/mock";

export default function ReportsPage() {
  const branchPerformance = branches.map((b) => ({
    ...b,
    avgAttendance: (91 + Math.random() * 7).toFixed(1),
    avgGPA: (3.1 + Math.random() * 0.6).toFixed(2),
    feeCollection: (82 + Math.random() * 15).toFixed(1),
    revenue: Math.floor(b.studentCount * 150 * 0.87),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
        <p className="text-sm text-gray-500">Comprehensive reports across all branches</p>
      </div>

      {/* Report Types */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Enrollment Report", desc: "Student enrollment trends by branch", icon: "📊", color: "border-indigo-200 bg-indigo-50" },
          { title: "Financial Report", desc: "Revenue, fees, and payment analysis", icon: "💰", color: "border-emerald-200 bg-emerald-50" },
          { title: "Academic Report", desc: "GPA trends and exam performance", icon: "📝", color: "border-amber-200 bg-amber-50" },
          { title: "Attendance Report", desc: "Attendance rates and patterns", icon: "📋", color: "border-blue-200 bg-blue-50" },
        ].map((report) => (
          <div key={report.title} className={`cursor-pointer rounded-xl border p-5 transition-shadow hover:shadow-md ${report.color}`}>
            <span className="text-3xl">{report.icon}</span>
            <h3 className="mt-3 text-sm font-semibold text-gray-900">{report.title}</h3>
            <p className="mt-1 text-xs text-gray-600">{report.desc}</p>
            <button className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700">Generate →</button>
          </div>
        ))}
      </div>

      {/* System Summary */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">System-Wide Summary</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="text-center"><p className="text-3xl font-bold text-indigo-600">{dashboardStats.totalStudents.toLocaleString()}</p><p className="text-xs text-gray-500">Total Students</p></div>
          <div className="text-center"><p className="text-3xl font-bold text-emerald-600">{dashboardStats.totalTeachers}</p><p className="text-xs text-gray-500">Total Teachers</p></div>
          <div className="text-center"><p className="text-3xl font-bold text-amber-600">${dashboardStats.totalRevenue.toLocaleString()}</p><p className="text-xs text-gray-500">Monthly Revenue</p></div>
          <div className="text-center"><p className="text-3xl font-bold text-blue-600">{dashboardStats.attendanceRate}%</p><p className="text-xs text-gray-500">Avg Attendance</p></div>
        </div>
      </div>

      {/* Branch Performance Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Branch Performance Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Branch</th>
                <th className="px-6 py-3 text-right">Students</th>
                <th className="px-6 py-3 text-right">Teachers</th>
                <th className="px-6 py-3 text-right">Avg Attendance</th>
                <th className="px-6 py-3 text-right">Avg GPA</th>
                <th className="px-6 py-3 text-right">Fee Collection</th>
                <th className="px-6 py-3 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {branchPerformance.map((b) => (
                <tr key={b.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-3 text-sm font-semibold text-gray-900">{b.name}</td>
                  <td className="px-6 py-3 text-right text-sm text-gray-700">{b.studentCount}</td>
                  <td className="px-6 py-3 text-right text-sm text-gray-700">{b.teacherCount}</td>
                  <td className="px-6 py-3 text-right text-sm text-gray-700">{b.avgAttendance}%</td>
                  <td className="px-6 py-3 text-right text-sm text-gray-700">{b.avgGPA}</td>
                  <td className="px-6 py-3 text-right text-sm text-gray-700">{b.feeCollection}%</td>
                  <td className="px-6 py-3 text-right text-sm font-semibold text-gray-900">${b.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">📄 Export PDF</button>
        <button className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">📊 Export Excel</button>
      </div>
    </div>
  );
}
