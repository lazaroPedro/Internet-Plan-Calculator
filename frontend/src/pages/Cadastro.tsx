import { MdOutlineTextSnippet } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ConfirmModal from "../components/ConfirmModal";
import api from "../api/axiosConfig";
import toast from "react-hot-toast";
import type { UserRequest } from "../types/UserRequest";


export default function Cadastro() {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [confirm, setConfirm] = useState(false)
  const navigate = useNavigate()
  const { plan, phone, computer, smarttv, tvbox, other, gamer } = useParams();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const onlyDigits = e.target.value.replace(/\D/g, "").slice(0, 11)
    setTelefone(onlyDigits)
  }

  const handleBlur = () => {
    if (telefone.length < 8) {
      toast.error("Número de telefone inválido. Deve ter no mínimo 8 dígitos.")

    }
  }
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (telefone.length < 8) {
      toast.error("Número de telefone inválido. Deve ter no mínimo 8 dígitos.")
      setConfirm(false)
      return

    }

    const isGamer = gamer === "true"
    const newClient: UserRequest = {
      name: nome,
      email: email,
      telephone: telefone,
      planType: plan?.toLocaleUpperCase() as string,
      qtdCellphone: Number(phone),
      qtdComputer: Number(computer),
      qtdSmarttv: Number(smarttv),
      qtdTvbox: Number(tvbox),
      qtdOther: Number(other),
      gamer: isGamer
    };
    try {
      await api.post("/api/clients", newClient);
      toast.success("Cliente cadastrado com sucesso")
      setTimeout(() => {
        navigate("/");
      }, 300);

    } catch (error) {
      toast.error("Erro ao cadastrar o cliente")
    }

  }

  return (
    <div
    >

      <div className="flex gap-5  flex-col items-center h-full ">
        <Sidebar></Sidebar>
        <div className="mt-10 flex bg-green-800 text-2xl rounded-2xl w-full p-8 text-center items-center gap-5 max-w-[800px]">
          <div className="p-4 bg-white rounded-full">
            <MdOutlineTextSnippet color="green" size={30}></MdOutlineTextSnippet>
          </div>
          <h1 className="text-white">Preencha com seus dados: </h1>
        </div>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-5 p-8 m-4 justify-center bg-white rounded-2xl text-xl max-w-[800px] w-full" >
          <label htmlFor="nome">Nome Completo:</label>
          <input type="text" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} className="bg-gray-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500" required></input>
          <label htmlFor="numero">Telefone</label>
          <input type="number" id="numero" value={telefone} onChange={handleChange} onBlur={handleBlur} className="bg-gray-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500" required></input>


          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-100 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500" required></input>
          <button type="button" className="p-4 bg-green-800 text-white rounded-full font-bold hover:bg-green-400 transition-colors" onClick={() => setConfirm(!confirm)}>Contratar</button>
          {confirm ? <ConfirmModal fechar={() => setConfirm(!confirm)}></ConfirmModal> : ""}
        </form>
      </div>
    </div>
  )
}
