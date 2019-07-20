import {
    SEND_CRYPTO_TO_HUB
} from '../actions/actionTypes';

const initialState = {
    owed: {
        'BTC': 0,
        'ETH': 0,
        'EOS': 0
    },
    status: null,
    result: {}
};

export const sendCryptoToHub = (state = initialState, action) => {
    switch (action.type) {
        case SEND_CRYPTO_TO_HUB:
            if (action.payload.status === 'success') {
                let coinType = action.payload.coinType;
                let amount = action.payload.amount;
                return {
                    ...state,
                    owed: {
                        ...state.owed,
                        [coinType]: state.owed[coinType] + amount
                    },
                    status: action.payload.status,
                    result: action.payload.result
                };
            }
            else {
                return {
                    ...state,
                    status: 'failure',
                    reason: action.payload.reason
                }
            }
            
        default:
            return state;
    }
};

export default ({
    sendCryptoToHub
});

//selectors
export const getSendCryptoToHubResult = (state) => {
    return state.sendCryptoToHub;
};