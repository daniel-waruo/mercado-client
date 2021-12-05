import MainLayout from "../Layouts/MainLayout";
import React, {useState} from "react";
import OrderModal from "./components/OrderModal";
import {Order} from "../../Types";
import {useRouter} from "next/router";
import {styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import {StepIconProps} from '@mui/material/StepIcon';
import HourglassTopTwoToneIcon from '@mui/icons-material/HourglassTopTwoTone';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ThumbUpAltTwoToneIcon from '@mui/icons-material/ThumbUpAltTwoTone';
import InventoryTable from "./components/InventoryTable";
import {Button, Grid} from "@mui/material";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import {Box} from "@mui/system";

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

const steps = ['Processing', 'In Transit', 'Delivered'];


const OrderPage = () => {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState<Order | undefined>();
  const [stage, setStage] = useState(0)
  const {query: {index}, push} = useRouter();

  return (
    <MainLayout title={'Order'}>
      <Box sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        paddingTop: '1rem',
        paddingBottom: "4rem",
        paddingX: "2rem",
        backgroundColor: 'transparent'
      }}>
        <OrderModal
          order={order}
          handleClose={() => setOpen(false)} open={open}/>
        <Stack sx={{width: '100%', paddingY: '3rem'}} spacing={4}>
          <Stepper alternativeLabel activeStep={stage} connector={<ColorLibConnector/>}>
            {steps.map((label, index) => (
              <Step key={label} onClick={(e) => setStage(index)}>
                <StepLabel StepIconComponent={ColorLibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Stack>
        <Grid container spacing={2} justifyContent={"center"}>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2} justifyContent={"space-between"}>
              <Grid item>
                <Button onClick={
                  () => {
                    if (stage > 0) {
                      setStage(stage - 1)
                    }
                  }
                }
                        startIcon={<ArrowBackIosRoundedIcon/>}>PREV</Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={
                    () => {
                      if (stage < 2) {
                        setStage(stage + 1)
                      }
                    }
                  }
                  endIcon={<ArrowForwardIosRoundedIcon/>}>NEXT</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <InventoryTable toggleFunction={() => {
        }}/>
      </Box>
    </MainLayout>
  )
}


export default OrderPage;
