import { MdOutlineMenu } from "react-icons/md";
import ToggleButton from "./ToggleButton";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import type { UserRespose } from "../types/UserDTO";


type User = {

  onClick: () => void;
} & UserRespose


export default function DashboardRow(props: User) {

  let date = new Date(props.created).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  let plan = "Plano " + props.planType.toLowerCase();
  function formatPhoneForDisplay(rawPhone: string): string {
    if (!rawPhone) return "";

    const phone = parsePhoneNumberFromString(rawPhone, "BR");
    if (!phone) return rawPhone;

    let formatted = phone.formatNational();
    if (!formatted.includes("(")) {
      const digits = formatted.replace(/\D/g, "");
      if (digits.length === 10) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      } else if (digits.length === 11) {
        formatted = `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
      }
    }
    return formatted;
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">{props.name}</td>
      <td className="p-4">{props.email}</td>
      <td className="p-4">{formatPhoneForDisplay(props.telephone)}</td>
      <td className="p-4 capitalize">{plan}</td>
      <td className="p-4">{date}</td>
      <td className="p-4"><ToggleButton checked={props.gamer} /> </td>
      <td className="p-4 text-center"><button onClick={props.onClick} className="px-4 bg-green-600 hover:bg-green-400 rounded-2xl"> <MdOutlineMenu color="white" size={24}></MdOutlineMenu> </button></td>

    </tr>
  );
};

