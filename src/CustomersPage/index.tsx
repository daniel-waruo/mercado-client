import MainLayout from "../Layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import React, {useState} from "react";
import CustomersTable from "./components/CustomersTable";
import AddIcon from "@mui/icons-material/Add";
import CustomerModal from "./components/CustomerModal";
import {Customer} from "../../Types";

const CustomersPage = () => {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<Customer | undefined>();
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
            value={'140'}
            icon={BarChartIcon}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Avg. Customer Revenue'}
            value={'Ksh 150'}
            icon={ShowChartIcon}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title={'New Customers'}
            value={'15'}
            icon={MoneyOffIcon}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button onClick={() => setOpen(true)} variant={'contained'}>
                <AddIcon/>
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
