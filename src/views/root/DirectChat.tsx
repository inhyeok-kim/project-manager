import { Avatar, Button, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { borderRadius } from "@mui/system";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import ChatContent from "../../components/ChatContent";

export default function DirectChat(){
    const chatArea = useRef<HTMLDivElement>(null);
    const textArea = useRef<HTMLDivElement>(null);

    const [chatText,setChatText] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            const textHeight = textArea.current!.offsetHeight;
            chatArea.current!.style.height = `calc(100% - ${textHeight}px)`;
        },0)
    },[chatText]);

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
                    <CardContent sx={{height: '85%'}}>
                        <Grid container sx={{height : '100%'}}>
                            <Grid sx={{height : '100%'}} xs={12} border={"1px solid lightgrey"} padding={'15px'}>
                                <Grid ref={chatArea} sx={{overflowY:'auto'}}>
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                </Grid>
                                <Grid ref={textArea} border={"1px solid lightgrey"} borderRadius={'5px'}>
                                    <TextField multiline minRows={1} value={chatText} 
                                        onChange={(e)=>{setChatText(e.target.value)}} 
                                        fullWidth variant="outlined" 
                                        placeholder="Type text"
                                        maxRows={5}
                                    />
                                    <Grid>
                                        <Grid container justifyContent={'flex-end'}>
                                            <IconButton>
                                                <SendIcon />
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}