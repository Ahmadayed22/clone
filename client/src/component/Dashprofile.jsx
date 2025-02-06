import { Alert, Button, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


// import 'react-circular-progressbar/dist/styles.css';
import { authActions } from '../store/auth';
import ModalComponent from './ModalComponent';
import { Link, useNavigate } from 'react-router-dom';

export default function DashProfile() {
    const API_BASE_URL = import.meta.env.VITE_API_URL
    const { userInfo, loading } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [formData, setFormData] = useState({});
    const [ShowModal, SetShowModal] = useState(false);

    const dispatch = useDispatch();




    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);

        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made.');
            return;
        }

        console.log(formData);

        try {
            dispatch(authActions.updateStart());
            const res = await fetch(`${API_BASE_URL}/api/user/update/${userInfo._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                dispatch(authActions.updateFailure(data.error));
                setUpdateUserError(data.error || 'Update failed.');
            } else {
                dispatch(authActions.updateSuccess(data));
                setUpdateUserSuccess("Profile updated successfully.");
            }
        } catch (error) {
            setUpdateUserError(error.message);
        }
    };




    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <TextInput
                    type='text'
                    id='username'
                    placeholder='Username'
                    defaultValue={userInfo.username || userInfo.user.username}
                    onChange={handleChange}
                />
                <TextInput
                    type='email'
                    id='email'
                    placeholder='Email'
                    defaultValue={userInfo.email || userInfo.user.email}
                    onChange={handleChange}
                />
                <TextInput
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={handleChange}
                />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading}>
                    {loading ? "Loading" : "Update"}
                </Button>
                {userInfo.IsAdmin && (
                    <Link to='/dashboard?tab=creatProduct'>
                        <Button type='button' gradientMonochrome='cyan' outline className='w-full'>
                            Create Product
                        </Button>
                    </Link>
                )}
            </form>

            {updateUserSuccess && <Alert color='success'>{updateUserSuccess}</Alert>}
            {updateUserError && <Alert color='failure'>{updateUserError}</Alert>}

            <ModalComponent
                SetShowModal={SetShowModal}
                ShowModal={ShowModal}

            />
        </div>
    );
}