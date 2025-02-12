import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { toast } from 'react-toastify';
import ConfirmationDialog from '../../components/ConfirmationDialog';

interface DeleteTripProps {
  tripId: string | undefined;
}

export default function DeleteTrip({ tripId }: DeleteTripProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConfirmOpen = () => {
    handleMenuClose();
    setConfirmOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (tripId) {
        await deleteDoc(doc(db, 'trips', tripId));
        toast.success("Trip deleted successfully");
        setConfirmOpen(false);
        window.location.reload();
      } else {
        toast.error("Trip ID is undefined");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete trip");
    }
  };

  return (
    <>
      <div className="absolute bottom-2 right-0.5">
        <IconButton onClick={handleMenuOpen} size="small">
          <MoreVertIcon fontSize="inherit" />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <MenuItem onClick={handleConfirmOpen} >Delete trip</MenuItem>
        </Menu>
      </div>
      <div className='bg-head'>
        <ConfirmationDialog
          confirmOpen = {confirmOpen}
          title="Confirm Deletion"
          content="Are you sure you want to delete this trip?"
          action="Delete"
          confirm = {handleDeleteConfirmed}
          cancel={() => setConfirmOpen(false)}
        />
      </div>
    </>
  );
}