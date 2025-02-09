import React, { useEffect } from "react";
import { PAYMENT_STATUS } from "@/utils";
import { usePenalty } from "@/context/PenaltyContext";
import { PenaltyTypes } from "../../../types";

type PropsTypes = {
  selectedUser: PenaltyTypes | null;
  filteredPenalties: PenaltyTypes[];
  closeModal: () => void;
  setFilteredPenalties: React.Dispatch<React.SetStateAction<PenaltyTypes[]>>;
};

const PenaltyDetailsTable = ({
  selectedUser,
  filteredPenalties,
  closeModal,
  setFilteredPenalties,
}: PropsTypes) => {
  const { penalties, setPenalties } = usePenalty();

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const markAsPaid = (penaltyId: number) => {
    const updatedPenalties: PenaltyTypes[] = penalties.map((p) =>
      p.id === penaltyId ? { ...p, amount: 0, status: PAYMENT_STATUS.paid } : p
    );

    setPenalties(updatedPenalties);
    localStorage.setItem("penalties", JSON.stringify(updatedPenalties));

    const filteredUpdatedPenalties: PenaltyTypes[] = updatedPenalties.filter(
      (p) => p.userId === selectedUser?.userId
    );
    setFilteredPenalties(filteredUpdatedPenalties);
  };

  const markAllAsPaid = () => {
    const updatedPenalties: PenaltyTypes[] = penalties.map((p) =>
      p.userId === selectedUser?.userId
        ? { ...p, amount: 0, status: PAYMENT_STATUS.paid }
        : p
    );
    setPenalties(updatedPenalties);
    localStorage.setItem("penalties", JSON.stringify(updatedPenalties));
    const filteredUpdatedPenalties: PenaltyTypes[] = updatedPenalties.filter(
      (p) => p.userId === selectedUser?.userId
    );
    setFilteredPenalties(filteredUpdatedPenalties);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
        <h2 className="text-base mb-4">
          Break Rules details for{" "}
          <span className="font-bold">{selectedUser?.name}</span>
        </h2>

        {/* Details Table */}
        <div className="bg-white p-6 rounded-lg max-h-[60vh] overflow-y-auto">
          <table className="w-full border-collapse border border-gray-300 hidden md:table">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Rule</th>
                <th className="border p-2">Amount</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPenalties.map((penalty) => (
                <tr key={penalty.id}>
                  <td className="border-b p-3">{penalty.rule}</td>
                  <td className="border-b p-3">{penalty.amount}</td>
                  <td className="border-b p-3">{penalty.date}</td>
                  <td className={"border-b font-normal text-sm"}>
                    <span
                      className={`px-3 py-1 capitalize border rounded-full ${
                        penalty.status === PAYMENT_STATUS.paid
                          ? "text-green-600 bg-green-200"
                          : "text-red-500 bg-red-200"
                      }`}
                    >
                      {penalty.status}
                    </span>
                  </td>
                  <td className="border-b p-3">
                    <button
                      onClick={() => markAsPaid(penalty.id)}
                      className={`${
                        penalty.status === PAYMENT_STATUS.paid
                          ? "text-gray-400"
                          : "primary-clr"
                      }  px-4 py-2 rounded-md`}
                      disabled={penalty.status === PAYMENT_STATUS.paid}
                    >
                      Mark as Paid
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="md:hidden">
            {filteredPenalties.map((penalty) => (
              <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4">
                <p className="text-gray-600 pb-2">
                  Rule: <span className="font-medium">{penalty.rule}</span>
                </p>
                <p className="text-gray-600 pb-2">
                  Amount:{" "}
                  <span className="font-medium">{penalty.amount} BDT</span>
                </p>
                <p className="text-gray-600 pb-2">
                  Date: <span className="font-medium">{penalty.date}</span>
                </p>
                <p className="text-gray-600 pb-2">
                  Status:
                  <span
                    className={`px-3 py-[3px] capitalize border rounded-full ml-2 ${
                      penalty.status === PAYMENT_STATUS.paid
                        ? "text-green-600 bg-green-200"
                        : "text-red-500 bg-red-200"
                    }`}
                  >
                    {penalty.status}
                  </span>
                </p>
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => markAsPaid(penalty.id)}
                    className={`${
                      penalty.status === PAYMENT_STATUS.paid
                        ? "text-gray-400 cursor-not-allowed"
                        : "primary-clr"
                    } px-4 py-2 rounded-md`}
                    disabled={penalty.status === PAYMENT_STATUS.paid}
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="mt-4 pr-6 flex justify-end">
          <button
            onClick={closeModal}
            className="border-solid border border-black  primary-clr px-3 py-1 rounded-md"
          >
            Close
          </button>
          {filteredPenalties.some(
            (p) => p.status === PAYMENT_STATUS.unpaid
          ) && (
            <button
              onClick={markAllAsPaid}
              className="primary-bg text-white px-3 py-1 rounded-md ml-2"
            >
              Mark All as Paid
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PenaltyDetailsTable;
