"use client";

import { useState } from "react";
import { classes, branches, teachers, getBranchName } from "../../data/mock";

export default function ClassesPage() {
  const [branchFilter, setBranchFilter] = useState("all");
  const [gradeFilter, setGradeFilter] = useState("all");

  const filtered = classes.filter((c) => {
    const matchBranch = branchFilter === "all" || c.branchId === branchFilter;
    const matchGrade = gradeFilter === "all" || c.grade === Number(gradeFilter);
    return matchBranch && matchGrade;
  });

  const getTeacherName = (teacherId: string) => {
    const t = teachers.find((tc) => tc.id === teacherId);
    return t ? `${t.firstName} ${t.lastName}` : "—";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Class Management</h1>
          <p className="text-sm text-gray-500">{classes.length} classes across all branches</p>
        </div>
        <button className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
          + Add Class
        </button>
      </div>

      <div className="flex flex-wrap gap-3">
        <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="all">All Branches</option>
          {branches.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>
        <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="all">All Grades</option>
          {Array.from({ length: 12 }, (_, i) => i + 1).map((g) => (<option key={g} value={g}>Grade {g}</option>))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.slice(0, 24).map((cls) => (
          <div key={cls.id} className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-base font-semibold text-gray-900">{cls.name}</h3>
                <p className="text-xs text-gray-500">{getBranchName(cls.branchId)}</p>
              </div>
              <span className="rounded-lg bg-indigo-50 px-2 py-1 text-xs font-bold text-indigo-600">{cls.room}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>👨‍🏫 Teacher: <span className="font-medium text-gray-900">{getTeacherName(cls.teacherId)}</span></p>
              <p>🕐 Schedule: {cls.schedule}</p>
              <div className="flex items-center gap-2">
                <span>👥 Students:</span>
                <div className="flex-1">
                  <div className="h-2 rounded-full bg-gray-100">
                    <div className="h-2 rounded-full bg-indigo-500" style={{ width: `${(cls.studentCount / cls.capacity) * 100}%` }} />
                  </div>
                </div>
                <span className="text-xs font-semibold">{cls.studentCount}/{cls.capacity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filtered.length > 24 && (
        <p className="text-center text-sm text-gray-500">Showing 24 of {filtered.length} classes</p>
      )}
    </div>
  );
}
