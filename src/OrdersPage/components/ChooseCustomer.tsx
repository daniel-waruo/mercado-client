import React, {useEffect, useState} from "react";
import {Customer} from "../../../Types";
import CustomerCard from "./CustomerCard";
import {protocolFix} from "../../utils";
import {getInstance} from "../../../axios";
import {Grid, InputAdornment, TextField} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type ChooseCustomerProps = {
  customer?: Customer,
  setCustomer: (customer: Customer) => void
}
const ChooseCustomer = ({customer, setCustomer}: ChooseCustomerProps) => {
  const [customers, setCustomers] = useState<Customer[]>()
  const [next, setNext] = useState<string | null>(null)
  const [previous, setPrevious] = useState<string | null>(null)

  const fetchData = (link?: string) => {
    if (link) {
      link = protocolFix(link)
    }
    getInstance().get(link || 'customers').then(
      (response) => {
        setCustomers(response.data.results)
        setNext(response.data.next)
        setPrevious(response.data.previous)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }
  useEffect(() => {
    fetchData()
  }, [setCustomers]);

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          fontWeight: 150
        }}>Customers</h1>
      <TextField
        sx={{
          marginBottom: '2rem'
        }}
        label="Search for Customer"
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
        style={{
          width: "40%"
        }}/>
      <Grid container spacing={2}>
        {
          customers?.map(
            (cust, index) => {
              return (
                <Grid item xs={6} md={3} key={index}>
                  <CustomerCard
                    key={index}
                    customer={cust}
                    setCustomer={setCustomer}
                    selected={cust.id == customer?.id}/>
                </Grid>
              )
            }
          )
        }
      </Grid>
    </>
  )
}

export default ChooseCustomer;
