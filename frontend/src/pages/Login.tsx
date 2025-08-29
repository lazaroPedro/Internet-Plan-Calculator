import { useEffect, useState } from "react"
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);
  const { login, } = useAuth();

  const navigate = useNavigate()
  const handleSubmitLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const credenciais = { username: email, password: senha };

    try {
      const response = await api.post('/api/auth/login', credenciais);


      const token = response.data.token;

      if (token) {
        login(token)
        navigate("/")
      }

    } catch (error) {
      console.error("Erro no login:", error);
      setErro(true)
    }
  };
  useEffect(() => {

    const token = localStorage.getItem("authToken");
    if (token) {
      login(token)
      navigate("/")
    }

  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col gap-5 ">

      <div className="flex bg-green-800 text-2xl rounded-2xl w-2xl p-8 text-center items-center gap-5">
        <div className="p-4 bg-white rounded-full">
          <MdLogin color="green" size={30}></MdLogin>
        </div>
        <h1 className="text-white ">Entrar: </h1>
      </div>

      <div className="p-12  bg-white rounded-2xl w-2xl ">
        {erro ? <div className="flex bg-red-100 text-red-700 p-4 rounded-2xl mb-5"> Email ou senha incorretos</div> : ""}
        <form className="flex flex-col gap-5 text-2xl" onSubmit={handleSubmitLogin}>
          <label htmlFor="email"  >Email:</label>
          <input id="email" className="focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 p-4 rounded-2xl" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          <label htmlFor="senha">Senha:</label>
          <input id="senha" className="focus:outline-none focus:ring-2 focus:ring-green-500 bg-gray-100 p-4 rounded-2xl" type="password" value={senha} onChange={(e) => setSenha(e.target.value)}></input>


          <button className="my-4 p-4 bg-green-400 rounded-2xl text-white font-bold hover:bg-green-500" type="submit">Entrar</button>
        </form>
      </div>

    </div>
  )
}
