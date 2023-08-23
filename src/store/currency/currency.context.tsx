import React, { createContext, useContext, useState, ReactNode } from 'react';

type CurrencyContextType = {
  selectedCurrency: string;
  setSelectedCurrency: (currencyCode: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Set default currency

  const contextValue: CurrencyContextType = {
    selectedCurrency,
    setSelectedCurrency,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
