import React from 'react';
import CustomerTable from "./CustomerTable";
import {DataContext} from "@banking/data-context";
import {useContext} from "react";

const Customer = () => {
  const {customers , setCustomers} = useContext(DataContext)
  return (
    <div>
      { customers ? <CustomerTable customers={customers} setCustomers={setCustomers}/> : "no customer found ! "}
    </div>
  );
};

export default Customer;
