import StatCard from "../components/StatCard";
import { branches, dashboardStats } from "../data/mock";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, CHOMRAEUN CHIN. Here&apos;s an overview of all 8 branches.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Students" value={dashboardStats.totalStudents.toLocaleString()} icon="🎓" change="+48 this month" changeType="up" color="indigo" />
        <StatCard title="Total Teachers" value={dashboardStats.totalTeachers} icon="👨‍🏫" change="+3 this month" changeType="up" color="emerald" />
        <StatCard title="Total Branches" value={dashboardStats.totalBranches} icon="🏫" color="blue" />
        <StatCard title="Monthly Revenue" value={`$${dashboardStats.totalRevenue.toLocaleString()}`} icon="💰" change="+12.5%" changeType="up" color="amber" />
        <StatCard title="Attendance Rate" value={`${dashboardStats.attendanceRate}%`} icon="📋" change="+1.2%" changeType="up" color="cyan" />
        <StatCard title="Fee Collection" value={`${dashboardStats.feeCollectionRate}%`} icon="💳" change="-2.1%" changeType="down" color="rose" />
        <StatCard title="Average GPA" value={dashboardStats.averageGPA} icon="📝" change="+0.05" changeType="up" color="purple" />
        <StatCard title="Upcoming Events" value={dashboardStats.upcomingEvents} icon="📅" color="orange" />
      </div>

      {/* Branch Overview Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Branch Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Branch</th>
                <th className="px-6 py-3">Principal</th>
                <th className="px-6 py-3 text-right">Students</th>
                <th className="px-6 py-3 text-right">Teachers</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Established</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {branches.map((branch) => (
                <tr key={branch.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{branch.name}</p>
                      <p className="text-xs text-gray-500">{branch.address}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{branch.principalName}</td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{branch.studentCount}</td>
                  <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">{branch.teacherCount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      {branch.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{branch.established}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Add New Student", icon: "➕🎓", href: "/students" },
          { label: "Mark Attendance", icon: "📋✓", href: "/attendance" },
          { label: "Record Payment", icon: "💳", href: "/fees" },
          { label: "Send Announcement", icon: "📢", href: "/communication" },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-indigo-300 hover:shadow-md"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-semibold text-gray-700">{action.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
