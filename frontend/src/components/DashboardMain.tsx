import { useEffect, useState } from "react";
import DashboardSearch from "./DashboardSearch";
import DashboardVendas from "./DashboardVendas";
import api from "../api/axiosConfig";
import type { UserRespose } from "../types/UserDTO";



export default function DashboardMain() {

  const [users, setUsers] = useState<UserRespose[]>([]);
  const [userSearch, setUserSearch] = useState<UserRespose[]>([]);
  const [search, setSearch] = useState("");


  const searchBar = (value: string) => {
    const lowerValue = value.toLocaleLowerCase().trim()

    const filteredUsers = users.filter(user =>
      user.name.toLocaleLowerCase().trim().includes(lowerValue)
    )

    setUserSearch(filteredUsers)
    setSearch(value)
  }

  useEffect(() => {
    const buscarProdutos = async () => {
      try {
        const response = await api.get('/api/clients', {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setUsers([]);
        }


      } catch (err) {

        console.error(err);

      } finally {
      }
    };
    buscarProdutos();
  }, []);
  return (
    <div className="bg-white rounded-3xl p-4 m-2 shadow overflow-auto">
      <div className="flex justify-between items-center px-4">
        <div className="p-4">
          <h2 className="text-3xl font-bold">Vendas</h2>
          <h2 className="pl-1 text-2xl text-green-500">Todas as vendas</h2>
        </div>
        <DashboardSearch search={search}
          onchange={(e) => searchBar(e.target.value)}
        />
      </div>
      {search.length === 0 ?
        <DashboardVendas users={users || []} /> :
        <DashboardVendas users={userSearch || []} />
      }
    </div>

  )
}
