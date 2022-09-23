import { Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { loginCheck } from "../../api/Auth";
import Aside from "./Aside"
import Header from "./Header"

export default function Root(){
    const {pathname} = useLocation();
    const refContent = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const [login, setLogin] = useState(false);
    useQuery(['/auth'],loginCheck,{
        onSuccess(data) {
            if(data){
                if(data.data.code === '0') {
                    setLogin(true);
                } else {
                    navigate('/login');
                }
            }
        },
    });

    useEffect(()=>{
        if(refContent.current){
            refContent.current.scrollTo(0,0);
        }
    }, [pathname]);


    return (
        <>
            {login?
                (
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
                :
                ''
            }
        </>
    )
}
