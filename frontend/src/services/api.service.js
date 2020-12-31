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
    removeColumn,
    getAllCards,
    getCard,
    createCard,
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
    });
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
    });
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
    });
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
    });
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
    });
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
        url: process.env.REACT_APP_API_URL + '/boards' + boardId + '/columns/' + columnId + '/cards',
        data: requestOptions.body
    })
    .then(handleResponse)
    .then(card => {
        return card;
    });
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

        const error = response.statusText; // (data) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}