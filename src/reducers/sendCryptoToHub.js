import {
    SEND_CRYPTO_TO_HUB
} from '../actions/actionTypes';

const initialState = {
    owed: {
        'BTC': 0,
        'ETH': 0,
        'EOS': 0
    },
};

export const sendCryptoToHub = (state = initialState, action) => {
    switch (action.type) {
        case SEND_CRYPTO_TO_HUB:
            let coinType = action.payload.coinType;
            let amount = action.payload.amount;
            return {
                ...state,
                owed: {
                    ...state.owed,
                    [coinType]: state.owed[coinType] + amount
                }
            };
        default:
            return state;
    }
};

export default ({
    sendCryptoToHub
});

//selectors
export const getSendCryptoToHubResult = (state) => {
    const {owed,} = state.sendCryptoToHub;
    return {owed};
};