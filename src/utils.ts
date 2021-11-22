import {getInstance} from "../axios";
import Router from 'next/router';

export const deleteItems = (item: string, itemId: number) => {
  getInstance().delete(`${item}/${itemId}/`).then(
    (response) => {
      Router.reload()
    }
  ).catch(
    (error) => {
      console.error(error)
    }
  )
}
