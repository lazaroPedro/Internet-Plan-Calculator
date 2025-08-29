import { LuCircleAlert } from "react-icons/lu";

export default function ConfirmModal(props: { fechar: () => void }) {

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={props.fechar}>

      <div className="p-14 z-10 text-3xl relative font-bold gap-5 rounded-2xl bg-white w-fit flex flex-col justify-center text-center" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-center ">
          <LuCircleAlert size={100} color="green"></LuCircleAlert>
        </div>
        <h1>
          Deseja salvar o contrato? <br />
          Apos salvar não será possivel editar este contrato!</h1>
        <div className="flex gap-10 justify-center">
          <button type="submit" className="p-4 w-full bg-green-400 hover:bg-green-500 text-white rounded-2xl">Salvar</button>
          <button type="button" className="p-4 w-full bg-red-400 hover:bg-red-500 text-white rounded-2xl" onClick={props.fechar}>Cancelar</button>

        </div>
      </div>


    </div>)
}
