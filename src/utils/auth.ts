export interface User {
  email: string;
  password: string;
  role: "hr" | "teamlead" | "ceo";
}

const users: User[] = [
  { email: "hr@kaz.info", password: "1234", role: "hr" },
  { email: "teamlead@kaz.info", password: "1234", role: "teamlead" },
  { email: "ceo@kaz.info", password: "1234", role: "ceo" },
];

export const authenticateUser = (
  email: string,
  password: string
): User | null => {
  const user = users.find((u) => u.email === email && u.password === password);
  return user || null;
};
