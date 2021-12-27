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

export const protocolFix = (link: string) => {
  let href = new URL(link);
  const location: Location = document.location
  // make sure there are no mixed protocols
  href.protocol = location.protocol
  return href.toString()
}
