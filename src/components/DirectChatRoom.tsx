import { Card, CardContent, CardHeader, Grid, IconButton, TextField, Divider } from "@mui/material";
import ChatContent from "./ChatContent";
import SendIcon from '@mui/icons-material/Send';
import {useRef, useState,useEffect, KeyboardEventHandler} from 'react'
import { useQuery } from "@tanstack/react-query";
import { getChatList, getChatRoom } from "../api/Chat";

interface propType {
    chrId : string
}
export default function DirectChatRoom({
    chrId
}:propType){
    const chatArea = useRef<HTMLDivElement>(null);
    const textArea = useRef<HTMLDivElement>(null);

    const [chatText,setChatText] = useState('');
    
    useEffect(()=>{
        setTimeout(()=>{
            const textHeight = textArea.current!.offsetHeight;
            chatArea.current!.style.height = `calc(100% - ${textHeight}px)`;
        },0)
    },[chatText]);

    const [roomInfo, setRoomInfo] = useState<ChatRoom>();
    useQuery(['/chat','/chat/room'],()=>getChatRoom({chrId:chrId}),{
        onSuccess(data) {
            if(data.data.code === '0'){
                setRoomInfo(data.data.data);
            }
        },
    });

    const [ws, setWs] = useState<WebSocket>();
    useEffect(()=>{
        if(!ws){
            const webSocket = new WebSocket('ws://192.168.123.48:4000')
            webSocket.onopen = function(){
                const message : SocketData = {
                    code : 'access',
                    body : {
                        chrId : chrId
                    }
                }
                webSocket.send(JSON.stringify(message));
            }
            webSocket.onmessage = function(event){
                const data = JSON.parse(event.data);

                switch (data.code) {
                    case 'access':
                        fnAccess(data.body);
                        break;
                    case 'chat':
                        fnChat(data.body);
                        break;
                }
            }
            setWs(webSocket);
        }
        return ()=>{
            setWs(undefined);
        }
    },[]);

    function fnAccess(body : any){
        if(!body) alert('채팅방 입장 불가');
    }
    
    function fnChat(body : any){
        const list = [...chatListRef.current];
        list.push(body);
        setChatList(list);
    }
    function fnSendText(){
        if(chatText.trim()){
            if(ws){
                const message : SocketData = {
                    code : 'chat',
                    body : {
                        chrId : chrId,
                        chContent : chatText,
                        isThread : 'N'
                    }
                }
                ws.send(JSON.stringify(message));
                setChatText('');
            }
        }
    }

    const chatListRef = useRef<Chat[]>([]);
    const [chatList,setChatList] = useState<Chat[]>([]);
    useEffect(()=>{
        chatListRef.current = chatList;
        chatArea.current?.scrollTo(0,chatArea.current?.scrollHeight);
    },[chatList]);
    useQuery(['/chat/','/chat/list'],()=>getChatList({chrId:chrId}),{
        onSuccess(data) {
            if(data.data.code === '0'){
                setChatList(data.data.data);
            }
        },
    })

    const isShift = useRef(false);
    function fnkeyDown(e:any){
        if(e.key === 'Enter'){
            if(!isShift.current){
                e.preventDefault();
                fnSendText();
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

    return (
        <Card sx={{height: '100%'}}>
            <CardHeader title={roomInfo?.name?.split(',')[0] +'님과 ' +roomInfo?.name?.split(',')[1] + '님의 대화'}/>
            <CardContent sx={{height: '85%'}}>
                <Grid container sx={{height : '100%'}}>
                    <Grid sx={{height : '100%'}} item xs={12} border={"1px solid lightgrey"} padding={'15px'}>
                        <Grid ref={chatArea} sx={{overflowY:'auto'}}>
                            {chatList.map(chat=>{
                                return (
                                    <>
                                    <ChatContent key={chat.chId} chat={chat} />
                                    <Divider />
                                    </>
                                )
                            })}
                        </Grid>
                        <Grid ref={textArea} border={"1px solid lightgrey"} borderRadius={'5px'}>
                            <TextField multiline minRows={1} value={chatText} 
                                onChange={(e)=>{setChatText(e.target.value)}} 
                                onKeyDown={(e:any)=>fnkeyDown(e)}
                                onKeyUp={(e:any)=>fnkeyUp(e)}
                                fullWidth variant="outlined" 
                                placeholder="Type text"
                                maxRows={5}
                            />
                            <Grid>
                                <Grid container justifyContent={'flex-end'}>
                                    <IconButton onClick={fnSendText}>
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