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
import FacilitiesModal, {facilityInfoType} from "./Modal";
import {DataContext} from "@banking/data-context";

interface facilityType {
  depositNumber: string,
  customerNumber: string,
  facilityAmount: string,
}

export default function CustomizedTables() {
  const [open, setOpen] = React.useState(false)
  const AddIcon = Icons.Add
  const {facilities , setFacilities} = React.useContext(DataContext)

  const handleAddFacility = (facilityInfo:facilityInfoType) =>{
    console.log('facilityInfo from table>>',facilityInfo)

    setFacilities([...facilities,facilityInfo])
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
              Facilities
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
                  <TableCell>customer number</TableCell>
                  <TableCell>deposit number</TableCell>
                  <TableCell>facility amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {facilities.map((facility:facilityType,index:number) => (
                  <TableRow key={index}>
                    <TableCell align="left">{facility.customerNumber}</TableCell>
                    <TableCell align="left">{facility.depositNumber}</TableCell>
                    <TableCell align="left">{facility.facilityAmount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <FacilitiesModal openModal={open} closeModal={()=>{setOpen(false)}} handleSubmit={handleAddFacility} />
    </>
  );
}
