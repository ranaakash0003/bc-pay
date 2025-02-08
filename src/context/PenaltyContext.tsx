import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { PenaltyTypes } from "../types";

type PenaltyContextTypes = {
  penalties: PenaltyTypes[];
  setPenalties: React.Dispatch<React.SetStateAction<PenaltyTypes[]>>;
};

const PenaltyContext = createContext<PenaltyContextTypes | undefined>(
  undefined
);

export const PenaltyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [penalties, setPenalties] = useState<PenaltyTypes[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("penalties");
    if (storedData) {
      setPenalties(JSON.parse(storedData));
    } else {
      fetch("/src/data/penalties.json")
        .then((res) => res.json())
        .then((data) => {
          setPenalties(data);
          localStorage.setItem("penalties", JSON.stringify(data));
        })
        .catch((error) => console.error("Error loading penalties:", error));
    }
  }, []);

  return (
    <PenaltyContext.Provider value={{ penalties, setPenalties }}>
      {children}
    </PenaltyContext.Provider>
  );
};

export const usePenalty = () => {
  const context = useContext(PenaltyContext);
  if (!context) {
    throw new Error("usePenalty must be used within a PenaltyProvider");
  }
  return context;
};
