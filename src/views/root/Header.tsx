import { Avatar, Badge, Button, Grid, IconButton, Menu, MenuItem, Popover, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/Auth";
import { test } from "../../api/Test";
import { useQuery } from "@tanstack/react-query";
import { selectMyInfo } from "../../api/Member";

export default function Header(){
    const navigate = useNavigate();

    const [userInfo,setUserInfo] = useState<Member>();
    useQuery(['/member/me'],selectMyInfo,{
        onSuccess : data => {
            if(data.data.code === '0'){
                setUserInfo(data.data.data);
            }
        }
    });

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [anchorEl2, setAnchorEl2] = useState<HTMLButtonElement | null>(null);

    const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl2(event.currentTarget);
    };

    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const open2 = Boolean(anchorEl2);

    function fnLogout(){
        logout();
        navigate('/login');
    }

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
                        PMA
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
                    <Grid item xs={6}>
                        <Grid container justifyContent={'flex-end'} >
                            <IconButton style={{marginRight : '10px'}}
                            onClick={handleClick2}
                            >
                                <Badge badgeContent={1} color="error">
                                    <NotificationsNoneIcon />
                                </Badge>
                            </IconButton>
                            <Popover
                                open={open2}
                                anchorEl={anchorEl2}
                                onClose={handleClose2}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                }}
                            >
                                <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
                            </Popover>
                            <IconButton >
                                <SettingsIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid item xs={5}>
                        <Grid container justifyContent={'flex-end'}>
                            <Grid style={{textAlign:"right",marginRight:'10px'}}>
                                <Typography fontSize={'0.7rem'} color={blueGrey[900]} align="right" variant="caption">{userInfo?.belong}</Typography>
                                <Typography fontWeight={600} align="right" variant="inherit">{userInfo?.name}</Typography>
                            </Grid>
                            <Button
                                onClick={handleClick}
                            >
                                <Avatar>IH</Avatar>
                            </Button>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={test}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>My account</MenuItem>
                                <MenuItem onClick={fnLogout}>Logout</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Grid>
        </Grid>
    )
}
