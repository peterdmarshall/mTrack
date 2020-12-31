import axios from 'axios';

export const userService = {
    login,
    logout,
    signup
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email: email, password: password } })
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/tokens',
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

function signup(email, name, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email: email, password: password } })
    }

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/users',
        headers: requestOptions.headers,
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(user => {
        return user;
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function handleResponse(response) {
    console.log(response);
    const data = response.data;
    if (!response.status === 200) {
        if (response.status === 401 || response.status === 403) {
            // auto logout if 401 or 403
            logout();
            window.location.reload(true);
        }

        const error = (data) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}