import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib';
import {BTC_CONST} from '../config/constants';
import bnet from './network';
import '../utils/aux';
import {BasicWallet} from "./wallet";

class Wallet extends BasicWallet {
    constructor(info) {
        super(info);
        this.__name = info.name;
        this.__password = info.password || undefined;
        this.__utxos = [];
    }
    
    get coinType() {
        return this.__coinType;
    }

    /**
     * This will set the unspend outputs as retrieved by the network.
     * It will also parse them to retrieve the total number of coins available to the wallet
     * @param value
     */
    set utxos(value) {
        this.__utxos = value;
    }

    get utxos() {
        return this.__utxos;
    }

    /**
     * Coins are not set explicitly but through the unspent outputs
     * @returns {number|*}
     */
    get coins() {
        return this.utxos.reduce((a, c) => a + c.value, 0) / BTC_CONST.Bitcoin.Satoshis;
    }

    get name() {
        return this.__name;
    }

    send(btc, address, fee, password) {
        const satoshis = Math.round(btc * BTC_CONST.Bitcoin.Satoshis);
        const satoshis_fee = Math.round(fee * BTC_CONST.Bitcoin.Satoshis);

        const network = bnet.current;

        const txb = new bitcoin.TransactionBuilder(network);

        let current = 0;
        for (const utx of this.utxos) {

            txb.addInput(utx.tx_hash_big_endian, utx.tx_output_n);

            current += utx.value;
            if (current >= (satoshis + satoshis_fee)) break;
        }
        
        txb.addOutput(address, satoshis);

        const change = current - (satoshis + satoshis_fee);
        if (change >= 0) {
            txb.addOutput(this.address, change)
            const wif = this.__password ? this.readDecrypted(password) : this.wif;
            const key = bitcoin.ECPair.fromWIF(wif, network);
        
            txb.sign(0, key);
        
            const raw = txb.build().toHex();
        
            return bnet.api.broadcast(raw);
        }
        else {
            throw("insufficient funds");
        }
    }
    
    static generate() {
        return bip39.generateMnemonic();
    }

    static create(name, mnemonic) {
        const seed = bip39.mnemonicToSeed(mnemonic);
        const master = bitcoin.HDNode.fromSeedBuffer(seed, bnet.current);
        const derived = master.derivePath(Wallet.Defaults.Path);
        const address = derived.getAddress();
        const wif = derived.keyPair.toWIF();
        const coinType = 'BTC';
        return new Wallet({
            coinType,
            name: name,
            address: address,
            wif: wif,
            network: bnet.name,
        });
    }

    update() {
        return bnet.api.getUnspentOutputs(this.address).then((result) => {
            this.utxos = result.utxos;
            return true;
        }, (e) => {
            if (e.toString() === BTC_CONST.ReturnValues.NoFreeOutputs) {
            }
        });
    }
    
}

export default Wallet;
