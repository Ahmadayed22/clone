import { Button, Label, TextInput, Spinner, Alert } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../store/auth'
const Updateuser = () => {

    const navigate = useNavigate()
    const [inputForm, SetInputForm] = useState({})
    const dispatch = useDispatch()
    const { userId } = useParams();

    const [formData, setFormData] = useState({});

    const { loading, error } = useSelector((state) => state.auth);
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const handelInputForm = (e) => {
        const { id, value } = e.target;

        SetInputForm((prev) => ({
            ...prev,
            [id]: id === "IsAdmin" ? value === "true" : value,
        }));
    };
    useEffect(() => {
        const fetchUserData = async () => {

            try {
                const res = await fetch(`${API_BASE_URL}/api/user/:${userId}`);
                const data = await res.json();

                if (!res.ok) {

                    return;
                }
                setFormData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUserData();
    }, [userId]);
    const handelSubmit = async (e) => {
        e.preventDefault();
        dispatch(authActions.SignInStart())
        try {
            const response = await fetch(`${API_BASE_URL}/api/user/updateByAdmin/${userId}`, {
                method: 'PUT',
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

                <form className="flex max-w-md flex-col gap-4" onSubmit={handelSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="username" value="UserName" />
                        </div>
                        <TextInput
                            id="username"
                            type="text"
                            placeholder="UserName"
                            defaultValue={formData.username || ''}
                            required
                            onChange={handelInputForm}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Your email" />
                        </div>
                        <TextInput
                            id="email"
                            type="email"
                            placeholder="name@gmail.com"
                            defaultValue={formData.email || ''}
                            required
                            onChange={handelInputForm}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Your password" />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            defaultValue={formData.password}
                            required
                            onChange={handelInputForm}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="IsAdmin" value="Admin" />
                        </div>
                        <select id="IsAdmin" required defaultValue={inputForm.IsAdmin === undefined ? "false" : inputForm.IsAdmin ? "false" : "true"}
                            onChange={handelInputForm} className="border rounded px-2 py-1 w-full text-center">
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>

                    <Button type="submit">
                        {loading ? (
                            <>
                                <Spinner size="sm" />
                                <span className="pl-3">Loading...</span>
                            </>
                        ) : ('Update User')}
                    </Button>
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

export default Updateuser