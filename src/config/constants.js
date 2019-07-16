// TODO: migrate data from package.json
export const API_URL =
                        'https://warm-depths-29783.herokuapp.com';
                      // 'http://localhost:3001';

// export const WS_URL =  process.env.NODE_ENV === 'production' ?
//                        'wss://enigmatic-mountain-38641.herokuapp.com/api/cable' :
//                        'ws://localhost:5000/api/cable';

export const MESSAGE_FORM = {
    text: "text",
    crypto: "crypto",
    location: "location",
    image: "image"
};

export const BTC_CONST = {
    Bitcoin: {
        Decimals: 8,
        Satoshis: 100000000,
    },
    Networks: {
        Testnet: 'testnet',
        Bitcoin: 'bitcoin',
    },
    Transactions: {
        AverageBytes: 255
    },
    Endpoints: {
        BitcoinFees: 'https://bitcoinfees.earn.com/api/v1/fees/recommended'
    },
    ReturnValues: {
        TransactionSubmitted: 'Transaction Submitted',
        NoFreeOutputs: 'No free outputs to spend',
        Fragments: {
            MinimumFeeNotMet: 'min relay fee not met',
        },
    },
    Messages: {
        Wallet: {
            Created: 'Your wallet has been created and saved!',
            Mnemonic: 'Store this sequence safely',
            Failed: 'A wallet could not be created at this moment',
        },
        Transactions: {
            NOTSent: 'Transaction could not be sent',
            Sent: 'Your transaction was sent'
        },
        Errors: {
            FeeNotMet: 'A fee to process this transaction was not provided'
        }
    }
};

export const EON_HUB_ADDR = {
    BTC: "mpTJFqyfzn4JFUoZYxNRodqAXd43onvDKP"
}


