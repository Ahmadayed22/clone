import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import CreatePorduct from "../component/CreatePorduct"
import { Sidebardash } from "../component/Sidebardash"
import DashUsers from "../component/Dashuser"
import Dashproduct from "../component/Dashproduct"
import DashProfile from "../component/Dashprofile"


const Dashboard = () => {
    const location = useLocation()
    const [tab, setTab] = useState("")
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get("tab")

        if (tabFormUrl) {
            setTab(tabFormUrl)
        }
    }, [location.search])
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Sidebardash />

            <div className="flex-1">

                {tab === 'users' ? <DashUsers /> : (null)}
                {tab === 'creatProduct' ? <CreatePorduct /> : (null)}
                {tab === 'products' ? <Dashproduct /> : (null)}
                {tab === 'profile' ? <DashProfile /> : (null)}

            </div>
        </div>
    )
}

export default Dashboard
