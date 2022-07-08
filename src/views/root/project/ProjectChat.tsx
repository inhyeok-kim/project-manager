import { Avatar, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function ProjectChat(){

    return (
        <Grid container columnSpacing={3}>
            <Grid item xs={8}>
                <Card sx={{height:'75vh', minHeight : '645px'}}>
                    <CardContent>
                        hi
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={4}>
                <Card sx={{height: '75vh', minHeight : '645px'}}>
                    <CardHeader title="Thread"/>
                    <CardContent>
                        hi
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}