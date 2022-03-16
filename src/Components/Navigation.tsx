import { Link } from "react-router-dom";

import "./Navigation.css"

const Navigation = () => {
    return (
        <ul>
            <li><Link to="/dashboard" >Dashboard</Link></li>
            <li><Link to="/tasks" >Tasks</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li>Settings</li>
        </ul>
    )
}

export default Navigation;