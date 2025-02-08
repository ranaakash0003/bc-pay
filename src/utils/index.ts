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

export const ROLE_CEO = "ceo";
export const ROLE_HR = "hr";
export const ROLE_TEAMLEAD = "teamlead";

export const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("authUser");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Error parsing authUser:", error);
    return null;
  }
};

export const isCeo = () => {
  const user = getUserInfo();
  return user ? user.role === ROLE_CEO : false;
};

export const isHr = () => {
  const user = getUserInfo();
  return user ? user.role === ROLE_HR : false;
};

export const isTeamlead = () => {
  const user = getUserInfo();
  return user ? user.role === ROLE_TEAMLEAD : false;
};
