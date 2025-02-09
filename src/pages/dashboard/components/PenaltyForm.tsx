import { useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";
import { DEPARTMENTS, RULES } from "../../../data";
import { usePenalty } from "@/context/PenaltyContext";
import CustomDropdown from "@/components/CustomDropdown";
import Button from "@/components/Button";

type ReportPenaltyModalPropsTypes = {
  onClose: () => void;
};

type SelectedEmployeeTypes = {
  id: number;
  value: string;
} | null;

type SelectedRuleTypes = {
  id: number;
  value: string;
  optionalValue?: number;
} | null;

const ReportPenaltyModal = ({ onClose }: ReportPenaltyModalPropsTypes) => {
  const { penalties, setPenalties } = usePenalty();
  const [selectedEmployee, setSelectedEmployee] =
    useState<SelectedEmployeeTypes>(null);
  const [selectedRule, setSelectedRule] = useState<SelectedRuleTypes>(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [error, setError] = useState("");
  const selectedRuleData = RULES.find(
    (rule) => rule.description === selectedRule?.value
  );
  const penaltyAmount = selectedRuleData ? selectedRuleData.penalty : 0;
  const employees = DEPARTMENTS.flatMap((dept) => dept.employees);
  const isDisabled = !selectedEmployee?.value || !selectedRule?.value;
  const getLastDateOfCurrentMonth = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth() + 1, 1)
      .toISOString()
      .split("T")[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee?.value || !selectedRule?.value || !date) {
      setError("All fields are required.");
      return;
    }

    const newPenalty = {
      id: penalties.length + 1,
      userId: Number(selectedEmployee?.id),
      name:
        employees.find((emp) => emp.id === Number(selectedEmployee?.id))
          ?.name || "",
      department:
        DEPARTMENTS.find((dept) =>
          dept.employees.some((emp) => emp.id === Number(selectedEmployee?.id))
        )?.name || "Unknown",
      amount: penaltyAmount,
      status: "unpaid",
      date,
      rule: selectedRule?.value,
      due: getLastDateOfCurrentMonth(),
    };
    const updatedPenalties = [...penalties, newPenalty];
    setPenalties(updatedPenalties);
    localStorage.setItem("penalties", JSON.stringify(updatedPenalties));

    setSelectedEmployee(null);
    setSelectedRule(null);
    setDate("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[440px] relative">
        <h2 className="text-xl font-bold mb-4">Report Form</h2>

        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <CustomDropdown
              title="Select Employee"
              selectedData={selectedEmployee?.value || ""}
              setSelectedData={setSelectedEmployee}
              data={employees.map((item) => ({
                id: item?.id,
                value: item?.name,
              }))}
            />
          </div>

          <div className="mb-4">
            <CustomDropdown
              title="Select Violation Rule"
              selectedData={selectedRule?.value || ""}
              setSelectedData={setSelectedRule}
              data={RULES.map((rule) => ({
                id: rule?.id,
                value: rule?.description,
                optionalValue: rule?.penalty,
              }))}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date*</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-gray-300 p-2 outline-none rounded-md text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Penalty Amount
            </label>
            <input
              type="text"
              value={penaltyAmount}
              readOnly
              className="w-full border border-gray-300 p-2 rounded-md bg-gray-200 outline-none text-sm"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <div className="mt-4 flex justify-end">
              <Button onClick={onClose} variant="secondary">
                Close
              </Button>

              <Button type="submit" disabled={isDisabled} className="ml-2">
                Submit
              </Button>
            </div>
          </div>
        </form>

        <Button
          onClick={onClose}
          variant="link"
          className="absolute top-2 right-2"
        >
          <FaRegCircleXmark size={20} />
        </Button>
      </div>
    </div>
  );
};

export default ReportPenaltyModal;
