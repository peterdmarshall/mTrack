import { RepeatOneSharp } from '@material-ui/icons';
import axios from 'axios';
import { dispatch } from 'rxjs/internal/observable/pairs';
import { userService } from './user.service';

export const apiService = {
    getAllBoardsForUser,
    getUserBoard,
    createUserBoard,
    removeUserBoard,
    getAllColumns,
    createColumn,
    updateColumn,
    removeColumn,
    getAllCards,
    getCard,
    createCard,
    updateCard,
    removeCard
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
    })
    .catch(handleError);
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
    })
    .catch(handleError);
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
    })
    .catch(handleError);
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
    })
    .catch(handleError);

}



function getAllColumns(boardId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns',
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(columns => {
        return columns;
    })
    .catch(handleError);
}

function createColumn(title, boardId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token },
        body: JSON.stringify({ column: { title: title }})
    };

    return axios({
        method: requestOptions.method,
        headers: requestOptions.headers,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns',
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(column => {
        return column;
    })
    .catch(handleError);
}

function updateColumn(title, boardId, columnId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token },
        body: JSON.stringify({ column: { title: title }})
    };

    return axios({
        method: requestOptions.method,
        headers: requestOptions.headers,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId,
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(column => {
        return column;
    })
    .catch(handleError);
}

function removeColumn(boardId, columnId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    }

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId,
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(column => {
        return column;
    })
    .catch(handleError);
}


function getAllCards(boardId, columnId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId + '/cards',
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(cards => {
        return cards;
    })
    .catch(handleError);
}

function getCard(boardId, columnId, cardId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    };

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId + '/cards/' + cardId,
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(card => {
        return card;
    })
    .catch(handleError);
}

function createCard(title, description, boardId, columnId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token },
        body: JSON.stringify({ card: { title: title, description: description }})
    };

    return axios({
        method: requestOptions.method,
        headers: requestOptions.headers,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId + '/cards',
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(card => {
        return card;
    })
    .catch(handleError);
}

function updateCard(title, description, boardId, columnId, cardId, user, newColumnId = columnId) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token },
        body: JSON.stringify({ card: { title: title, description: description }, new_column_id: newColumnId })
    };

    return axios({
        method: requestOptions.method,
        headers: requestOptions.headers,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId + '/cards/' + cardId,
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(card => {
        return card;
    })
    .catch(handleError);
}

function removeCard(boardId, columnId, cardId, user) {
    if(!user) {
        return Promise.reject("Not logged in");
    }

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Authorization': user.token }
    }

    return axios({
        method: requestOptions.method,
        url: process.env.REACT_APP_API_URL + '/boards/' + boardId + '/columns/' + columnId + '/cards/' + cardId,
        headers: requestOptions.headers,
    })
    .then(handleResponse)
    .then(card => {
        return card;
    })
    .catch(handleError);
}


function handleResponse(response) {
    const data = response.data;

    if (!response.status === 200) {
        if (response.status === 401 || response.status === 403) {
            // auto logout if 401 or 403
            console.log('logging out');
            userService.logout();
            window.location.reload(true);
        }
    }

    return data;
}

function handleError(error) {
    console.log(error.response.status);

    if (error.response.status === 401 || error.response.status === 403) {
        // auto logout if 401 or 403
        console.log('logging out');
        userService.logout();
        window.location.reload(true);
    }

    let errorCode = '';

    switch (error.response.status) {
        case 500:
            errorCode = '500 Unauthorized';
            break;
        case 401:
            errorCode = '401 Unauthorized';
            break;
        case 403:
            errorCode = '401 Forbidden';
            break;
        default:
            errorCode = 'Error';
    }
    return Promise.reject(errorCode);
}