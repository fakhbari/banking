import * as React from 'react';
import {
  Toolbar,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table
} from "@mui/material";
import * as Icons from "@mui/icons-material";
import styles from "./Table.module.css";
import DepositModal from "./Modal";
import {DataContext} from "@banking/data-context";

interface depositType {
  depositNumber: string,
  customerNumber: string,
  amount: string,
}

export default function CustomizedTables() {
  const [open, setOpen] = React.useState(false)
  const AddIcon = Icons.Add
  const {deposits,setDeposits} = React.useContext(DataContext)

  const handleAddDeposit = (customerNumber:string,amount:string) =>{
    const newDeposit = {
      customerNumber,
      amount,
      depositNumber:(Math.floor(Math.random() * 1000) + 1) + 1000
    }
    setDeposits([...deposits,newDeposit])
  }

  return (
    <>
      <Box sx={{width: "100%"}} dir='rtl'>
        <Paper sx={{width: "100%", mb: 2}}>
          <Toolbar sx={{pl: {sm: 2}, pr: {xs: 1, sm: 1},}} className={styles.tableToolbar}>
            <Typography
              sx={{flex: "1 1 100%"}}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              سپرده
            </Typography>
            <Tooltip title="اضافه کردن سپرده جدید">
              <IconButton>
                <AddIcon onClick={()=>{setOpen(true)}}/>
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table" dir="rtl">
              <TableHead>
                <TableRow>
                  <TableCell>شماره سپرده</TableCell>
                  <TableCell>شماره مشتری</TableCell>
                  <TableCell>مقدار</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {deposits.map((deposit:depositType) => (
                  <TableRow key={deposit.depositNumber}>
                    <TableCell>{deposit.depositNumber}</TableCell>
                    <TableCell>{deposit.customerNumber}</TableCell>
                    <TableCell>{deposit.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <DepositModal openModal={open} closeModal={()=>{setOpen(false)}} handleSubmit={handleAddDeposit} />
    </>
  );
}
