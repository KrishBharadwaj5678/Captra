import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown, FaClock } from "react-icons/fa";

const Delay = ({
  delay,
  delayValue,
  setDelayValue,
  setDelayDropdownUI,
  delayDropdownUI,
}) => {
  return (
    <div
      className="absolute left-5 top-5"
      onMouseEnter={() => setDelayDropdownUI(true)}
      onMouseLeave={() => setDelayDropdownUI(false)}
    >
      <button className="rounded-md! bg-[#3498FF]/95 flex gap-1.5 items-center cursor-pointer px-3 py-2.5 mb-1!">
        <p className="text-white">{delayValue}s Delay</p>
        <FaChevronDown
          className={`text-white transition-t  duration-300 ${
            delayDropdownUI ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {delayDropdownUI && (
          <motion.div
            className="absolute left-0 w-32 rounded-xl bg-[#3498FF]/90 backdrop-blur-md border border-[#1D6DB0] shadow-xl z-50 overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.06,
                    delayChildren: 0.05,
                  },
                },
                hidden: {
                  transition: {
                    staggerChildren: 0.03,
                    staggerDirection: -1,
                  },
                },
              }}
            >
              {delay.map((del, i) => (
                <motion.button
                  key={i}
                  className={`${
                    delayValue === del ? "bg-[#2A85E0]" : ""
                  } w-full text-left px-4 py-2 backdrop-blur-sm flex items-center gap-2 rounded-md`}
                  onClick={() => {
                    setDelayValue(del);
                    setDelayDropdownUI(false);
                  }}
                  variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -10 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <FaClock className="text-white" />
                  <span className="font-medium text-white">{del}s Delay</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Delay;
