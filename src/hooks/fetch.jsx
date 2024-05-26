


// set token in header of axios
import axios from 'axios';




export const get = async (url) => {
    const token = localStorage.getItem('user_token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    const response = await axios.get(url, config);
    return await response.data;
}

export const post = async (url, data) => {
    const token = localStorage.getItem('user_token');

    const response = await axios.post(url, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.data;
}
export const postWithoutForm = async (url, data) => {
    const token = localStorage.getItem('user_token');

    const response = await axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.data;
}
export const put = async (url, data) => {
    const token = localStorage.getItem('user_token');

    const response = await axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return await response.data;
}