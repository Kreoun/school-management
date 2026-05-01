export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  principalName: string;
  studentCount: number;
  teacherCount: number;
  status: "active" | "inactive";
  established: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  branchId: string;
  classId: string;
  enrollmentDate: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  address: string;
  status: "active" | "graduated" | "transferred" | "suspended";
  photo?: string;
}

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  branchId: string;
  subject: string;
  qualification: string;
  joinDate: string;
  salary: number;
  status: "active" | "on-leave" | "resigned";
}

export interface ClassInfo {
  id: string;
  name: string;
  grade: number;
  section: string;
  branchId: string;
  teacherId: string;
  room: string;
  capacity: number;
  studentCount: number;
  schedule: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  note?: string;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  classId: string;
  subject: string;
  examType: "midterm" | "final" | "quiz" | "assignment";
  score: number;
  maxScore: number;
  date: string;
  term: string;
}

export interface FeeRecord {
  id: string;
  studentId: string;
  branchId: string;
  type: "tuition" | "registration" | "exam" | "transport" | "uniform" | "other";
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "pending" | "overdue" | "partial";
  term: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  branchId: string | "all";
  author: string;
  date: string;
  priority: "high" | "medium" | "low";
  audience: "all" | "teachers" | "parents" | "students";
}

export const branches: Branch[] = [
  { id: "BR001", name: "Phnom Penh Main Campus", address: "No. 123, Preah Monivong Blvd, Phnom Penh", phone: "+855 23 456 789", email: "main@chinacademy.edu.kh", principalName: "Sokha Meas", studentCount: 520, teacherCount: 42, status: "active", established: "2015-01-15" },
  { id: "BR002", name: "Toul Kork Branch", address: "No. 45, St. 289, Toul Kork, Phnom Penh", phone: "+855 23 456 790", email: "toulkork@chinacademy.edu.kh", principalName: "Dara Chhin", studentCount: 380, teacherCount: 30, status: "active", established: "2017-06-01" },
  { id: "BR003", name: "Sen Sok Branch", address: "No. 78, St. 1003, Sen Sok, Phnom Penh", phone: "+855 23 456 791", email: "sensok@chinacademy.edu.kh", principalName: "Sophal Keo", studentCount: 290, teacherCount: 24, status: "active", established: "2018-09-01" },
  { id: "BR004", name: "Siem Reap Branch", address: "No. 56, National Road 6, Siem Reap", phone: "+855 63 456 792", email: "siemreap@chinacademy.edu.kh", principalName: "Vibol Chhun", studentCount: 340, teacherCount: 28, status: "active", established: "2019-01-10" },
  { id: "BR005", name: "Battambang Branch", address: "No. 34, Street 3, Battambang", phone: "+855 53 456 793", email: "battambang@chinacademy.edu.kh", principalName: "Chanthy Sorn", studentCount: 260, teacherCount: 22, status: "active", established: "2020-03-15" },
  { id: "BR006", name: "Kampong Cham Branch", address: "No. 12, National Road 7, Kampong Cham", phone: "+855 42 456 794", email: "kpcham@chinacademy.edu.kh", principalName: "Rith Ly", studentCount: 210, teacherCount: 18, status: "active", established: "2021-06-01" },
  { id: "BR007", name: "Sihanoukville Branch", address: "No. 89, Ekareach St, Sihanoukville", phone: "+855 34 456 795", email: "shv@chinacademy.edu.kh", principalName: "Sokunthea Prak", studentCount: 185, teacherCount: 16, status: "active", established: "2022-01-10" },
  { id: "BR008", name: "Takeo Branch", address: "No. 23, National Road 2, Takeo", phone: "+855 32 456 796", email: "takeo@chinacademy.edu.kh", principalName: "Bunthoeun Heng", studentCount: 150, teacherCount: 14, status: "active", established: "2023-09-01" },
];

const firstNames = ["Sopheak", "Chanthol", "Borey", "Sovannary", "Kunthea", "Pheakdey", "Ratana", "Visal", "Sreymom", "Dara", "Sokheng", "Maly", "Piseth", "Chenda", "Nary", "Kosal", "Tevy", "Sothea", "Vuthy", "Channary"];
const lastNames = ["Chhin", "Sok", "Meas", "Keo", "Ly", "Prak", "Heng", "Sorn", "Chhun", "Oum", "Nhem", "Tep", "Sar", "Chea", "Phan"];

