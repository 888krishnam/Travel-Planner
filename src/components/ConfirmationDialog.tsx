import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'

function ConfirmationDialog( {confirmOpen, title, content, action, confirm, cancel}: {confirmOpen : boolean, title: string, content: string, action: string, confirm: () => void, cancel: () => void} ) {

  return (
    <Dialog open={confirmOpen} onClose={cancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {content}
    </DialogContent>
    <DialogActions>
      <Button onClick={cancel}>Cancel</Button>
      <Button color="error" onClick={confirm}>{action}</Button>
    </DialogActions>
  </Dialog>
  )
}

export default ConfirmationDialog