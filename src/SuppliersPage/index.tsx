import MainLayout from "../Layouts/MainLayout";
import {Grid} from "@mui/material";
import React from "react";
import SuppliersTable from "./components/SuppliersTable";

const SuppliersPage = () => {
  return (
    <MainLayout title={'Suppliers'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <SuppliersTable/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default SuppliersPage;
