import { useState } from "react";
import DashboardRow from "./DashboardRow";
import DashboardModal from "./DashboardModal";
import type { UserRespose } from "../types/UserDTO";


interface DashboardSearchProps {
  users: UserRespose[];
}


export default function DashboardVendas(props: DashboardSearchProps) {
  const [modal, setModal] = useState({
    active: false,
    qtdCellPhone: 0,
    qtdComputer: 0,
    qtdSmartTV: 0,
    qtdTVBox: 0,
    qtdOther: 0
  }
  )
  return (
    <div className="p-4 overflow-x-auto">

      {modal.active ? <DashboardModal onClick={() => setModal(prev => ({ ...prev, active: false }))} qtdCellphone={modal.qtdCellPhone} qtdComputer={modal.qtdComputer} qtdSmarttv={modal.qtdSmartTV} qtdTvbox={modal.qtdTVBox} qtdOther={modal.qtdOther} /> : ""}
      <table className="w-full text-left" >
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-3 px-4 border-b">Nome</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Telefone</th>
            <th className="py-3 px-4 border-b">Plano</th>
            <th className="py-3 px-4 border-b">Data</th>
            <th className="py-3 px-4 border-b">Gamer</th>
            <th className="py-3 px-4 border-b">Dispositivos</th>
          </tr>
        </thead>
        <tbody>
          {props.users.length === 0 ? <tr
          ><td colSpan={7}
            className="p-4 text-xl text-center justify-center w-full">Nenhuma venda encontrada</td></ tr> : props.users.map(user => (
              <DashboardRow key={user.id}
                onClick={() => setModal({
                  active: true,
                  qtdCellPhone: user.qtdCellphone,
                  qtdComputer: user.qtdComputer,
                  qtdSmartTV: user.qtdSmarttv,
                  qtdTVBox: user.qtdTvbox,
                  qtdOther: user.qtdOther
                }
                )} {...user} />
            ))}
        </tbody>
      </table>
    </div >
  );
}
