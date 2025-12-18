import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { Slider } from "rsuite";

const FiltersMenu = ({ filterNames, filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="absolute top-5 right-5 text-white"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Button */}
      <button className="cursor-pointer px-3 py-2.5 backdrop-blur-md shadow-md border transition-all duration-200 bg-[#3498FF]/95 rounded-md! gap-2 flex items-center">
        <p>Filters</p>
        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="
              absolute right-0 w-60 mt-2
              rounded-2xl
              bg-[#3498FF]/95
              backdrop-blur-xl
              border border-white/20
              shadow-[0_20px_60px_-15px_rgba(0,0,0,0.45)]
              z-50
            "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.ul className="p-2 flex flex-col gap-2">
              {filterNames.map((filter, i) => (
                <motion.li
                  key={i}
                  className="
                    rounded-xl
                    bg-white/30
                    backdrop-blur-md
                    border border-white/20
                    px-4 py-2.5
                  "
                >
                  {/* Header */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm tracking-wide text-white/90">
                      {filter.label}
                    </span>

                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-black/25 text-white/80">
                      {filters[filter.name]}
                    </span>
                  </div>

                  {/* Slider */}
                  <Slider
                    progress
                    defaultValue={filter.default}
                    value={filters[filter.name]}
                    min={filter.min}
                    max={filter.max}
                    onChange={(value) =>
                      setFilters((prev) => ({
                        ...prev,
                        [filter.name]: value,
                      }))
                    }
                  />
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FiltersMenu;
