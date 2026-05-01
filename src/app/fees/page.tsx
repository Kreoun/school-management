"use client";

import { useState } from "react";
import { fees, branches, getStudentName, getBranchName } from "../../data/mock";

export default function FeesPage() {
  const [branchFilter, setBranchFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const filtered = fees.filter((f) => {
    const matchBranch = branchFilter === "all" || f.branchId === branchFilter;
    const matchStatus = statusFilter === "all" || f.status === statusFilter;
    return matchBranch && matchStatus;
  });

  const totalCollected = fees.filter((f) => f.status === "paid").reduce((sum, f) => sum + f.amount, 0);
  const totalPending = fees.filter((f) => f.status === "pending" || f.status === "overdue").reduce((sum, f) => sum + f.amount, 0);
  const totalOverdue = fees.filter((f) => f.status === "overdue").reduce((sum, f) => sum + f.amount, 0);

  const statusColor: Record<string, string> = {
    paid: "bg-emerald-50 text-emerald-700",
    pending: "bg-amber-50 text-amber-700",
    overdue: "bg-rose-50 text-rose-700",
    partial: "bg-blue-50 text-blue-700",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Fee & Payment Management</h1>
          <p className="text-sm text-gray-500">Track tuition fees, payments, and generate invoices</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
          + Record Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Collected</p>
          <p className="mt-1 text-2xl font-bold text-emerald-600">${totalCollected.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Total Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-600">${totalPending.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Overdue Amount</p>
          <p className="mt-1 text-2xl font-bold text-rose-600">${totalOverdue.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Collection Rate</p>
          <p className="mt-1 text-2xl font-bold text-indigo-600">{fees.length > 0 ? ((fees.filter((f) => f.status === "paid").length / fees.length) * 100).toFixed(1) : 0}%</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="all">All Branches</option>
          {branches.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="all">All Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Fee Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">ID</th>
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Branch</th>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3">Due Date</th>
                <th className="px-6 py-3">Paid Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.slice(0, 50).map((f) => (
                <tr key={f.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs text-gray-500">{f.id}</td>
                  <td className="px-6 py-3 text-sm font-medium text-gray-900">{getStudentName(f.studentId)}</td>
                  <td className="px-6 py-3 text-xs text-gray-600">{getBranchName(f.branchId)}</td>
                  <td className="px-6 py-3 text-sm capitalize text-gray-700">{f.type}</td>
                  <td className="px-6 py-3 text-right text-sm font-semibold text-gray-900">${f.amount}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{f.dueDate}</td>
                  <td className="px-6 py-3 text-sm text-gray-600">{f.paidDate || "—"}</td>
                  <td className="px-6 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${statusColor[f.status]}`}>{f.status}</span>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex gap-1">
                      {f.status !== "paid" && <button className="rounded px-2 py-1 text-xs font-medium text-emerald-600 hover:bg-emerald-50">Pay</button>}
                      <button className="rounded px-2 py-1 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Invoice</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-gray-100 px-6 py-3 text-xs text-gray-500">
          Showing {Math.min(filtered.length, 50)} of {filtered.length} records
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Record Payment</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Student ID</label><input type="text" placeholder="STU0001" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Fee Type</label><select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"><option>Tuition</option><option>Registration</option><option>Exam</option><option>Transport</option><option>Uniform</option></select></div>
                <div><label className="mb-1 block text-sm font-medium text-gray-700">Amount ($)</label><input type="number" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              </div>
              <div><label className="mb-1 block text-sm font-medium text-gray-700">Payment Date</label><input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" /></div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Record Payment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
