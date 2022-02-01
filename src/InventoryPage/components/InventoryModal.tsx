import * as React from 'react';
import {ChangeEventHandler, useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {Product} from "../../../Types";
import {getInstance} from "../../../axios";
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
  initialProduct?: Product
}

function InventoryModal({open, handleClose, initialProduct}: ModalProps) {
  let [product, setProduct] = useState<Product>({
    sku: '',
    name: '',
    cost: 0,
    price: 0,
    inStock: 0,
  });
  const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
  const [brands, setBrands] = useState<{ id: number, name: string }[]>([]);

  const [errors, setErrors] = useState<string[]>([]);
  const [file, setFile] = useState<any>();
  const [blobFile, setBlobFile] = useState<Blob>();

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    // @ts-ignore
    const fileReader = new FileReader();
    // @ts-ignore
    const fileHandler: ProgressEvent<FileReader> = (e) => {
      setFile(e.target.result);
    }
    console.log(fileReader)
    // @ts-ignore
    fileReader.onload = fileHandler
    // @ts-ignore
    fileReader.readAsDataURL(event.target.files[0]);
    // @ts-ignore
    setBlobFile(event.target.files[0])
  }

  useEffect(
    () => {
      // set initial product to state
      if (initialProduct) setProduct(initialProduct)
      // get all categories
      getInstance().get('categories').then(
        (response) => {
          setCategories(response.data.results)
        }
      ).catch(
        (error) => {
          const res = error.response;
          setErrors(res.data);
        }
      )
      // get all brands
      getInstance().get('brands').then(
        (response) => {
          setBrands(response.data.results)

        }
      ).catch(
        (error) => {
          const res = error.response;
          setErrors(res.data);
        }
      )
    }, [setProduct, setBrands, initialProduct?.id]
  )

  // @ts-ignore
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form

          onSubmit={
            (e) => {
              const data = new FormData(e.currentTarget);
              for (const [key, value] of Object.entries(product)) {
                console.log(`${key}: ${value}`);
                data.append(key, value)
              }
              data.append('image', blobFile as Blob)
              if (!initialProduct) {
                getInstance().post('products/', data, {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }).then(
                  (response) => {
                    handleClose()
                    Router.reload()
                  }
                ).catch(
                  (error) => {
                    const res = error.response;
                    setErrors(res.data.non_field_errors);
                  }
                )
              } else {
                getInstance().put(`products/${initialProduct.id}/`, data).then(
                  (response) => {
                    handleClose()
                    Router.reload()
                  }
                ).catch(
                  (error) => {
                    const res = error.response.data;
                    setErrors(res.data);
                  }
                )
              }
              e.preventDefault();
            }
          }>
          <Box sx={style}>
            <Typography textAlign={'center'} fontWeight={'light'} sx={{paddingBottom: '2rem'}} variant={'h4'}>
              {initialProduct ? 'Update Product' : 'New Product'}
            </Typography>
            <div style={{textAlign: 'center'}}>
              <Grid container justifyContent={'center'} spacing={2}>
                <Grid item component={'label'}>
                  <input style={{display: "none"}} type="file" onChange={onFileChange}/>
                  <Avatar
                    sx={{height: '10rem', width: '10rem'}}
                    src={file}>
                  </Avatar>
                </Grid>
              </Grid>
            </div>
            <TextField
              required
              fullWidth
              id="product-name"
              sx={{marginY: '0.5rem'}}
              label="Name"
              defaultValue={initialProduct?.name}
              onChange={
                (e) => {
                  // @ts-ignore
                  product.name = e.target.value as string
                  setProduct(product)
                }
              }
              variant="outlined"/>
            <TextField
              required
              fullWidth
              id="product-sku"
              sx={{marginY: '0.5rem'}}
              label="Sku"
              defaultValue={initialProduct?.sku}
              onChange={
                (e) => {
                  // @ts-ignore
                  product.sku = e.target.value as string
                  setProduct(product)
                }
              }
              variant="outlined"/>
            <FormControl fullWidth sx={{marginY: '0.5rem'}}>
              <InputLabel id="select-category-label">Category</InputLabel>
              <Select
                required
                labelId="select-category-label"
                id="select-status"
                defaultValue={initialProduct?.category}
                label="Category"
                variant={'outlined'}
                onChange={
                  (e) => {
                    // @ts-ignore
                    product.category = e.target.value as unknown as number
                    setProduct(product)
                  }
                }
              >
                {
                  categories.map(
                    ({id, name}, key) => (
                      <MenuItem value={id} key={key}>{name}</MenuItem>
                    )
                  )
                }
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{marginY: '0.5rem'}}>
              <InputLabel id="select-category-label">Brand</InputLabel>
              <Select
                required
                labelId="select-category-label"
                id="select-status"
                defaultValue={initialProduct?.brand}
                label="Brand"
                variant={'outlined'}
                onChange={
                  (e) => {
                    // @ts-ignore
                    product.brand = e.target.value as unknown as number
                    setProduct(product)
                  }
                }
              >
                {
                  brands.map(
                    ({id, name}, key) => (
                      <MenuItem value={id} key={key}>{name}</MenuItem>
                    )
                  )
                }
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              type={"number"}
              id="product-cost"
              sx={{marginY: '0.5rem'}}
              label="Cost"
              defaultValue={initialProduct?.cost}
              inputProps={{step: 0.5}}
              onChange={
                (e) => {
                  product = {
                    ...product,
                    cost: e.target.value as string
                  }
                  setProduct(product)
                }
              }
              variant="outlined"/>
            <TextField
              required
              fullWidth
              type={"number"}
              id="product-price"
              sx={{marginY: '0.5rem'}}
              label="Price"
              defaultValue={initialProduct?.price}
              inputProps={{
                step: 0.5
              }}
              onChange={
                (e) => {
                  product = {
                    ...product,
                    price: e.target.value as string
                  }
                  setProduct(product)
                }
              }
              variant="outlined"/>
            <TextField
              required
              fullWidth
              inputProps={{
                step: 1
              }}
              type={"number"}
              id="product-in-stock"
              defaultValue={initialProduct?.inStock}
              onChange={
                (e) => {
                  // @ts-ignore
                  product?.in_stock = e.target.value as unknown as number
                  setProduct(product)
                }
              }
              sx={{marginY: '0.5rem'}}
              label="In Stock"
              variant="outlined"/>
            <Grid container justifyContent={'center'} paddingY={'1rem'}>
              <Grid item>
                <Button
                  sx={{borderRadius: "1rem", paddingX: "3rem"}} type={'submit'} variant={'contained'}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </>
  );
}


export default InventoryModal;
