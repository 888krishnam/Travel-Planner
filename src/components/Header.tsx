import { useState, useEffect, useCallback } from "react";
import { Button, Popper, MenuItem, MenuList, Paper, Avatar, ClickAwayListener } from "@mui/material";
import Login from "./Login";
import { User } from "../types/Interface";
import ConfirmationDialog from "./ConfirmationDialog";

function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const parsedUser: User = JSON.parse(userString);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        setUser(null);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    window.location.reload();
  };

  const handleOpenLogoutConfirm = () => {
    handleClose(new MouseEvent('click'));
    setLogoutConfirmOpen(true);
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setLogoutConfirmOpen(false);
    window.location.reload();
  };

  const handleClose = useCallback((event: MouseEvent | TouchEvent): void => {
    if (anchorEl && anchorEl.contains(event.target as Node)) {
      return;
    }
    setAnchorEl(null);
  }, [anchorEl]);

  useEffect(() => {
    const handleScroll = () => {
      if (anchorEl) {
        handleClose(new MouseEvent('scroll'));
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [anchorEl, handleClose]);

  return (
    <div className="header-container flex justify-between items-center p-4 bg-head">
      <h1 onClick={() => window.location.href = "/"} className="text-2xl font-bold cursor-pointer hover:scale-105">Travel Planner</h1>
      {isAuthenticated ? (
        <div className="flex items-center gap-3">
          <Button
            onClick={() => window.location.href = "/visited"}
            variant="outlined"
            color="inherit"
            className="hover:scale-105"
          >
            Voyaged
          </Button>
          <Button
            onClick={() => window.location.href = "/create"}
            variant="outlined"
            color="inherit"
            className="hover:scale-105"
          >
            + Add Trip
          </Button>
          <Button
            onClick={() => window.location.href = "/history"}
            variant="outlined"
            color="inherit"
            className="hover:scale-105"
          >
            My Trips
          </Button>
          <Avatar
            className="cursor-pointer hover:scale-110"
            onClick={handleMenuClick}
            src={`${user?.picture}`}
            alt="U"
          />
          <ClickAwayListener onClickAway={handleClose}>
            <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} placement="bottom-end">
              <Paper>
                <MenuList>
                  <MenuItem onClick={handleOpenLogoutConfirm}>
                    Log Out
                  </MenuItem>
                </MenuList>
              </Paper>
            </Popper>
          </ClickAwayListener>
        </div>
      ) : (
        <Button variant="contained" onClick={() => setDialogOpen(true)} className="ml-auto">
          Sign In
        </Button>
      )}

      <Login
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
      <ConfirmationDialog 
        confirmOpen = {logoutConfirmOpen} 
        title="Travel Planner" 
        content="Are you sure you want to Logout?" 
        action="Log Out" 
        confirm={handleConfirmLogout}
        cancel={() => setLogoutConfirmOpen(false)}
      />
    </div>
  );
}

export default Header;