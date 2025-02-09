import PenaltyTable from "./PenaltyTable";
import PenaltyOverview from "./PenaltyOverview";

const HrView = () => {
  return (
    <div className="w-full">
      <div className="m-5">
        <h2 className="text-xl font-semibold mt-6 mb-6 text-black">
          Hr Dashboard Overview
        </h2>
      </div>
      <PenaltyOverview />
      <PenaltyTable />
    </div>
  );
};

export default HrView;
