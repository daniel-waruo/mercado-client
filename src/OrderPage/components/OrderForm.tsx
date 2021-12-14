import {styled} from "@mui/material/styles";
import StepConnector, {stepConnectorClasses} from "@mui/material/StepConnector";
import {StepIconProps} from "@mui/material/StepIcon";
import React from "react";
import HourglassTopTwoToneIcon from "@mui/icons-material/HourglassTopTwoTone";
import LocalShippingTwoToneIcon from "@mui/icons-material/LocalShippingTwoTone";
import ThumbUpAltTwoToneIcon from "@mui/icons-material/ThumbUpAltTwoTone";
import {Order} from "../../../Types";
import {Box} from "@mui/system";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {Fade, FormControl, Grid} from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone';
import {setOrderStatus, setPaymentMethod, setPaymentStatus} from "../utils";

const ColorLibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    transition: 'background-color 0.2s linear',
  },
}));

const ColorLibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({theme, ownerState}) => ({
  backgroundColor: '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  transition: 'background-color 0.2s linear, transform 0.4s ease-out',
  ...(ownerState.active && {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    transform: 'scale(1.3)'
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
  }),
}));

function ColorLibStepIcon(props: StepIconProps) {
  const {active, completed, className} = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <HourglassTopTwoToneIcon/>,
    2: <LocalShippingTwoToneIcon/>,
    3: <ThumbUpAltTwoToneIcon/>,
  };

  return (
    <ColorLibStepIconRoot ownerState={{completed, active}} className={className}>
      {icons[String(props.icon)]}
    </ColorLibStepIconRoot>
  );
}

const steps = [
  {
    label: 'Processing',
    value: 'prep'
  },
  {
    label: 'In Transit',
    value: 'ship',
  },
  {
    label: 'Delivered',
    value: 'fin',
  },
];

type OrderFormProps = {
  order?: Order,
  setOrder: (order: Order) => void,
  cancelled: boolean
}

const CancelledForm = () => {
  return (
    <Box sx={{textAlign: "center"}}>
      <HighlightOffTwoToneIcon color={'error'} sx={{fontSize: "7rem"}}/>
      <p>
        Order Cancelled !
      </p>
    </Box>
  )
}
const OrderForm = ({order, setOrder, cancelled}: OrderFormProps) => {
  // set stage
  let stage: number;
  switch (order?.status) {
    case 'prep':
      stage = 0;
      break;
    case 'ship':
      stage = 1;
      break;
    case 'fin':
      stage = 2;
      break;
    default:
      stage = 0
  }

  if (!order) return <div style={{height: "150px"}}/>;
  return cancelled ? <CancelledForm/> : (
    <Fade in timeout={1000}>
      <form onSubmit={(e) => e.preventDefault()}>
        <Stack sx={{width: '100%', paddingY: '3rem'}} spacing={4}>
          <Stepper alternativeLabel activeStep={stage} connector={<ColorLibConnector/>}>
            {steps.map(({label, value}, index) => (
              <Step key={label} onClick={(e) => {
                setOrderStatus(order, value).then(
                  () => setOrder({...order, status: value})
                )
              }}>
                <StepLabel StepIconComponent={ColorLibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} md={6}>
            <Box sx={{textAlign: "center"}}>
              <FormControl
                component="fieldset">
                <FormLabel component="legend">Payment Status</FormLabel>
                <RadioGroup
                  defaultValue={order?.payment_status}
                  onChange={
                    (e) => {
                      const paymentStatus = e.target.value as string
                      if (order)
                        setPaymentStatus(order, paymentStatus).then(
                          () => setOrder({...order, payment_status: paymentStatus})
                        )
                    }
                  } row aria-label="payment-status" name="payment-status-group">
                  <FormControlLabel value="pending" control={<Radio/>} label="Pending"/>
                  <FormControlLabel value="success" control={<Radio/>} label="Success"/>
                  <FormControlLabel value="failed" control={<Radio/>} label="Failed"/>
                </RadioGroup>
              </FormControl>
              <div style={{padding: '1rem'}}/>
              <FormControl
                component="fieldset"
                defaultValue={order?.payment_status}
              >
                <FormLabel component="legend">Payment Method</FormLabel>
                <RadioGroup
                  defaultValue={order?.payment_method}
                  onChange={
                    (e) => {
                      const paymentMethod = e.target.value as string
                      if (order)
                        setPaymentMethod(order, paymentMethod).then(
                          () => setOrder({...order, payment_method: paymentMethod})
                        )
                    }
                  }
                  aria-label="payment-method" name="payment-method-group">
                  <FormControlLabel value="m-pesa" control={<Radio/>} label="M Pesa"/>
                  <FormControlLabel value="on-delivery" control={<Radio/>} label="Once Delivered"/>
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fade>
  )
}


export default OrderForm;
