import { authHeader } from '../helpers/authHeader';
import axios from 'axios';

export const userService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/token',
        headers: requestOptions.headers,
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage
        localStorage.setItem('user', JSON.stringify(user));

        return user;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/users',
        headers: requestOptions.headers
    })
    .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status == 401 || response.status == 403) {
                // auto logout if 401 or 403
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}