import { Link, Outlet } from "react-router-dom";

export default function Dashboard(){
    return (
        <div>
            Dashboard
            <Link to="/project/123">go Project</Link>
        </div>
    )
}