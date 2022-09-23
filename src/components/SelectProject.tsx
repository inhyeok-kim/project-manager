import {MenuItem, Select} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProjectList } from "../api/Project";

interface propType {
    value : string
    onChange : Function
    variant? : "standard" | "outlined" | "filled" | undefined
    fullWidth? : boolean
}

export default function SelectProject({
    value,onChange,
    variant,
    fullWidth = false
} : propType){

    const projectList = useMyProject();

    return (
        <Select
            variant={variant}
            sx={{minWidth:'150px'}}
            value={value}
            fullWidth={fullWidth}
            onChange={(e)=>{onChange(e.target.value)}}
            >
                <MenuItem value=''>Unselected</MenuItem>
                {
                    projectList.map(project=>
                        <MenuItem value={project.prId}>{project.prName}</MenuItem>
                    )
                }
        </Select>
    )
}

function useMyProject(){
    const [list, setList] = useState<Project[]>([]);
    const navigate = useNavigate();

    const {data} = useQuery(['/project','/project/my'],getMyProjectList,{
        onSuccess : data => {
            if(data.data.code === 'A1') navigate('/login');
            setList(data.data.data);
        }
    });

    return list;
}