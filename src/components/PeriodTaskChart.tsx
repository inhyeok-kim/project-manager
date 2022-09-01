import { Grid } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function PeriodTaskChart(){
    const wrapRef = useRef<any>();
    const [height,setHeight] = useState();
    // useEffect(()=>{
    //     if(wrapRef.current){
    //         console.log(wrapRef.current.offsetHeight);
    //         setHeight(wrapRef.current.offsetHeight);
    //     }
    // },[]);

    return (
        <Grid ref={wrapRef} item xs={12}>
            {/* {height? */}
                <BarChart
                    width={300}
                    height={200}
                    data={data}
                    margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                    <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                </BarChart>
                {/* :
                ''
            } */}
            {/* <div style={{height:'222px'}}></div> */}
        </Grid>
    )
}

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];