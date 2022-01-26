import MainLayout from "../Layouts/MainLayout";
import {Button, Card, Grid} from "@mui/material";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import React, {useEffect, useState} from "react";
import OrdersTable from "./components/OrdersTable";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import OrderModal from "./components/OrderModal";
import {DashboardMetrics, Order} from "../../Types";

import {getInstance} from "../../axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import {AddTwoTone as AddIcon, SettingsTwoTone as SettingsIcon} from "@mui/icons-material";
import AddOrderModal from "./components/AddOrderModal";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [order, setOrder] = useState<Order | undefined>();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalOrders: 0,
    avgOrderValue: 0,
    orderCancelRate: 0
  })
  const {query: {index}, push} = useRouter();

  const value = Number.parseInt(index as string) || 0;

  useEffect(() => {
    getInstance().get('order-metrics').then(
      (response) => {
        console.log(response.data)
        setMetrics(response.data.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }, [getInstance, setMetrics]);
  let color;
  switch (value) {
    case 0:
      color = '#ff9800';
      break;
    case 1:
      color = '#03a9f4';
      break;
    case 2:
      color = '#4caf50';
      break;
    case 3:
      color = '#ff0000';
      break;
    default:
      color = '#000000'
  }
  const toggleFunction = (order: Order) => {
    setOrder(order)
    setOpen(true)
  }
  return (
    <MainLayout title={'Orders'}>
      <Grid container spacing={2}>
        <OrderModal
          order={order}
          handleClose={() => setOpen(false)} open={open}/>
        <AddOrderModal
          open={openNew}
          handleClose={() => setOpenNew(false)} />
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Total Orders'}
            value={metrics.totalOrders}
            icon={LocalShippingIcon}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Average Order Value'}
            value={'Ksh. ' + metrics.avgOrderValue}
            icon={PaidIcon}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title={'Order Cancel Rate'}
            value={metrics.orderCancelRate + '%'}
            icon={ErrorOutlineIcon}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                style={{
                  borderRadius: "1rem"
                }}
                startIcon={<AddIcon/>}
                onClick={() => {
                  setOpenNew(true)
                }} variant={'contained'}>

                Add Product
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} textAlign={'right'}>
          <Box sx={{width: '100%'}}>
            <Card sx={{
              minWidth: '100%',
              borderRadius: '1rem',
              padding: '1rem'
            }}>
              <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs
                  variant="scrollable"
                  TabIndicatorProps={{style: {backgroundColor: color}}}
                  sx={{'& .Mui-selected': {color: `${color}!important`}, overflow: "auto", width: "auto"}}
                  value={value}
                  onChange={
                    (event: React.SyntheticEvent, newValue: number) => {
                      push('/orders?index=' + newValue, '/orders?index=' + newValue, {scroll: false}).then(
                        (data) => {
                          console.log("go to orders tab")
                        }
                      )
                    }
                  } aria-label="Order Tabs">
                  <Tab label="Pending" {...a11yProps(0)} />
                  <Tab label="On-Transit" {...a11yProps(1)} />
                  <Tab label="Delivered" {...a11yProps(2)} />
                  <Tab label="Cancelled" {...a11yProps(3)} />
                  <Tab label="All" {...a11yProps(4)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <OrdersTable
                  status={'prep'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <OrdersTable
                  status={'ship'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <OrdersTable
                  status={'fin'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <OrdersTable
                  status={'can'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <OrdersTable
                  toggleFunction={toggleFunction}/>
              </TabPanel>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default OrdersPage;
