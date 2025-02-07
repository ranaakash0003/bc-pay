import PenaltyTable from "./PenaltyTable";
import PenaltyOverview from "./PenaltyOverview";

const HrView: React.FC = () => {
  return (
    <div className="w-full">
      <div className="mt-6 mb-6 ml-6">
        <h2 className="text-2xl font-bold mt-10 mb-6 text-black">
          📊 Hr Dashboard Overview
        </h2>
      </div>
      <PenaltyOverview />
      <PenaltyTable />
    </div>
  );
};

export default HrView;
