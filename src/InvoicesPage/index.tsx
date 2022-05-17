import MainLayout from "../Layouts/MainLayout";
import {Button, Card, Grid} from "@mui/material";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import React, {useEffect, useState} from "react";
import InvoicesTable from "./components/InvoicesTable";
import {DashboardMetrics, Invoice, Order} from "../../Types";
import {getInstance} from "../../axios";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import {AddTwoTone as AddIcon} from "@mui/icons-material";
import AddInvoiceModal from "./components/AddInvoiceModal";
import TimelapseTwoToneIcon from '@mui/icons-material/TimelapseTwoTone';
import PriorityHighTwoToneIcon from '@mui/icons-material/PriorityHighTwoTone';
import MonetizationOnTwoToneIcon from '@mui/icons-material/MonetizationOnTwoTone';
import InvoiceModal from "./components/InvoiceModal";

const InvoicesPage = () => {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);

  const [invoice, setInvoice] = useState<Invoice | undefined>();
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
      color = '#4caf50';
      break;
    case 2:
      color = '#ff0000';
      break;
    default:
      color = '#000000'
  }
  const toggleFunction = (order: Order) => {
    setInvoice(order)
    setOpen(true)
  }
  return (
    <MainLayout title={'Invoices'}>
      <Grid container spacing={2}>
        <InvoiceModal
          order={invoice}
          handleClose={() => setOpen(false)} open={open}/>
        <AddInvoiceModal
          open={openNew}
          handleClose={() => setOpenNew(false)}/>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Total Invoices'}
            value={metrics.totalOrders}
            icon={MonetizationOnTwoToneIcon}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Pending Invoices'}
            value={metrics.totalOrders}
            icon={TimelapseTwoToneIcon}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title={'Overdue Invoices'}
            value={metrics.totalOrders}
            icon={PriorityHighTwoToneIcon}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item>
              <Button
                style={{borderRadius: "1rem"}}
                startIcon={<AddIcon/>}
                onClick={() => {
                  setOpenNew(true)
                }}
                variant={'contained'}>

                Create Invoice
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
                      push('/invoices?index=' + newValue, '/invoices?index=' + newValue, {scroll: false}).then(
                        (data) => {
                          console.log("go to orders tab")
                        }
                      )
                    }
                  } aria-label="Invoice Tabs">
                  <Tab label="Pending" {...a11yProps(0)} />
                  <Tab label="Paid" {...a11yProps(1)} />
                  <Tab label="OverDue" {...a11yProps(2)} />
                  <Tab label="All" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <InvoicesTable
                  status={'pending'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <InvoicesTable
                  status={'success'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <InvoicesTable
                  status={'overdue'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <InvoicesTable
                  status={'cancelled'}
                  toggleFunction={toggleFunction}/>
              </TabPanel>
              <TabPanel value={value} index={4}>
                <InvoicesTable
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

export default InvoicesPage;
