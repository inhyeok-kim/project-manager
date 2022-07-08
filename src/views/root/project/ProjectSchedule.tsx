import { Card, CardContent, Grid, Paper } from "@mui/material";
import Calendar from "../../../components/Calendar";

export default function ProjectSchedule(){

    return (
        <Grid container>
            <Card sx={{width : '100%'}}>
                <CardContent>
                    <Calendar />
                </CardContent>
            </Card>
        </Grid>
    )
}