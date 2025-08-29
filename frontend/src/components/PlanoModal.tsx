import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom"
import type { DispositivosType } from "../types/Dispositivos";

type modal = {
  plano: string;
  velocidade: number;


  gamer: boolean;
  onClick: () => void;

} & DispositivosType

export default function PlanoModal(props: modal) {
  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={props.onClick}>

      <div className="p-14 z-10 text-5xl relative font-bold gap-5 text-white rounded-2xl bg-green-800 w-fit flex flex-col justify-center text-center" onClick={(e) => e.stopPropagation()}>
        <button onClick={props.onClick} className="absolute right-2 top-2 hover:text-red-400 text-red-500"><IoMdCloseCircle size={30} /> </button>

        <h2 className="">PLANO</h2>
        <h2 className="text-6xl uppercase ">{props.plano}</h2>

        <h2 className="text-9xl text-nowrap">{props.velocidade}<span className="text-3xl"> Mb</span></h2>

        <Link to={`/cadastro/${props.plano}/${props.qtdCellphone}/${props.qtdComputer}/${props.qtdSmarttv}/${props.qtdTvbox}/${props.qtdOther}/${props.gamer}`} className="flex text-3xl p-8 bg-white hover:bg-green-100 shadow border-green-500 border-2 text-green-500 rounded-full text-center justify-center uppercase ">Contratar</Link>
      </div>
    </div>
  )
}
