import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { loginCheck } from "./api/Auth";

interface propType {
    login : boolean
    onLogin : Function
}
export default function AuthCheckMw({
    login,onLogin
}:propType){
    const navigate = useNavigate();

    useQuery(['/auth'],loginCheck,{
        onSuccess(data) {
            if(data){
                if(data.data.code === '0') {
                    onLogin(true);
                } else {
                    onLogin(false);
                    navigate('/login');
                }
            }
        },
    });

    return null
}