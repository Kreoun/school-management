"use client";

import { useState } from "react";
import { branches, type Branch } from "../../data/mock";

export default function BranchesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Branch Management</h1>
          <p className="text-sm text-gray-500">Manage all {branches.length} branches of CHIN Academy</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditingBranch(null); }}
          className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          + Add Branch
        </button>
      </div>

      {/* Branch Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {branches.map((branch) => (
          <div key={branch.id} className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">{branch.name}</h3>
                <p className="text-xs text-gray-500">{branch.id}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                {branch.status}
              </span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">📍 {branch.address}</p>
              <p className="flex items-center gap-2">📞 {branch.phone}</p>
              <p className="flex items-center gap-2">✉️ {branch.email}</p>
              <p className="flex items-center gap-2">👤 Principal: {branch.principalName}</p>
            </div>
            <div className="mt-4 flex gap-4 border-t border-gray-100 pt-4">
              <div className="text-center">
                <p className="text-lg font-bold text-indigo-600">{branch.studentCount}</p>
                <p className="text-xs text-gray-500">Students</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-emerald-600">{branch.teacherCount}</p>
                <p className="text-xs text-gray-500">Teachers</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-gray-600">{branch.established}</p>
                <p className="text-xs text-gray-500">Est.</p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => { setEditingBranch(branch); setShowForm(true); }}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                Edit
              </button>
              <button className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-indigo-600 transition-colors hover:bg-indigo-50">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">
              {editingBranch ? "Edit Branch" : "Add New Branch"}
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Branch Name</label>
                <input type="text" defaultValue={editingBranch?.name} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" placeholder="e.g. Phnom Penh Main Campus" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Address</label>
                <input type="text" defaultValue={editingBranch?.address} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Phone</label>
                  <input type="tel" defaultValue={editingBranch?.phone} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" defaultValue={editingBranch?.email} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Principal Name</label>
                <input type="text" defaultValue={editingBranch?.principalName} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                  {editingBranch ? "Update" : "Create"} Branch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
