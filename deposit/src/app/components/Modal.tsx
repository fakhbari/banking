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
import { importRemote } from '@module-federation/utilities';
import { AxiosResponse } from 'axios';

interface IProps{
  openModal:boolean;
  closeModal:()=>void;
  handleSubmit:(customerNumber:string,amount:string)=>void;
}

interface customersType {
  name:string,
  family:string,
  nationalCode:string,
  customerNumber:number
}

export default function DepositModal(props:IProps) {
  const [open, setOpen] = React.useState(false);
  const [customerNumber, setCustomerNumber] = React.useState('');
  const [amount , setAmount] = React.useState('')
  const [shellServices,setShellServices] = React.useState<{callServiceOfPlugin:(customer:string , service:string)=>any}>();
  const [customers , setCustomers] = React.useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.closeModal()
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCustomerNumber(event.target.value as string);
  };

  React.useEffect(()=>{
      shellServices && shellServices.callServiceOfPlugin("customer","getCustomers").then((res:AxiosResponse)=>{
        setCustomers(res.data)
      })

    if(props.openModal){
      handleOpen()
    }else {
      setOpen(false)
    }
    importRemote({
      url:'http://localhost:4200',
      scope:'shell',
      module:'./Services'
    })
      .then((module:any) =>{
        setShellServices(module)
      })


  },[props])

  const onSubmitData = () =>{
    props.handleSubmit(customerNumber,amount)
    handleClose();
    setAmount('')
    setCustomerNumber('')
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalContainer}>
        <Typography className={styles['m-b-10']}> Deposit Information : </Typography>
        <FormControl fullWidth margin="dense" size="small">
          <InputLabel id="customerNumber">Customer Number</InputLabel>
          <Select
            id="customerNumber"
            value={customerNumber}
            label="Customer Number"
            onChange={handleChange}
            fullWidth={true}
          >
            {customers && customers.map((customer:customersType) => {
              return <MenuItem value={customer.customerNumber}>{customer.customerNumber}</MenuItem>
            })}
          </Select>
        </FormControl>
        <TextField
          required
          id="amount"
          label="Amount"
          size="small"
          margin="dense"
          value={amount}
          onChange={(event)=>{setAmount(event.target.value)}}
        />
        <Button variant="contained" fullWidth={true} onClick={onSubmitData}>Submit</Button>
      </Box>
    </Modal>
  );
}
