import MainLayout from "../Layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import React, {useState} from "react";
import InventoryTable from "./components/InventoryTable";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from "@mui/icons-material/Add";
import {Product} from "../../Types";
import InventoryModal from "./components/InventoryModal";

const InventoryPage = () => {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product | undefined>();

  return (
    <MainLayout title={'Inventory'}>
      <Grid container spacing={2}>
        <InventoryModal
          open={open}
          handleClose={
            () => {
              setOpen(false)
              setProduct(undefined)
            }
          }
          initialProduct={product}/>
        <Grid item xs={6}>
          <DashboardCard
            title={'Total Items'}
            value={'140'}
            icon={InventoryIcon}/>
        </Grid>
        <Grid item xs={6}>
          <DashboardCard
            title={'Gross Margin %'}
            value={'80%'}
            icon={ShowChartIcon}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Button onClick={() => {
                setOpen(true)
              }} variant={'contained'}>
                <AddIcon/>
                Add Product
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <InventoryTable toggleFunction={(product) => {
            setOpen(true);
            setProduct(product);
          }}/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default InventoryPage;
