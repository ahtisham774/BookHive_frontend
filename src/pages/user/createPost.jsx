import { useContext, useEffect, useState } from 'react'

import { url } from '../../routes/url';
import { UserContext } from '../../context/useAuth';
import { post } from '../../hooks/fetch';
import toast from 'react-hot-toast';
import { createBook, fetchBooks, updateBook } from '../../redux/thunks/books';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const CreatePost = () => {



    const { id } = useParams()

    const [loading, setLoading] = useState(false)
    const state = useSelector(state => state.books)
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        if (state.books.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, state.books.length]);



    const bookCategories = [
        "Fiction",
        "Mystery",
        "Programming",
        "Young Adult",
        "Sci-Fi",
        "Fantasy",
        "Horror",
        "Biography",
        "Autobiography",
        "History",
        "Self-Help",
        "Memoir",
        "Business",
        "Children Books",
        "Travel",
        "Religion",
        "Art and Design"
    ];


    const [selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);
    const handleBookSubmit = async (event) => {
        event.preventDefault();


        const status = "unverified";
        const data = new FormData();
        console.log(formData)
        if (id) {

            data.append('postId', id);
        }
        data.append('bookName', formData.bookTitle);
        data.append('Author', formData.authorName);
        data.append('description', formData.bookDescription);
        data.append('file', formData.imageURL);
        data.append('category', selectedBookCategory);
        data.append('pdf', formData.bookPDFURL);
        data.append('bookPrice', formData.price);
        data.append('status', status);

        try {
            setLoading(true)
            if (id) {
                const response = await dispatch(updateBook(data)).unwrap()
                toast.success(response?.message)
                setLoading(false)
            }
            else {

                const response = await dispatch(createBook(data)).unwrap()
                toast.success(response?.message)
                setLoading(false)
            }
            // await post(url.CREATE_BOOK, data,setLoading).then(res => {
            //     console.log(res)
            //     toast.success(res.message)
            //     setLoading(false)
            // }
            // ).catch(err => {
            //     toast.error(err.response.data.message)
            //     setLoading(false)
            // })
        }
        catch (error) {
            console.log(error);
            toast.error(error)
            setLoading(false)
        }


    }

    const [formData, setFormData] = useState({
        bookTitle: '',
        authorName: '',
        imageURL: '',
        bookDescription: '',
        bookPDFURL: '',
        price: ''
    });


    useEffect(() => {
        if (id) {
            const books = state.books.find((item) => item._id === id);
            if (books) {
                setIsEdit(true)
                setFormData({
                    bookTitle: books.bookName,
                    authorName: books.Author,
                    bookDescription: books.description,
                    bookPDFURL: books.pdf,
                    price: books.bookPrice
                })
            }
            else {
                setIsEdit(false)
            }

        }
    }, [id, state.books])


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleBack = () => {
        if (id) {
            navigate(`/post/${id}`)
        }
    }


    return (
        <div className="px-8 my-12 bg-white shadow-lg border rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">Upload a Book</h2>
            <form onSubmit={handleBookSubmit} className="flex flex-col gap-4">
                <div className="flex flex-wrap lg:flex-nowrap gap-8">
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <label htmlFor="bookTitle" className="text-gray-700 font-semibold">Book Title</label>
                        </div>
                        <input
                            type="text"
                            name="bookTitle"
                            id="bookTitle"
                            placeholder="Book Title"
                            value={formData.bookTitle}
                            onChange={handleChange}
                            required={isEdit}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <label htmlFor="authorName" className="text-gray-700 font-semibold">Author Name</label>
                        </div>
                        <input
                            type="text"
                            name="authorName"
                            id="authorName"
                            placeholder="Author Name"
                            value={formData.authorName}
                            onChange={handleChange}
                            required={isEdit}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
                <div className="flex flex-wrap lg:flex-nowrap gap-8">
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <label htmlFor="imageURL" className="text-gray-700 font-semibold">Book Image URL</label>
                        </div>
                        <input
                            type="file"
                            name="imageURL"
                            id="imageURL"
                            accept='image/png, image/jpeg, image/jpg, image/gif'
                            multiple={false}
                            placeholder="Book Image URL"
                            onChange={(e) =>

                                setFormData((prevData) => ({
                                    ...prevData,
                                    imageURL: e.target.files[0]
                                })
                                )
                            }

                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <label htmlFor="category" className="text-gray-700 font-semibold">Category</label>
                        </div>
                        <select
                            id="category"
                            name="category"
                            value={selectedBookCategory}
                            onChange={(e) => setSelectedBookCategory(e.target.value)}
                            required={isEdit}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="" disabled>Select Category</option>
                            {bookCategories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-8">
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <label htmlFor="bookPDFURL" className="text-gray-700 font-semibold">Book PDF URL</label>
                        </div>
                        <input
                            type="text"
                            name="bookPDFURL"
                            id="bookPDFURL"
                            placeholder="Book PDF URL"
                            value={formData.bookPDFURL}
                            onChange={handleChange}
                            required={isEdit}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="mb-2 block">
                            <label htmlFor="price" className="text-gray-700 font-semibold">Price</label>
                        </div>
                        <input
                            type="number"
                            name="price"
                            id="price"
                            placeholder="Price"
                            value={formData.price}
                            onChange={handleChange}
                            required={isEdit}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-2 block">
                        <label htmlFor="bookDescription" className="text-gray-700 font-semibold">Description</label>
                    </div>
                    <textarea
                        name="bookDescription"
                        id="bookDescription"
                        rows={5}
                        placeholder="Book Description"
                        value={formData.bookDescription}
                        onChange={handleChange}
                        required={isEdit}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    ></textarea>
                </div>
                <div className='flex items-center gap-5 justify-end'>
                    {
                        isEdit &&
                        <button type="button" className="w-fit px-3 self-end py-2 bg-slate-200  font-semibold rounded-lg shadow-md hover:bg-slate-400 transition-colors duration-200" onClick={handleBack}>
                            Cancel
                        </button>
                    }
                    <button type="submit" className="w-fit px-3 self-end py-2 bg-teal-600 text-white font-semibold rounded-lg shadow-md hover:bg-teal-700 transition-colors duration-200 disabled:cursor-not-allowed" disabled={loading}>
                        {
                            loading ? "Uploading..." : "Upload Book"
                        }
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost