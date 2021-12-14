import {Box} from "@mui/system";
import {LinearProgress} from "@mui/material";

const LoadingPage = () => {
  return (
    <Box sx={{height: "80vh",position:'relative'}}>
      <LinearProgress sx={{top: '50%'}}/>
    </Box>
  )
}

export default LoadingPage;
