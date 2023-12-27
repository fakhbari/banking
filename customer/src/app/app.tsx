import React from 'react';
import CustomerTable from "./CustomerTable";
import {DataContext} from "@banking/data-context";
import {useContext} from "react";

const Customer = () => {
  const {customers} = useContext(DataContext)
  return (
    <div>
      { customers ? <CustomerTable customers={customers}/> : "no customer found ! "}
    </div>
  );
};

export default Customer;
