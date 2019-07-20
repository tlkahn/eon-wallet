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

export const BTC_CONFIG = {
    Bitcoin: {
        Decimals: 8,
        Satoshis: 100000000,
    },
    Networks: {
        Testnet: 'testnet',
    },
    Transactions: {
        AverageBytes: 255
    },
    Endpoints: {
        BitcoinFees: 'https://bitcoinfees.earn.com/api/v1/fees/recommended'
    },
    EON_HUB_ADDR: "mpTJFqyfzn4JFUoZYxNRodqAXd43onvDKP",
};

export const ETH_CONFIG = {
    network: 'ropsten',
    INFURA_END_POINT: 'https://ropsten.infura.io/v3/',
    INFURA_API_KEY: '2175427e87804701a83b3dd0accb7977',
    ETH_GAS_STATION: 'https://ethgasstation.info/json/ethgasAPI.json',
    ETH_GAS_LIMIT: 21000,
    ETHERSCAN_END_POINT: 'https://api-ropsten.etherscan.io/api',
    ETHERSCAN_API_KEY: '277FBYYYWN8SZHKQ6BC2P9FMQU61KGDM3F',
    EON_HUB_ADDR: "0xe3D9bDBd165bbefbb7B6A889C3B5781730286252"
};
