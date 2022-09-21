import { useEffect } from 'react';

export default function useInterval(
    callback : Function, delay : number
){
    useEffect(()=>{
        if(delay){
            let intv = setInterval(callback,delay);
            return ()=>clearInterval(intv);
        }
    })
}