

import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { Sidebar } from "flowbite-react";
import { PiSignOutLight } from "react-icons/pi";

import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../store/auth";
import { Link, useNavigate } from "react-router";


export function Sidebardash() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { userInfo } = useSelector((state) => state.auth)
    const handelSignOut = async () => {
        dispatch(authActions.SignOutStart())
        try {
            const response = await fetch("/api/auth/signout", {
                method: 'POST'
            })
            const data = await response.json()
            if (response.ok) {
                dispatch(authActions.SignOutSuccess())
            }
            else {
                dispatch(authActions.SignOutFailure(data.error))
                navigate("/log-in")
            }
        } catch (error) {
            dispatch(authActions.SignOutFailure(error))
        }
    }
    return (
        <Sidebar aria-label="Sidebar with content separator example" >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item icon={PiSignOutLight} className="cursor-pointer">
                            Profile
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                {userInfo.IsAdmin && (
                    <Sidebar.ItemGroup>
                        <Link to="/dashboard?tab=creatProduct">
                            <Sidebar.Item icon={MdOutlineProductionQuantityLimits} className="cursor-pointer">
                                Create-Products
                            </Sidebar.Item>
                        </Link>
                        <Link to="/dashboard?tab=users">

                            <Sidebar.Item icon={MdOutlineProductionQuantityLimits} className="cursor-pointer">
                                Users
                            </Sidebar.Item>
                        </Link>
                        <Link to="/dashboard?tab=products">
                            <Sidebar.Item icon={MdOutlineProductionQuantityLimits} className="cursor-pointer">
                                products
                            </Sidebar.Item>
                        </Link>
                    </Sidebar.ItemGroup>
                )}



                <Sidebar.ItemGroup>
                    <Sidebar.Item icon={PiSignOutLight} className="cursor-pointer">
                        <span onClick={handelSignOut}>Sign Out</span>
                    </Sidebar.Item>

                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
