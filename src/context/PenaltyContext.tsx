import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

interface Penalty {
  id: number;
  userId: number;
  name: string;
  department: string;
  amount: number;
  status: string;
  date: string;
  rule: string;
  due: string;
}

interface PenaltyContextType {
  penalties: Penalty[];
  setPenalties: React.Dispatch<React.SetStateAction<Penalty[]>>;
}

const PenaltyContext = createContext<PenaltyContextType | undefined>(undefined);

export const PenaltyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [penalties, setPenalties] = useState<Penalty[]>([]);

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

// Custom Hook to Use Context
export const usePenalty = () => {
  const context = useContext(PenaltyContext);
  if (!context) {
    throw new Error("usePenalty must be used within a PenaltyProvider");
  }
  return context;
};
