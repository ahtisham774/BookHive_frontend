import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '/assets/logo_with_name.png';
import { UserContext } from '../context/useAuth';
import { FaPlus } from 'react-icons/fa';
import { createImageLetter } from '../utils/showProfileImage';

const Navbar = () => {
    const [openNav, setOpenNav] = useState(false);
    const [openAvatarDropdown, setOpenAvatarDropdown] = useState(false);
    const navigate = useNavigate()




    const toggleNav = () => {
        setOpenNav(!openNav);
        setOpenAvatarDropdown(false);
    };

    const toggleAvatarDropdown = (e) => {
        e.stopPropagation()
        setOpenAvatarDropdown(!openAvatarDropdown);
    };

    const [menuOpen, setMenuOpen] = useState(false)

    const toggleMenu = (e) => {
        e.stopPropagation()
        setMenuOpen(prev => !prev)
    }

    const { user, setUser } = useContext(UserContext)



    const signOut = (e) => {
        console.log("Logout")
        e.stopPropagation()
        setUser(null)
        setOpenAvatarDropdown(false)
        localStorage.removeItem("user_token")
        navigate("/login")
    }

    const handleCratePost = () => {
        navigate("/post/new")
    }


    return (
        <nav className="bg-teal-600 w-full max-w-full sticky top-0 z-10"
        >
            <div className="w-full max-w-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-teal-700 hover:text-white focus-within:outline-none "
                            aria-controls="mobile-menu"
                            aria-expanded="false"
                            onClick={toggleMenu}

                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {/*
            Icon when menu is closed.
      
            Menu open: "hidden", Menu closed: "block"
          */}
                            <svg
                                className="block h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                />
                            </svg>
                            {/*
            Icon when menu is open.
      
            Menu open: "block", Menu closed: "hidden"
          */}
                            <svg
                                className="hidden h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center text-white bg-teal-50 px-2 justify-center pt-1 rounded-xl">
                            <img
                                className="h-10 w-auto "
                                src={logo}
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:mt-1 sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link
                                    to="/"
                                    className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"
                                    aria-current="page"
                                >
                                    Home
                                </Link>
                                {
                                    user?.role === "admin" ?

                                        <>

                                            <Link
                                                to={`/users/all`}
                                                className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"

                                            >
                                                Users
                                            </Link>
                                            <Link
                                                to={`/post/all`}
                                                className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"

                                            >
                                                Posts
                                            </Link>
                                        </>
                                        :

                                        <>
                                            <button
                                                type="button"
                                                onClick={handleCratePost}
                                                className="text-white hover:bg-teal-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"
                                            >
                                                <span className="sr-only">Add Post</span>
                                                Create Post
                                            </button>
                                            <Link
                                                to={`/post/me/${user?._id}`}
                                                className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"

                                            >
                                                My Posts
                                            </Link>
                                        </>

                                }
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <div>
                                <button
                                    type="button"
                                    onClick={toggleAvatarDropdown}
                                    className="relative flex rounded-full items-center gap-2 capitalize bg-teal-600 text-sm focus:outline-none "
                                    id="user-menu-button"
                                    aria-expanded="false"
                                    aria-haspopup="true"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={
                                            user?.avatar || createImageLetter(`${user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`)
                                        }
                                        alt=""
                                    />
                                    <span className='hidden text-lg text-white font-semibold lg:block'>
                                        {user.firstName} {user.lastName}
                                    </span>
                                </button>
                            </div>
                            {/*
            Dropdown menu, show/hide based on menu state.
      
            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
          */}
                            {
                                openAvatarDropdown &&
                                <div
                                    className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu-button"

                                >
                                    {/* Active: "bg-gray-100", Not Active: "" */}
                                    <Link
                                        to={'/profile'}
                                        onClick={toggleAvatarDropdown}

                                        className="block px-4 w-full  text-start py-2 text-sm text-gray-700 hover:bg-teal-600/30"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="user-menu-item-0"
                                    >
                                        Your Profile
                                    </Link>
                                    <button
                                        type='button'
                                        onClick={signOut}
                                        className="block px-4  w-full text-start py-2 text-sm text-gray-700 hover:bg-teal-600/30"
                                        role="menuitem"
                                        id="user-menu-item-2"
                                    >
                                        Sign out
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
            {
                menuOpen &&
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col gap-2">
                        <Link
                            to="/"
                            className="bg-teal-800 text-white block rounded-md px-3 py-2 text-base font-medium focus-within:bg-teal-700 focus-within:outline-none "
                            aria-current="page"
                        >
                            Home
                        </Link>
                        {
                            user?.role === "admin" ?
                                <>

                                    <Link
                                        to={`/users/all`}
                                        className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"

                                    >
                                        Users
                                    </Link>
                                    <Link
                                        to={`/post/all`}
                                        className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"

                                    >
                                        Posts
                                    </Link>
                                </>
                                :
                                <>
                                    <button
                                        type="button"
                                        onClick={handleCratePost}
                                        className="text-white hover:bg-teal-700 text-start hover:text-white rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"
                                    >
                                        <span className="sr-only">Add Post</span>
                                        Create Post
                                    </button>
                                    <Link
                                        to={`/post/me/${user?._id}`}
                                        className="text-white hover:bg-teal-700 rounded-md px-3 py-2 text-sm font-medium focus-within:bg-teal-700 focus-within:outline-none"

                                    >
                                        My Posts
                                    </Link>
                                </>
                        }
                    </div>
                </div>}
        </nav>



    );
};

export default Navbar;
