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
import InstallmentModal, {installmentInfo} from "./Modal";
import {DataContext} from "@banking/data-context";


export interface installmentType {
  facilityId:string,
  loanNumber:number,
  loanAmount:number
}

export default function CustomizedTables() {
  const [open, setOpen] = React.useState(false)
  const AddIcon = Icons.Add
  const {installment , setInstallment} = React.useContext(DataContext)

  const handleAddFacility = (installmentInfo:installmentInfo) =>{
    const loanAmount = installmentInfo.facility.facilityAmount / installmentInfo.installmentCount
    const newInstallment:installmentType[] = []
    for(let i=1 ; i <= installmentInfo.installmentCount ; i++){
      newInstallment.push({facilityId:installmentInfo.facility.id , loanNumber:i , loanAmount:loanAmount})
    }
    console.log('newInstallment',newInstallment)

    setInstallment([...installment,...newInstallment])
  }

  return (
    <>
      <Box sx={{width: "100%"}}>
        <Paper sx={{width: "100%", mb: 2}}>
          <Toolbar sx={{pl: {sm: 2}, pr: {xs: 1, sm: 1},}} className={styles.tableToolbar}>
            <Typography
              sx={{flex: "1 1 100%"}}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Installments
            </Typography>
            <Tooltip title="add facility">
              <IconButton>
                <AddIcon onClick={()=>{setOpen(true)}}/>
              </IconButton>
            </Tooltip>
          </Toolbar>
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>facility id</TableCell>
                  <TableCell>loan number</TableCell>
                  <TableCell>loan amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {installment && installment.map((installment:installmentType,index:number) => (
                  <TableRow key={index}>
                    <TableCell align="left">{installment.facilityId}</TableCell>
                    <TableCell align="left">{installment.loanNumber}</TableCell>
                    <TableCell align="left">{installment.loanAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <InstallmentModal openModal={open} closeModal={()=>{setOpen(false)}} handleSubmit={handleAddFacility} />
    </>
  );
}
