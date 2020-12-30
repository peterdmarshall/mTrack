import axios from 'axios';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { userService } from './user.service';

export const apiService = {
    getAllBoardsForUser,
    getUserBoard,
    createUserBoard,
    removeUserBoard
};

function getAllBoardsForUser(user) {
    if(!user) {
        return Promise.reject("Not logged in");
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

function getUserBoard(boardId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId,
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(board => {
        return board;
    });
}

function createUserBoard(name, description, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token },
        body: JSON.stringify({ board: { name: name, description: description }})
    };

    return axios({
        method: requestOptions.method,
        headers: requestOptions.headers,
        url: process.env.REACT_APP_API_URL + '/boards',
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(board => {
        return board;
    });
}

function removeUserBoard(boardId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    }

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId,
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(board => {
        return board;
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