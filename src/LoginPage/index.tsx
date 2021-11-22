import {Grid} from "@mui/material";
import React from "react";
import PrettyPage from "./components/PrettyPage";
import LoginForm from "./components/LoginForm";

const LoginPage = () => {
  return (
    <Grid container sx={{height: '100vh'}}>
      <Grid item xs={12} sx={{backgroundColor: 'rgba(0,0,0,0.8)'}}>
        <PrettyPage>
          <Grid container sx={{height: '100%'}} justifyContent={'center'}>
            <Grid item xs={8} md={4}>
              <LoginForm/>
            </Grid>
          </Grid>
        </PrettyPage>
      </Grid>
    </Grid>
  )
}

export default LoginPage;
