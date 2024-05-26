import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { deleteBook, fetchBooks } from "../../redux/thunks/books"
import { useContext, useEffect, useState } from "react"
import { createImageLetter } from "../../utils/showProfileImage"
import { UserContext } from "../../context/useAuth"
import { FaDownload } from "react-icons/fa"
import { GrDocumentPdf } from "react-icons/gr"
import toast from "react-hot-toast"

const ShowPost = () => {

    const { id } = useParams()

    const state = useSelector(state => state.books)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const { user: currentUser } = useContext(UserContext)

    const [showPdf, setShowPdf] = useState(false)




    const [book, setBook] = useState(null);

    useEffect(() => {
        if (state.books.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, state.books.length]);

    useEffect(() => {
        if (id && state.books.length > 0) {
            const newBook = state.books.find((item) => item._id === id);
            setBook(newBook);
        }
    }, [id, state.books]);




    const { bookName, bookPrice, category, pdf, Author, description, createdAt, user, file } = book || {};
    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const handleDelete = (id) => {
        try {
            const confirm = window.confirm("Are you sure to delete this post?")
            if (!confirm) return
            const response = dispatch(deleteBook({ postId: id })).unwrap()
            toast.success(response?.message)
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const handleEdit = (id) => {
        navigate(`/post/${id}/edit`)
    }



    return (

        book ? <div className="w-full flex flex-col justify-center items-center h-[calc(100%_-65px)]   p-8">

            {
                showPdf &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-3xl shadow-lg max-w-[90%] max-h-[90dvh] h-full w-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-semibold ">PDF</h2>
                            <button onClick={() => setShowPdf(false)} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
                        </div>
                        <iframe src={pdf} title="pdf" className="w-full max-h-[78dvh] rounded-3xl h-full"></iframe>
                    </div>
                </div>
            }

            <div className="flex w-full flex-col lg:flex-row items-center mt-16 ">
                <div className="lg:w-1/3 ">

                    <img
                        src={file}
                        alt="Book cover"
                        className="w-full h-full min-h-[15rem] lg:min-h-[42rem] bg-gray-200 max-w-full  block  rounded-lg shadow-md"
                    />

                </div>
                <div className="lg:w-2/3 pl-8">

                    <div className="flex items-center my-6 relative">
                        <img className="w-12 h-12 rounded-full border border-blue-500" src={user?.avatar || createImageLetter(user?.firstName && user?.firstName[0])} alt={user?.firstName} />
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-gray-800">{user?.firstName} {user?.lastName}</h2>
                            <p className="text-sm text-gray-600">{formattedDate}</p>
                            {
                                user?._id === currentUser._id ? <p className="text-sm text-gray-600">You</p> :
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm text-gray-600">
                                            {user?.email}</p>
                                        <p className="text-sm text-gray-600">{user?.contact}</p>
                                    </div>
                            }
                        </div>
                        <hr className="absolute -bottom-4  left-0 w-full max-w-[60%] h-1" />
                    </div>
                    <div className="flex items-center justify-start gap-5 mt-8">
                        <h1 className="text-4xl font-bold text-gray-900 ">{bookName}</h1>
                        {
                            pdf &&
                            <button onClick={() => setShowPdf(true)}><GrDocumentPdf size={25} /></button>
                            // <a href={pdf} target="_blank" rel="noreferrer"  ><FaDownload size={25} /></a>
                        }
                    </div>
                    {
                        Author &&
                        <div className="mb-4">
                            <p><strong>By:</strong> {Author} <small className="text-gray-600">(Author)</small></p>

                        </div>}
                    <p className="text-3xl text-blue-500 mt-2">${bookPrice}</p>
                    <p className="text-lg text-gray-700 my-4 whitespace-pre-line">{description}</p>
                    {
                        category &&
                        <div className="flex items-center py-2">
                            <span className="border border-teal-500 text-teal-600 px-2 py-1 rounded-lg mr-2">{category}</span>
                        </div>}

                    {
                        user?._id === currentUser._id && <div className="flex justify-start mt-8">
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => { handleEdit(book?._id) }}>Edit</button>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg ml-4" onClick={() => handleDelete(book?._id)}>Delete</button>
                        </div>
                    }
                </div>
            </div>
        </div>
            :
            <div className="w-full h-[calc(100dvh_-65px)] flex flex-col gap-3 justify-center items-center">
                <h1 className="text-3xl font-bold text-gray-800">Book not found</h1>
                <NavLink
                    to="/"
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg ml-4">Go back</NavLink>
            </div>

    )
}

export default ShowPost