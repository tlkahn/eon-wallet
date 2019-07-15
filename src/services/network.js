import { exchange, blockexplorer, pushtx } from 'blockchain.info';
import bitcoin from 'bitcoinjs-lib';
import axios from 'axios';
import {BTC_CONST}from '../config/constants';

const env = require('../config/env.json');

const c_exchange = exchange;

let c_blockexplorer;
let c_pushtx;
let c_network;

switch (env.network) {
case BTC_CONST.Networks.Testnet:
    c_blockexplorer = blockexplorer.usingNetwork(3);
    c_pushtx = pushtx.usingNetwork(3).pushtx;
    c_network = bitcoin.networks.testnet;
    break;
case BTC_CONST.Networks.Bitcoin:
    c_blockexplorer = blockexplorer;
    c_pushtx = pushtx.pushtx;
    c_network = bitcoin.networks.bitcoin;
    break;
default:
    throw new Error('Unknown network in env file');
}

const getPrice = currency => c_exchange.getTicker({ currency: currency || 'USD' });

const getFee = () => {
    return axios.get(BTC_CONST.Endpoints.BitcoinFees).then((response) => {
        return (response.data.fastestFee * BTC_CONST.Transactions.AverageBytes) / BTC_CONST.Bitcoin.Satoshis;
    }).catch(() => {
        return 0;
    });
};

const broadcast = tx => c_pushtx(tx).then(result => result === BTC_CONST.ReturnValues.TransactionSubmitted);

const getUnspentOutputs = (address) => {
    return c_blockexplorer.getUnspentOutputs(address).then((result) => {
        return {
            utxos: result.unspent_outputs,
            coins: result.unspent_outputs.reduce((a, c) => a + c.value, 0) / BTC_CONST.Bitcoin.Satoshis
        };
    });
};


const getTransactions = (addresses) => {
    return c_blockexplorer.getMultiAddress(addresses, {}).then((result) => {
        return Array.isArray(result.txs) ? result.txs : [];
    });
};



export default {
    current: c_network,
    name: env.network,
    api: {
        getPrice: getPrice,
        getFee: getFee,
        broadcast: broadcast,
        getUnspentOutputs: getUnspentOutputs,
        getTransactions: getTransactions,
    }
};
