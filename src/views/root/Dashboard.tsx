import { Button, Card, CardContent, CardHeader, Divider, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { blue, blueGrey, deepOrange, green, red } from "@mui/material/colors";
import Calendar from "../../components/Calendar";
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import TaskList from "../../components/TaskList";
import PeriodTaskChart from "../../components/PeriodTaskChart";
import { useEffect, useRef, useState } from "react";

export default function Dashboard(){

    return (
        <Grid container
            height="100%"
            justifyContent={"center"}
            >
            <Grid height="100%" item xs={12}>
                <Grid height="100%" container>
                    <Grid item xs={12} height="13%">
                        <Grid 
                            container
                            height="100%"
                            columnSpacing={3}
                        >
                            <Grid  height="100%" item xs={3}>
                                <Card sx={{width : '100%',height:'100%'}}>
                                    <CardContent sx={{height:'100%'}}>
                                        <Grid container sx={{height:'70%'}}>
                                            <Grid item xs={9}>
                                                <Typography fontWeight={600} color={blueGrey[500]}>Today's Works</Typography>
                                                <Grid container alignItems={"flex-end"}>
                                                    <Typography variant="h5" fontWeight={'bold'} color={blueGrey[700]}>3</Typography>
                                                    <Typography fontWeight={600} color={blueGrey[600]} >&nbsp;/ 3</Typography>
                                                    <Typography fontWeight={600} color={blue[500]} >&nbsp; 100%</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid sx={{height:'100%',backgroundColor:blueGrey[500],borderRadius:'5px'}} container justifyContent={"center"} alignItems={"center"}>
                                                    <Icon style={{color:'white'}} fontSize="large"><TodayIcon fontSize="large"/></Icon>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid height="100%" item xs={3}>
                                <Card sx={{width : '100%',height:'100%'}}>
                                    <CardContent sx={{height:'100%'}}>
                                        <Grid container sx={{height:'70%'}}>
                                            <Grid item xs={9}>
                                                <Typography fontWeight={600} color={blueGrey[500]}>Week's Works</Typography>
                                                <Grid container alignItems={"flex-end"}>
                                                    <Typography variant="h5" fontWeight={'bold'} color={blueGrey[700]}>5</Typography>
                                                    <Typography fontWeight={600} color={blueGrey[600]} >&nbsp;/ 10</Typography>
                                                    <Typography fontWeight={600} color={green[500]} >&nbsp; 50%</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid sx={{height:'100%',backgroundColor:blueGrey[500],borderRadius:'5px'}} container justifyContent={"center"} alignItems={"center"}>
                                                    <Icon style={{color:'white'}} fontSize="large"><DateRangeIcon fontSize="large"/></Icon>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid height="100%" item xs={3}>
                                <Card sx={{width : '100%',height:'100%'}}>
                                    <CardContent sx={{height:'100%'}}>
                                        <Grid container sx={{height:'70%'}}>
                                            <Grid item xs={9}>
                                                <Typography fontWeight={600} color={blueGrey[500]}>Month's Works</Typography>
                                                <Grid container alignItems={"flex-end"}>
                                                    <Typography variant="h5" fontWeight={'bold'} color={blueGrey[700]}>5</Typography>
                                                    <Typography fontWeight={600} color={blueGrey[600]} >&nbsp;/ 25</Typography>
                                                    <Typography fontWeight={600} color={deepOrange[500]} >&nbsp; 20%</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid sx={{height:'100%',backgroundColor:blueGrey[500],borderRadius:'5px'}} container justifyContent={"center"} alignItems={"center"}>
                                                    <Icon style={{color:'white'}} fontSize="large"><CalendarMonthIcon fontSize="large"/></Icon>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid height="100%" item xs={3}>
                                <Card sx={{width : '100%',height:'100%'}}>
                                    <CardContent sx={{height:'100%'}}>
                                        <Grid container sx={{height:'70%'}}>
                                            <Grid item xs={9}>
                                                <Typography fontWeight={600} color={blueGrey[500]}>Delayed Works</Typography>
                                                <Grid container alignItems={"flex-end"}>
                                                    <Typography variant="h5" fontWeight={'bold'} color={blueGrey[700]}>1</Typography>
                                                    <Typography fontWeight={600} color={blueGrey[600]} >&nbsp;/ 2</Typography>
                                                    <Typography fontWeight={600} color={red[600]} >&nbsp; 50%</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Grid sx={{height:'100%',backgroundColor:blueGrey[500],borderRadius:'5px'}} container justifyContent={"center"} alignItems={"center"}>
                                                    <Icon style={{color:'white'}} fontSize="large"><WatchLaterIcon fontSize="large"/></Icon>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} height="87%" marginTop={'2%'}>
                        <Grid 
                            height="90%"
                            container
                            columnSpacing={3}
                        >
                            <Grid item xs={6} height="100%">
                                <Grid container flexDirection={"row"} rowSpacing={0} sx={{height:'100%'}}>
                                    <Grid item xs={12} sx={{height:'50%'}}>
                                        <Card sx={{width : '100%',height:'95%', overflow:'auto'}}>
                                            <Typography bgcolor={blueGrey[500]} position={'sticky'} top={'0px'} padding={'5px 10px 5px 10px'} fontWeight={600} color={"white"}>Upcoming Task</Typography>
                                            <CardContent  sx={{height:'80%'}}>
                                                <TaskList type="person" />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12} sx={{height:'50%'}}>
                                        <Card sx={{width : '100%', height:'100%'}}>
                                            <Typography bgcolor={blueGrey[500]} position={'sticky'} top={'0px'} padding={'5px 10px 5px 10px'} fontWeight={600} color={"white"}>Monthly Task</Typography>
                                            <CardContent sx={{width : '100%', height:'96%', boxSizing:'border-box'}}>
                                                <PeriodTaskChart/>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} height="100%">
                                <Card sx={{width : '100%',height:"100%"}}>
                                    <CardContent sx={{height:"100%"}}>
                                        <Calendar />
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}