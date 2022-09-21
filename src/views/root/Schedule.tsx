import { Card, CardContent, Grid } from "@mui/material";
import Calendar from "../../components/Calendar";

export default function Schedule(){

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