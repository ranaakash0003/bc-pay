import PenaltyTable from "./PenaltyTable";
import PenaltyOverview from "./PenaltyOverview";

const CeoView = () => {
  return (
    <div className="w-full">
      <div className="m-5">
        <h2 className="text-xl font-semibold mt-6 mb-6 text-black">
          CEO Dashboard Overview
        </h2>
      </div>
      <PenaltyOverview />
      <PenaltyTable />
    </div>
  );
};

export default CeoView;
