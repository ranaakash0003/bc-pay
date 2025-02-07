import InfoCard from "@/components/InfoCard";
import { DEPARTMENTS, PAYMENT_STATUS } from "../../../utils/constant";
import { usePenalty } from "@/context/PenaltyContext";

const PenaltyOverview = () => {
  const { penalties } = usePenalty();

  const totalEmployee = DEPARTMENTS.reduce((acc, department) => {
    return acc + department.employees.length;
  }, 0);

  const totalRuleBreaks = penalties.filter(
    (p) => p.status === PAYMENT_STATUS.unpaid
  ).length;

  const totalPenaltyAmount = penalties
    .filter((p) => p.status === PAYMENT_STATUS.unpaid)
    .reduce((sum, p) => sum + p.amount, 0);

  const totalAmountPaid = penalties
    .filter((p) => p.status === PAYMENT_STATUS.paid)
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="flex flex-row justify-between m-4">
      <InfoCard type="Total Employee" value={totalEmployee} />
      <InfoCard type="Total Rule Breaks" value={totalRuleBreaks} />
      <InfoCard type="Total Penalty Amount" value={totalPenaltyAmount} />
      <InfoCard type="Total Amount Paid" value={totalAmountPaid} />
    </div>
  );
};

export default PenaltyOverview;
