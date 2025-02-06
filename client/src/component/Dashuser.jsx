import { Button, Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from "react-router";
import { IoMdSearch } from "react-icons/io";
const DashUsers = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const { userInfo } = useSelector((state) => state.auth);
    const [users, setusers] = useState([]);
    const [ShowMore, SetShowMore] = useState(true);
    const [showModal, SetShowModal] = useState(false);
    const [userIdToDelete, setuserIdToDelete] = useState('');
    const [search, setSearch] = useState('')
    "${API_BASE_URL}/api/user/getusers/searchTerm=${search}"
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/api/user/getusers `, {
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await res.json();
                console.log(data.users.length)
                if (res.ok) {
                    setusers(data.users);
                    if (data.users.length < 5) {
                        SetShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (userInfo.IsAdmin) {
            fetchUsers();
        }

    }, [userInfo]);

    const handleShowMore = async () => {
        const startIndex = users.length
        try {
            const res = await fetch(`${API_BASE_URL}/api/user/getusers?startIndex=${startIndex}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();

            if (res.ok) {
                setusers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    SetShowMore(false);
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandelDelteUser = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/user/delete/:${userIdToDelete}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const data = await res.json();
            if (!res.ok) {
                console.log(data.error)
            }
            if (res.ok) {
                setusers((prev) => prev.filter((user) => user._id != userIdToDelete))
                SetShowModal(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!search) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/user/getusers?searchTerm=${search}`, {
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const data = await res.json();
            console.log(data)
            if (res.ok) {
                setusers(data.users);
                SetShowMore(false);
            } else {
                console.log(data.error);
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 '>
            <div className="border-b-4 my-4 flex justify-between ">
                <Link to='/createuser'><Button className="border mb-4">Add User</Button></Link>
                <form onSubmit={handleSearch}>
                    <TextInput id="search" type="text" rightIcon={IoMdSearch} placeholder="Search By Username" required
                        onChange={(e) => setSearch(e.target.value)} value={search} />
                </form>
            </div>


            {userInfo.IsAdmin && users.length > 0 ? (
                <>


                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date created</Table.HeadCell>

                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            <Table.Body key={user._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.IsAdmin ? (<FaCheck className='text-green-500' />) : (<FaTimes className='text-red-500' />)}</Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => {
                                            SetShowModal(true);
                                            setuserIdToDelete(user._id)

                                        }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'>
                                            Delete
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='text-teal-500 hover:underline'
                                            to={`/updateuser/${user._id}`}
                                        >
                                            <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {ShowMore && (
                        <button onClick={handleShowMore} className="w-full self-center text-teal-500 text-sm py-7">Show More</button>
                    )}
                </>
            ) : (
                <p>You have no users yet!</p>
            )}
            <Modal show={showModal} size="md" onClose={() => SetShowModal(false)} popup >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete Your user?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={HandelDelteUser} >
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => SetShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default DashUsers;