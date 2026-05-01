"use client";

import { useState } from "react";
import { announcements, branches, getBranchName } from "../../data/mock";

export default function CommunicationPage() {
  const [showForm, setShowForm] = useState(false);

  const priorityColor: Record<string, string> = {
    high: "bg-rose-50 text-rose-700 border-rose-200",
    medium: "bg-amber-50 text-amber-700 border-amber-200",
    low: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const audienceIcon: Record<string, string> = {
    all: "👥",
    teachers: "👨‍🏫",
    parents: "👨‍👩‍👧",
    students: "🎓",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Communication</h1>
          <p className="text-sm text-gray-500">Send announcements and notifications to parents, teachers, and students</p>
        </div>
        <button onClick={() => setShowForm(true)} className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
          + New Announcement
        </button>
      </div>

      {/* Announcement Cards */}
      <div className="space-y-4">
        {announcements.map((ann) => (
          <div key={ann.id} className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="text-base font-semibold text-gray-900">{ann.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span>By {ann.author}</span>
                  <span>•</span>
                  <span>{ann.date}</span>
                  <span>•</span>
                  <span>{ann.branchId === "all" ? "All Branches" : getBranchName(ann.branchId)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${priorityColor[ann.priority]}`}>
                  {ann.priority}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {audienceIcon[ann.audience]} {ann.audience}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-600">{ann.content}</p>
            <div className="mt-4 flex gap-2">
              <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50">Edit</button>
              <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50">Delete</button>
              <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:bg-indigo-50">Resend</button>
            </div>
          </div>
        ))}
      </div>

      {/* New Announcement Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">New Announcement</h2>
            <form onSubmit={(e) => { e.preventDefault(); setShowForm(false); }} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
                <input type="text" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="Announcement title..." />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
                <textarea rows={4} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500" placeholder="Write your announcement..." />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Branch</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500">
                    <option value="all">All Branches</option>
                    {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Priority</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500">
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">Audience</label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500">
                    <option value="all">Everyone</option>
                    <option value="teachers">Teachers</option>
                    <option value="parents">Parents</option>
                    <option value="students">Students</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Publish Announcement</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
