//TabsContext.tsx
import React, { createContext, useContext, useState } from 'react';
 
interface TabsContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}
 
const TabsContext = createContext<TabsContextType | undefined>(undefined);
 
export const TabsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
<TabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
</TabsContext.Provider>
  );
};
 
 export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabsContext must be used within a TabsProvider');
  }
  return context;
};
//export default useTabsContext