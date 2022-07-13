import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonProps, Collapse, Grid, Icon, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AssignmentIcon from '@mui/icons-material/Assignment';

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { blueGrey } from "@mui/material/colors";

export default function Aside(){
    const navigate = useNavigate();
    const location = useLocation();
    
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const currentMenu = useMemo(()=>{
        const idx = location.pathname.indexOf('/',1);
        return location.pathname.substring(0,idx > 0 ? idx : location.pathname.length);
    },[location.pathname]);
    const currentSubMenu = useMemo(()=>{
        const idx = location.pathname.indexOf('/',1);
        const subIdx = location.pathname.indexOf('/',idx+1);
        return location.pathname.substring(0,subIdx > 0 ? subIdx : location.pathname.length);
    },[location.pathname]);

    useEffect(()=>{
        if(currentMenu === '/') navigate('/dashboard');
    }, [currentMenu]);

    return (
        <Grid container justifyContent={'center'}>
            <Grid container justifyContent={'center'}>
                <Grid xs={10}>
                    <List
                        sx={{ width: '100%',}}
                    >
                    {tempMenuList ? 
                        tempMenuList.map((menu)=>{
                            const isActive = menu.to === currentMenu;
                            const Icon = menu.icon;
                            return (
                                <>
                                    <ListItemButton
                                        key={menu.to}
                                        onClick={
                                            menu.children ? 
                                            handleClick
                                            :
                                            ()=>{
                                                navigate(menu.to);
                                            }
                                        }
                                        style={{ backgroundColor : isActive ? blueGrey[500] : ''}}
                                    >
                                        <ListItemIcon>
                                            <Icon style={{ color : isActive ? 'white' : blueGrey[500] }} />
                                        </ListItemIcon>
                                        <ListItemText primary={menu.text}
                                            primaryTypographyProps={{
                                                fontWeight : 'bold',
                                                color : { color : isActive ? 'white' : blueGrey[500] }
                                            }}
                                        />
                                        { menu.children ? 
                                            open ? 
                                                <ExpandLess style={{ color : isActive ? 'white' : blueGrey[500] }} /> 
                                                : 
                                                <ExpandMore style={{ color : isActive ? 'white' : blueGrey[500] }} />
                                            :
                                            ''
                                        }
                                    </ListItemButton>
                                    { menu.children ? 
                                        (
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {menu.children.map((childMenu)=>{
                                                        const ChildIcon = childMenu.icon;
                                                        const isSubActive = childMenu.to === currentSubMenu;
                                                        return (
                                                            <ListItemButton 
                                                                key={childMenu.to}
                                                                title={childMenu.text}
                                                                onClick={()=>{
                                                                    navigate(childMenu.to);
                                                                }} 
                                                                sx={{ pl: 4 }}
                                                                style={{ backgroundColor : isSubActive ? blueGrey[500] : ''}}
                                                                >
                                                                <ListItemText primary={childMenu.text} 
                                                                    primaryTypographyProps={{
                                                                        fontWeight : 'bold',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace : 'nowrap',
                                                                        overflow : 'hidden',
                                                                        color : { color : isSubActive ? 'white' : blueGrey[500] }
                                                                    }}
                                                                />
                                                                {ChildIcon ? 
                                                                    <ListItemIcon>
                                                                        <ChildIcon style={{ color : isSubActive ? 'white' : blueGrey[500] }} />
                                                                    </ListItemIcon>
                                                                    :
                                                                    ''
                                                                }
                                                            </ListItemButton>
                                                        )
                                                    })}
                                                </List>
                                            </Collapse>
                                        )
                                        :
                                        ''
                                    }
                                </>
                            )
                        })
                        :
                        ''
                    }
                    </List>
                </Grid>
            </Grid>
        </Grid>
    )
}

const tempMenuList = [
    {
        to : '/dashboard',
        text : 'Dashboard',
        icon : DashboardIcon
    },
    {
        to : '/project',
        text : 'Project',
        icon : AccountTreeIcon,
        children : [
            {
                to : '/project/regist',
                text : 'new Project',
                icon : AddBoxIcon
            },
            {
                to : '/project/something',
                text : 'Something Project'
            },
            {
                to : '/project/something2',
                text : 'Something Project2'
            }
        ]
    },
    {
        to : '/schedule',
        text : 'Schedule',
        icon : CalendarMonthIcon
    },
    {
        to : '/chat',
        text : 'Direct Chat',
        icon : ChatIcon
    },
    {
        to : '/tasks',
        text : 'Tasks',
        icon : AssignmentIcon
    },
];

interface ButtonStyleProp extends ButtonProps {
    isActive? : boolean
}
const NavigationButton = styled(Button, {
    shouldForwardProp : (prop) => prop !=='isActive'
})<ButtonStyleProp>(({ isActive, theme})=>({
    fontWeight : 'bold',
    width : '100%', 
    paddingLeft:'20px', 
    justifyContent:'flex-start', 
    color : isActive ? '' : blueGrey[600],
    backgroundColor : isActive ? blueGrey[600] : '',
    '&:hover' : {
        backgroundColor : isActive ? blueGrey[600] : '',
    }
}));