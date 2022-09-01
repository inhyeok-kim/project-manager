import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from "react";
import ChatContent from "../../../components/ChatContent";

export default function ProjectChat(){
    const chatArea = useRef<HTMLDivElement>(null);
    const textArea = useRef<HTMLDivElement>(null);

    const [chatText,setChatText] = useState('');

    const threadChatArea = useRef<HTMLDivElement>(null);
    const threadTextArea = useRef<HTMLDivElement>(null);

    const [threadChatText,setThreadChatText] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            const textHeight = textArea.current!.offsetHeight;
            chatArea.current!.style.height = `calc(100% - ${textHeight}px)`;
        },0)
    },[chatText]);

    useEffect(()=>{
        setTimeout(()=>{
            const textHeight = threadTextArea.current!.offsetHeight;
            threadChatArea.current!.style.height = `calc(100% - ${textHeight}px)`;
        },0)
    },[threadChatText]);

    return (
        <Grid container columnSpacing={3}>
            <Grid item xs={8}>
                <Card sx={{height:'75vh', minHeight : '645px'}}>
                    <CardContent sx={{height: '95%'}}>
                        <Grid container sx={{height : '100%'}}>
                            <Grid item xs={12} sx={{height : '100%'}} border={"1px solid lightgrey"} padding={'15px'}>
                                <Grid ref={chatArea} sx={{overflowY:'auto'}}>
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
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
            <Grid item xs={4}>
                <Card sx={{height: '75vh', minHeight : '645px'}}>
                    <CardHeader title="Thread"/>
                    <CardContent sx={{height: '85%'}}>
                        <Grid container sx={{height : '100%'}}>
                            <Grid item xs={12} sx={{height : '100%'}} border={"1px solid lightgrey"} padding={'15px'}>
                                <Grid ref={threadChatArea} sx={{overflowY:'auto'}}>
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                    <ChatContent />
                                </Grid>
                                <Grid ref={threadTextArea} border={"1px solid lightgrey"} borderRadius={'5px'}>
                                    <TextField multiline minRows={1} value={threadChatText} 
                                        onChange={(e)=>{setThreadChatText(e.target.value)}} 
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