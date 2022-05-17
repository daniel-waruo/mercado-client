import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {CardMedia, Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";

type DashboardCardProps = {}

function OrganizationDetailCard({}: DashboardCardProps) {
  return (
    <Box sx={{
      paddingX: '0.5rem',
      paddingY:'1rem'
    }}>
      <Card sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        height: '100%',
      }}>
        <CardContent>
          <Box sx={{padding: '0.5rem'}}>
            <Grid container>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  height="140"
                  image="/logo.png"
                  alt="green iguana"
                />
              </Grid>
              <Grid item xs={8}>
                <Box sx={{paddingLeft: '0.19rem'}}>
                  <Typography  fontSize={24}>Makinika Tech</Typography>
                  <Typography  color={'primary.dark'} fontSize={16}>
                    Manage all your business functions below.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


export default OrganizationDetailCard;
