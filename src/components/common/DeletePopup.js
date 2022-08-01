import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function DeletePopup(props) {
 console.log("props-----------",props);
 let open = props.open;

 const handleClose = () => {
 };


  return(
    <div>
        <Dialog
        open={props.open}
        onClose={(e) => props.handleClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={(e)=>props.handleClose()}>Cancel</Button>
          <Button onClick={(e)=>props.deleteRecord()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
