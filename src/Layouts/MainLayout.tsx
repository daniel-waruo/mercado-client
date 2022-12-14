import React, {ReactChild, ReactChildren, useEffect} from "react";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CorporateFareTwoToneIcon from '@mui/icons-material/CorporateFareTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleOutlineSharpIcon from '@mui/icons-material/PeopleOutlineSharp';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import StoreTwoToneIcon from '@mui/icons-material/StoreTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import MoneyOffCsredTwoToneIcon from '@mui/icons-material/MoneyOffCsredTwoTone';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import NavBar from "../NavBar";
import {Avatar, Fade} from "@mui/material";
import Link from "next/link"
import {getInstance} from "../../axios";
import Router, {useRouter} from "next/router";
import {createTheme} from "@mui/system";

const drawerWidth = 250;

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

const theme = createTheme({
  components: {},
});

export const SideBarItem = ({text, href, iconComponent: IconComponent}: SideBarItemProps) => {
  const {pathname} = useRouter();
  return (
    <Link href={href}>
      <ListItem component={'a'}
                button
                sx={{
                  overflow: "auto",
                  width: "auto",
                  borderRadius: '1rem'
                }}
                selected={pathname === href}>
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
      <Box sx={{
        marginTop: "30px",
        marginBottom: "10px",
        marginX: "auto",
        height: 150,
        width: 150,
        borderRadius: "1rem",
        background: "white"
      }}>
        <Fade in={true} timeout={1000}>
          <Avatar
            alt="Patterns Logo"
            src="/logo.png"
            variant={'rounded'}
            sx={{
              width: 150,
              height: 150,
              marginX: 'auto',
              backgroundColor: 'white',
              borderRadius: "1rem",
            }}
          />
        </Fade>
      </Box>
      <List sx={{marginRight: "1.5rem"}}>
        <SideBarItem href={'/'} text={'Dashboard'} iconComponent={DashboardIcon}/>
        <SideBarItem href={'/customers'} text={'Customers'} iconComponent={PeopleOutlineSharpIcon}/>
        <SideBarItem href={'/orders'} text={'Orders'} iconComponent={ShoppingCartTwoToneIcon}/>
        <SideBarItem href={'/invoices'} text={'Invoices'} iconComponent={AttachMoneyOutlinedIcon}/>
        <SideBarItem href={'/expenses'} text={'Expenses'} iconComponent={MoneyOffCsredTwoToneIcon}/>
        <SideBarItem href={'/suppliers'} text={'Suppliers'} iconComponent={StoreTwoToneIcon}/>
        <SideBarItem href={'/shipments'} text={'Shipments'} iconComponent={LocalShippingTwoToneIcon}/>
        <SideBarItem href={'/inventory'} text={'Inventory'} iconComponent={Inventory2SharpIcon}/>
        <SideBarItem href={'/organization'} text={'Organization'} iconComponent={CorporateFareTwoToneIcon}/>
        <SideBarItem href={'/users'} text={'Users'} iconComponent={PeopleOutlineTwoToneIcon}/>
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
  }, [setLoggedIn]);

  const container = window !== undefined ? () => window().document.body : undefined;
  return (
    <Box sx={{display: 'flex', backgroundColor: 'transparent', width: '100%'}}>
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
