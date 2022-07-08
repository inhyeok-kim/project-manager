import { Avatar, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";

export default function Chat(){

    return (
        <Grid container columnSpacing={3} sx={{height:'100%'}}>
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Direct Chat" />
                    <CardContent>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Someone Member" secondary="text text text text text text" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Someone Member" secondary="text text text text text text" />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Someone Member" secondary="text text text text text text" />
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={9} sx={{height:'100%'}}>
                <Card sx={{height: '100%'}}>
                    <CardHeader title="Someone Member"/>
                    <CardContent>
                        hi
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}