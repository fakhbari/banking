import React from "react";
import { createContext, useState } from 'react';
export interface SharedDataContextProps {
  children: JSX.Element;
}
export const DataContext = createContext<Record<string, any>>({});
export function DataProvider({ children }: SharedDataContextProps) {
  const [customers, setCustomers] = useState([
    {customerNumber:1, name:"fereshteh", family:"akhbari", nationalCode:"123456789"},
    {customerNumber:2, name:"zahra", family:"gholizade", nationalCode:"987654321"},
    {customerNumber:3, name:"arman", family:"taherian", nationalCode:"543219876"},
  ]);
  return (
    <DataContext.Provider value={{ customers, setCustomers }}>
      {children}
    </DataContext.Provider>
  );
}
export default DataProvider;
