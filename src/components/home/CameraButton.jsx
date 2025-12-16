import { FaCamera } from "react-icons/fa";

const CameraButton = ({ handleTimer }) => {
  return (
    <div
      className="
      absolute bottom-9 left-1/2 -translate-x-1/2
      w-16 h-16 rounded-full
      bg-[#3498FF]/95 backdrop-blur-md
      cursor-pointer
      flex items-center justify-center
      shadow-lg hover:shadow-2xl hover:scale-105
      transition-all duration-300"
      onClick={handleTimer}
    >
      <FaCamera size={28} className="text-white" />
    </div>
  );
};

export default CameraButton;
