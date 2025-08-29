import { HiOutlineDesktopComputer, HiOutlineUserAdd, HiOutlineUsers } from "react-icons/hi";

export default function DashboardStats(props: {
  total: number,
  hoje: number,
  disp: number
}) {
  const stats = [
    { id: 1, label: "Total Vendas", value: props.total, icon: <HiOutlineUsers size={28} /> },
    { id: 2, label: "Total Vendas Hoje", value: props.hoje, icon: <HiOutlineUserAdd size={28} /> },
    { id: 3, label: "Total Dispositivos", value: props.disp, icon: <HiOutlineDesktopComputer size={28} /> },
  ];

  return (
    <div className="flex justify-around bg-white shadow rounded-3xl p-4 m-2">
      {stats.map((stat) => (
        <div key={stat.id} className="flex flex-row items-center  px-4 gap-3">
          <div className="bg-green-100 p-4 rounded-full text-green-600 mb-2">
            {stat.icon}
          </div>
          <div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
            <p className="text-4xl font-bold">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

