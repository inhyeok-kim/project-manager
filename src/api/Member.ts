import axios from "axios";
import { URL } from "./config";

export async function searchMemberList(search:Member){
    return axios.get(URL+'/member/search',{
        withCredentials : true,
        params : search
    });
}

export async function selectMyInfo(){
    return axios.get(URL+'/member/me',{
        withCredentials : true
    })
}