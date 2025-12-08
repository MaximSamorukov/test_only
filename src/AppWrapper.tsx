import React from 'react';
import { HistoricalDataProvider } from './store/hookProvider';
import { Container } from './Container';

function AppWrapper() {
  return (
    <HistoricalDataProvider>
      <Container />
    </HistoricalDataProvider>
  );
}

export default AppWrapper;
