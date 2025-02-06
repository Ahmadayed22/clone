import { CiHeart } from "react-icons/ci";
import { AiOutlineSearch } from 'react-icons/ai';
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import { Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { authActions } from "../store/auth";
import { GoSignOut } from "react-icons/go";


export function Header() {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const path = useLocation().pathname
    const { userInfo } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    // if (userInfo) {
    //     console.log(userInfo)
    // }
    const handelSignOut = async () => {
        dispatch(authActions.SignOutStart())
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
                method: 'POST'
            })
            const data = await response.json()
            if (response.ok) {
                navigate("/sign-up")
                dispatch(authActions.SignOutSuccess())
            }
            else {

                dispatch(authActions.SignOutFailure(data.error))

            }
        } catch (error) {
            dispatch(authActions.SignOutFailure(error))
        }
    }
    return (
        <Navbar rounded className="container mx-auto">

            <Navbar.Brand href="https://flowbite-react.com">
                {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Furniro</span>
            </Navbar.Brand>

            <Navbar.Toggle />
            <Navbar.Collapse className="hidden">
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>Home</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/shope'} as={'div'}>
                    <Link to='/shope' >shope</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/about'} as={'div'}>
                    <Link to='/about'>about</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/contact'} as={'div'}>
                    <Link to='/contact'>contact</Link>
                </Navbar.Link>
            </Navbar.Collapse>

            <Navbar.Collapse className="">
                <Navbar.Link href="#" >

                    <div className="flex md:order-2 ">
                        {userInfo ? (
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <FaRegUserCircle className="w-4 h-4" />
                                }
                            >
                                <Dropdown.Header>
                                    <span className="block text-sm">{userInfo.username || userInfo.user.username}</span>
                                    <span className="block truncate text-sm font-medium">{userInfo.email || userInfo.user.email}</span>
                                </Dropdown.Header>
                                <Link to="/dashboard?tab=profile">
                                    <Dropdown.Item>
                                        Dashboard
                                    </Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handelSignOut}>Sign out</Dropdown.Item>
                            </Dropdown>

                        ) : (
                            <Link to="/sign-up"><Navbar.Link className="text-center"><GoSignOut /></Navbar.Link></Link>
                        )}

                    </div>

                </Navbar.Link>

                <Navbar.Link href="#" active>
                    <CiHeart className="w-4 h-4" />
                </Navbar.Link>
                <Navbar.Link href="#"><AiOutlineSearch className="w-4 h-4" /></Navbar.Link>
                <Navbar.Link href="#"><CiShoppingCart className="w-4 h-4" /></Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
