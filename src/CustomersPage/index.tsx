import MainLayout from "../Layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import React, {useEffect, useState} from "react";
import CustomersTable from "./components/CustomersTable";
import AddIcon from "@mui/icons-material/Add";
import CustomerModal from "./components/CustomerModal";
import {Customer, CustomerMetrics} from "../../Types";
import {getInstance} from "../../axios";

const CustomersPage = () => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | undefined>();
  const [metrics, setMetrics] = useState<CustomerMetrics>({
    totalCustomer: 0,
    avgCustomerRevenue: 0,
    conversionRate: 0
  })
  useEffect(() => {
    getInstance().get('customer-metrics').then(
      (response) => {
        console.log(response.data)
        setMetrics(response.data.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }, []);


  return (
    <MainLayout title={'Customers'}>
      <Grid container spacing={2}>
        <CustomerModal
          open={open}
          handleClose={() => {
            setOpen(false)
            setCustomer(undefined)
          }}
          initialCustomer={customer}/>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Total Customers'}
            value={metrics.totalCustomer}
            icon={BarChartIcon}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Avg. Customer Revenue'}
            value={`Ksh ${metrics.avgCustomerRevenue}`}
            icon={ShowChartIcon}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title={'Conversion Rate'}
            value={metrics.conversionRate}
            icon={MoneyOffIcon}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button
                startIcon={<AddIcon/>}
                style={{borderRadius:"1rem"}}
                onClick={() => setOpen(true)}
                variant={'contained'}>
                New Customer
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CustomersTable toggleFunction={(customer) => {
            setOpen(true);
            setCustomer(customer);
          }}/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default CustomersPage;
