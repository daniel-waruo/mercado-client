import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Grid, lighten, Typography} from "@mui/material";
import {Box} from "@mui/system";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import {Customer, Product} from "../../../Types";

type DashboardCardProps = {
  customer:Customer,
  setCustomer: (customer:Customer) => void
  selected: boolean
}

function CustomerCard({customer,setCustomer,selected}: DashboardCardProps) {
  return (
    <Card
      onClick={() => {
        if (!selected)
          setCustomer(customer)
      }}
      sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        height: '100%',
        padding: "1rem"
      }}>
      <CardContent>
        <Box>
          <Grid container>
            <Grid item xs={11} >
              <Box sx={{padding: '1rem'}}>
                <Typography fontWeight={'light'} fontSize={20}>{customer.name}</Typography>
                <Typography fontWeight={200} fontSize={10}>{customer.phone}</Typography>
              </Box>
            </Grid>
            <Grid item xs={1} >
              <div style={{position: 'relative', height: '3rem'}}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '1.2rem',
                    right: '0',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'primary.light',
                    borderRadius: '100%',
                    height: '2.8rem',
                    width: '2.8rem',
                    textAlign: 'center',
                  }}
                >
                  <CheckCircleTwoToneIcon sx={{
                    height: '100%',
                    width: '100%',
                    padding: '9px',
                    color: lighten('#9b7ddf', selected ? 0 : 0.6)
                  }}/>
                </Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}


export default CustomerCard;
