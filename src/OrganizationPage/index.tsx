import MainLayout from "../Layouts/MainLayout";
import React from "react";
import OrganizationCard from "./components/OrganizationCard";
import {Grid} from "@mui/material";
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Inventory2SharpIcon from '@mui/icons-material/Inventory2Sharp';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import LocalShippingTwoToneIcon from '@mui/icons-material/LocalShippingTwoTone';
import ShoppingCartTwoToneIcon from '@mui/icons-material/ShoppingCartTwoTone';
import MoneyOffCsredTwoToneIcon from '@mui/icons-material/MoneyOffCsredTwoTone';

import OrganizationDetailCard from "./components/OrganizationDetailCard";
import StoreTwoToneIcon from "@mui/icons-material/StoreTwoTone";

const OrganizationDetail = () => {

  return (
    <MainLayout title={'Makinika Tech'}>
      <Grid container>
        <Grid item md={12}>
          <OrganizationDetailCard/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={DashboardIcon} title={"Dashboard"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={PeopleAltTwoToneIcon} title={"Customers"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={ShoppingCartTwoToneIcon} title={"Orders"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={AttachMoneyOutlinedIcon} title={"Invoices"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={MoneyOffCsredTwoToneIcon} title={"Expenses"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={StoreTwoToneIcon} title={"Suppliers"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={LocalShippingTwoToneIcon} title={"Shipments"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={Inventory2SharpIcon} title={"Inventory"}/>
        </Grid>
        <Grid item md={3}>
          <OrganizationCard icon={PeopleAltTwoToneIcon} title={"Users"}/>
        </Grid>
      </Grid>
    </MainLayout>
  )
}

export default OrganizationDetail;
