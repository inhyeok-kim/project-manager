import { Breadcrumbs, Grid, Link } from "@mui/material"
import { Outlet } from "react-router-dom"
import Aside from "./Aside"
import Header from "./Header"

export default function Root(){

    return (
        <Grid 
            container
            sx={{height : '100%'}}
        >   
            <Grid item xs={12} sx={{height : '10%'}} >
                <Header />
            </Grid>
            <Grid item xs={2} sx={{height : '90%'}}>
                <Aside />
            </Grid>
            <Grid item xs={10} sx={{height : '90%', paddingRight:'2%', paddingBottom : '2%', overflowY : 'auto'}}>
                <Outlet />
            </Grid>
        </Grid>
    )
}
