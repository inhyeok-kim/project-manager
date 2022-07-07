import { Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, MenuItem, MenuList, Paper, Stack, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import Dashboard from "./Dashboard";
import Tasks from "./Tasks";

export default function Project(){
    const [menu,setMenu] = useState('dashboard');
    function isActive(m:string){
        return m === menu
    }
    function child(){
        switch (menu) {
            case "dashboard":
                return <Dashboard/>
                break;
            case "tasks":
                return <Tasks/>
                break;
            default:
                break;
        }
    }

    return (
        <Grid container columnSpacing={3}>
            <Grid item xs={12} sx={{position:'fixed',backgroundColor:'#f1f3f7'}}>
                <Stack 
                    spacing={3} 
                    direction={'row'} >
                    <Typography color={blueGrey[600]} fontWeight={600} variant="h5">Something Project</Typography>
                    {
                        tempProjectMenu.map((m)=>{
                            return (
                                <Button 
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
    {
        text : 'document',
    },
    {
        text : 'file',
    },
]