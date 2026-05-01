interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  change?: string;
  changeType?: "up" | "down" | "neutral";
  color: "indigo" | "emerald" | "amber" | "rose" | "blue" | "purple" | "cyan" | "orange";
}

const colorMap = {
  indigo: "bg-indigo-50 text-indigo-600",
  emerald: "bg-emerald-50 text-emerald-600",
  amber: "bg-amber-50 text-amber-600",
  rose: "bg-rose-50 text-rose-600",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-purple-50 text-purple-600",
  cyan: "bg-cyan-50 text-cyan-600",
  orange: "bg-orange-50 text-orange-600",
};

export default function StatCard({ title, value, icon, change, changeType, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`mt-1 text-xs font-medium ${changeType === "up" ? "text-emerald-600" : changeType === "down" ? "text-rose-600" : "text-gray-500"}`}>
              {changeType === "up" ? "↑" : changeType === "down" ? "↓" : ""} {change}
            </p>
          )}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg text-xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
