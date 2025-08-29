import { useState } from "react";
import { MdLogout, MdOutlineAddChart, MdOutlineCalculate, MdOutlineDashboard, MdOutlineSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import ExportModal from "./modal/ExportModal";
import { useAuth } from "../context/AuthContext";
import { IoMdArrowDropdown } from "react-icons/io";

export default function Sidebar() {
  const [toggle, setToggle] = useState(true)
  const [planilha, setPlanilha] = useState(false)
  const { logout } = useAuth()
  return (<>
    {planilha ?
      <ExportModal fechar={() => setPlanilha(!planilha)}></ExportModal> : ""}
    <a onClick={() => setToggle(!toggle)} className={`${toggle ? "hidden" : "fixed left-0 top-0 p-4 bg-white rounded-2xl m-2 shadow hover:bg-gray-100 cursor-pointer z-5"}`}>

      <MdOutlineSettings size={35}></MdOutlineSettings>
    </a>


    <div id="sidebar" className={`h-screen p-4 fixed left-0 overflow-hidden bg-white flex flex-col justify-between shadow transition-all ${toggle ? "w-80 z-5" : "hidden"}`}>
      <div>
        <a onClick={() => setToggle(!toggle)} className="hover:bg-gray-100 flex rounded-3xl cursor-pointer" >
          <h1 className="text-2xl flex gap-3 items-center font-bold p-4">
            <MdOutlineSettings size={35}></MdOutlineSettings>

            Dashboard
          </h1>

        </a>
        {/* Links */}
        <nav className="mt-4">
          <Link to="/calculadora_plano"
            className="flex items-center text-2xl text-gray-500 gap-4 p-4 hover:bg-gray-100 transition rounded-2xl"
          >
            <MdOutlineCalculate />
            Calculadora
          </Link>
          <Link to="/"
            className="flex items-center text-2xl text-gray-500 gap-4 p-4 hover:bg-gray-100 transition rounded-2xl"
          >
            <MdOutlineDashboard></MdOutlineDashboard>
            Vendas
          </Link>
          <button className="flex w-full items-center text-2xl text-gray-500 gap-4 p-4 hover:bg-gray-100 transition rounded-2xl" onClick={() => setPlanilha(!planilha)} >
            <MdOutlineAddChart />
            Planilha
          </button>
        </nav>
      </div>

      <div className=" rounded-2xl flex flex-col group hover:bg-gray-100  transition">
        <span className="p-4 text-xl flex justify-between">Olá, Admin  <IoMdArrowDropdown /> </span>
        <button className="cursor-pointer p-4 bg-red-200 justify-center items-center gap-2 text-center text-xl rounded-b-2xl hover:bg-red-300 hidden group-hover:flex" onClick={logout}> <MdLogout></MdLogout>Sair</button>
      </div>
    </div></>
  );
}

