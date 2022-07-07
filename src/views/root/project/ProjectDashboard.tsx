import { Button, Card, CardContent, CardHeader, Divider, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, Paper, Stack, Typography } from "@mui/material";
import { blue, blueGrey, deepOrange, green, red } from "@mui/material/colors";
import Calendar from "../../../components/Calendar";
import TodayIcon from '@mui/icons-material/Today';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

export default function ProjectDashboard(){
    return (
        <Grid container
            justifyContent={"center"}
            >
            <Grid item xs={12}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Grid 
                            container
                            spacing={3}
                        >
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        <Grid container>
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
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        <Grid container>
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
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        <Grid container>
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
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        <Grid container>
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
                    <Grid item xs={12}>
                        <Grid 
                            container
                            spacing={3}
                        >
                            <Grid item xs={6}>
                                <Grid container rowSpacing={0} sx={{height:'100%'}}>
                                    <Grid item xs={12}>
                                        <Card sx={{width : '100%',height:'90%'}}>
                                            <CardContent>
                                                업무 목록
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Card sx={{width : '100%',height:'100%'}}>
                                            <CardContent>
                                                기간별 업무량 차트
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
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