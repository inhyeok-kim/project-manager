import axios from "axios";
import { URL } from "./config";

export async function login(id:string, pwd : string){
    let flag = false;
    await axios.post(URL+'/auth',{
        id : id,
        pwd : pwd
    },{
        withCredentials : true
    })    
    .then(res=>{
        switch (res.data.code) {
            case 'E0':
                flag =  true;            
                break;
            default:
                break
        }
    })
    .catch(err=>{
        console.log(err);
    });
    return flag;
}
export async function logout(){
    await axios.get(URL+'/auth/logout',{
        withCredentials : true
    });
}

export async function loginCheck(){
    return await axios.get(URL+'/auth',{
        withCredentials : true
    });
}

