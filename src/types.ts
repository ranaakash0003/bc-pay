export type PenaltyTypes = {
  id: number;
  userId: number;
  name: string;
  department: string;
  amount: number;
  status: string;
  date: string;
  rule: string;
  due: string;
};

export type DropdownItemTypes = {
  id: number;
  value: string;
  optionalValue?: number;
};
