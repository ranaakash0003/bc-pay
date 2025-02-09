import { useState } from "react";
import PenaltyTable from "./PenaltyTable";
import { FaCirclePlus } from "react-icons/fa6";
import PenaltyForm from "./PenaltyForm";
import Button from "@/components/Button";

const TeamLeadView = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  return (
    <div className="w-full">
      <div className="flex flex-row items-center justify-between mb-5 ml-4 flex-wrap gap-4">
        <h2 className="text-xl font-semibold mt-6 text-black">
          Team Lead Overview
        </h2>
        <Button onClick={() => setIsReportModalOpen(true)} variant="link">
          <div className="flex items-center text-black px-4 mt-6 ml-2 mr-4 hover:text-[#454953] transition duration-300">
            <FaCirclePlus className="mr-1" />
            Report
          </div>
        </Button>
      </div>
      {isReportModalOpen && (
        <PenaltyForm onClose={() => setIsReportModalOpen(false)} />
      )}
      <PenaltyTable />
    </div>
  );
};

export default TeamLeadView;
