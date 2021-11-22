import MainLayout from "../Layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import React, {useEffect, useState} from "react";
import OrdersTable from "./components/OrdersTable";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaidIcon from '@mui/icons-material/Paid';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import OrderModal from "./components/OrderModal";
import {DashboardMetrics, Order} from "../../Types";
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import {getInstance} from "../../axios";

const OrdersPage = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<Order | undefined>();
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalOrders: 0,
    avgOrderValue: 0,
    orderCancelRate: 0
  })
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
  return (
    <MainLayout title={'Orders'}>
      <Grid container spacing={2}>
        <OrderModal
          order={order}
          handleClose={() => setOpen(false)} open={open}/>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button variant={'contained'}
                      onClick={() => {
                        window.print()
                      }}>
                <LocalPrintshopIcon/>
                Order Report
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Total Orders'}
            value={metrics.totalOrders}
            icon={LocalShippingIcon}/>
        </Grid>
        <Grid item xs={6} md={4}>
          <DashboardCard
            title={'Average Order Value'}
            value={'Ksh. '+metrics.avgOrderValue}
            icon={PaidIcon}/>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard
            title={'Order Cancel Rate'}
            value={metrics.orderCancelRate+'%'}
            icon={ErrorOutlineIcon}/>
        </Grid>
        <Grid item xs={12} textAlign={'right'}>
          <OrdersTable
            toggleFunction={(order: Order) => {
              setOrder(order)
              setOpen(true)
            }}/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default OrdersPage;
