import React, {ReactChild, ReactChildren, useEffect} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import NavBar from "../NavBar";
import {Avatar} from "@mui/material";
import Link from "next/link"
import {getInstance} from "../../axios";
import Router from "next/router";

const drawerWidth = 200;

type MainProps = {
  title: string
  children?: ReactChildren | ReactChild
  window?: () => Window;
}
type SideBarItemProps = {
  text: string,
  href: string,
  iconComponent: React.FC
}
const SideBarItem = ({text, href, iconComponent: IconComponent}: SideBarItemProps) => {
  return (
    <Link href={href}>
      <ListItem component={'a'} button sx={{
        borderRadius: '1rem'
      }}>
        <ListItemIcon>
          <IconComponent/>
        </ListItemIcon>
        <ListItemText primary={text}/>
      </ListItem>
    </Link>
  )

}
const SideBar = () => {
  return (
    <Box border={'none'} sx={{backgroundColor: 'primary.light', height: '100%', paddingLeft: '1rem'}}>
      <div style={{paddingTop: 30, paddingBottom: 10}}>
        <Avatar
          alt="Patterns Logo"
          src="/logo.png"
          variant={'rounded'}
          sx={{
            width: 150,
            height: 150,
            margin: 'auto',
            backgroundColor: 'black',
          }}
        />
      </div>
      <List>
        <SideBarItem href={'/'} text={'Dashboard'} iconComponent={DashboardIcon}/>
        <SideBarItem href={'/orders'} text={'Orders'} iconComponent={InboxIcon}/>
        <SideBarItem href={'/customers'} text={'Customers'} iconComponent={PeopleOutlineSharpIcon}/>
        <SideBarItem href={'/inventory'} text={'Inventory'} iconComponent={Inventory2SharpIcon}/>
      </List>
    </Box>
  )
}

const MainLayout = ({window, title, children}: MainProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  useEffect(() => {
    getInstance().get('user').then(
      (response) => {
       setLoggedIn(true)
      }
    ).catch(
      (error) => {
        Router.push('/login').then(r => {
          console.log('Redirected to Login Page')
        })
      }
    )
  }, [ setLoggedIn]);

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{display: 'flex', backgroundColor: 'transparent'}}>
      <NavBar title={title} handleDrawerToggle={handleDrawerToggle}/>
      <Box
        component="nav"
        sx={{
          width: {
            sm: drawerWidth
          },
          flexShrink: {
            sm: 0
          }
        }}
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
            display: {xs: 'block', sm: 'none'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
          }}
        >
          <SideBar/>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            border: 'none',
            display: {xs: 'none', sm: 'block'},
            '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth, border: 'none'},
          }}
          open
        >
          <SideBar/>
        </Drawer>
      </Box>
      <Box component="main" sx={{
        flexGrow: 1, p: 3, width: {xs: `calc(100% - ${drawerWidth}px)`},
        minHeight: '100vh',
        height: '100%',
        backgroundColor: 'primary.light',
        paddingRight: '1rem'
      }}>
        <Toolbar/>
        {loggedIn ? children : null}
      </Box>
    </Box>
  );
}

export default MainLayout;
