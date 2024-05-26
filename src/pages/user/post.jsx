
import { PropTypes } from 'prop-types';
import { createImageLetter } from '../../utils/showProfileImage';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/useAuth';
import { deleteBook } from '../../redux/thunks/books';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
const Post = ({ data }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user: currentUser } = useContext(UserContext)

    const {
        _id,
        bookName,
        bookPrice,
        description,
        createdAt,
        file,
        user
    } = data


    const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const handleShowPost = () => {
        navigate(`/post/${_id}`)
    }

    const handleDelete = (id) => {
        try {
            const confirm = window.confirm("Are you sure to delete this post?")
            if (!confirm) return
            const response = dispatch(deleteBook({ postId: id })).unwrap()
            if (response) {

                toast.success("Post Deleted")
            }
        }
        catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className="w-full h-auto max-w-2xl mx-auto bg-gradient-to-r from-white via-teal-50 to-white shadow-lg rounded-lg shrink-0">
            <div className="p-6 flex flex-col h-auto">
                <div className="flex items-center mb-6 border-b pb-4 border-b-gray-200">
                    <img className="w-16 h-16 rounded-full border-2 border-teal-500 mr-4" src={user?.avatar || createImageLetter(user?.firstName[0])} alt={user?.firstName} />
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{user?.firstName} {user?.lastName}</h2>
                        <p className="text-xs  text-gray-600">{formattedDate}</p>
                    </div>
                </div>

                <img
                    src={file}
                    alt="Book image"
                    className="w-full h-48  block rounded-lg shadow-md"
                />



                <div className="my-6 flex items-center justify-between">
                    <h3 className="text-3xl font-bold text-teal-700">{bookName}</h3>
                    <p className="text-xl text-orange-600">${bookPrice}</p>
                </div>
                <p className="text-gray-800 mb-6">{description}</p>

                <div className="flex justify-end">
                    {
                        currentUser?.role === "admin" &&
                        <button onClick={() => handleDelete(_id)} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-4">Delete</button>
                    }
                    <button onClick={handleShowPost} className="bg-teal-600 text-white px-4 py-2 rounded-lg">View</button>
                </div>
            </div>
        </div>

    )
}
Post.propTypes = {
    data: PropTypes.object
}
export default Post