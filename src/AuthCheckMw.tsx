import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function AuthCheckMw(){
    const navigate = useNavigate();
    const [login, setLogin] = useState(false);

    useEffect(()=>{
        if(!login){
            navigate('/login');
        }
    },[]);
    return null
}