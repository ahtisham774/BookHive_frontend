import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, fetchUsers, verifyUser } from "../../redux/thunks/books"; // Corrected the thunk path
import { createImageLetter } from "../../utils/showProfileImage";
import toast from "react-hot-toast";



const UserDetailModal = ({ user, onClose }) => {
    if (!user) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">User Details</h2>
                <img src={user.avatar || createImageLetter(`${user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`)} alt={user.firstName} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Status:</strong> <span className={`font-semibold ${user.status === "approved" ? "text-green-500" : "text-red-500"}`}>{user.status}</span></p>
                <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Close</button>
            </div>
        </div>
    );
};


const Users = () => {
    const state = useSelector(state => state.users);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8); // You can adjust the number of users per page

    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (state.users == null || Object.keys(state.users).length === 0) {
            dispatch(fetchUsers());
        }
    }, [dispatch, state.users]);

    const handleSort = (key) => {
        const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
        setSortKey(key);
        setSortOrder(order);
    };

    const filteredUsers = state.users
        ?.filter(user =>
            user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.sort((a, b) => {
            if (sortKey) {
                if (a[sortKey] < b[sortKey]) return sortOrder === "asc" ? -1 : 1;
                if (a[sortKey] > b[sortKey]) return sortOrder === "asc" ? 1 : -1;
                return 0;
            }
            return 0;
        });

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleViewUser = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };


    const handelVerify = async (user) => {

        try {

            dispatch(verifyUser({
                enduser: user._id,
                changeStatus: user.status === "approved" ? "inprogress" : "approved"
            })
            )
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleDelete = async (id) => {
        try {
            const confirm = window.confirm("Are You Sure to Delete this use?")
            if (!confirm) return
            dispatch(deleteUser({ enduser: id }))
        }
        catch (err) {
            console.log(err)
        }
    }





    return (
        <div className="w-full max-w-full bg-gray-100">
            <div className="w-full min-h-[calc(100dvh_-65px)] px-4 flex flex-col gap-5 py-4 bg-inherit">
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 p-2 max-w-lg border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                {isModalOpen && selectedUser && (
                    <UserDetailModal user={selectedUser} onClose={closeModal} />
                )}
                <div className="overflow-x-auto">
                    <table className="min-w-full  h-full flex-1 bg-white shadow-md rounded-lg">
                        <thead className="bg-teal-500 text-white">
                            <tr>
                                <th className="py-3 px-6 border-b border-gray-200" >Profile</th>
                                <th className="py-3 px-6 border-b border-gray-200 cursor-pointer" onClick={() => handleSort("firstName")}>Name</th>
                                <th className="py-3 px-6 border-b border-gray-200 cursor-pointer" onClick={() => handleSort("email")}>Email</th>
                                <th className="py-3 px-6 border-b border-gray-200">Status</th>
                                <th className="py-3 px-6 border-b border-gray-200">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers?.map((user) => (
                                <tr key={user._id} className="hover:bg-teal-600/30">
                                    <td className="py-4 px-6 ">
                                        <img src={user.avatar || createImageLetter(`${user.firstName[0].toUpperCase()}${user.lastName && user.lastName[0].toUpperCase()}`)} alt={user.firstName} className="w-12 h-12 rounded-full" />
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            <span className="text-lg font-normal">{user.firstName} {user.lastName}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            <span className="text-lg font-normal">{user.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 ">
                                        <div className="flex justify-center">
                                            {

                                                <span className={`text-lg font-normal uppercase ${user.status === "approved" ? "text-green-500" : "text-red-500"}`}>{user.status}
                                                </span>

                                            }

                                        </div>

                                    </td>
                                    <td className="py-4 px-6  flex justify-end gap-2">
                                        <button className="bg-red-500 text-white px-4 py-2  whitespace-nowrap rounded-md hover:bg-red-600" onClick={() => handleDelete(user._id)}>Delete</button>
                                        <button className="bg-teal-500 text-white px-4 py-2  whitespace-nowrap rounded-md hover:bg-teal-600" onClick={() => handelVerify(user)}>Change Status</button>
                                        <button className="bg-green-500 text-white px-4 py-2 whitespace-nowrap  rounded-md hover:bg-green-600" onClick={() => handleViewUser(user)}>View</button>
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
                            {[...Array(Math.ceil(filteredUsers.length / usersPerPage)).keys()].map(number => (
                                <li key={number + 1} className={`px-4 py-2 mx-1 border rounded cursor-pointer ${currentPage === number + 1 ? 'bg-teal-500 text-white' : 'bg-white text-black'}`} onClick={() => paginate(number + 1)}>
                                    {number + 1}
                                </li>
                            ))}
                            {/* next */}
                            <li className={`px-4 py-2 mx-1 border rounded cursor-pointer ${currentPage < Math.ceil(filteredUsers.length / usersPerPage) ? 'bg-teal-500 text-white' : 'bg-white text-black'}`} onClick={() => currentPage < Math.ceil(filteredUsers.length / usersPerPage) && paginate(currentPage + 1)}>&raquo;</li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Users;
