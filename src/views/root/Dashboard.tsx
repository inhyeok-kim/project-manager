import { Card, CardContent, Grid } from "@mui/material";
import Calendar from "../../components/Calendar";

export default function Dashboard(){
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
                                        hi hello
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        hi hello
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        hi hello
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={3}>
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        hi hello
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
                                <Card sx={{width : '100%'}}>
                                    <CardContent>
                                        hi hello
                                    </CardContent>
                                </Card>
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