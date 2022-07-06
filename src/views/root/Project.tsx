import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';

export default function Project(){
    const navigate = useNavigate();
    let number = useParams().number;
    const params = useParams();

    return (
        <div>
            Project
            {params.projectId}
        </div>
    )
}