//TabPanel.tsx
import React from 'react';
import { useTabsContext } from './TabsContext';
 
export const TabPanel: React.FC<{ index: number; children: React.ReactNode }> = ({ index, children }) => {
  const { activeIndex } = useTabsContext();
 
  return activeIndex === index ? <div>{children}</div> : null;
};