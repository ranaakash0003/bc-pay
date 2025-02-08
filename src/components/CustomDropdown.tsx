import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { DropdownItemTypes } from "../types";
import useClickOutside from "@/hooks/useClickOutside";

type CustomDropdownProps = {
  title: string;
  selectedData: string;
  setSelectedData: (value: { id: number; value: string }) => void;
  data: DropdownItemTypes[];
};

const CustomDropdown = ({
  title,
  selectedData,
  setSelectedData,
  data,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-medium mb-1">{title}*</label>

      <div
        className="w-full flex items-center justify-between border border-gray-300 p-2 rounded-md cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-normal">{selectedData || "Select"}</span>
        <FaAngleDown className="ml-2 text-gray-500" />
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full w-full bg-white border border-gray-300 shadow-md rounded-md max-h-40 overflow-y-auto z-50">
          {data.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setSelectedData(item);
                setIsOpen(false);
              }}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              <span className="text-gray-700 pr-1">{item.value}</span>
              {item.optionalValue && (
                <span className="font-medium">(BDT {item.optionalValue})</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
