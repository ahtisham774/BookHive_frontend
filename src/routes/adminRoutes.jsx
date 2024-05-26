import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/home"
import Users from "../pages/admin/users"
import ShowPost from "../pages/user/showPost"
import Posts from "../pages/admin/posts"


const AdminRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="post/all" element={<Posts />} />
                <Route path="post/:id" element={<ShowPost />} />
                <Route path="/users/all" element={<Users />} />


            </Routes>
        </>
    )
}

export default AdminRoutes