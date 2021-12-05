import React from "react"
import {Chip} from "@mui/material";
import PendingTwoToneIcon from '@mui/icons-material/PendingTwoTone';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone';

const PaymentStatus = ({status}: { status: 'pending' | 'success' | 'failed' | string }) => {
  let color: 'warning' | 'success' | 'error';
  let label;
  let icon;
  switch (status) {
    case 'pending':
      color = "warning";
      label = 'Pending'
      icon = <PendingTwoToneIcon/>
      break;
    case 'success':
      color = 'success';
      label = 'Successful'
      icon = <CheckCircleTwoToneIcon/>
      break;
    default:
      color = 'error'
      label = 'Failed'
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

export default PaymentStatus
