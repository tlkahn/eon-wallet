import { combineReducers } from 'redux';
import { GOTO_CONVERSATION } from '../actions/actionTypes';
import {goToConversation} from '../reducers/goToConversation';
import {sendCryptos} from '../reducers/sendCrypto';
import {selectEmoji} from '../reducers/selectEmoji';
import {searchMessageText} from '../reducers/searchMessageText';
import {logInCurrentUser} from '../reducers/logInCurrentUser';
import {goToGroupChat} from '../reducers/goToGroupChat';

const appReducer = combineReducers({
  goToConversation,
  sendCryptos,
  selectEmoji,
  searchMessageText,
  logInCurrentUser,
  goToGroupChat
});

const rootReducer = (state, action) => {
  let reducedResult = appReducer(state, action);
  return reducedResult;
}

export default rootReducer;