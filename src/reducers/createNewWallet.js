import {
    CREATE_NEW_WALLET
} from '../actions/actionTypes';

const initialState = {
    wallets: [],
};

export const createNewWallet = (state = initialState, action) => {
    debugger
  switch (action.type) {
      case CREATE_NEW_WALLET:
        return {
            ...state,
            wallets: [...state.wallets, action.payload.wallet],
        };
    default:
      return state;
  }
};

export default ({
    createNewWallet
});

//selectors
export const getWallets = (state) => {
    debugger
    const {wallets, } = state.createNewWallet;
    return {
        wallets
    }
};