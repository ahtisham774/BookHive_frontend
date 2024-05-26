import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import signupImg from '/assets/signup_img.jpg';
import Logo from '/assets/logo_with_name.png';
import toast from 'react-hot-toast';
import { url } from '../routes/url';

const Signup = () => {
    const history = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignupForm = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(url.SIGNUP_USER, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                role: 'user',
            });
            //   show toast
            toast.success(response.data.message);
            if (response.data.status === 'success') {
                history('/login');
            }
        } catch (error) {
            let errorMessage = error.response?.data?.message || error.message;
            toast.error(errorMessage);
        }
    };

    return (
        <div className="min-h-full">
            <div className="text-center mb-2">
                <img src={Logo} className="w-48 inline-block pt-1" alt="Logo" />
                <h2 className="sm:text-md font-primary text-teal-800 text-sm">
                    Sustainable Learning Resources
                </h2>
            </div>
            <section className="flex justify-center mb-5">
                <div className="flex rounded-2xl bg-[#E0F2F1] shadow-lg max-w-3xl pr-0">
                    <div className="px-12 py-8 shrink-0 ">
                        <h2 className="font-bold text-2xl text-teal-600 font-primary">
                            Signup
                        </h2>
                        <p className="text-sm font-primary my-2 ">
                            Easily register for an account if you don&apos;t have one already.
                        </p>
                        <form onSubmit={handleSignupForm} className="flex flex-col gap-4">
                            {[
                                { name: 'firstName', placeholder: 'First Name' },
                                { name: 'lastName', placeholder: 'Last Name' },
                                { name: 'email', placeholder: 'Email' },
                                { name: 'password', placeholder: 'Password', type: 'password' },
                                { name: 'confirmPassword', placeholder: 'Confirm Password', type: 'password' },
                            ].map((field, index) => (
                                <input
                                    key={index}
                                    type={field.type || 'text'}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    placeholder={field.placeholder}
                                    className="px-4 py-2 rounded-lg border w-50 outline-teal-600"
                                />
                            ))}
                            {/* show profile Image picker */}
                            {/* <input type="file" accept="image/*"
                            className='file:border-0 file:outline-teal-600 file:bg-teal-600 file:text-white file:rounded-lg file:py-1 file:px-2'
                            /> */}
                            <p className="text-xs font-primary">
                                By clicking on the signup button, you agree to our{' '}
                                <a href="/terms" className="text-teal-600 italic">
                                    Terms and Conditions
                                </a>
                            </p>
                            <button type="submit" className="bg-teal-600 rounded-lg text-white font-primary p-1 py-2 outline-teal-600">
                                Signup
                            </button>
                            <p className="mb-2 font-primary">
                                If you have an account, click here to{' '}
                                <a href="/login" className="text-teal-600 ml-1 focus-within:outline-none">
                                    Login
                                </a>
                            </p>
                        </form>
                    </div>
                    <div className="hidden sm:block">
                        <img src={signupImg} className="w-full h-full min-w-[15rem] bg-gray-200 rounded-r-2xl" alt="Signup" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Signup;
