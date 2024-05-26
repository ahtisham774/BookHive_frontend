import { Route, Routes } from "react-router-dom"
import Home from "../pages/user/home"
import ShowPost from "../pages/user/showPost"
import CreatePost from "../pages/user/createPost"
import Posts from "../pages/user/posts"


const UserRoutes = () => {
    return (
        <>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="post/:id" element={<ShowPost />} />
                <Route path="post/new" element={<CreatePost />} />
                <Route path="post/:id/edit" element={<CreatePost />} />
                <Route path="post/me/:id" element={<Posts />} />
            </Routes>
        </>


    )
}

export default UserRoutes