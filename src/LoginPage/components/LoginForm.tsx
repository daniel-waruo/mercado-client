import {Alert, Button, Collapse, FormControl, Grid, Input, InputLabel, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React, {useState} from "react";
import {getInstance} from "../../../axios";
import {TransitionGroup} from "react-transition-group";
import Router from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  return (
    <Box
      boxShadow={3}
      minHeight={'20rem'}
      sx={{
        top: "calc(50% - 10rem)",
        position: 'relative',
        backgroundColor: 'primary.light',
        padding: '1rem',
        borderRadius: '1rem'
      }}>
      <Typography variant={'h4'} fontWeight={'light'} textAlign={'center'} paddingTop={'1rem'}>Login</Typography>
      <form onSubmit={
        (e) => {
          getInstance().post(
            'login',
            {email, password},
            {
              headers: {
                // @ts-ignore
                'Authorization': undefined
              }
            }
          ).then(
            (response) => {
              const res = response.data;
              localStorage.setItem('token', res.data.key);
              Router.push('/');
            }
          ).catch(
            (error) => {
              console.log(error.response)
              const res = error?.response?.data;
              setErrors(res?.data?.non_field_errors || []);
            }
          )
          e.preventDefault();
        }
      }>
        <Grid container spacing={2} justifyContent={'center'}>
          <Grid item xs={10}>
            <TransitionGroup>
              {errors.map(
                (error, index) => (
                  <Collapse key={index}>
                    <Alert style={{textAlign: 'center'}} severity="error">{error}</Alert>
                  </Collapse>
                )
              )}
            </TransitionGroup>
          </Grid>
          <Grid item xs={10}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="email-input">Email</InputLabel>
              <Input
                id="email-input"
                onChange={
                  (e) => {
                    setEmail(e.target.value)
                  }
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}/>
          <Grid item xs={10}>
            <FormControl variant="standard" fullWidth>
              <InputLabel htmlFor="password-input">Password</InputLabel>
              <Input
                id="password-input"
                type={'password'}
                onChange={
                  (e) => {
                    setPassword(e.target.value)
                  }
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}/>
          <Grid item xs={8}>
            <Button
              type={'submit'}
              variant="outlined" fullWidth
              sx={{
                paddingY: '0.5rem',
                borderRadius: '1rem'
              }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

export default LoginForm
