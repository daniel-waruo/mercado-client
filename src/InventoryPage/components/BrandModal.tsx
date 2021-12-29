import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button, Grid, IconButton, ListItem, TextField, Typography} from "@mui/material";
import {getInstance} from "../../../axios";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import {deleteItems} from "../../utils";
import Router from "next/router";

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  minWidth: 300,
  overflow: 'auto',
  maxHeight: '95vh',
  backgroundColor: 'primary.light',
  boxShadow: 24,
  p: 4,
  borderRadius: '1rem',

};


type ModalProps = {
  open: boolean,
  handleClose: () => void,
}

function BrandModal({open, handleClose}: ModalProps) {
  const [brands, setBrands] = useState<{ id: number, name: string }[]>([]);
  const [name, setName] = useState<string>()

  useEffect(
    () => {
      // get all brands
      getInstance().get('brands').then(
        (response) => {
          setBrands(response.data.results)
        }
      ).catch(
        (error) => {
          const res = error.response;
          console.log(res)
        }
      )
    }, [setBrands]
  )
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography textAlign={'center'} fontWeight={'light'} sx={{paddingBottom: '2rem'}} variant={'h4'}>
            Brands
          </Typography>
          <form onSubmit={
            (e) => {
              getInstance().post('brands/', {name}).then(
                (response) => {
                  handleClose()
                  Router.reload()
                }
              ).catch(
                (error) => {
                  const res = error.response;
                  console.log(res);
                }
              )
              e.preventDefault();
            }
          }>
            <Grid container spacing={3} justifyContent={'center'}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="brand"
                  required={true}
                  onChange={
                    (e)=>{
                      setName(e.target.value)
                    }
                  }
                  variant={"standard"}
                  label="Name"/>
              </Grid>
              <Grid item>
                <Button
                  type={"submit"}
                  startIcon={<AddIcon/>}
                  color={"secondary"}
                  variant={'outlined'}
                  sx={{
                    marginY: 0,
                    borderRadius:"1rem"
                  }}>
                  Add Brand
                </Button>
              </Grid>
            </Grid>
          </form>
          <List>
            {brands.map(
              ({id, name}) => (
                <ListItem
                  button
                  key={id}
                  secondaryAction={
                    <Button
                      startIcon={<DeleteIcon/>}
                      color={"warning"}
                      onClick={
                        () => deleteItems('brands', id)
                      }
                    >
                      DELETE
                    </Button>
                  }
                  sx={{borderRadius: '1rem'}}>
                  <ListItemText primary={name}/>
                </ListItem>
              ))}
          </List>
        </Box>
      </Modal>
    </>
  );
}


export default BrandModal;
