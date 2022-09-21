import axios from "axios";
import { URL } from "./config";

export async function searchMemberList(search:Member){
    const params = new URLSearchParams();
    Object.keys(search).forEach(key=>{
        params.append(key,search[key])
    });
    const list = await axios.get(URL+'/member/search',{
        withCredentials : true,
        params : params
    });
    return list.data.data;
}