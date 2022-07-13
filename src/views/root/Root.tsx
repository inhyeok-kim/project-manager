import { Breadcrumbs, Grid, Link } from "@mui/material"
import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom"
import Aside from "./Aside"
import Header from "./Header"

export default function Root(){
    const {pathname} = useLocation();
    const refContent = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(refContent.current){
            refContent.current.scrollTo(0,0);
        }
    }, [pathname]);

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
            <Grid ref={refContent} item xs={10} sx={{height : '90%', paddingRight:'2%', paddingBottom : '2%', overflowY : 'auto'}}>
                <Outlet />
            </Grid>
        </Grid>
    )
}
