import { useState } from "react";
import { usePenalty } from "@/context/PenaltyContext";
import { PAYMENT_STATUS } from "@/utils/constant";
import { isHr } from "../../../utils";
import { PenaltyTypes } from "../../../types";
import PenaltyCard from "./PenaltyCard";
import PenaltyDetailsTable from "./PenaltyDetailsTable";

const PenaltyTable = () => {
  const { penalties } = usePenalty();
  const [selectedUser, setSelectedUser] = useState<PenaltyTypes | null>(null);
  const [filteredPenalties, setFilteredPenalties] = useState<PenaltyTypes[]>(
    []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTotalAmount = (userId: number) => {
    return penalties
      .filter((p) => p.userId === userId && p.status === PAYMENT_STATUS.unpaid)
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const openModal = (user: PenaltyTypes) => {
    setSelectedUser(user);
    setFilteredPenalties(penalties.filter((p) => p.userId === user.userId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setFilteredPenalties([]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <>
        <table className="w-full border-collapse border border-gray-300 bg-white hidden md:table">
          <thead>
            <tr className="bg-gray-200">
              <th className="border-b p-4">Employee ID</th>
              <th className="border-b p-4">Name</th>
              <th className="border-b p-4">Department</th>
              <th className="border-b p-4">Total Amount (BDT)</th>
              <th className="border-b p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(new Set(penalties.map((p) => p.userId))).map(
              (userId) => {
                const userPenalty = penalties.find((p) => p.userId === userId);
                if (!userPenalty) return null;

                return (
                  <tr
                    key={userId}
                    className={`${
                      isHr() && "cursor-pointer hover:bg-gray-100"
                    } text-center`}
                    onClick={() => isHr() && openModal(userPenalty)}
                  >
                    <td className="border-b p-4">{userPenalty.userId}</td>
                    <td className="border-b p-4">{userPenalty.name}</td>
                    <td className="border-b p-4">
                      <span className="px-2 py-1 border rounded-md text-gray-500 bg-gray-100 font-normal">
                        {userPenalty.department}
                      </span>
                    </td>
                    <td className="border-b p-4">{getTotalAmount(userId)}</td>
                    <td className={`border-b font-normal text-sm`}>
                      <span
                        className={`px-3 py-1 border rounded-full ${
                          getTotalAmount(userId) === 0
                            ? "text-green-600 bg-green-200"
                            : "text-red-600 bg-red-200"
                        }`}
                      >
                        {getTotalAmount(userId) === 0 ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>

        <div className="md:hidden">
          {Array.from(new Set(penalties.map((p) => p.userId))).map((userId) => {
            const userPenalty = penalties.find((p) => p.userId === userId);
            if (!userPenalty) return null;

            return (
              <PenaltyCard
                key={userId}
                openModal={openModal}
                userPenalty={userPenalty}
                getTotalAmount={getTotalAmount}
              />
            );
          })}
        </div>
      </>

      {isModalOpen && selectedUser && (
        <PenaltyDetailsTable
          selectedUser={selectedUser}
          filteredPenalties={filteredPenalties}
          closeModal={closeModal}
          setFilteredPenalties={setFilteredPenalties}
        />
      )}
    </div>
  );
};

export default PenaltyTable;
