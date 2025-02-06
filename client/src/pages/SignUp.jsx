import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store/auth'
const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [inputForm, SetInputForm] = useState({})
    const { loading, error } = useSelector((state) => state.auth);
    const handelInputForm = (e) => {
        SetInputForm({ ...inputForm, [e.target.id]: e.target.value })
    }
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const handelSubmit = async (e) => {
        e.preventDefault();
        dispatch(authActions.SignInStart())
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputForm)
            })
            const data = await response.json()

            if (response.ok) {
                dispatch(authActions.SignInSuccess(data))
                navigate('/')
            }
            else {
                dispatch(authActions.SignInFailure(data.error));
            }
        } catch (error) {
            dispatch(authActions.SignInFailure(error.message));
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

                    <Button type="submit">
                        {loading ? (
                            <>
                                <Spinner size='sm' />
                                <span className='pl-3'>Loading...</span>
                            </>
                        ) : ('Sign Up')
                        }</Button>
                </form>
                <div className="flex gap-5 my-2 text-sm">
                    <span className="">Have an account ? </span>
                    <Link to="/log-in" className="text-blue-600">LogIn</Link>
                </div>
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

export default SignUp