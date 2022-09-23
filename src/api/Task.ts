import axios from "axios";
import { URL } from "./config";

export async function registTask(task : Task){
    return axios.post(URL+'/task',task,{
        withCredentials : true,
    });
}
export async function updateTask(task : Task){
    return axios.put(URL+'/task',task,{
        withCredentials : true,
    });
}
export async function deleteTask(taskId : string){
    return axios.delete(URL+'/task',{
        withCredentials : true,
        params : {taskId:taskId}
    });
}

export async function getTask(search:Task){
    return axios.get(URL+'/task',{
        withCredentials : true,
        params : search
    });
}

export async function getMyTaskList(search:Task){
    return axios.get(URL+'/task/my',{
        withCredentials : true,
        params : search
    });
}

export async function getProjectTaskList(search:Task){
    return axios.get(URL+'/task/project',{
        withCredentials : true,
        params : search
    });
}