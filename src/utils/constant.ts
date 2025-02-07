export const RULES = [
  { id: 1, description: "Fashionably late to meetings", penalty: 200 },
  {
    id: 2,
    description: "Shoes playing hide-and-seek outside the rack",
    penalty: 50,
  },
  {
    id: 3,
    description: "Forgetting to mute during a virtual call",
    penalty: 100,
  },
  { id: 4, description: "Leaving unwashed coffee mugs on desks", penalty: 70 },
  { id: 5, description: "Ignoring email etiquette", penalty: 150 },
  {
    id: 6,
    description: "Leaving the printer jammed and walking away",
    penalty: 120,
  },
  { id: 7, description: "Not logging work hours correctly", penalty: 180 },
  {
    id: 8,
    description: "Excessive personal phone use during work hours",
    penalty: 200,
  },
  {
    id: 9,
    description: "Blocking emergency exits with personal items",
    penalty: 250,
  },
  {
    id: 10,
    description: "Taking someone else's food from the fridge",
    penalty: 300,
  },
  {
    id: 11,
    description: "Talking too loudly in shared workspaces",
    penalty: 90,
  },
  {
    id: 12,
    description: "Forgetting to turn off lights when leaving",
    penalty: 60,
  },
  { id: 13, description: "Ignoring security protocols", penalty: 500 },
  { id: 14, description: "Not cleaning up after office lunch", penalty: 80 },
  {
    id: 15,
    description: "Forgetting to turn off pc when leaving",
    penalty: 400,
  },
  { id: 16, description: "Not following the dress code", penalty: 100 },
  {
    id: 17,
    description: "Skipping company town halls or mandatory meetings",
    penalty: 150,
  },
];

export const DEPARTMENTS = [
  {
    id: 1,
    name: "Human Resources",
    employees: [
      { id: 101, name: "Alice Johnson", email: "alice.hr@company.com" },
      { id: 102, name: "Bob Smith", email: "bob.hr@company.com" },
    ],
  },
  {
    id: 2,
    name: "Engineering",
    employees: [
      {
        id: 201,
        name: "Charlie Brown",
        email: "charlie.eng@company.com",
      },
      { id: 202, name: "David Wilson", email: "david.eng@company.com" },
    ],
  },
  {
    id: 3,
    name: "Marketing",
    employees: [
      {
        id: 301,
        name: "Eve Carter",
        email: "eve.marketing@company.com",
      },
      {
        id: 302,
        name: "Frank White",
        email: "frank.marketing@company.com",
      },
    ],
  },
  {
    id: 4,
    name: "Finance",
    employees: [
      {
        id: 401,
        name: "Grace Green",
        email: "grace.finance@company.com",
      },
      { id: 402, name: "Hank Black", email: "hank.finance@company.com" },
    ],
  },
  {
    id: 5,
    name: "Operations",
    employees: [
      { id: 501, name: "Ivy Blue", email: "ivy.ops@company.com" },
      { id: 502, name: "Jack Red", email: "jack.ops@company.com" },
    ],
  },
  {
    id: 6,
    name: "Sales",
    employees: [
      {
        id: 601,
        name: "Kelly Brown",
        email: "kelly.sales@company.com",
      },
      { id: 602, name: "Leo Gray", email: "leo.sales@company.com" },
    ],
  },
];

export const PAYMENT_STATUS = { unpaid: "unpaid", paid: "paid" };
