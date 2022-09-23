import { Button, ButtonProps, Collapse, Grid, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
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
import { getMyProjectList } from "../../api/Project";
import { useQuery } from "@tanstack/react-query";

function useAsideMenu(){
    const navigate = useNavigate();
    const [asideMenu, setAsideMenu] = useState<AsideMenu[]>([]);
    
    const { data } = useQuery(["/project/my",'/project'], getMyProjectList,{
        refetchInterval : 10000,
        onSuccess : data=>{
            if(data.data.code === 'A1') navigate('/login');
        }
    });

    useEffect(()=>{
        if(data){
            makeAsideMenu(data.data);
        }
    },[data])

    function makeAsideMenu(data : any){
        const projectList = data.data;
        const tempMenuList : AsideMenu[] = [
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
                    }
                ].concat(projectList.map((project : Project)=>({
                    to : `/project/${project.prId}`,
                    text : project.prName
                })))
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
        setAsideMenu(tempMenuList);
    }
    return asideMenu;
}

export default function Aside(){
    const navigate = useNavigate();
    const location = useLocation();

    const asideMenuList = useAsideMenu();
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

    return <AsideView menuList={asideMenuList} currentMenu={currentMenu} currentSubMenu={currentSubMenu} />
}

interface viewProp {
    menuList : AsideMenu[]
    currentMenu : string
    currentSubMenu : string
}

function AsideView({
    menuList,
    currentMenu,
    currentSubMenu
} : viewProp){

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(()=>{
        if(currentMenu.includes('project')){
            setOpen(true);
        } else {
            setOpen(false);
        }
    },[currentMenu])

    return (
        <Grid container justifyContent={'center'}>
            <Grid container justifyContent={'center'}>
                <Grid item xs={10}>
                    <List
                        sx={{ width: '100%',}}
                    >
                    {menuList ? 
                        menuList.map((menu,i)=>{
                            const isActive = menu.to === currentMenu;
                            const Icon = menu.icon;
                            return (
                                <>
                                    <ListItemButton
                                        key={menu.to+'_'+i}
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
                                                    {menu.children.map((childMenu,i)=>{
                                                        const ChildIcon = childMenu.icon;
                                                        const isSubActive = childMenu.to === currentSubMenu;
                                                        return (
                                                            <ListItemButton 
                                                                key={childMenu.to+'_c'+i}
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