function generateStudents(): Student[] {
  const students: Student[] = [];
  let counter = 1;
  for (const branch of branches) {
    const count = Math.min(branch.studentCount, 15);
    for (let i = 0; i < count; i++) {
      const fn = firstNames[counter % firstNames.length];
      const ln = lastNames[counter % lastNames.length];
      const grade = Math.floor(Math.random() * 12) + 1;
      const section = ["A", "B", "C"][Math.floor(Math.random() * 3)];
      students.push({
        id: `STU${String(counter).padStart(4, "0")}`,
        firstName: fn,
        lastName: ln,
        dateOfBirth: `${2008 + Math.floor(Math.random() * 10)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        gender: counter % 2 === 0 ? "Male" : "Female",
        branchId: branch.id,
        classId: `CLS-${branch.id}-G${grade}${section}`,
        enrollmentDate: `${2020 + Math.floor(Math.random() * 5)}-09-01`,
        parentName: `${lastNames[(counter + 3) % lastNames.length]} ${firstNames[(counter + 5) % firstNames.length]}`,
        parentPhone: `+855 ${10 + Math.floor(Math.random() * 90)} ${100 + Math.floor(Math.random() * 900)} ${100 + Math.floor(Math.random() * 900)}`,
        parentEmail: `parent.${fn.toLowerCase()}@gmail.com`,
        address: `${branch.address.split(",")[1] || branch.address}`,
        status: "active",
      });
      counter++;
    }
  }
  return students;
}

function generateTeachers(): Teacher[] {
  const subjects = ["Mathematics", "English", "Khmer", "Science", "History", "Geography", "Computer Science", "Physical Education", "Art", "Music"];
  const qualifications = ["Bachelor of Education", "Master of Education", "Bachelor of Science", "Master of Arts", "PhD in Education"];
  const teachers: Teacher[] = [];
  let counter = 1;
  for (const branch of branches) {
    const count = Math.min(branch.teacherCount, 8);
    for (let i = 0; i < count; i++) {
      const fn = firstNames[(counter + 7) % firstNames.length];
      const ln = lastNames[(counter + 2) % lastNames.length];
      teachers.push({
        id: `TCH${String(counter).padStart(4, "0")}`,
        firstName: fn,
        lastName: ln,
        email: `${fn.toLowerCase()}.${ln.toLowerCase()}@chinacademy.edu.kh`,
        phone: `+855 ${10 + Math.floor(Math.random() * 90)} ${100 + Math.floor(Math.random() * 900)} ${100 + Math.floor(Math.random() * 900)}`,
        branchId: branch.id,
        subject: subjects[i % subjects.length],
        qualification: qualifications[i % qualifications.length],
        joinDate: `${2016 + Math.floor(Math.random() * 8)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}-01`,
        salary: 400 + Math.floor(Math.random() * 600),
        status: "active",
      });
      counter++;
    }
  }
  return teachers;
}

function generateClasses(): ClassInfo[] {
  const classes: ClassInfo[] = [];
  let counter = 1;
  for (const branch of branches) {
    for (let grade = 1; grade <= 12; grade++) {
      for (const section of ["A", "B"]) {
        const capacity = 30 + Math.floor(Math.random() * 15);
        classes.push({
          id: `CLS-${branch.id}-G${grade}${section}`,
          name: `Grade ${grade} - ${section}`,
          grade,
          section,
          branchId: branch.id,
          teacherId: `TCH${String(((counter - 1) % 64) + 1).padStart(4, "0")}`,
          room: `Room ${grade}${section === "A" ? "01" : "02"}`,
          capacity,
          studentCount: Math.floor(capacity * (0.6 + Math.random() * 0.35)),
          schedule: grade <= 6 ? "Mon-Fri 7:30-11:30" : "Mon-Fri 7:00-12:00",
        });
        counter++;
      }
    }
  }
  return classes;
}

function generateFees(): FeeRecord[] {
  const fees: FeeRecord[] = [];
  const types: FeeRecord["type"][] = ["tuition", "registration", "exam", "transport", "uniform"];
  const amounts: Record<string, number> = { tuition: 150, registration: 50, exam: 30, transport: 40, uniform: 25, other: 20 };
  let counter = 1;
  const studs = students.slice(0, 40);
  for (const s of studs) {
    for (const t of types) {
      const isPaid = Math.random() > 0.3;
      fees.push({
        id: `FEE${String(counter).padStart(4, "0")}`,
        studentId: s.id,
        branchId: s.branchId,
        type: t,
        amount: amounts[t],
        dueDate: "2026-04-15",
        paidDate: isPaid ? "2026-04-10" : undefined,
        status: isPaid ? "paid" : Math.random() > 0.5 ? "pending" : "overdue",
        term: "Term 2 - 2025/2026",
      });
      counter++;
    }
  }
  return fees;
}

function generateAnnouncements(): Announcement[] {
  return [
    { id: "ANN001", title: "Term 2 Examination Schedule", content: "The Term 2 examinations will be held from May 15-25, 2026. Please ensure all students are prepared. Detailed schedules will be distributed by class teachers.", branchId: "all", author: "CHOMRAEUN CHIN", date: "2026-04-28", priority: "high", audience: "all" },
    { id: "ANN002", title: "Parent-Teacher Conference", content: "We invite all parents to attend the Parent-Teacher Conference on May 5, 2026 at your respective branch. Time: 2:00 PM - 5:00 PM.", branchId: "all", author: "CHOMRAEUN CHIN", date: "2026-04-25", priority: "high", audience: "parents" },
    { id: "ANN003", title: "New Computer Lab Opening - Phnom Penh", content: "We are pleased to announce the opening of our new computer lab at the Phnom Penh Main Campus. The lab features 40 new computers with high-speed internet.", branchId: "BR001", author: "Sokha Meas", date: "2026-04-20", priority: "medium", audience: "all" },
    { id: "ANN004", title: "Sports Day 2026", content: "Annual Sports Day will be held on May 30, 2026. All branches will participate. Events include track & field, football, volleyball, and more.", branchId: "all", author: "CHOMRAEUN CHIN", date: "2026-04-18", priority: "medium", audience: "all" },
    { id: "ANN005", title: "Teacher Professional Development Workshop", content: "All teachers are required to attend the Professional Development Workshop on May 3, 2026. Topics include modern teaching methods and technology in education.", branchId: "all", author: "CHOMRAEUN CHIN", date: "2026-04-15", priority: "medium", audience: "teachers" },
    { id: "ANN006", title: "Uniform Policy Reminder", content: "Please ensure all students wear proper school uniforms. The updated uniform policy is available at the school office.", branchId: "all", author: "CHOMRAEUN CHIN", date: "2026-04-10", priority: "low", audience: "parents" },
    { id: "ANN007", title: "Library Hours Extended - Siem Reap", content: "The Siem Reap branch library will now be open until 6:00 PM on weekdays to support students preparing for examinations.", branchId: "BR004", author: "Vibol Chhun", date: "2026-04-08", priority: "low", audience: "students" },
    { id: "ANN008", title: "Scholarship Applications Open", content: "Applications for the CHIN Academy Merit Scholarship 2026-2027 are now open. Eligible students in Grade 9-11 with GPA above 3.5 may apply.", branchId: "all", author: "CHOMRAEUN CHIN", date: "2026-04-05", priority: "high", audience: "students" },
  ];
}

export const students = generateStudents();
export const teachers = generateTeachers();
export const classes = generateClasses();
export const fees = generateFees();
export const announcements = generateAnnouncements();

export function getBranchName(branchId: string): string {
  return branches.find((b) => b.id === branchId)?.name ?? branchId;
}

export function getStudentName(studentId: string): string {
  const s = students.find((st) => st.id === studentId);
  return s ? `${s.firstName} ${s.lastName}` : studentId;
}

export const dashboardStats = {
  totalStudents: branches.reduce((sum, b) => sum + b.studentCount, 0),
  totalTeachers: branches.reduce((sum, b) => sum + b.teacherCount, 0),
  totalBranches: branches.length,
  totalRevenue: 285000,
  attendanceRate: 94.2,
  feeCollectionRate: 87.5,
  averageGPA: 3.42,
  upcomingEvents: 5,
};
