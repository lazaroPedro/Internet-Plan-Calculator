import type React from "react";

export default function ToggleButton(props: { checked: boolean, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {

  return (
    <button
      onClick={props.onClick}
      className={`relative flex h-6 w-12 items-center rounded-full transition ${props.checked ? "bg-green-500" : "bg-gray-300"
        }`}
      type="button"
    >
      <span
        className={`inline-block w-8 h-10/12 transform rounded-full bg-white transition ${props.checked ? "translate-x-3.5" : "translate-x-0.5"
          }`}
      />
    </button>
  );
};

