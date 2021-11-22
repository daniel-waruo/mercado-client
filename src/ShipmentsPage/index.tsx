import MainLayout from "../Layouts/MainLayout";
import {Grid} from "@mui/material";
import React from "react";
import ShipmentTable from "./components/ShipmentTable";

const ShipmentsPage = () => {
  return (
    <MainLayout title={'Shipments'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ShipmentTable/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default ShipmentsPage;
