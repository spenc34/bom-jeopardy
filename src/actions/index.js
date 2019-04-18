import axios from 'axios';

const host = 'http://localhost:8181';

const ActionTypes = {
    GET_CATEGORY_COUNT: 'GET_CATEGORY_COUNT',
    GET_CATEGORY: 'GET_CATEGORY',
    GET_CLUE: 'GET_CLUE',
    CHECK_ANSWER: 'CHECK_ANSWER',
    GET_HIGH_SCORES: 'GET_HIGH_SCORES',
    SUBMIT_SCORE: 'SUBMIT_SCORE',
    START_NEW_GAME: 'START_NEW_GAME',
    DISABLE_CARD: 'DISABLE_CARD',
    ADD_TO_SCORE: 'ADD_TO_SCORE',
    CHANGE_DISPLAY: 'CHANGE_DISPLAY'
};

export function getCategoryCount() {
    const promise = axios.get(`${host}/api/category/count`);
    return {
        type: ActionTypes.GET_CATEGORY_COUNT,
        payload: promise
    };
}

export function getCategory(id) {
    const promise = axios.get(`${host}/api/category/${id}`);
    return {
        type: ActionTypes.GET_CATEGORY,
        payload: promise
    };
}

export function getClue(id, difficulty) {
    const promise = axios.get(`${host}/api/clue?id=${id}&difficulty=${difficulty}`);
    return {
        type: ActionTypes.GET_CLUE,
        payload: promise
    };
}

export function disableCard(id) {
    return {
        type: ActionTypes.DISABLE_CARD,
        cardId: id
    };
}

export function checkAnswer(id, difficulty, answer) {
    const promise = axios.post(`${host}/api/answer`, {
        categoryId: id,
        difficulty: difficulty,
        answer: answer
    });
    return {
        type: ActionTypes.CHECK_ANSWER,
        payload: promise
    };
}

export function getHighScores() {
    const promise = axios.get(`${host}/api/scores`);
    return {
        type: ActionTypes.GET_HIGH_SCORES,
        payload: promise
    };
}

export function submitScore(name, score) {
    const promise = axios.post(`${host}/api/scores`, {
        player: name,
        score: score
    });
    return {
        type: ActionTypes.SUBMIT_SCORE,
        payload: promise
    };
}

export function addToScore(value) {
    return {
        type: ActionTypes.ADD_TO_SCORE,
        value: value
    };
}

export function startNewGame() {
    const promise = axios.get(`${host}/api/newgame`);
    console.log('New game started');
    return {
        type: ActionTypes.START_NEW_GAME,
        payload: promise
    };
}

export function changeDisplay(display) {
    return {
        type: ActionTypes.CHANGE_DISPLAY,
        display: display
    }
}

// PROBABLY WON'T NEED THESE ANYMORE
export function addUsedIds(ids) {
    return {
        type: ActionTypes.APPEND_USED_IDS,
        ids: ids
    }
}

export function setCategories(categories) {
    return {
        type: ActionTypes.SET_CATEGORIES,
        categories: categories
    }
}


export default ActionTypes;