"use client";

import { useState } from "react";
import { students, branches, getBranchName } from "../../data/mock";

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = students.filter((s) => {
    const matchSearch = search === "" || `${s.firstName} ${s.lastName}`.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branchFilter === "all" || s.branchId === branchFilter;
    return matchSearch && matchBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
          <p className="text-sm text-gray-500">{students.length} students across all branches</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
          + Add Student
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Search by name or ID..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="all">All Branches</option>
          {branches.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>
      </div>

      {/* Student Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Student Name</th>
                <th className="px-6 py-3">Gender</th>
                <th className="px-6 py-3">Branch</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Parent</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((s) => (
                <tr key={s.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs text-gray-500">{s.id}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">
                        {s.firstName[0]}{s.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{s.firstName} {s.lastName}</p>
                        <p className="text-xs text-gray-500">DOB: {s.dateOfBirth}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{s.gender}</td>
                  <td className="px-6 py-3 text-xs text-gray-600">{getBranchName(s.branchId)}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{s.classId.split("-").slice(-1)[0]}</td>
                  <td className="px-6 py-3">
                    <p className="text-sm text-gray-700">{s.parentName}</p>
                    <p className="text-xs text-gray-500">{s.parentPhone}</p>
                  </td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{s.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1">
                      <button className="rounded px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Edit</button>
                      <button className="rounded px-2 py-1 text-xs font-medium text-amber-600 hover:bg-amber-50">Transfer</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-6 py-3 text-xs text-gray-500">
          Showing {filtered.length} of {students.length} students
        </div>
      </div>

      {/* Add Student Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Add New Student</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">First Name</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label><input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Gender</label><select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"><option>Male</option><option>Female</option></select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Branch</label><select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500">{branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Grade & Section</label><input type="text" placeholder="e.g. G7A" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Parent/Guardian Name</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Parent Phone</label><input type="tel" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Parent Email</label><input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Address</label><textarea rows={2} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Add Student</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
