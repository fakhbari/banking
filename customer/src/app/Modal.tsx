import * as React from 'react';
import {TextField, Modal, Box, Typography, Button} from "@mui/material";
import styles from './Modal.module.css';
import {useEffect} from "react";

export interface modalData {
  name:string;
  family:string;
  nationalCode:string;
  onSubmit:()=>void
}

interface Iprops{
  openModal:boolean;
  closeModal:()=>void;
  modalData:modalData;
}

export default function CustomerModal(props:Iprops) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    props.closeModal()
    setOpen(false)
  };

  useEffect(()=>{
    if(props.openModal){
      handleOpen()
    }
      },[props.openModal])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modalContainer}>
        <Typography className={styles['m-b-10']}> Customer Information : </Typography>
        <TextField
          required
          id="name"
          label="Name"
          size="small"
          margin="dense"
          value={props.modalData && props.modalData.name}
        />
        <TextField
          required
          id="family"
          label="Family"
          size="small"
          margin="dense"
          value={props.modalData && props.modalData.family}
        />
        <TextField
          required
          id="nationalCode"
          label="National Code"
          type="number"
          size="small"
          margin="dense"
          value={props.modalData && props.modalData.nationalCode}
        />
        <Button variant="contained" fullWidth={true} onClick={props.modalData.onSubmit}>Submit</Button>
      </Box>
    </Modal>
  );
}
