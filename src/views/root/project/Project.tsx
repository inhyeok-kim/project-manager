import { Button, Grid, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import ProjectChat from "./ProjectChat";
import Dashboard from "./ProjectDashboard";
import Schedule from "./ProjectSchedule";
import Tasks from "./ProjectTasks";

export default function Project(){
    const params = useParams();

    
    useEffect(()=>{
        setMenu('dashboard');
    },[params.projectId]);
    
    const [menu,setMenu] = useState('dashboard');
    function isActive(m:string){
        return m === menu
    }

    const refContent = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(refContent.current){
            refContent.current.parentElement!.scrollTo(0,0);
        }
    }, [menu]);

    function child(){
        switch (menu) {
            case "dashboard":
                return <Dashboard/>;
            case "tasks":
                return <Tasks/>;
            case "schedule":
                return <Schedule/>;
            case "chat":
                return <ProjectChat/>;
            default:
                break;
        }
    }

    return (
        <Grid ref={refContent} container columnSpacing={3}>
            <Grid item xs={10} sx={{position:'fixed',paddingBottom:'1%',width:'100%', zIndex:'2',backgroundColor:'#f1f3f7'}}>
                <Stack 
                    spacing={3} 
                    direction={'row'} >
                    <Typography color={blueGrey[600]} fontWeight={600} variant="h5">Something Project</Typography>
                    {
                        tempProjectMenu.map((m,i)=>{
                            return (
                                <Button key={i}
                                    variant={isActive(m.text)? "outlined" : 'text'}
                                    onClick={()=>{setMenu(m.text)}}
                                >
                                {m.text}
                                </Button>
                            )
                        })
                    }
                </Stack>
            </Grid>
            <Grid item xs={12} sx={{marginTop : '4%'}}>
                {child()}
            </Grid>
        </Grid>
    )
}

const tempProjectMenu = [
    {
        text : 'dashboard',
    },
    {
        text : 'tasks',
    },
    {
        text : 'schedule',
    },
    {
        text : 'chat',
    },
    // {
    //     text : 'document',
    // },
    // {
    //     text : 'file',
    // },
]