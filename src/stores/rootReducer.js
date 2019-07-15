import { combineReducers } from 'redux';
import {goToConversation} from '../reducers/goToConversation';
import {sendCryptos} from '../reducers/sendCrypto';
import {selectEmoji} from '../reducers/selectEmoji';
import {searchMessageText} from '../reducers/searchMessageText';
import {logInCurrentUser} from '../reducers/logInCurrentUser';
import {goToGroupChat} from '../reducers/goToGroupChat';
import {sendLocation} from '../reducers/sendLocation';
import {sendText} from '../reducers/sendText';
import {sendCryptoToHub} from '../reducers/sendCryptoToHub';

const appReducer = combineReducers({
  goToConversation,
  sendCryptos,
  selectEmoji,
  searchMessageText,
  logInCurrentUser,
  goToGroupChat,
  sendLocation,
  sendText,
  sendCryptoToHub
});

const rootReducer = (state, action) => {
  let reducedResult = appReducer(state, action);
  return reducedResult;
}

export default rootReducer;