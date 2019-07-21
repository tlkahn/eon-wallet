import {
    CREATE_NEW_WALLET
} from '../actions/actionTypes';
import {find} from 'lodash';

const initialState = {
    wallets: [],
};

export const createNewWallet = (state = initialState, action) => {
  console.log("state.wallets", state.wallets);
  console.log("action.payload.wallet", action.payload && action.payload.wallet);
  switch (action.type) {
      case CREATE_NEW_WALLET:
        if  (!find(state.wallets, {address: action.payload.wallet.address})) {
          return {
            ...state,
            wallets: [...state.wallets, action.payload.wallet],
          };
        }
    default:
      return state;
  }
};

export default ({
    createNewWallet
});

//selectors
export const getWallets = (state) => {
    const {wallets, } = state.createNewWallet;
    return {
        wallets
    }
};