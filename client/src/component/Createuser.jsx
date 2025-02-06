import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store/auth'
const Createuser = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const navigate = useNavigate()
    const [inputForm, SetInputForm] = useState({})
    const dispatch = useDispatch()

    const { loading, error } = useSelector((state) => state.auth);
    const handelInputForm = (e) => {
        const { id, value } = e.target;

        SetInputForm((prev) => ({
            ...prev,
            [id]: id === "IsAdmin" ? value === "true" : value, // Convert to boolean for IsAdmin
        }));
    };

    const handelSubmit = async (e) => {
        e.preventDefault();
        dispatch(authActions.SignInStart())
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/createUser`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputForm)
            })
            const data = await response.json()

            if (response.ok) {

                navigate('/dashboard?tab=users')
            }
        } catch (error) {

            console.log(error)
        }
    }
    return (
        <div className="h-screen flex flex-col justify-center items-center mx-auto ">
            <div className="md:max-w-3xl w-full">

                <form className="flex max-w-md flex-col gap-4 " onSubmit={handelSubmit}>
                    <div>
                        <div className="mb-2 block ">
                            <Label htmlFor="email1" value="UserName" />
                        </div>
                        <TextInput id="username" type="text" placeholder="UserName" required onChange={handelInputForm} />
                    </div>
                    <div>
                        <div className="mb-2 block ">
                            <Label value="Your email" />
                        </div>
                        <TextInput id="email" type="email" placeholder="name@gmail.com" required onChange={handelInputForm} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Your password" />
                        </div>
                        <TextInput id="password" type="password" required onChange={handelInputForm} />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label value="Admin" />
                        </div>
                        <select id="IsAdmin" required value={inputForm.IsAdmin === undefined ? "false" : inputForm.IsAdmin ? "false" : "true"}
                            onChange={handelInputForm} className="border rounded px-2 py-1 w-full text-center">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <Button type="submit">
                        {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </>
                        ) : ('Create User')
                        }</Button>
                </form>
                <div>
                    {error && (
                        <Alert className='mt-5' color='failure'>
                            {error}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Createuser