import { Grid } from "@mui/material";
import { blueGrey, red } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function PeriodTaskChart(){

  const renderLegendText = (value: string, entry: any) => {
    return <span style={{ fontSize:'0.8rem' }}>{value}</span>;
  };

    return (
        <Grid container width="100%" height="98%" alignItems={'center'}>
          <ResponsiveContainer width={'100%'} height={'100%'}>
            <BarChart
                data={data}
                margin={{
                  right: 5,
                  bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tickSize={6} fontSize={12}/>
                <YAxis  width={30}/>
                <Tooltip />
                <Legend formatter={renderLegendText}/>
                <Bar dataKey="uv" name="진행/대기" stackId="a" fill={blueGrey[500]} />
                <Bar dataKey="pv" name="지연" stackId="a" fill={red[400]} />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
    )
}

const data = [
    {
      name: '22/01',
      uv: 4,
      pv: 0,
    },
    {
      name: '22/02',
      uv: 15,
      pv: 2,
    },
    {
      name: '22/03',
      uv: 10,
      pv: 0,
    },
    {
      name: '22/04',
      uv: 14,
      pv: 0,
    },
    {
      name: '22/05',
      uv: 21,
      pv: 3,
    },
    {
      name: '22/06',
      uv: 9,
      pv: 0,
    },
    {
      name: '22/07',
      uv: 17,
      pv: 0,
    },
    {
      name: '22/08',
      uv: 17,
      pv: 0,
    },
    {
      name: '22/09',
      uv: 17,
      pv: 0,
    },
    {
      name: '22/10',
      uv: 17,
      pv: 0,
    },
    {
      name: '22/11',
      uv: 17,
      pv: 0,
    },
    {
      name: '22/12',
      uv: 17,
      pv: 0,
    },
  ];