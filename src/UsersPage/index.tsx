import MainLayout from "../Layouts/MainLayout";
import {Grid} from "@mui/material";
import React from "react";
import UsersTable from "./components/UsersTable";

const UsersPage = () => {
  return (
    <MainLayout title={'Users'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UsersTable/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default UsersPage;
