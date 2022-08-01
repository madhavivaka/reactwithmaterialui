import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HotelIcon from '@mui/icons-material/Hotel';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import DashBoard from './DashBoard';
import UsersList from './UsersList';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/countryActions';
import { useDispatch } from "react-redux";





const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const MenuBar = (props: Props) => {
    
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const hotelsHandler = (e) => {
    navigate("/dashBoard");
  }

  const usersHandler = (e) =>{
    navigate("/users");
  }

  const dispatch = useDispatch();
  const logOutHandler = (e) =>{
    dispatch(logout({
    }));
    navigate("/");
  }

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <IconButton name="details" onClick={(e) => hotelsHandler(e)}>
                    <HotelIcon />
                </IconButton> 
              </ListItemIcon>
              <ListItemText primary='Hotel' onClick={(e) => hotelsHandler(e)}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <IconButton name="details" onClick={(e) => usersHandler(e)}>
                    <SupervisedUserCircleIcon />
                </IconButton> 
              </ListItemIcon>
              <ListItemText primary='Users' onClick={(e) => usersHandler(e)}/>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <IconButton name="details" onClick={(e) => logOutHandler(e)}>
                    <LogoutIcon />
                </IconButton> 
              </ListItemIcon>
              <ListItemText primary='Log out' onClick={(e) => logOutHandler(e)}/>
            </ListItemButton>
          </ListItem>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            HCA(Hotels Content API)
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}


export default MenuBar;
