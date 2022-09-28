import axios from "axios";
import { URL } from "./config";

export async function registChat(room : ChatRoom){
    return axios.post(URL+'/chat/room',room,{
        withCredentials : true,
    });
}

export async function getMyDirectChatRoom(){
    return axios.get(URL+'/chat/rooms/direct',{
        withCredentials : true,
    });
}

export async function getChatRoom(room:ChatRoom){
    return axios.get(URL+'/chat/room',{
        withCredentials : true,
        params : room
    });
}

export async function getDirectChatRoomIdWithMember(room:ChatRoom){
    return axios.get(URL+'/chat/room/direct/with',{
        withCredentials : true,
        params : room
    });
}

export async function getChatList(chat:Chat){
    return axios.get(URL+'/chat/list',{
        withCredentials : true,
        params : chat
    });
}

export async function getChat(chat:Chat){
    return axios.get(URL+'/chat',{
        withCredentials : true,
        params : chat
    });
}