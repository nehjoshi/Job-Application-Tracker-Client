import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

interface Props {
    open: boolean,
    handleClose: () => void,
    deleteApplication: () => void,
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '40%',
  bgcolor: 'background.paper',
  border: "1px solid transparent",
  boxShadow: 24,
  p: 4,
};

export const DeleteModal: React.FC<Props> = ({open, handleClose, deleteApplication}) => {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <b>Are you sure you want to delete this application?</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Once your application is deleted, it can no longer be recovered.
          </Typography>
          <Button onClick={deleteApplication} style={{margin: '10px auto', display: 'block'}} variant='contained' color='error'>Delete Application</Button>
        </Box>
      </Modal>
    </div>
  );
}
