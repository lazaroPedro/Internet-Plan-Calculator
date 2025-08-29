import { IoMdCloseCircle } from "react-icons/io";
import { MdComputer, MdLiveTv, MdMoreHoriz, MdPhoneAndroid, MdTv } from "react-icons/md";
import type { DispositivosType } from "../types/Dispositivos";

type Dispositivos = {
  onClick: () => void;

} & DispositivosType
export default function DashboardModal(props: Dispositivos) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={props.onClick}>

      <div className="p-10 z-10 relative text-2xl font-bold gap-6 rounded-2xl bg-white w-fit flex flex-col justify-center text-center shadow-2xs"


        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={props.onClick} className="absolute right-2 top-2 hover:text-red-400 text-red-500"><IoMdCloseCircle size={30} /> </button>

        <table className="border-separate border-spacing-x-10 border-spacing-y-5">
          <thead>
            <tr>
              <th></th>
              <th className="text-left pr-8"></th>
              <th className="text-center">Quantidade</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 rounded-full bg-green-400 border-2 border-white text-white"> <MdPhoneAndroid></MdPhoneAndroid> </td>
              <td className="text-left">Celulares</td>
              <td>
                <span className="flex w-full justify-center bg-green-400 text-white rounded-full px-4 py-2  shadow">
                  {props.qtdCellphone}
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-2 rounded-full bg-green-400 border-2 border-white text-white"> <MdComputer></MdComputer> </td>
              <td className="text-left">Computadores</td>
              <td>
                <span className="flex w-full justify-center bg-green-400 rounded-full px-4 py-2 text-white shadow">
                  {props.qtdComputer}
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-2 rounded-full bg-green-400 border-2 text-white"> <MdTv></MdTv> </td>
              <td className="text-left">Smart TV</td>
              <td>
                <span className="flex w-full justify-center bg-green-400 rounded-full px-4 py-2 text-white shadow">
                  {props.qtdSmarttv}
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-2 rounded-full bg-green-400 border-2 text-white"> <MdLiveTv /> </td>
              <td className="text-left">TV Box</td>
              <td>
                <span className="flex w-full justify-center bg-green-400 rounded-full px-4 py-2 text-white shadow">
                  {props.qtdTvbox}
                </span>
              </td>
            </tr>
            <tr>
              <td className="p-2 rounded-full bg-green-400 border-2 text-white"> <MdMoreHoriz />
              </td>
              <td className="text-left">Outros</td>
              <td>
                <span className="flex w-full justify-center bg-green-400 rounded-full px-4 py-2 text-white shadow">

                  {props.qtdOther}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
