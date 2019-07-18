import '../utils/aux';
import crypto from 'crypto';
import Database from './database';

export class BasicWallet {
    constructor(info) {
        this.__address = info.address;
        this.__network = info.network;
        this.__coinType = info.coinType;
        this.__wif = '';
    }
    
    get coinType() {
        return this.__coinType;
    }

    get coins() {
        throw "needs implementation";
    }

    get name() {
        return this.__name;
    }

    get address() {
        return this.__address;
    }
    
    get network() {
        return this.__network;
    }
    
    get wif() {
        return this.__wif;
    }


    /**
     * This is irreversible as there is not way to decrypt the wallet for good.
     * The only way to read the key is with the readDecrypted function
     * @param password Cleartext or hashed makes no difference
     * @returns {BasicWallet} It returns itself
     * @code const wallet = Wallet.create(name, mnemonic).encrypt(password);
     */
    encrypt(password) {
        if (this.__password) throw new Error('Cannot re-encrypt an encrypted key');
        this.__password = password;
        const cipher = crypto.createCipher(BasicWallet.Defaults.Encryption, password);
        this.__wif = cipher.update(this.__wif, 'utf8', 'hex') + cipher.final('hex');
        return this;
    }

    /**
     * This method will NOT decrypt the wallet but temporarily the key and return it to the calling code
     * This method is NOT symmetrical with the encrypt one.
     * @param password Hashed or not it will be used, it only needs to match the one used in encryption
     * @returns {string} It will not return the wallet itself like the encrypt
     */
    readDecrypted(password) {
        if (!this.__password) throw new Error('Cannot de-encrypt an key that was not encrypted');
        if (!password || !this.matches(password)) throw new Error('Passwords do not match');
        const cipher = crypto.createDecipher(BasicWallet.Defaults.Encryption, password);
        return cipher.update(this.__wif, 'hex', 'utf8') + cipher.final('utf8');
    }

    matches(password) {
        return password === this.__password;
    }

    send(amount, address, fee, password) {
        throw "needs implementation"
    }
    
    static generate() {
        throw "needs implementation"
    }

    static get store() {
        if (!BasicWallet.__store) BasicWallet.__store = new Database(BasicWallet.Defaults.DBFileName);
        return BasicWallet.__store;
    }
    
    static find(info) {
        let self = this;
        return new Promise((resolve, reject)=>{
            BasicWallet.store.find({
                ...info
            }).then(async docs=>{
                let results = docs.map(d=>{
                    return new self(d);
                });
                resolve(results);
            }, e=>{
                reject(e);
            })
        });
    }

    static create(name, mnemonic) {
        throw "needs implementation"
    }
    
    save() {
        let self = this;
        let obj = this.toObject();
        console.log({
            network: this.network,
            ...this,
            ...obj
        });
        return self.constructor.store.insert({
            network: this.network,
            ...this,
            ...obj
        });
    }
    
    erase() {
        this.constructor.store.remove({ address: this.address });
    }
    
    toObject() {
        const obj = {
            name: this.name,
            address: this.address,
            wif: this.wif,
            network: this.network,
            coinType: this.coinType
        };
        if (this.__password) obj.password = this.__password;
        return obj;
    }

}

BasicWallet.Defaults = {
    Encryption: 'aes-256-cbc',
    Path: "m/44'/0'/0'/0/0",
    DBFileName: 'wallets-v11',
};