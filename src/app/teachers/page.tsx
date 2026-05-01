"use client";

import { useState } from "react";
import { teachers, branches, getBranchName } from "../../data/mock";

export default function TeachersPage() {
  const [search, setSearch] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = teachers.filter((t) => {
    const matchSearch = search === "" || `${t.firstName} ${t.lastName}`.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase());
    const matchBranch = branchFilter === "all" || t.branchId === branchFilter;
    return matchSearch && matchBranch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Teacher Management</h1>
          <p className="text-sm text-gray-500">{teachers.length} teachers across all branches</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
          + Add Teacher
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input type="text" placeholder="Search by name or subject..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="all">All Branches</option>
          {branches.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Teacher</th>
                <th className="px-6 py-3">Subject</th>
                <th className="px-6 py-3">Branch</th>
                <th className="px-6 py-3">Qualification</th>
                <th className="px-6 py-3 text-right">Salary</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((t) => (
                <tr key={t.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs text-gray-500">{t.id}</td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-600">
                        {t.firstName[0]}{t.lastName[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{t.firstName} {t.lastName}</p>
                        <p className="text-xs text-gray-500">{t.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-700">{t.subject}</td>
                  <td className="px-6 py-3 text-xs text-gray-600">{getBranchName(t.branchId)}</td>
                  <td className="px-6 py-3 text-xs text-gray-600">{t.qualification}</td>
                  <td className="px-6 py-3 text-right text-sm font-semibold text-gray-900">${t.salary}</td>
                  <td className="px-6 py-3">
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">{t.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <button className="rounded px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-6 py-3 text-xs text-gray-500">
          Showing {filtered.length} of {teachers.length} teachers
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Add New Teacher</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">First Name</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Last Name</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Email</label><input type="email" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Phone</label><input type="tel" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Subject</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Branch</label><select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500">{branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}</select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Qualification</label><input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Salary ($)</label><input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Add Teacher</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
