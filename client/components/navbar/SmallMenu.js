import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Menu, MenuItem } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import HomeIcon from "@mui/icons-material/Home";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../auth/authSlice";
import MenuIcon from "@mui/icons-material/Menu";

const SmallMenu = ({ user, handleOpen, logoutAndRedirectHome }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavToProfile = () => {
    if (user.role === "CHEF") {
      navigate(`/users/chefprofile/${user.id}`);
    } else {
      navigate(`/users/memberprofile/${user.id}`);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", () => {
      handleMenuClose();
    });
  }, []);

  // console.log("SMALL MENU ISLOGGEDIN", isLoggedIn);

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon sx={{ color: "whitesmoke" }} />
      </Button>
      <Menu
        id="navbar-small-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        onScroll={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Button
            type="button"
            sx={{ color: "#1b202c" }}
            onClick={() => navigate("/home")}
            startIcon={<HomeIcon />}
          >
            Home
          </Button>
        </MenuItem>

        {user.role === "CHEF" ? null : (
          <MenuItem onClick={handleMenuClose}>
            <Button
              type="button"
              sx={{ color: "#1b202c" }}
              onClick={() => navigate("/chefs")}
              startIcon={<RestaurantIcon />}
            >
              Chefs
            </Button>
          </MenuItem>
        )}

        {isLoggedIn ? (
          <>
            <MenuItem onClick={handleMenuClose}>
              <Button
                type="button"
                onClick={handleNavToProfile}
                startIcon={<AccountCircleIcon />}
                sx={{ color: "#1b202c" }}
              >
                Profile
              </Button>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Button
                type="button"
                sx={{ color: "#1b202c" }}
                onClick={logoutAndRedirectHome}
                startIcon={<LogoutIcon />}
              >
                Logout
              </Button>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={handleMenuClose}>
              <Button
                type="button"
                sx={{ color: "#1b202c" }}
                onClick={() => handleOpen('signup')}
                startIcon={<EmojiEmotionsIcon />}
              >
                Sign Up
              </Button>
            </MenuItem>

            <MenuItem onClick={handleMenuClose}>
              <Button
                type="button"
                sx={{ color: "#1b202c" }}
                onClick={() => handleOpen('login')}
                startIcon={<LoginIcon />}
              >
                Login
              </Button>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default SmallMenu;
