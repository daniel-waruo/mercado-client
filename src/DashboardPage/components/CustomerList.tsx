import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import {Card, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {getInstance} from "../../../axios";
import {Customer} from "../../../Types";


export default function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>()
  useEffect(() => {
    getInstance().get(`top-five-customers`).then(
      (response) => {
        setCustomers(response.data.data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setCustomers]);

  return (
    <Card sx={{
      minWidth: '100%',
      borderRadius: '1rem',
      padding:'1rem'
    }}>
      <Typography paddingLeft={'1rem'} variant={'h5'}>
        Top Customers
      </Typography>
      <List>
        {
          customers?.map(
            ({id, name, phone, imageSrc}) => {
              return (
                <ListItem alignItems="flex-start" key={id}>
                  <ListItemAvatar>
                    <Avatar alt={name as string} src={imageSrc}/>
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={phone}
                  />
                </ListItem>
              )
            }
          )
        }

      </List>
    </Card>
  );
}
