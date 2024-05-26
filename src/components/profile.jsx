import React, { useState, useContext } from 'react';
import { UserContext } from '../context/useAuth';
import { createImageLetter } from '../utils/showProfileImage';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../redux/thunks/books';
import toast from 'react-hot-toast';

const Profile = () => {
    const { user, setUser } = useContext(UserContext); // Assume updateUser is a function in context to update user details
    const [editMode, setEditMode] = useState(false);

    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        contact: user.contact || '',
        password: '',
        avatar: null,
        status: user.status || 'inprogress',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            avatar: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('firstName', formData.firstName);
            data.append('lastName', formData.lastName);
            data.append('contact', formData.contact);
            data.append('password', formData.password);
            data.append('file', formData.avatar);

            const response = await dispatch(updateProfile(data)).unwrap();
            setUser(response.data)
            toast.success(response.message)
            setEditMode(false);
            // setUser(response.data);
        }
        catch (error) {
            console.log(error);
            toast.error(error.message)
        }

    };

    return (
        <div className="px-4 py-12 bg-gray-100 h-[calc(100dvh_-65px)]">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">User Profile</h2>
                <div className="flex items-center justify-center mb-6">
                    <img
                        className="h-36 w-36 rounded-full"
                        src={
                            user?.avatar || createImageLetter(`${user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`)
                        }
                        alt=""
                    />

                </div>
                {editMode ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-8">
                            <div className="w-full flex-1 lg:w-1/2">
                                <label htmlFor="firstName" className="block text-gray-700 font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}

                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div className="w-full flex-1 lg:w-1/2">
                                <label htmlFor="lastName" className="block text-gray-700 font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}

                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-8">
                            <div className="w-full flex-1 lg:w-1/2">
                                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    readOnly
                                    disabled
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div className="w-full flex-1 lg:w-1/2">
                                <label htmlFor="contact" className="block text-gray-700 font-semibold mb-2">Contact</label>
                                <input
                                    type="text"
                                    name="contact"
                                    id="contact"
                                    value={formData.contact}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-8">
                            <div className="w-full flex-1 lg:w-1/2">
                                <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                            <div className="w-full flex-1 lg:w-1/2">
                                <label htmlFor="avatar" className="block text-gray-700 font-semibold mb-2">Avatar</label>
                                <input
                                    type="file"
                                    name="avatar"
                                    id="avatar"
                                    onChange={handleFileChange}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-fit gap-5 self-end mt-4">
                            <button type="button" onClick={() => setEditMode(false)} className="py-2 px-4 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200">
                                Cancel
                            </button>
                            <button type="submit" className="py-2 px-4 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-200">
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <div className="mb-4">
                            <p className="text-gray-700"><span className="font-semibold lg:text-xl">First Name:</span> {user.firstName}</p>
                            <p className="text-gray-700"><span className="font-semibold lg:text-xl">Last Name:</span> {user.lastName}</p>
                            <p className="text-gray-700"><span className="font-semibold lg:text-xl">Email:</span> {user.email}</p>
                            <p className="text-gray-700"><span className="font-semibold lg:text-xl">Contact:</span> {user.contact}</p>
                            <p className="text-gray-700"><span className="font-semibold lg:text-xl">Status:</span>
                                {
                                    user.status === 'inprogress' && <span className='text-red-500 ml-2'>Not Approved</span>}{
                                    user.status === 'approved' &&
                                    <span className='text-green-500 ml-2'>Approved</span>
                                }
                            </p>
                        </div>
                        <button onClick={() => setEditMode(true)} className="py-2 px-4 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-200">
                            Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
