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
    const loadPenalties = () => {
      const storedData = localStorage.getItem("penalties");
      if (storedData) {
        setPenalties(JSON.parse(storedData));
      }
    };
    loadPenalties();
    const handleStorageUpdate = () => {
      loadPenalties();
    };
    window.addEventListener("penaltiesUpdated", handleStorageUpdate);
    return () => {
      window.removeEventListener("penaltiesUpdated", handleStorageUpdate);
    };
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
