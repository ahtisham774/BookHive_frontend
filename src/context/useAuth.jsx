import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { url } from "../routes/url";
import Loader from "../utils/loader";


export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state
    const [token, setToken] = useState(localStorage.getItem("user_token") || "");
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url.CURRENT_USER, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },

                });
                const data = await response.data;
                if (data?.statusCode === 401 || data?.statusCode === 500) {
                    setUser(null)
                    localStorage.removeItem("user_token")
                }
                else {
                    setUser(data)
                }


            } catch (error) {
                console.error("Error fetching user data:", error);
                setUser(null)

            } finally {
                setLoading(false); // Set loading to false when data fetching is complete
            }
        };

        fetchUsers();
    }, [token]);

    if (loading) {
        // Render loading screen while fetching data
        return <Loader />;
    }

    return (
        <UserContext.Provider value={{ user, setUser, setToken }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContextProvider;
