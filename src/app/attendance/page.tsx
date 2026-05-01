"use client";

import { useState } from "react";
import { students, branches, getBranchName } from "../../data/mock";

const attendanceStatuses = ["present", "absent", "late", "excused"] as const;

export default function AttendancePage() {
  const [selectedBranch, setSelectedBranch] = useState("BR001");
  const [selectedDate, setSelectedDate] = useState("2026-05-01");
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const branchStudents = students.filter((s) => s.branchId === selectedBranch);

  const handleMark = (studentId: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const stats = {
    present: Object.values(attendance).filter((v) => v === "present").length,
    absent: Object.values(attendance).filter((v) => v === "absent").length,
    late: Object.values(attendance).filter((v) => v === "late").length,
    excused: Object.values(attendance).filter((v) => v === "excused").length,
    unmarked: branchStudents.length - Object.keys(attendance).length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracking</h1>
        <p className="text-sm text-gray-500">Mark and track daily student attendance</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <select value={selectedBranch} onChange={(e) => { setSelectedBranch(e.target.value); setAttendance({}); }} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          {branches.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>
        <input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
        <button onClick={() => { const a: Record<string, string> = {}; branchStudents.forEach((s) => { a[s.id] = "present"; }); setAttendance(a); }} className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
          Mark All Present
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center"><p className="text-lg font-bold text-emerald-700">{stats.present}</p><p className="text-xs text-emerald-600">Present</p></div>
        <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-center"><p className="text-lg font-bold text-rose-700">{stats.absent}</p><p className="text-xs text-rose-600">Absent</p></div>
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center"><p className="text-lg font-bold text-amber-700">{stats.late}</p><p className="text-xs text-amber-600">Late</p></div>
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-center"><p className="text-lg font-bold text-blue-700">{stats.excused}</p><p className="text-xs text-blue-600">Excused</p></div>
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-center"><p className="text-lg font-bold text-gray-700">{stats.unmarked}</p><p className="text-xs text-gray-600">Unmarked</p></div>
      </div>

      {/* Attendance Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-900">{getBranchName(selectedBranch)} — {selectedDate}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {branchStudents.map((s) => (
                <tr key={s.id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">{s.firstName[0]}{s.lastName[0]}</div>
                      <span className="text-sm font-medium text-gray-900">{s.firstName} {s.lastName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3 text-sm text-gray-600">{s.classId.split("-").slice(-1)[0]}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-2">
                      {attendanceStatuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => handleMark(s.id, status)}
                          className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                            attendance[s.id] === status
                              ? status === "present" ? "bg-emerald-600 text-white"
                              : status === "absent" ? "bg-rose-600 text-white"
                              : status === "late" ? "bg-amber-500 text-white"
                              : "bg-blue-600 text-white"
                              : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">
          Save Attendance
        </button>
      </div>
    </div>
  );
}
