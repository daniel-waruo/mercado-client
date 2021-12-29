import MainLayout from "../Layouts/MainLayout";
import React, {useEffect, useState} from "react";
import {Order} from "../../Types";
import {useRouter} from "next/router";
import OrderItemsTable from "./components/OrderItemsTable";
import {Button, Card, CardActionArea, CardActions, CardContent, Chip, Grid, lighten, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {getInstance} from "../../axios";
import OrderForm from "./components/OrderForm";
import {setOrderStatus} from "./utils";
import LoadingPage from "../LoadingPage";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import StoreIcon from "@mui/icons-material/Store";
import MapIcon from "@mui/icons-material/Map";

const OrderPage = () => {
  const [order, setOrder] = useState<Order | undefined>();
  const {query: {id}} = useRouter();
  useEffect(() => {
    let url = `orders/${id}`
    getInstance().get(url).then(
      (response) => {
        const data: Order = response.data
        setOrder(data)
        data.status
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [id]);
  const canCancel = order?.status != "can" && order?.status != "fin"
  return (
    <MainLayout title={`Order No.  ${order?.id || ""}`}>
      {!order ? <LoadingPage/> :
        <Box sx={{
          minWidth: '100%',
          borderRadius: '1rem',
          paddingTop: '1rem',
          paddingBottom: "4rem",
          paddingX: "2rem",
          backgroundColor: 'transparent'
        }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={9} alignItems={"center"}>

              <OrderForm order={order} setOrder={setOrder}
                         cancelled={order.status == "can"}
                         delivered={order.status == "fin"}/>
              <OrderItemsTable items={order?.items || []}/>
            </Grid>
            <Grid item xs={12} md={3} alignItems={"center"}>

              <Card sx={{
                padding: "1.5rem",
                paddingBottom: "0.5rem",
                borderRadius: "1rem",
                backgroundColor: lighten('#f5f6fa', 0.4)
              }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {order.buyer?.name || "Unknown"}
                    </Typography>
                    <Typography fontWeight={'light'} gutterBottom variant="h6" component="div">
                      Customer Details
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <LocalPhoneIcon sx={{fontSize: "1rem"}}/><span
                      style={{marginLeft: "2rem", lineHeight: "1rem"}}>{order.buyer?.phone || "Unknown"}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <StoreIcon sx={{fontSize: "1rem"}}/><span
                      style={{marginLeft: "2rem", lineHeight: "1rem"}}>{order.buyer?.businessName || "Unknown"}</span>
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <MapIcon sx={{fontSize: "1rem"}}/><span
                      style={{marginLeft: "2rem", lineHeight: "1rem"}}>{order.buyer?.location || "Unknown"}</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button startIcon={<LocalPhoneIcon/>}
                          href={`tel:+${order.buyer?.phone}`}
                          variant={"outlined"}
                          sx={{borderRadius: "0.75rem"}}
                          color="primary">
                    Call
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          {!canCancel ? null :
            <Box sx={{textAlign: "center", paddingY: "3rem"}}>
              <Button color="error"
                      variant={"outlined"}
                      onClick={
                        () => {
                          if (order)
                            setOrderStatus(order, "can").then(
                              () => setOrder({...order, status: "can"})
                            )
                        }
                      }
                      sx={{borderRadius: "1rem"}}>
                Cancel Order
              </Button>
            </Box>
          }
        </Box>
      }
    </MainLayout>
  )
}


export default OrderPage;
