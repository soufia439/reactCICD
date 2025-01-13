//Tab.tsx
import React from 'react';
import { useTabsContext } from './TabsContext';
 
 export const Tab: React.FC<{ index: number; label: string }> = ({ index, label }) => {
  const { activeIndex, setActiveIndex } = useTabsContext();
 
  const isActive = activeIndex === index;
 
  return (
<div
      style={{
        padding: '10px 20px',
        borderBottom: isActive ? '2px solid blue' : '2px solid gray',
        fontWeight: isActive ? 'bold' : 'normal',
      }}
      onClick={() => setActiveIndex(index)}
>
      {label}
</div>
  );
};
