import { useState, type ChangeEvent } from "react"
import { MdAddchart, MdUploadFile } from "react-icons/md"
import * as XLSX from "xlsx"
import api from "../../api/axiosConfig";
import toast from "react-hot-toast";
interface UserNorm {
  nome: string;
  "e-mail": string;
  telefone: string;
  "cliente gamer": string;
  celulares: number;
  computadores: number;
  "smart tv": number;
  "tv box": number;
  "outros dispositivos": number;
}

interface User {
  name: string;
  email: string;
  telephone: string;
  gamer: boolean;
  qtdCellPhone: number;
  qtdComputer: number;
  qtdSmartTV: number;
  qtdTVBox: number;
  qtdOther: number;
}

function normalizeKeys(obj: any): Record<string, any> {
  return Object.keys(obj).reduce((acc: Record<string, any>, key) => {
    acc[key.toLowerCase()] = obj[key];
    return acc;
  }, {});
}

function normalizePhone(phone: string): string {
  let numbers = phone.replace(/\D/g, "");
  numbers = numbers.replace(/^0+/, "");
  numbers = numbers.replace(/^55+/, "55");
  if (!numbers.startsWith("55")) {
    numbers = "55" + numbers;
  }
  return numbers;
}
export default function ExportModal(props: { fechar: () => void }) {
  const [data, setData] = useState([] as User[])

  const handlePostList = async () => {
    for (const user of data) {

      try {
        await api.post("/api/clients", user);
        toast.success("Cliente cadastrado com sucesso")

      } catch (error) {
        toast.error("Erro ao cadastrar o cliente")
      }

    }
    window.location.reload()

  }
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result;
      if (!result || typeof result === "string") return;
      const data = new Uint8Array(result)
      const workbook = XLSX.read(data, { type: "array" })
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];


      const json = XLSX.utils.sheet_to_json(worksheet);
      const jsonm = json.map(obj => {
        const o = normalizeKeys(obj) as UserNorm;
        return {
          name: (o["nome"]),
          email: o["e-mail"],
          telephone: normalizePhone(o["telefone"]),
          gamer: o["cliente gamer"] === "SIM",
          qtdCellPhone: o["celulares"],
          qtdComputer: o["computadores"],
          planType: "",
          created: "",
          qtdSmartTV: o["smart tv"],
          qtdTVBox: o["tv box"],
          qtdOther: o["outros dispositivos"]

        }
      })
      console.log(jsonm)
      setData(jsonm);
    };

    reader.readAsArrayBuffer(file);
  };


  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={props.fechar}>

      <div className="p-14 z-10 text-3xl relative font-bold rounded-2xl bg-white w-fit flex flex-col justify-center text-center " onClick={(e) => e.stopPropagation()}>
        <form className="flex justify-center items-center gap-5 flex-col">
          <div className="flex justify-center items-center gap-5">
            <MdAddchart size={30}></MdAddchart>
            <h2>Importar planilha</h2>
          </div>
          <p className="text-2xl"> Cadastre uma lista de vendas importando uma planilha </p>
          {data.length !== 0 ? "" : <label className="px-8 py-2 bg-green-400 rounded-full text-xl text-white flex gap-5 items-center justify-center hover:bg-green-500 cursor-pointer">

            <MdUploadFile />
            Selecione um arquivo
            <input
              type="file"
              accept=".xlsx, .xls"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>}


        </form> {data.length !== 0 ? <div className="pt-8">
          <div>Importação concluida! <br /> Foram encontradas {data.length} vendas. Deseja salvar?</div>

          <div className="flex justify-around py-8 gap-5">
            <button className="px-20 py-4 bg-red-400 rounded-full text-2xl text-white flex gap-5 items-center justify-center hover:bg-red-500 cursor-pointer" onClick={props.fechar} >Cancelar</button>
            <button className="px-20 py-4 bg-green-400 rounded-full text-2xl text-white flex gap-5 items-center justify-center hover:bg-green-500 cursor-pointer" onClick={handlePostList}>Salvar</button>


          </div></div> : ""}
      </div>
    </div>
  )
}
