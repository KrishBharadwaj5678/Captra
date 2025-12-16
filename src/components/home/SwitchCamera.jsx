import { FaExchangeAlt } from "react-icons/fa";

const SwitchCamera = ({ switchCamera }) => {
  return (
    <button
      className="absolute rounded-sm! bg-[#3498FF]/95 top-20 left-5 cursor-pointer px-3 py-2.5 flex items-center gap-2"
      onClick={switchCamera}
    >
      <p className="text-white">Switch</p>
      <FaExchangeAlt className="text-white" />
    </button>
  );
};

export default SwitchCamera;
