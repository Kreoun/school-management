"use client";

import { useState } from "react";
import { students, branches, getBranchName } from "../../data/mock";

const subjects = ["Mathematics", "English", "Khmer", "Science", "History", "Geography", "Computer Science", "Physical Education"];

export default function GradesPage() {
  const [selectedBranch, setSelectedBranch] = useState("BR001");
  const [selectedSubject, setSelectedSubject] = useState("Mathematics");
  const [examType, setExamType] = useState("midterm");
  const [grades, setGrades] = useState<Record<string, number>>({});

  const branchStudents = students.filter((s) => s.branchId === selectedBranch);

  const handleGrade = (studentId: string, score: number) => {
    setGrades((prev) => ({ ...prev, [studentId]: score }));
  };

  const getLetterGrade = (score: number) => {
    if (score >= 90) return { grade: "A", color: "text-emerald-600 bg-emerald-50" };
    if (score >= 80) return { grade: "B", color: "text-blue-600 bg-blue-50" };
    if (score >= 70) return { grade: "C", color: "text-amber-600 bg-amber-50" };
    if (score >= 60) return { grade: "D", color: "text-orange-600 bg-orange-50" };
    return { grade: "F", color: "text-rose-600 bg-rose-50" };
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Grades & Academics</h1>
        <p className="text-sm text-gray-500">Manage student grades, exams, and report cards</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          {branches.map((b) => (<option key={b.id} value={b.id}>{b.name}</option>))}
        </select>
        <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          {subjects.map((s) => (<option key={s} value={s}>{s}</option>))}
        </select>
        <select value={examType} onChange={(e) => setExamType(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500">
          <option value="midterm">Midterm Exam</option>
          <option value="final">Final Exam</option>
          <option value="quiz">Quiz</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>

      {/* Grade Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">{branchStudents.length}</p>
          <p className="text-xs text-gray-500">Total Students</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-emerald-600">{Object.keys(grades).length}</p>
          <p className="text-xs text-gray-500">Graded</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-amber-600">
            {Object.values(grades).length > 0 ? (Object.values(grades).reduce((a, b) => a + b, 0) / Object.values(grades).length).toFixed(1) : "—"}
          </p>
          <p className="text-xs text-gray-500">Average Score</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
          <p className="text-2xl font-bold text-rose-600">{branchStudents.length - Object.keys(grades).length}</p>
          <p className="text-xs text-gray-500">Pending</p>
        </div>
      </div>

      {/* Grade Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-3">
          <h3 className="text-sm font-semibold text-gray-900">{selectedSubject} — {examType.charAt(0).toUpperCase() + examType.slice(1)} — {getBranchName(selectedBranch)}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                <th className="px-6 py-3">Student</th>
                <th className="px-6 py-3">Class</th>
                <th className="px-6 py-3">Score (out of 100)</th>
                <th className="px-6 py-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {branchStudents.map((s) => {
                const score = grades[s.id];
                const letter = score !== undefined ? getLetterGrade(score) : null;
                return (
                  <tr key={s.id} className="transition-colors hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600">{s.firstName[0]}{s.lastName[0]}</div>
                        <span className="text-sm font-medium text-gray-900">{s.firstName} {s.lastName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{s.classId.split("-").slice(-1)[0]}</td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={score ?? ""}
                        onChange={(e) => handleGrade(s.id, Number(e.target.value))}
                        placeholder="—"
                        className="w-20 rounded-lg border border-gray-300 px-2 py-1.5 text-center text-sm outline-none focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-6 py-3">
                      {letter ? (
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${letter.color}`}>{letter.grade}</span>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50">Export Report Cards</button>
        <button className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700">Save Grades</button>
      </div>
    </div>
  );
}
