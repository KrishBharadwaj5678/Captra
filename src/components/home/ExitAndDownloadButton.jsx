import { FaDownload, FaSignOutAlt } from "react-icons/fa";

const ExitAndDownloadButton = ({ saveImage, exitImage }) => {
  return (
    <div className="flex absolute bottom-9 items-center gap-4 justify-center w-full">
      <div
        className="bottom-20 p-4.5 cursor-pointer rounded-full bg-[#3498FF]/95 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        onClick={saveImage}
      >
        <FaDownload size={27} className="text-white" />
      </div>
      <div
        className="p-4.5 cursor-pointer rounded-full bg-[#3498FF]/95 shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
        onClick={exitImage}
      >
        <FaSignOutAlt size={27} className="text-white" />
      </div>
    </div>
  );
};

export default ExitAndDownloadButton;
