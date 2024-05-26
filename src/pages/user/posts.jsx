import { useDispatch, useSelector } from "react-redux"
import { fetchBooks } from "../../redux/thunks/books"
import Post from "./post"
import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom";

const Posts = () => {
    const state = useSelector(state => state.books)
    const { id } = useParams()
    const [searchTerm, setSearchTerm] = useState("");
    const dispatch = useDispatch()
    useEffect(() => {
        if (state.books.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, state.books.length]);



    const books = id ? state.books.filter(book => book?.user?._id === id) : state.books.filter(book => book.status === "verified")

    const filteredPosts = books
        ?.filter(book =>
            book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (book?.user?.firstName + " " + book?.user?.lastName).toLowerCase().includes(searchTerm.toLowerCase())
           
        )



    return (
        <div className="w-full  max-w-full relative bg-gray-200/30 ">
            <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 max-w-sm top-5 left-3 absolute w-full border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <div className="w-full  min-h-[calc(100dvh_-65px)] max-w-3xl px-4 mx-auto pt-14 flex  flex-col gap-5 py-8 lg:border-x-2 lg:border-[#83c5be] bg-inherit">
                {
                    filteredPosts?.length > 0 ?
                        filteredPosts?.map((book) => {
                            return (
                                <Post key={book._id} data={book} />
                            )
                        })
                        :
                        <div className="w-full  h-full flex-1 self-center flex flex-col gap-3 justify-center items-center">
                            <h1 className="text-3xl font-bold text-gray-800">No Post Yet</h1>
                            <NavLink
                                to="/"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">Go back</NavLink>
                        </div>
                }

            </div>

        </div>
    )
}

export default Posts