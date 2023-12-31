import * as React from 'react';
import {
  TextField,
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel
} from "@mui/material";
import styles from './Modal.module.css';
import {useContext, useEffect} from "react";
import {DataContext} from "@banking/data-context";

export interface installmentInfo {
  facility: facilityType ,
  installmentCount:number,
}


interface facilityType {
  id:string,
  depositNumber: string,
  customerNumber: string,
  facilityAmount: number,
}

interface IProps{
  openModal:boolean;
  closeModal:()=>void;
  handleSubmit:(installmentInfo:installmentInfo)=>void;
}


export default function InstallmentModal(props:IProps) {
  const [open, setOpen] = React.useState(false);
  const [selectFacility, setSelectFacility] = React.useState('');
  const [installmentCount, setInstallmentCount] = React.useState(0);
  const {facilities } = useContext(DataContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.closeModal()
  };


  const handleChange = (event:SelectChangeEvent) => {
    const selectedFacility = event.target.value
    setSelectFacility(selectedFacility)

  };

  useEffect(()=>{
    if(props.openModal){
      handleOpen()
    }else {
      setOpen(false)
    }
  },[props])

  const onSubmitData = () =>{
    const selectedFacility = facilities.find((facility:facilityType) => facility.id == selectFacility)
    props.handleSubmit({facility:selectedFacility,installmentCount:installmentCount})
    setSelectFacility('')
    setInstallmentCount(0)
    handleClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalContainer}>
        <Typography className={styles['m-b-10']}> Facility Information : </Typography>
        <FormControl fullWidth margin="dense" size="small">
          <InputLabel id="facility">Facility</InputLabel>
          <Select
            id="facility"
            value={selectFacility}
            label="Facility"
            fullWidth={true}
            onChange={handleChange}
          >
            {facilities && facilities.map((facility:facilityType) => {
              return <MenuItem value={facility.id}>{facility.id}</MenuItem>
            })}
          </Select>
        </FormControl>
        <TextField
          required
          id="facilityAmount"
          label="installment count"
          size="small"
          margin="dense"
          value={installmentCount}
          onChange={(event:any)=>{setInstallmentCount(event.target.value)}}
        />
        <Button variant="contained" fullWidth={true} onClick={onSubmitData}>Submit</Button>
      </Box>
    </Modal>
  );
}
