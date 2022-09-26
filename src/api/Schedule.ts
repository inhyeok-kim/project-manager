import axios from "axios";
import { URL } from "./config";

export async function registSchedule(schedule : Schedule){
    return axios.post(URL+'/schedule',schedule,{
        withCredentials : true,
    });
}
export async function updateSchedule(schedule : Schedule){
    return axios.put(URL+'/schedule',schedule,{
        withCredentials : true,
    });
}
export async function deleteSchedule(schId : string){
    return axios.delete(URL+'/schedule',{
        withCredentials : true,
        params : {schId:schId}
    });
}

export async function getSchedule(search:Schedule){
    return axios.get(URL+'/schedule',{
        withCredentials : true,
        params : search
    });
}

export async function getMyScheduleList(search:Schedule){
    return axios.get(URL+'/schedule/my',{
        withCredentials : true,
        params : search
    });
}

export async function getProjectScheduleList(search:Schedule){
    return axios.get(URL+'/schedule/project',{
        withCredentials : true,
        params : search
    });
}