import {Order} from "../../Types";
import {getInstance} from "../../axios";
import Router from "next/router";


export const setOrderStatus = async (order: Order, status: string) => {
  await updateOrder({
    ...order,
    status: status
  })
}

export const setPaymentStatus = async (order: Order, status: string) => {
  await updateOrder({
    ...order,
    payment_status: status
  })
}
export const setPaymentMethod = async (order: Order, method: string) => {
  await updateOrder({
    ...order,
    payment_method: method
  })
}
export const updateOrder = async (order: Order) => {
  getInstance().put(`orders/${order.id}/`, order).then(
    (response) => {
      //Router.reload();
    }
  )
  return order
}
