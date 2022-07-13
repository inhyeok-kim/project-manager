import { Avatar, Card, CardContent, CardHeader, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

export default function DirectChat(){

    return (
        <Grid container columnSpacing={3} sx={{height:'100%'}}>
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Direct Chat" />
                    <CardContent>
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItemButton divider>
                                <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Someone Member" secondary="text text text text text text" />
                            </ListItemButton>
                            <ListItemButton divider>
                                <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Someone Member" secondary="text text text text text text" />
                            </ListItemButton>
                            <ListItemButton divider>
                                <ListItemAvatar>
                                <Avatar>
                                </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Someone Member" secondary="text text text text text text" />
                            </ListItemButton>
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