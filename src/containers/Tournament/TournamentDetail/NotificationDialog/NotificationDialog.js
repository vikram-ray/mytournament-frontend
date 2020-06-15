import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';

export default function FormDialog({isOpen, handleSubmit, modalToggler}) {
    const [message, setMessage] = React.useState('');
    const [sms, setSms] = React.useState(false);
  return (
    <div>
      <Dialog open={isOpen} onClose={modalToggler} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Send Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Notification will be sent to registered users in their mytournament account with your username. Additionally, If you want to send text-message notification to your participants,
             please tick the checkbox below. Using bad language in message will result termination of your account.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="message"
            label="Message"
            placeholder='Notification for the registered users'
            fullWidth
            value={message}
            onChange={e=>setMessage(e.target.value.substring(0,100))}
          />
          <Checkbox
            checked={sms}
            size="small"
            value="SMS"
            disabled={true}
            onChange={e=>setSms(!sms)}
            inputProps={{ 'aria-label': 'send sms' }}
        />
        {/* SMS (sms-credit will be used if available) */}
        Mobile text message will be available after 10 January
        </DialogContent>
        <DialogActions>
          <Button onClick={modalToggler} color="primary">
            Cancel
          </Button>
          <Button onClick={e=>handleSubmit(message, sms)} color="primary">
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
