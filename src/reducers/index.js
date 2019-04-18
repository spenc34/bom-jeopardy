import ActionTypes from '../actions';

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.START_NEW_GAME:
      return Object.assign({}, state, action.payload.data);
    case ActionTypes.GET_CLUE:
      return {...state, currentClue: action.payload.data, display: 'clue'};
    case ActionTypes.DISABLE_CARD:
      let used = [];
      state.usedSquareKeys.forEach(element => {
        used.push(element);
      });
      used.push(action.cardId);
      return {...state, usedSquareKeys: used}
    case ActionTypes.CHECK_ANSWER:
      return Object.assign({}, state, {
        answerSubmitted: true,
        isAnswerCorrect: action.payload.data.isCorrect,
        correctAnswer: action.payload.data.correctAnswer
      });
    case ActionTypes.ADD_TO_SCORE:
      return Object.assign({}, state, {
        answerSubmitted: false,
        isAnswerCorrect: false,
        currentAnswer: null,
        correctAnswer: null,
        score: state.score + action.value,
        display: 'board'
      });
    case ActionTypes.CHANGE_DISPLAY:
      console.log(action);
      return Object.assign({}, state, {display: action.display});
    default:
      return state;
  }
}