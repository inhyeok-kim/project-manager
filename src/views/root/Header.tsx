import { Avatar, Badge, BadgeProps, Grid, IconButton, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

export default function Header(){

    return (
        <Grid 
            container
            sx={{height:'100%'}}
        >
            <Grid
                item
                xs={2}
                sx={{height:'100%'}}
            > 
                <Grid
                    container 
                    sx={{height:'100%'}}
                    justifyContent={"center"} 
                    alignItems={"center"}>
                    <Typography align="center" variant="h3" fontWeight={'bold'} color={blueGrey[600]} >
                        PMS
                    </Typography>
                </Grid>
            </Grid>
            <Grid
                item
                xs={6}
                sx={{height:'100%'}}
            > 
            </Grid>
            <Grid
                item
                xs={4}
                sx={{height:'100%'}}
            > 
                <Grid
                    container 
                    sx={{height:'100%'}}
                    alignItems={"center"}
                >
                    <Grid xs={6}>
                        <Grid container justifyContent={'flex-end'} >
                            <IconButton style={{marginRight : '10px'}}>
                                <Badge badgeContent={1} color="error">
                                    <NotificationsNoneIcon />
                                </Badge>
                            </IconButton>
                            <IconButton >
                                <SettingsIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid xs={5}>
                        <Grid container justifyContent={'flex-end'}>
                            <Grid style={{textAlign:"right",marginRight:'10px'}}>
                                <Typography fontSize={'0.7rem'} color={blueGrey[900]} align="right" variant="caption">동아피엠</Typography>
                                <Typography fontWeight={600} lineHeight={0.6} align="right" variant="inherit">Inheyo.Kim</Typography>
                            </Grid>
                            <Avatar>IH</Avatar>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )
}
