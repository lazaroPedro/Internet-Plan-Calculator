import { FaSearch } from "react-icons/fa";
export default function DashboardSearch(props:
  {
    search: string,
    onchange: React.ChangeEventHandler<HTMLInputElement>
  }) {


  return (
    <div className="p-4 relative">
      <FaSearch className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400"></FaSearch>
      <input
        type="text"
        placeholder="Pesquisar..."
        value={props.search}
        onChange={props.onchange}
        className="w-full pl-12 bg-gray-50 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-green-500"
      />

    </div>
  );
}

