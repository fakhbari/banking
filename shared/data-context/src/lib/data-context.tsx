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
  const [deposits, setDeposits] = useState([
    {depositNumber:'1000',customerNumber:'1',amount:'1500'},
    {depositNumber:'2000',customerNumber:'2',amount:'2500'},
  ])
  const [facilities , setFacilities] = useState([
    {id:'FA-1000',customerNumber:'1',depositNumber:'1000',facilityAmount:'700'}
  ])
  const [installment , setInstallment] = useState([])
  return (
    <DataContext.Provider value={{ customers, setCustomers,deposits, setDeposits,facilities , setFacilities,installment,setInstallment }}>
      {children}
    </DataContext.Provider>
  );
}
export default DataProvider;
