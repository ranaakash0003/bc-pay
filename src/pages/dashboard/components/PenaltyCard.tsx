import { isHr } from "@/utils";
import { PenaltyTypes } from "../../../types";

type Props = {
  userPenalty: PenaltyTypes;
  getTotalAmount: (userId: number) => number;
  openModal: (userPenalty: PenaltyTypes) => void;
};

const PenaltyCard = ({ userPenalty, getTotalAmount, openModal }: Props) => {
  return (
    <div
      className={`${
        isHr() && "cursor-pointer"
      } bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4`}
      onClick={() => isHr() && openModal(userPenalty)}
    >
      <h4 className="text-lg font-semibold text-gray-800">
        {userPenalty.name}
      </h4>
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 justify-between">
          <p className="text-gray-600 text-sm">
            Employee ID: {userPenalty.userId}
          </p>
          <p className="text-gray-600 text-sm ">
            Total Amount (BDT):{" "}
            <span className="font-bold">
              {getTotalAmount(userPenalty.userId)}
            </span>
          </p>
        </div>

        <div className="flex flex-row gap-2 justify-between">
          <p className="text-gray-600 text-sm">
            Department:
            <span className="px-2 py-[3px] ml-1 ">
              {userPenalty.department}
            </span>
          </p>

          <p className="text-sm text-gray-600">
            Status:{" "}
            <span
              className={`px-3 py-[3px] border rounded-full ${
                getTotalAmount(userPenalty.userId) === 0
                  ? "text-green-600 bg-green-200"
                  : "text-red-600 bg-red-200"
              }`}
            >
              {getTotalAmount(userPenalty.userId) === 0 ? "Paid" : "Unpaid"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default PenaltyCard;
