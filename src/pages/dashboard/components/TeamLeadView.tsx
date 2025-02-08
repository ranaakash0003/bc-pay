import { useState } from "react";
import PenaltyTable from "./PenaltyTable";
import { FaCirclePlus } from "react-icons/fa6";
import PenaltyForm from "./PenaltyForm";

const TeamLeadView = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mt-10 mb-6 ml-4 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-black">Team Lead Overview</h2>
        <button
          onClick={() => setIsReportModalOpen(true)}
          className="flex items-center text-black px-4 ml-2 mr-4 hover:text-[#454953] transition duration-300"
        >
          <FaCirclePlus className="mr-1" />
          Report
        </button>
      </div>
      {isReportModalOpen && (
        <PenaltyForm onClose={() => setIsReportModalOpen(false)} />
      )}
      <PenaltyTable />
    </div>
  );
};

export default TeamLeadView;
