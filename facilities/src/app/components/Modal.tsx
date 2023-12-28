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

export interface facilityInfoType {
  depositNumber:string;
  customerNumber:string;
  facilityAmount:number;
}

interface IProps{
  openModal:boolean;
  closeModal:()=>void;
  handleSubmit:(facilityInfo:facilityInfoType)=>void;
}

interface depositType {
  depositNumber: string,
  customerNumber: string,
  amount: string,
}

export default function FacilitiesModal(props:IProps) {
  const [open, setOpen] = React.useState(false);
  const [deposit, setDeposit] = React.useState('');
  const [facilityInfo , setFacilityInfo] = React.useState<facilityInfoType>({depositNumber:'',customerNumber:'', facilityAmount:0})
  const {deposits } = useContext(DataContext)

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.closeModal()
  };


  const handleChange = (event:SelectChangeEvent) => {
    const selectedDepositNumber = event.target.value
    setDeposit(selectedDepositNumber)
    const selectedDeposit = deposits.find((deposit:depositType) => deposit.depositNumber == selectedDepositNumber)
    setFacilityInfo({
      depositNumber:selectedDepositNumber,
      customerNumber:selectedDeposit.customerNumber,
      facilityAmount: Number(selectedDeposit.amount)* 0.7
    })
  };

  useEffect(()=>{
    if(props.openModal){
      handleOpen()
    }else {
      setOpen(false)
    }
  },[props])

  const onSubmitData = () =>{
    props.handleSubmit(facilityInfo)
    setDeposit('')
    setFacilityInfo({depositNumber:'',customerNumber:'', facilityAmount:0})
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
          <InputLabel id="deposit-customer">DepositNumber - Customer Number</InputLabel>
          <Select
            id="deposit-customer"
            value={deposit}
            label="DepositNumber - Customer Number"
            onChange={handleChange}
            fullWidth={true}
          >
            {deposits && deposits.map((deposit:depositType) => {
              return <MenuItem value={deposit.depositNumber}>deposit number : {deposit.depositNumber} - customer number : {deposit.customerNumber}</MenuItem>
            })}
          </Select>
        </FormControl>
        <TextField
          required
          id="facilityAmount"
          label="Facility Amount"
          size="small"
          margin="dense"
          value={facilityInfo.facilityAmount}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button variant="contained" fullWidth={true} onClick={onSubmitData}>Submit</Button>
      </Box>
    </Modal>
  );
}
