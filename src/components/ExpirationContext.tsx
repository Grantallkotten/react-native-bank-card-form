import { createContext, useContext, useState, type ReactNode } from 'react';

interface ExpirationContextType {
  month: string;
  updateMonth: (newMonth: string) => void;
  year: string;
  updateYear: (newMonth: string) => void;
}

const ExpirationMonthContext = createContext<ExpirationContextType | undefined>(
  undefined
);

// The wrapper
export const ExpirationProvider = ({ children }: { children: ReactNode }) => {
  const [month, setMonth] = useState<string>('01');
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());

  const updateMonth = (newMonth: string) => {
    setMonth(newMonth);
  };

  const updateYear = (newYear: string) => {
    setYear(newYear);
  };

  return (
    <ExpirationMonthContext.Provider
      value={{ month, updateMonth, year, updateYear }}
    >
      {children}
    </ExpirationMonthContext.Provider>
  );
};

// The context
export const useExpiration = (): ExpirationContextType => {
  const context = useContext(ExpirationMonthContext);
  if (!context) {
    throw new Error('useExpiration must be used within an ExpirationProvider');
  }
  return context;
};
