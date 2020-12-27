import axios from 'axios';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { userService } from './user.service';

export const apiService = {
    getAllBoardsForUser
};

function getAllBoardsForUser(user) {
    if(!user) {
        return Promise.reject("No user");
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards',
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(boards => {
        return boards;
    });
}

function handleResponse(response) {
    console.log(response);
    const data = response.data;
    if (!response.status === 200) {
        if (response.status === 401 || response.status === 403) {
            // auto logout if 401 or 403
            dispatch(userService.logout());
            window.location.reload(true);
        }

        const error = (data) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}