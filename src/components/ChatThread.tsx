import { Card, CardContent, CardHeader, Grid, IconButton, TextField, Divider } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useQuery } from "@tanstack/react-query";
import { getChat, getChatList } from "../api/Chat";
import ChatContent from "./ChatContent";

interface propType {
    chId : string
    onSend : Function
    newChat? : Chat
    chrId : string
}
export function ChatThread({
    chrId, chId, onSend, newChat
}: propType){
    const [chatInfo, setChatInfo] = useState<Chat>();
    const chatQuery = useQuery(['/chat/thread'],()=>getChat({chId}),{
        onSuccess(data) {
            if(data.data.code === '0'){
                setChatInfo(data.data.data);
            }
        },
    });
    useEffect(()=>{
        chatQuery.refetch();
    },[chId]);

    useEffect(()=>{
        if(chatInfo?.chrId){
            chatListQuery.refetch();
        }
    },[chatInfo])

    const threadChatArea = useRef<HTMLDivElement>(null);
    const threadTextArea = useRef<HTMLDivElement>(null);

    const [threadChatText,setThreadChatText] = useState('');
    useEffect(()=>{
        setTimeout(()=>{
            const textHeight = threadTextArea.current!.offsetHeight;
            threadChatArea.current!.style.height = `calc(100% - ${textHeight}px)`;
        },0)
    },[threadChatText]);

    const [chatList,setChatList] = useState<Chat[]>([]);
    useEffect(()=>{
        threadChatArea.current?.scrollTo(0,threadChatArea.current?.scrollHeight);
    },[chatList]);

    const chatListQuery = useQuery(['/project/chat/thread'],()=>getChatList({chrId : chrId ,upperCh : chId}),{
        onSuccess(data) {
            if(data.data.code === '0'){
                setChatList(data.data.data);
            }
        },
        enabled : !!chatInfo
    })

    function fnChat(){
        onSend(threadChatText);
        setThreadChatText('');
    }

    const isShift = useRef(false);
    function fnkeyDown(e:any){
        if(e.key === 'Enter'){
            if(!isShift.current){
                e.preventDefault();
                fnChat();
            }
        }
        if(e.key === 'Shift'){
            isShift.current = true;
        }
    }
    function fnkeyUp(e:any){
        if(e.key === 'Shift'){
            isShift.current = false;
        }
    }

    useEffect(()=>{
        if(newChat){
            const list = [...chatList];
            list.push(newChat);
            setChatList(list);
        }
    },[newChat]);

    return (
        <Card sx={{height: '100%'}}>
            <CardHeader title="Thread"/>
            <CardContent sx={{height: '85%'}}>
                <Grid container sx={{height : '100%'}}>
                    <Grid item xs={12} sx={{height : '100%'}} border={"1px solid lightgrey"} padding={'15px'}>
                        <Grid ref={threadChatArea} sx={{overflowY:'auto'}}>
                            {chatInfo?
                                <ChatContent chat={chatInfo!}/>
                                :
                                ''
                            }
                            <Divider />
                            {chatList.map((chat)=>{
                                return <ChatContent key={chat.chId} chat={chat}/>
                            })
                            }
                        </Grid>
                        <Grid ref={threadTextArea} border={"1px solid lightgrey"} borderRadius={'5px'}>
                            <TextField multiline minRows={1} value={threadChatText} 
                                onChange={(e)=>{setThreadChatText(e.target.value)}} 
                                onKeyDown={(e:any)=>fnkeyDown(e)}
                                onKeyUp={(e:any)=>fnkeyUp(e)}
                                fullWidth variant="outlined" 
                                placeholder="Type text"
                                maxRows={5}
                            />
                            <Grid>
                                <Grid container justifyContent={'flex-end'}>
                                    <IconButton onClick={fnChat}>
                                        <SendIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}