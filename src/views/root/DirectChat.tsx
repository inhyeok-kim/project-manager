import { Avatar, Card, CardContent, CardHeader, Grid, IconButton, List, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import { SearchMemberModal } from "../../components/SelectMember";
import { getDirectChatRoomIdWithMember, getMyDirectChatRoom, registChat } from "../../api/Chat";
import { useQuery } from "@tanstack/react-query";
import DirectChatRoom from "../../components/DirectChatRoom";

export default function DirectChat(){
    const [rooms,setRooms] = useState([]);
    const roomQuery = useQuery(['/chat','/chat/rooms/direct'],getMyDirectChatRoom,{
        onSuccess(data) {
            if(data.data.code === '0'){
                setRooms(data.data.data);
            }
        },
    });

    const [searchMemberModalOpen, setSearchMemberModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState<string>();
    async function fnSelectMember(member : Member){
        setSearchMemberModalOpen(false);
        const result = await getDirectChatRoomIdWithMember({memId : member.memId});
        if(result.data){
            if(result.data.data.chrId){
                setSelectedRoomId(result.data.data.chrId)
            } else {
                const _result = await registChat({isDirect:'Y',membersId:[member.memId!]});
                if(_result){
                    if(_result.data.code === '0'){
                        roomQuery.refetch();
                        setSelectedRoomId(_result.data.data.chrId);
                    }
                }
            }
        }
    }

    return (
        <Grid container columnSpacing={3} sx={{height:'100%'}}>
            <Grid item xs={3}>
                <Card>
                    <CardHeader title="Direct Chat" />
                    <CardContent>
                        <SearchMemberModal value={[]} open={searchMemberModalOpen} choiceMember={fnSelectMember} closeDialog={()=>{setSearchMemberModalOpen(false)}} />
                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItemButton divider onClick={()=>{setSearchMemberModalOpen(true)}}>
                                <ListItemIcon>
                                    <AddIcon />
                                </ListItemIcon>
                                <ListItemText primary="New Chat"/>
                            </ListItemButton>
                            {
                                rooms.map((room:ChatRoom)=>{
                                    return (
                                        <ListItemButton divider onClick={()=>{setSelectedRoomId(room.chrId)}}>
                                            <ListItemAvatar>
                                                <Avatar>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={room.name} secondary="text text text text text text" />
                                        </ListItemButton>
                                    )
                                })
                            }
                        </List>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={9} sx={{height:'100%'}}>
                {selectedRoomId ?
                    <DirectChatRoom key={selectedRoomId} chrId={selectedRoomId} />
                    :''
                }
            </Grid>
        </Grid>
    )
}