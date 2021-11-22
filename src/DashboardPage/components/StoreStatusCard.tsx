import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Grid, Icon, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {SvgIconProps} from "@mui/material/SvgIcon/SvgIcon";

type DashboardCardProps = {
  icon: React.FC<SvgIconProps>,
  title: string,
  value: string | number
}


export default function StoreStatusCard({icon: Icon, title, value}: DashboardCardProps) {
  return (
    <Card sx={{
      minWidth: '100%',
      borderRadius: '1rem',
      backgroundColor:'primary'
    }}>
      <CardContent>
        <Box sx={{padding: '0.7rem'}}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div style={{position: 'relative', height: '3rem'}}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'primary.light',
                    borderRadius: '100%',
                    height: '2.8rem',
                    width: '2.8rem',
                    textAlign: 'center'
                  }}
                >
                  <Icon sx={{height: '100%', width: '100%', padding: '9px', color: 'primary.main'}}/>
                </Box>
              </div>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{paddingLeft: '0.2rem'}}>
                <Typography fontWeight={'light'} fontSize={12}>{title}</Typography>
                <Typography fontWeight={1000} fontSize={20}>{value}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
}
