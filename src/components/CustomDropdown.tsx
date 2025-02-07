import { useState, useEffect, useRef } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { DropdownItemTypes } from "../types";

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
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-gray-700 font-normal mb-1">{title}*</label>

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
              {item.value}{" "}
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
