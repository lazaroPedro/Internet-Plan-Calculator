import { useEffect, useState } from "react";
import DashboardMain from "../components/DashboardMain";
import DashboardStats from "../components/DashboardStatus";
import Sidebar from "../components/Sidebar";
import api from "../api/axiosConfig";

export default function Vendas() {
  const [dash, setDash] = useState({ allClients: 0, todayClients: 0, allDisp: 0 })
  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await api.get('/api/clients/info', {
          headers: {
            "Content-Type": "application/json"
          }
        });
        setDash({
          allClients: response.data.allClients,
          todayClients: response.data.todayClients, allDisp: response.data.allDisp
        });

      } catch (err) {

        console.error(err);
      } finally {
      }
    };
    buscarProdutos();
  }, []);

  return (

    <div className=' pb-10  mx-auto'>
      <Sidebar>
      </Sidebar>
      <div className='max-w-[1000px] gap-5 mx-auto pt-20'>

        <DashboardStats total={dash.allClients} hoje={dash.todayClients} disp={dash.allDisp}></DashboardStats>
        <DashboardMain />
      </div>
    </div>

  )
}
