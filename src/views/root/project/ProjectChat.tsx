import { Card, CardContent, CardHeader, Grid, IconButton, TextField, Divider } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useRef, useState } from "react";
import ChatContent from "../../../components/ChatContent";
import { useQuery } from "@tanstack/react-query";
import { getChatList, getChatRoom } from "../../../api/Chat";
import { ChatThread } from "../../../components/ChatThread";

interface propType {
    prId : string
}
export default function ProjectChat({
    prId
}:propType){

    const [roomInfo,setRoomInfo] = useState<ChatRoom>();
    useEffect(()=>{
        getChatRoom({prId:prId})
        .then(result=>{
            if(result.data.code === '0'){
                setRoomInfo(result.data.data);
            }
        })
    },[]);

    const chatListQuery = useQuery(['/project/chat'],()=>getChatList({chrId:roomInfo!.chrId}),{
        onSuccess(data) {
            if(data.data.code === '0'){
                setChatList(data.data.data);
            }
        },
        enabled : !!roomInfo
    })

    const chatArea = useRef<HTMLDivElement>(null);
    const textArea = useRef<HTMLDivElement>(null);

    const [chatText,setChatText] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            const textHeight = textArea.current!.offsetHeight;
            chatArea.current!.style.height = `calc(100% - ${textHeight}px)`;
        },0)
    },[chatText]);

    const [ws, setWs] = useState<WebSocket>();
    useEffect(()=>{
        if(!ws && roomInfo){
            const webSocket = new WebSocket('ws://192.168.123.48:4000')
            webSocket.onopen = function(){
                const message : SocketData = {
                    code : 'access',
                    body : {
                        chrId : roomInfo!.chrId
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
    },[roomInfo]);

    function fnAccess(body : any){
        if(!body) alert('채팅방 입장 불가');
    }
    
    function fnChat(body : any){
        if(body.isThread === 'N'){
            const list = [...chatListRef.current];
            list.push(body);
            setChatList(list);
        } else {
            if(selectedChatRef.current && body.upperCh === selectedChatRef.current){
                setNewThreadChat(body);
            }
        }
    }
    const [newThreadChat, setNewThreadChat] = useState();

    function fnSendText(){
        if(chatText.trim()){
            if(ws){
                const message : SocketData = {
                    code : 'chat',
                    body : {
                        chrId : roomInfo!.chrId,
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

    function fnThreadSend(text:string){
        if(text.trim()){
            if(ws){
                const message : SocketData = {
                    code : 'chat',
                    body : {
                        chrId : roomInfo!.chrId,
                        chContent : text,
                        isThread : 'Y',
                        upperCh : selectedChat
                    }
                }
                ws.send(JSON.stringify(message));
            }
        }
    }

    const selectedChatRef = useRef('');
    const [selectedChat, setSelectedChat] = useState('');
    useEffect(()=>{
        selectedChatRef.current = selectedChat
    },[selectedChat])

    return (
        <Grid container columnSpacing={3}>
            <Grid item xs={8} sx={{height:'75vh', minHeight : '645px'}}>
                <Card sx={{height:'100%'}}>
                    <CardContent sx={{height: '95%'}}>
                        <Grid container sx={{height : '100%'}}>
                            <Grid item xs={12} sx={{height : '100%'}} border={"1px solid lightgrey"} padding={'15px'}>
                                <Grid ref={chatArea} sx={{overflowY:'auto'}}>
                                    {chatList.map(chat=>{
                                        return (
                                            <>
                                                <ChatContent key={chat.chId} chat={chat} onClick={setSelectedChat} />
                                                <Divider key={'div'+chat.chId}  />
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
            </Grid>
            <Grid item xs={4} sx={{height:'75vh', minHeight : '645px'}}>
                {
                    selectedChat?
                        <ChatThread newChat={newThreadChat} chrId={roomInfo!.chrId!} chId={selectedChat!} onSend={fnThreadSend}/>
                    :''
                }
            </Grid>
        </Grid>
    )
}