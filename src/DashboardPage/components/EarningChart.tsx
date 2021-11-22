import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {getInstance} from "../../../axios";


const options = {
  elements: {
    line: {
      tension: 0.3
    }
  },
};
type ChartData = {
  sales: number[],
  profit: number[]
}
const EarningChart = ({totalRevenue}: { totalRevenue: number }) => {
  const [year, setYear] = useState(2021)
  const [chartData, setChartData] = useState<ChartData>()
  useEffect(() => {
    getInstance().get(`chart-data/${year}`).then(
      (response) => {
        setChartData(response.data.data)
      }
    ).catch(
      (error) => {
        console.error(error)
      }
    )
  }, [setChartData, year]);
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'],
    datasets: [
      {
        label: 'Sales',
        data: chartData?.sales || [],
        fill: false,
        backgroundColor: 'rgba(155,125,223,0.5)',
        borderColor: 'rgba(155, 125, 223, 0.9)',
      },
      {
        label: 'Profit',
        data: chartData?.profit || [],
        fill: false,
        backgroundColor: 'rgba(241,61,78,0.5)',
        borderColor: 'rgba(234,46,56,0.7)',
      },
    ],
  };

  return (
    <Card sx={{
      minWidth: '100%',
      borderRadius: '1rem',
    }}>
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant={'h6'} fontWeight={'lighter'}>Earnings</Typography>
            <Typography variant={'h5'} fontWeight={'strong'}>Ksh. {totalRevenue}</Typography>
          </Grid>
          <Grid item xs={6}/>
          <Grid item xs={3} justifySelf={'flex-end'}>
            <FormControl size={"small"}>
              <InputLabel id="select-chart-year">Year</InputLabel>
              <Select
                labelId="select-chart-year"
                id="select-chart-year"
                value={year}
                label="Year"
                onChange={(e) => {
                  setYear(e.target.value as number)
                }}
              >
                <MenuItem value={2021}>2021</MenuItem>
                <MenuItem value={2020}>2020</MenuItem>
                <MenuItem value={2019}>2019</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Line data={data} options={options}/>
      </CardContent>
    </Card>
  );
}

export default EarningChart;
