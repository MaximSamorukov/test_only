import React, { createContext, useContext, ReactNode, useMemo } from 'react';
import { HistoricalDataStore } from './index';
import { historicalData } from './constants';

type HistoricalDataStoreType = HistoricalDataStore;

const HistoricalDataContext = createContext<HistoricalDataStoreType | null>(
  null,
);

interface HistoricalDataProviderProps {
  children: ReactNode;
}

export const HistoricalDataProvider: React.FC<HistoricalDataProviderProps> = ({
  children,
}) => {
  const historicalDataStore = useMemo(
    () => new HistoricalDataStore(historicalData),
    [],
  );
  return (
    <HistoricalDataContext.Provider value={historicalDataStore}>
      {children}
    </HistoricalDataContext.Provider>
  );
};

export const useHistoricalDataStore = (): HistoricalDataStore => {
  const context = useContext(HistoricalDataContext);

  if (context === null) {
    throw new Error(
      'useHistoricalDataStore must be used within HistoricalDataProvider',
    );
  }

  return context;
};
