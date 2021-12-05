import React, {useEffect, useState} from "react"
import MainLayout from "../Layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import DashboardCard from "./components/DashboardCard";
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import EarningChart from "./components/EarningChart";
import DashboardCardWide from "./components/DashboardCardWide";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import GroupIcon from '@mui/icons-material/Group';
import CustomerList from "./components/CustomerList";
import ProductSalesTable from "./components/ProductSalesTable";
import PersonIcon from '@mui/icons-material/Person';
import {getInstance} from "../../axios";
import {Metrics} from "../../Types";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";

const HomePage = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    totalRevenue: 0,
    membersOnline: 0,
    todayRevenue: 0,
    totalCost: 0,
    totalCustomers: 0,
    totalProfits: 0,
    totalSales: 0
  })
  useEffect(() => {
    getInstance().get('metrics').then(
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
  return (
    <MainLayout title={'Dashboard'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button variant={'contained'} onClick={() => {
                window.print()
              }}>
                <LocalPrintshopIcon/>
                PRINT DASHBOARD
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DashboardCard
                title={'Total Customers'}
                value={metrics.totalCustomers}
                icon={PersonIcon}/>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard
                title={'Total Sales'}
                value={metrics.totalSales}
                icon={BarChartIcon}/>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard
                title={'Total Profits'}
                value={`Ksh. ${metrics.totalProfits}`}
                icon={ShowChartIcon}/>
            </Grid>
            <Grid item xs={6}>
              <DashboardCard
                title={'Total Cost'}
                value={`Ksh. ${metrics.totalCost}`}
                icon={MoneyOffIcon}/>
            </Grid>
            <Grid item xs={6}>
              <DashboardCardWide icon={GroupIcon} title={'Members Online'} value={metrics.membersOnline}/>
            </Grid>
            <Grid item xs={6}>
              <DashboardCardWide icon={CreditCardIcon} title={"Today's Revenue"}
                                 value={`Ksh. ${metrics.todayRevenue}`}/>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <EarningChart totalRevenue={metrics.totalRevenue}/>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomerList/>
        </Grid>
        <Grid item xs={12} md={9}>
          <ProductSalesTable/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default HomePage;
