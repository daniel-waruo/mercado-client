import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Grid, Typography} from "@mui/material";
import {Box} from "@mui/system";
import {SvgIconProps} from "@mui/material/SvgIcon/SvgIcon";

type DashboardCardProps = {
  icon: React.FC<SvgIconProps>,
  title: string,
}

function OrganizationCard({icon: Icon, title}: DashboardCardProps) {
  return (
    <Box sx={{
      padding: '0.5rem'
    }}>
      <Card sx={{
        minWidth: '100%',
        borderRadius: '1rem',
        height: '100%',
      }}>
        <CardContent>
          <Box sx={{padding: '0.5rem'}}>
            <Grid container>
              <Grid item xs={12}>
                <div style={{position: 'relative', height: '3rem'}}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      right: 'calc(50% - 1.4rem)',
                      marginLeft: '-100rem',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'primary.light',
                      borderRadius: '100%',
                      height: '2.8rem',
                      width: '2.8rem',
                      textAlign: 'center',
                    }}
                  >
                    <Icon
                      sx={{
                        textAlign: 'center',
                        height: '100%',
                        width: '100%',
                        padding: '9px',
                        color: 'primary.main'
                      }}/>
                  </Box>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{paddingLeft: '0.19rem'}}>
                  <Typography textAlign={'center'} fontSize={24}>{title}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


export default OrganizationCard;
