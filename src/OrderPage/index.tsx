import MainLayout from "../Layouts/MainLayout";
import React, {useEffect, useState} from "react";
import {Order} from "../../Types";
import {useRouter} from "next/router";
import OrderItemsTable from "./components/OrderItemsTable";
import {Button} from "@mui/material";
import {Box} from "@mui/system";
import {getInstance} from "../../axios";
import OrderForm from "./components/OrderForm";
import {setOrderStatus} from "./utils";


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
  const cancelled = order?.status == "can"
  return (
    <MainLayout title={`Order No. ${order?.id}`}>
      <Box sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        paddingTop: '1rem',
        paddingBottom: "4rem",
        paddingX: "2rem",
        backgroundColor: 'transparent'
      }}>
        <OrderForm order={order} setOrder={setOrder} cancelled={cancelled}/>
        <OrderItemsTable items={order?.items || []}/>
        {cancelled ? null :
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
    </MainLayout>
  )
}


export default OrderPage;
