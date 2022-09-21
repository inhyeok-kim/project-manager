import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

interface propType {
    login : boolean
    onLogin : Function
}
export default function AuthCheckMw({
    login,onLogin
}:propType){
    const navigate = useNavigate();

    useEffect(()=>{
        if(!login){
            onLogin(true);
            navigate('/login');
        }
    },[]);
    return null
}