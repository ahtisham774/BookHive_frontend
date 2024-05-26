import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, verifyPost } from "../../redux/thunks/books";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PostDetailModal = ({ post, onClose }) => {
    if (!post) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-[90%] max-h-[90dvh] w-full">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold ">Post Details</h2>
                    <button
                        onClick={onClose}
                        className=" bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                    >
                        Close
                    </button>
                </div>
                {/* show Image */}
                <img src={post.file} alt={post.bookName} className="w-64 h-64 rounded-3xl mb-4" />
                <p><strong>Book Name:</strong> {post.bookName}</p>
                <p><strong>Author:</strong> {post.Author}</p>
                <p><strong>Category:</strong> {post.category}</p>
                <p><strong>Description:</strong><br /> {post.description}</p>

            </div>
        </div>
    );
};

const Posts = () => {
    const state = useSelector(state => state.books);

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8); // You can adjust the number of posts per page

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        if (state.books.length === 0) {
            dispatch(fetchBooks());
        }
    }, [dispatch, state.books.length]);

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortOrder(order);
    };

    const filteredPosts = state.books
        ?.filter(book =>
            book.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.Author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.sort((a, b) => {
            if (sortKey) {
                if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
                if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
                return 0;
            }
            return 0;
        });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts?.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleViewPost = (post) => {
        setSelectedPost(post);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedPost(null);
        setIsModalOpen(false);
    };


    const handleVerify = async (id) => {
        try {
            const response = await dispatch(verifyPost({ postId: id })).unwrap();
            console.log(response);
            toast.success(response.message)
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }




    return (
        <div className="w-full max-w-full bg-gray-100">
            <div className="w-full min-h-[calc(100dvh_-65px)] px-4 flex flex-col gap-5 py-4 bg-inherit">
                <input
                    type="text"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 max-w-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {isModalOpen && selectedPost && (
                    <PostDetailModal post={selectedPost} onClose={closeModal} />
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full h-full flex-1 bg-white shadow-md rounded-lg">
                        <thead className="bg-teal-500 text-white">
                            <tr>
                                <th className="py-3 px-6 border-b border-gray-200">BookName</th>
                                <th className="py-3 px-6 border-b border-gray-200 cursor-pointer" onClick={() => handleSort("author")}>Author</th>
                                <th className="py-3 px-6 border-b border-gray-200 cursor-pointer" onClick={() => handleSort("category")}>Category</th>
                                <th className="py-3 px-6 border-b border-gray-200">Status</th>
                                <th className="py-3 px-6 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts?.map((post) => (
                                <tr key={post._id} className="hover:bg-teal-600/30">
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            <span className="text-lg font-normal">{post.bookName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            <span className="text-lg font-normal">{post.Author}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            <span className="text-lg font-normal">{post.category}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            {

                                                <span className={`text-lg font-normal uppercase ${post.status === "verified" ? "text-green-500" : "text-red-500"}`}>{post.status}
                                                </span>

                                            }

                                        </div>
                                    </td>
                                    <td className="py-4 px-6 flex justify-end gap-2">
                                        <button className="bg-red-500 text-white px-4 py-2 whitespace-nowrap rounded-md hover:bg-red-600">Delete</button>
                                        <button className="bg-teal-500 text-white px-4 py-2 whitespace-nowrap rounded-md hover:bg-teal-600" onClick={() => handleVerify(post?._id)}>Change Status</button>
                                        <button className="bg-green-500 text-white px-4 py-2 whitespace-nowrap rounded-md hover:bg-green-600" onClick={() => handleViewPost(post)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-center mt-4">
                    <nav>
                        <ul className="flex">
                            {/* prev */}
                            <li className={`px-4 py-2 mx-1 border rounded cursor-pointer disabled:cursor-not-allowed ${currentPage > 1 ? 'bg-teal-500 text-white' : 'bg-white text-black'}`} onClick={() => currentPage > 1 && paginate(currentPage - 1)}>&laquo;</li>
                            {/* page numbers */}
                            {[...Array(Math.ceil(filteredPosts.length / postsPerPage)).keys()].map(number => (
                                <li key={number + 1} className={`px-4 py-2 mx-1 border rounded cursor-pointer ${currentPage === number + 1 ? 'bg-teal-500 text-white' : 'bg-white text-black'}`} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </li>
                            ))}
                            {/* next */}
                            <li className={`px-4 py-2 mx-1 border rounded cursor-pointer ${currentPage < Math.ceil(filteredPosts.length / postsPerPage) ? 'bg-teal-500 text-white' : 'bg-white text-black'}`} onClick={() => currentPage < Math.ceil(filteredPosts.length / postsPerPage) && paginate(currentPage + 1)}>&raquo;</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Posts;
