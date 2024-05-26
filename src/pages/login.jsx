import { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from '/assets/logo_with_name.png';
import loginImg from '/assets/login_img.jpg';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { url } from '../routes/url';
import { UserContext } from '../context/useAuth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const { setUser, setToken } = useContext(UserContext)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url.LOGIN_USER, {
                email,
                password,
            });
            console.log('Login successful:', response);
            if (response.data.status === 'success') {
                toast.success("Login Successful");
                console.log('response.data.userdetails.role:::', response.data.userdetails.role);
                const token = response.data.token;
                localStorage.setItem('user_token', token);
                setTimeout(() => {
                    setToken(token)
                    setUser(response.data.userdetails);
                    navigate("/")
                }, 1500)
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                toast.error(error.response.data.message);
                console.log('Response data:', error.response.data);
            }
        }
    };

    return (
        <div className="min-h-full ">
            <div className="text-center py-3">
                <img src={Logo} alt="Logo" className="w-48 inline-block pt-1" />
                <h2 className="sm:text-md font-primary text-teal-800 text-sm">
                    Sustainable Learning Resources
                </h2>
            </div>
            <section className="flex justify-center">
                <div className="flex rounded-2xl items-center bg-[#E0F2F1] shadow-lg max-w-3xl pr-0">
                    <div className="px-16 pt-8 shrink-0">
                        <h2 className="font-bold text-2xl text-teal-600 font-primary">Login</h2>
                        <p className="text-sm font-primary my-4 ">
                            If you are already a member, easily login
                        </p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                type="text"
                                className="px-4 py-2 rounded-lg border outline-teal-600"
                            />
                            <div className='relative w-full'>
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    type={show ? "text" : "password"}
                                    className="px-4 py-2 rounded-lg w-full border outline-teal-600"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShow(!show)}
                                    className='absolute right-2 top-2 cursor-pointer focus-within:outline-none'
                                >
                                    {show ? <FaEye size={25} /> : <FaEyeSlash size={25} />}
                                </button>
                            </div>
                            <button
                                type="submit"
                                className="bg-teal-600 rounded-lg text-white font-primary px-4 py-2 mt-5 outline-teal-600"
                            >
                                Login
                            </button>
                            <p className="my-5 font-primary">
                                If you don&apos;t have an account, click here to
                                <a href="/signup" className="text-teal-600 ml-1 focus-within:outline-none">Signup</a>
                            </p>
                        </form>
                    </div>
                    <div className="sm:block hidden">
                        <img src={loginImg} alt="Login" className="w-full h-full min-w-[15rem] bg-gray-200 rounded-r-2xl" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
