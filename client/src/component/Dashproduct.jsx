import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashproduct = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const [userProduct, setuserProduct] = useState([]);
    const [ShowMore, SetShowMore] = useState(true);
    const [showModal, SetShowModal] = useState(false);
    const [producttIdToDelete, setproducttIdToDelete] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`/api/products/getproduct?userId=${userInfo._id}`);
                const data = await res.json();
                if (res.ok) {
                    setuserProduct(data.products);
                    if (data.products.length < 9) {
                        SetShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (userInfo.IsAdmin) {
            fetchProduct();
        }
    }, [userInfo]);
    const handleShowMore = async () => {
        const startIndex = userInfo.length
        try {
            const res = await fetch(`/api/products/getproduct?userId=${userInfo._id}&startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setuserProduct((prev) => [...prev, ...data.products]);
                if (data.products.length < 9) {
                    SetShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const HandelDeleteProduct = async () => {
        SetShowModal(false);
        try {

            const res = await fetch(`/api/products/deletProduct/:${producttIdToDelete}/${userInfo._id}`, {
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
            else {
                setuserProduct((prev) => prev.filter((product) => product._id !== producttIdToDelete))
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {userInfo.IsAdmin && userProduct.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Date updated</Table.HeadCell>

                            <Table.HeadCell>product title</Table.HeadCell>
                            <Table.HeadCell>product Description</Table.HeadCell>
                            <Table.HeadCell>product price</Table.HeadCell>

                            <Table.HeadCell>Delete</Table.HeadCell>

                        </Table.Head>
                        {userProduct.map((product) => (
                            <Table.Body key={product._id} className='divide-y'>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>
                                        {new Date(product.updatedAt).toLocaleDateString()}
                                    </Table.Cell>

                                    <Table.Cell>
                                        {product.title}

                                    </Table.Cell>
                                    <Table.Cell>

                                        {product.description}

                                    </Table.Cell>
                                    <Table.Cell>

                                        {product.price}

                                    </Table.Cell>

                                    <Table.Cell>
                                        <span onClick={() => {
                                            SetShowModal(true);
                                            setproducttIdToDelete(product._id)


                                        }}
                                            className='font-medium text-red-500 hover:underline cursor-pointer'>
                                            Delete
                                        </span>
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
                <p>You have no products yet!</p>
            )}
            <Modal show={showModal} size="md" onClose={() => SetShowModal(false)} popup >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete Your product?
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={HandelDeleteProduct}>
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

export default Dashproduct;