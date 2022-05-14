import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, Grid, lighten, Typography} from "@mui/material";
import {Box} from "@mui/system";
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import {Product} from "../../../Types";
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';

type DashboardCardProps = {
  product: Product
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  selected: boolean
}


export default function ProductCard({product, addToCart, removeFromCart, selected}: DashboardCardProps) {
  return (
    <Card
      onClick={() => {
        if (!selected) {
          addToCart(product)
        } else
          removeFromCart(product)
      }}
      sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        height: '100%',
        paddingY: "1rem"
      }}>
      <CardContent sx={{position: 'relative'}}>
        <Grid container justifyContent={'center'}>
          <Grid item>
            <Avatar
              sx={{
                width: '6rem',
                height: '6rem',
                fontSize:'2rem',
                backgroundColor: 'primary.main'
              }}
              alt={product.name}
              src={product.image}>
              <LocalMallTwoToneIcon fontSize={'inherit'}/>
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{paddingY: '1rem'}}>
              <Typography fontWeight={'light'} fontSize={14}>{product.name}</Typography>
              <Typography fontWeight={1000} fontSize={18}>Ksh.{product.price}</Typography>
            </Box>
          </Grid>
        </Grid>
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
      </CardContent>
    </Card>
  );
}
