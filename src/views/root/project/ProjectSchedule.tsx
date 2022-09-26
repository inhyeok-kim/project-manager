import { Card, CardContent, Grid } from "@mui/material";
import Calendar from "../../../components/Calendar";

interface propType {
    prId : string
}
export default function ProjectSchedule({
    prId
}:propType){

    return (
        <Grid container>
            <Card sx={{width : '100%'}}>
                <CardContent>
                    <Calendar prId={prId} type="project" />
                </CardContent>
            </Card>
        </Grid>
    )
}