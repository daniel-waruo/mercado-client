import React from "react";
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import {Button} from "@mui/material";
import {getInstance} from "../../../axios";


const ExportProducts = () => {
  const callBackHandler = (data: any) => {
    getInstance().post('/export-products',data).then(
      (response) => {
        console.log(response)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }
  return (
    <>
      <FacebookLogin
        appId="586208029067281"
        render={(renderProps: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined; }) => (
          <Button
            style={{
              borderRadius: "1rem"
            }}
            startIcon={<FacebookTwoToneIcon/>}
            variant={"contained"}
            color={"info"}
            onClick={renderProps.onClick}>
            Export Products
          </Button>
        )}
        autoLoad={true}
        fields="name,email,picture"
        scope="public_profile,catalog_management"
        callback={callBackHandler}/>
    </>
  )
}

export default ExportProducts
