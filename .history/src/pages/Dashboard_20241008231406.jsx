import { Outlet } from "react-router-dom";
import BottomNav from "../component/BottomNav";
import TopNav from "../component/TopNav";
import Layout from "../Layout/Layout";

const Dashboard = () => {
    return (
        <div>
            <TopNav />
            <Outlet />
            <BottomNav />
        </div>
    );
};

export default Dashboard;