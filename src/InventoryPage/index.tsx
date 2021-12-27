import MainLayout from "../Layouts/MainLayout";
import {Button, Grid} from "@mui/material";
import DashboardCard from "../DashboardPage/components/DashboardCard";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import React, {useEffect, useState} from "react";
import InventoryTable from "./components/InventoryTable";
import InventoryIcon from '@mui/icons-material/Inventory';
import AddIcon from "@mui/icons-material/Add";
import {InventoryMetrics, Product} from "../../Types";
import InventoryModal from "./components/InventoryModal";
import {getInstance} from "../../axios";
import LinkIcon from '@mui/icons-material/Link';
import CategoryModal from "./components/CategoryModal";
import BrandModal from "./components/BrandModal";


const InventoryPage = () => {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<string>();
  const [product, setProduct] = useState<Product | undefined>();
  const [metrics, setMetrics] = useState<InventoryMetrics>({
    totalCount: 0,
    inventoryValue: 0,
    expectedProfit: 0
  })
  useEffect(() => {
    getInstance().get('inventory-metrics').then(
      (response) => {
        console.log(response.data)
        setMetrics(response.data.data)
      }
    ).catch(
      (error) => {
        console.log(error)
      }
    )
  }, [getInstance, setMetrics]);


  return (
    <MainLayout title={'Inventory'}>
      <Grid container spacing={2}>
        <InventoryModal
          open={open && modal === "inventory"}
          handleClose={
            () => {
              setOpen(false)
              setModal(undefined)
              setProduct(undefined)
            }
          }
          initialProduct={product}/>
        <CategoryModal
          open={open && modal === "categories"}
          handleClose={
            () => {
              setOpen(false)
              setModal(undefined)
            }
          }
        />
        <BrandModal
          open={open && modal === "brands"}
          handleClose={
            () => {
              setOpen(false)
              setModal(undefined)
            }
          }
        />
        <Grid item xs={6} lg={4}>
          <DashboardCard
            title={'Total Items'}
            value={metrics.totalCount}
            icon={InventoryIcon}/>
        </Grid>
        <Grid item xs={6} lg={4}>
          <DashboardCard
            title={'Inventory Value'}
            value={`Ksh.${metrics.inventoryValue}`}
            icon={ShowChartIcon}/>
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardCard
            title={'Expected Profit'}
            value={`Ksh.${metrics.expectedProfit}`}
            icon={ShowChartIcon}/>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item>
              <Button onClick={() => {
                setOpen(true)
                setModal("inventory")
              }} variant={'contained'}>
                <AddIcon/>
                Add Product
              </Button>
            </Grid>
            <Grid item>
              <Button onClick={() => {
                setOpen(true)
                setModal("categories")
              }} variant={'contained'}>
                <LinkIcon/>
                Manage Categories
              </Button>
            </Grid>
            <Grid item>
              <Button
                onClick={() => {
                  setOpen(true)
                  setModal("brands")
                }} variant={'contained'}>
                <LinkIcon/>
                Manage Brands
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <InventoryTable toggleFunction={(product) => {
            setOpen(true);
            setModal("inventory")
            setProduct(product);
          }}/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default InventoryPage;
