import axios from "axios";
import { URL } from "./config";

export async function test(){
    await axios.get(URL+'/test',{
        withCredentials : true
    });

}