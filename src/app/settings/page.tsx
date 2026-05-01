"use client";

import { useState } from "react";

const users = [
  { id: "USR001", name: "CHOMRAEUN CHIN", email: "chomraeun@chinacademy.edu.kh", role: "Super Admin", branch: "All Branches", status: "active" },
  { id: "USR002", name: "Sokha Meas", email: "sokha@chinacademy.edu.kh", role: "Branch Admin", branch: "Phnom Penh Main Campus", status: "active" },
  { id: "USR003", name: "Dara Chhin", email: "dara@chinacademy.edu.kh", role: "Branch Admin", branch: "Toul Kork Branch", status: "active" },
  { id: "USR004", name: "Sophal Keo", email: "sophal@chinacademy.edu.kh", role: "Branch Admin", branch: "Sen Sok Branch", status: "active" },
  { id: "USR005", name: "Vibol Chhun", email: "vibol@chinacademy.edu.kh", role: "Branch Admin", branch: "Siem Reap Branch", status: "active" },
  { id: "USR006", name: "Chanthy Sorn", email: "chanthy@chinacademy.edu.kh", role: "Branch Admin", branch: "Battambang Branch", status: "active" },
  { id: "USR007", name: "Rith Ly", email: "rith@chinacademy.edu.kh", role: "Branch Admin", branch: "Kampong Cham Branch", status: "active" },
  { id: "USR008", name: "Sokunthea Prak", email: "sokunthea@chinacademy.edu.kh", role: "Branch Admin", branch: "Sihanoukville Branch", status: "active" },
  { id: "USR009", name: "Bunthoeun Heng", email: "bunthoeun@chinacademy.edu.kh", role: "Branch Admin", branch: "Takeo Branch", status: "active" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"general" | "users" | "academic" | "notifications">("general");
  const [showUserForm, setShowUserForm] = useState(false);

  const tabs = [
    { id: "general" as const, label: "General", icon: "⚙️" },
    { id: "users" as const, label: "User Management", icon: "👥" },
    { id: "academic" as const, label: "Academic Year", icon: "📅" },
    { id: "notifications" as const, label: "Notifications", icon: "🔔" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500">System configuration and user management</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border border-gray-200 bg-white p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-indigo-50 text-indigo-700" : "text-gray-600 hover:text-gray-900"}`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      {/* General Settings */}
      {activeTab === "general" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">School Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="mb-1 block text-sm font-medium text-gray-700">School Name</label><input type="text" defaultValue="CHIN Academy" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Owner</label><input type="text" defaultValue="CHOMRAEUN CHIN" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Contact Email</label><input type="email" defaultValue="info@chinacademy.edu.kh" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Contact Phone</label><input type="tel" defaultValue="+855 23 456 789" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
            </div>
            <div><label className="mb-1 block text-sm font-medium text-gray-700">Address</label><textarea rows={2} defaultValue="No. 123, Preah Monivong Blvd, Phnom Penh, Cambodia" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Currency</label><select defaultValue="USD" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"><option>USD</option><option>KHR</option></select></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Language</label><select defaultValue="en" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"><option value="en">English</option><option value="km">Khmer</option></select></div>
            </div>
            <div className="flex justify-end pt-2">
              <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Save Changes</button>
            </div>
          </form>
        </div>
      )}

      {/* User Management */}
      {activeTab === "users" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button onClick={() => setShowUserForm(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">+ Add User</button>
          </div>
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-6 py-3">User</th>
                    <th className="px-6 py-3">Role</th>
                    <th className="px-6 py-3">Branch</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {users.map((u) => (
                    <tr key={u.id} className="transition-colors hover:bg-gray-50">
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                            {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{u.name}</p>
                            <p className="text-xs text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${u.role === "Super Admin" ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"}`}>{u.role}</span>
                      </td>
                      <td className="px-6 py-3 text-sm text-gray-600">{u.branch}</td>
                      <td className="px-6 py-3"><span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{u.status}</span></td>
                      <td className="px-6 py-3">
                        <div className="flex gap-1">
                          <button className="rounded px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Edit</button>
                          {u.role !== "Super Admin" && <button className="rounded px-2 py-1 text-xs font-medium text-rose-600 hover:bg-rose-50">Remove</button>}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {showUserForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-lg rounded-xl bg-white p-6">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Add User</h2>
                <form onSubmit={(e) => { e.preventDefault(); setShowUserForm(false); }} className="space-y-4">
                  <div><label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                  <div><label className="mb-1 block text-sm font-medium text-gray-700">Email</label><input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="mb-1 block text-sm font-medium text-gray-700">Role</label><select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"><option>Branch Admin</option><option>Teacher</option><option>Parent</option></select></div>
                    <div><label className="mb-1 block text-sm font-medium text-gray-700">Password</label><input type="password" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setShowUserForm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                    <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Add User</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Academic Year */}
      {activeTab === "academic" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Academic Year Configuration</h2>
          <div className="space-y-4">
            <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-indigo-900">2025 - 2026 (Current)</p>
                  <p className="text-sm text-indigo-700">Sep 1, 2025 — Jun 30, 2026</p>
                </div>
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-bold text-white">Active</span>
              </div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">2024 - 2025</p>
                  <p className="text-sm text-gray-500">Sep 1, 2024 — Jun 30, 2025</p>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-600">Completed</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Term 1</label><div className="flex gap-2"><input type="date" defaultValue="2025-09-01" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /><input type="date" defaultValue="2026-01-15" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div></div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Term 2</label><div className="flex gap-2"><input type="date" defaultValue="2026-01-20" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /><input type="date" defaultValue="2026-06-30" className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div></div>
            </div>
            <div className="flex justify-end pt-2">
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Save Academic Year</button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications */}
      {activeTab === "notifications" && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-6 text-lg font-semibold text-gray-900">Notification Settings</h2>
          <div className="space-y-4">
            {[
              { label: "Email notifications for new enrollments", defaultChecked: true },
              { label: "SMS alerts for overdue payments", defaultChecked: true },
              { label: "Daily attendance summary reports", defaultChecked: false },
              { label: "Weekly branch performance digest", defaultChecked: true },
              { label: "Exam schedule reminders", defaultChecked: true },
              { label: "Parent app push notifications", defaultChecked: false },
            ].map((setting) => (
              <label key={setting.label} className="flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-colors hover:bg-gray-50">
                <span className="text-sm text-gray-700">{setting.label}</span>
                <input type="checkbox" defaultChecked={setting.defaultChecked} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              </label>
            ))}
            <div className="flex justify-end pt-2">
              <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Save Preferences</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
