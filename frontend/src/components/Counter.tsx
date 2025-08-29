
interface CounterProps {
  icon: any;
  label: string;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;


}

export default function Counter(props: CounterProps) {
  let Icon = props.icon
  return (
    <div className="flex items-center justify-between w-full mb-4 gap-3">
      <div className="flex items-center">
        <div className="bg-green-100 p-3 rounded-full mr-4">
          <Icon color="green" size="20"></Icon>
        </div>
        <span className="text-gray-600 font-medium text-2xl ">{props.label}</span>

      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={props.onDecrement}
          className="w-12 h-12 bg-red-200 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold hover:bg-red-300 transition-colors"
          aria-label={`Diminuir ${props.label}`}
          type="button"
        >
          -
        </button>
        <input
          type="text"
          readOnly
          value={props.count}
          className="w-40 text-center text-lg font-semibold bg-white border-2 border-green-200 rounded-full h-12 focus:outline-none focus:ring-2 focus:ring-green-400"

        />
        <button
          onClick={props.onIncrement}
          className="bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold hover:bg-green-600 transition-colors"
          aria-label={`Aumentar ${props.label}`}
          type="button"
        >
          +
        </button>
      </div>
    </div>
  );
};


