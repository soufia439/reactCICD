//Tablist.tsx
import React from 'react';
//import { useTabsContext } from './TabsContext';
 
export const TabList: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div style={{ display: 'flex', cursor: 'pointer' }}>{children}</div>;
};