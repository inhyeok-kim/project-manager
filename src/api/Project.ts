import axios from "axios";
import { URL } from "./config";

export async function registProject(project : Project){
    return axios.post(URL+'/project',project,{
        withCredentials : true,
    });
}

export async function getMyProjectList(){
    return axios.get(URL+'/project/my',{
        withCredentials : true,
    });
}

export async function getProject(prId:string){
    return axios.get(URL+'/project',{
        withCredentials : true,
        params : {prId : prId}
    });
}