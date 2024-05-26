
import { Toaster } from 'react-hot-toast'
import Login from './pages/login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/register'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from './context/useAuth'
import { checkUser } from './utils/checkUser'
import UserRoutes from './routes/userRoutes'
import AdminRoutes from './routes/adminRoutes'
import Profile from './components/profile'
import Navbar from './components/navbar'

function App() {
    const { user } = useContext(UserContext)
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    // useEffect(() => {
    //     console.log(user)
    //     if (checkUser(user)) {
    //         console.log("User Exits")
    //         setIsLoggedIn(true)
    //     }
    //     else {
    //         console.log("User Does not Exits")
    //         setIsLoggedIn(false)
    //     }
    // }, [user])
    return (
        <>
            <Toaster />
            {
                checkUser(user) && <Navbar />
            }

            {
                user?.status === 'inprogress' &&
                <div className='w-full h-fit  bg-[#f8ad9d] p-2 z-[2]  text-center grid place-items-center fixed text-white'>
                    Your account is in progress. You can&apos;t access all the features until your account is verified.
                </div>
            }

            <Routes>
                {checkUser(user) == true ? (
                    <>
                        <Route path="/login" element={<Navigate to="/" />} />
                        <Route path="/signup" element={<Navigate to="/" />} />
                        <Route path="/profile" element={<Profile />} />

                        {user?.role === 'admin' ? (
                            <Route path="/*" element={<AdminRoutes />} />
                        ) : (
                            <Route path="/*" element={<UserRoutes />} />
                        )}
                    </>
                ) : (
                    <>
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/" element={<Navigate to="/login" />} />
                        <Route path="*" element={<h1 >No Route Found</h1>} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default App
