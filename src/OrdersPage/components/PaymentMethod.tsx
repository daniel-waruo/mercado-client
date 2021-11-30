import React from "react"
import {Chip} from "@mui/material";
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';
import CreditCardTwoToneIcon from '@mui/icons-material/CreditCardTwoTone';

const PaymentMethod = ({status}: { status: 'm-pesa' | 'on-delivery' | string }) => {
  let color: 'secondary' | 'primary' ;
  let label;
  let icon;
  switch (status) {
    case 'm-pesa':
      color = 'secondary';
      label = 'M-pesa'
      icon = <CreditCardTwoToneIcon/>
      break;
    default:
      color = 'primary'
      label = 'On Delivery'
      icon = <LocalAtmTwoToneIcon/>
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

export default PaymentMethod
