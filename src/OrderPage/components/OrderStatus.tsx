import React from "react"
import {Chip} from "@mui/material";
import LocalShippingTwoTone from '@mui/icons-material/LocalShippingTwoTone';
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

const OrderStatus = ({status}: { status: 'fin' | 'prep' | 'ship' | 'can' | string }) => {
  let color: 'warning' | 'info' | 'success' | 'error';
  let label;
  let icon;
  switch (status) {
    case 'prep':
      color = "warning";
      label = 'Preparing'
      icon = <PendingTwoToneIcon/>
      break;
    case 'ship':
      color = 'info';
      label = 'On Transit'
      icon = <LocalShippingTwoTone/>
      break;
    case 'fin':
      color = 'success';
      label = 'Delivered'
      icon = <CheckCircleTwoToneIcon/>
      break;
    default:
      color = 'error'
      label = 'Cancelled'
      icon = <CancelTwoToneIcon/>
  }
  return (
    <>
      <Chip label={label}
            icon={icon}
            variant={'outlined'}
            color={color}
            sx={{
              paddingX: '0.5rem',
            }}/>
    </>
  )
}

export default OrderStatus
