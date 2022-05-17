import MainLayout from "../Layouts/MainLayout";
import {Grid} from "@mui/material";
import React from "react";
import ExpensesTable from "./components/ExpensesTable";

const ExpensesPage = () => {
  return (
    <MainLayout title={'Expenses'}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ExpensesTable/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default ExpensesPage;
