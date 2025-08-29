import React, { useState } from 'react';
import Counter from '../components/Counter.tsx';
import { MdComputer, MdGifBox, MdOutlineTv, MdPhone, MdTv } from 'react-icons/md';
import ToggleButton from '../components/ToggleButton';
import Sidebar from '../components/Sidebar';
import PlanoModal from '../components/PlanoModal';
import api from '../api/axiosConfig.ts';
import toast from 'react-hot-toast';

interface ItemState {
  id: string;
  label: string;
  icon: any;
  count: number;
}
interface Client {
  qtdCellphone: number;
  qtdComputer: number;
  qtdSmarttv: number;
  qtdTvbox: number;
  qtdOther: number;
  gamer: boolean;

}
const initialItems: ItemState[] = [
  { id: 'celular', label: 'Celular', icon: MdPhone, count: 0 },
  { id: 'computador', label: 'Computador', icon: MdComputer, count: 0 },
  { id: 'smarttv', label: 'Smart TV', icon: MdTv, count: 0 },
  { id: 'tvbox', label: 'TV Box', icon: MdOutlineTv, count: 0 },
  { id: 'outros', label: 'Outros', icon: MdGifBox, count: 0 },
];

const Calculadora: React.FC = () => {

  const [calculado, setCalculado] = useState(true)
  const [plan, setPlan] = useState({ plano: "", velocidade: 0, preco: 100 })

  const [toggle, setToggle] = useState(false)
  const [items, setItems] = useState<ItemState[]>(initialItems);

  const handleIncrement = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.count > 0 ? { ...item, count: item.count - 1 } : item
      )
    );
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newClient: Client = {
      qtdCellphone: items.at(0)?.count as number,
      qtdComputer: items.at(1)?.count as number,
      qtdSmarttv: items.at(2)?.count as number,
      qtdTvbox: items.at(3)?.count as number,
      qtdOther: items.at(4)?.count as number,
      gamer: toggle
    };
    let soma = newClient.qtdCellphone + newClient.qtdComputer + newClient.qtdSmarttv + newClient.qtdTvbox + newClient.qtdOther
    if (soma === 0) {
      toast.error("Escolha ao menos um aparelho")
      return
    }
    try {
      const response = await api.post("/api/plans", newClient);
      setPlan({ plano: response.data.suggestedPlan, velocidade: response.data.velocity, preco: 100 });
      setCalculado(!calculado);
      console.log(newClient)
    } catch (error) {
      console.error(error);
    }

  }

  return (<div onClick={() => { if (calculado == false) { setCalculado(true) } }}>
    {calculado ? "" : (<PlanoModal plano={plan.plano} velocidade={plan.velocidade}
      preco={plan.preco}
      qtdCellphone={items.at(0)?.count as number} qtdComputer={items.at(1)?.count as number}
      qtdSmarttv={items.at(2)?.count as number}
      qtdTvbox={items.at(3)?.count as number} qtdOther={items.at(4)?.count as number} gamer={toggle}
      onClick={() => setCalculado(!calculado)}
    ></PlanoModal>)}
    <div className={` min-h-screen flex items-center justify-center ${calculado ? "" : "blur-xl"}  `}>
      <Sidebar></Sidebar>

      <div className=" w-full bg-white p-10 rounded-2xl shadow-lg max-w-[800px]" >
        <form onSubmit={handleSubmit}>
          <h1 className='text-center p-8 text-3xl'>Preencha a quantidade de dispositivos que usam a internet</h1>
          {items.map(item => (
            <Counter
              key={item.id}
              label={item.label}
              icon={item.icon}
              count={item.count}
              onIncrement={() => handleIncrement(item.id)}
              onDecrement={() => handleDecrement(item.id)}
            />
          ))}

          <div className="flex items-center gap-10 mt-8 mb-6 justify-center">
            <span className="text-gray-600 font-medium text-xl">Uso internet para game</span>
            <ToggleButton checked={toggle} onClick={() => setToggle(!toggle)}></ToggleButton>
          </div>

          <button
            className="w-full bg-green-500 text-white font-bold text-2xl p-4 rounded-full hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            type="submit"
          >
            Calcular Plano
          </button>
        </form>
      </div>
    </div></div>
  );
};

export default Calculadora;
