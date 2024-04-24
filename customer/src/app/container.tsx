import React, { useContext } from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import CustomerTable from './CustomerTable';
import {CustomerDataContext} from './dataContext';
import axios from 'axios';

const theme = createTheme({
  typography: {
    fontFamily: [
      'IRANSans',
    ].join(','),
  },
  direction:"rtl"
});
const Container = () => {
  const {customers , setCustomers} = useContext(CustomerDataContext)
  React.useEffect(()=>{
    axios.get('http://localhost:7000/customers').then(res=>{
      setCustomers(res.data)
    })
  },[])
  return (

    <ThemeProvider theme={theme}>
      <div>
        {customers ? <CustomerTable customers={customers} setCustomers={setCustomers} /> : "مشتری ای یافت نشد"}
      </div>
    </ThemeProvider>
  );
};

export default Container;
