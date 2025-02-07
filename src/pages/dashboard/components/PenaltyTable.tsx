import { useState } from "react";
import { usePenalty } from "@/context/PenaltyContext";
import { PAYMENT_STATUS } from "@/utils/constant";

interface Penalty {
  id: number;
  userId: number;
  name: string;
  department: string;
  amount: number;
  status: string;
  date: string;
  rule: string;
  due: string;
}

const PenaltyTable = (props: Props) => {
  const { penalties, setPenalties } = usePenalty();
  const [selectedUser, setSelectedUser] = useState<Penalty | null>(null);
  const [filteredPenalties, setFilteredPenalties] = useState<Penalty[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Compute total amount per user
  const getTotalAmount = (userId: number) => {
    return penalties
      .filter((p) => p.userId === userId && p.status === PAYMENT_STATUS.unpaid)
      .reduce((sum, p) => sum + p.amount, 0);
  };

  // Handle row click - open modal and filter penalties
  const openModal = (user: Penalty) => {
    setSelectedUser(user);
    setFilteredPenalties(penalties.filter((p) => p.userId === user.userId));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setFilteredPenalties([]);
    setIsModalOpen(false);
  };

  const markAllAsPaid = () => {
    const updatedPenalties: Penalty[] = penalties.map((p) =>
      p.userId === selectedUser?.userId
        ? { ...p, amount: 0, status: PAYMENT_STATUS.paid }
        : p
    );
    setPenalties(updatedPenalties);
    localStorage.setItem("penalties", JSON.stringify(updatedPenalties));
    const filteredUpdatedPenalties: Penalty[] = updatedPenalties.filter(
      (p) => p.userId === selectedUser?.userId
    );
    setFilteredPenalties(filteredUpdatedPenalties);
  };

  const markAsPaid = (penaltyId: number) => {
    const updatedPenalties: Penalty[] = penalties.map((p) =>
      p.id === penaltyId ? { ...p, amount: 0, status: PAYMENT_STATUS.paid } : p
    );

    setPenalties(updatedPenalties);
    localStorage.setItem("penalties", JSON.stringify(updatedPenalties));

    const filteredUpdatedPenalties: Penalty[] = updatedPenalties.filter(
      (p) => p.userId === selectedUser?.userId
    );
    setFilteredPenalties(filteredUpdatedPenalties);
  };

  return (
    <div className="p-6">
      {/* Primary Table */}
      <table className="w-full border-collapse border border-gray-300 bg-white">
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
          {Array.from(new Set(penalties.map((p) => p.userId))).map((userId) => {
            const userPenalty = penalties.find((p) => p.userId === userId);
            if (!userPenalty) return null;

            return (
              <tr
                key={userId}
                className="cursor-pointer hover:bg-gray-100 text-center"
                onClick={() => openModal(userPenalty)}
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
                        : "text-red-500 bg-red-200"
                    }`}
                  >
                    {getTotalAmount(userId) === 0 ? "Paid" : "Unpaid"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3">
            <h2 className="text-base mb-4">
              Break Rules details for{" "}
              <span className="font-bold">{selectedUser.name}</span>
            </h2>

            {/* Details Table */}
            <table className="w-full border-collapse border border-gray-300">
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
                  <tr key={penalty.id} className="text-center">
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

            {/* Action Buttons */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeModal}
                className="border-solid border border-black  primary-clr px-4 py-2 rounded-md"
              >
                Close
              </button>
              {filteredPenalties.some(
                (p) => p.status === PAYMENT_STATUS.unpaid
              ) && (
                <button
                  onClick={markAllAsPaid}
                  className="primary-bg text-white px-4 py-2 rounded-md ml-2"
                >
                  Mark All as Paid
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PenaltyTable;
