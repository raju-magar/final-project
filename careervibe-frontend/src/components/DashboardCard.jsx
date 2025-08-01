// src/components/DashboardCard.jsx
export default function DashboardCard({ title, value, icon, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 hover:shadow-lg transition-shadow"
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-gray-500 font-semibold">{title}</h4>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
