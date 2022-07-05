import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Project(){
    const navigate = useNavigate();
    let number = useParams().number;

    return (
        <div>
            Project
            <br/>
            {number}
            <br/>
            <Button onClick={()=>{
                navigate("/");
            }} variant="contained">go Dashboard</Button>
        </div>
    )
}