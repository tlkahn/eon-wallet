import '../utils/aux';
import crypto from 'crypto';
import Database from './database';
import Hasher from './hasher.util';

export class BasicWallet {
    constructor(info) {
        this.__address = info.address;
        this.__network = info.network;
        this.__wif = '';
        this.__password = '';
        this.__pwdHash = '';
        this.__phone = '';
        if (!BasicWallet.__store) BasicWallet.__store = new Database(BasicWallet.Defaults.DBFileName);
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
    
    get phone() {
        return this.__phone;
    }

    /**
     * This is irreversible as there is not way to decrypt the wallet for good.
     * The only way to read the key is with the readDecrypted function
     * @param password Cleartext or hashed makes no difference
     * @returns {BasicWallet} It returns itself
     * @code const wallet = Wallet.create(name, mnemonic).encrypt(password);
     */
    encrypt(pwdHash) {
        const iv = Buffer.alloc(16, 0);
        const cipher = crypto.createCipheriv(BasicWallet.Defaults.Encryption, pwdHash.slice(0, 24), iv);
        this.__wif = cipher.update(this.__wif, 'utf8', 'hex') + cipher.final('hex');
        return this;
    }

    /**
     * This method will NOT decrypt the wallet but temporarily the key and return it to the calling code
     * This method is NOT symmetrical with the encrypt one.
     * @param password Hashed or not it will be used, it only needs to match the one used in encryption
     * @returns {string} It will not return the wallet itself like the encrypt
     */
    async readDecrypted(password) {
        return new Promise(async (resolve, reject)=>{
            if (password && (await this.matches(password))){
                const iv = Buffer.alloc(16, 0); // Initialization vector.
                const cipher = crypto.createDecipheriv(BasicWallet.Defaults.Encryption, this.__pwdHash.slice(0, 24), iv);
                resolve(cipher.update(this.__wif, 'hex', 'utf8') + cipher.final('utf8'));
            }
            else {
                reject({error: "password not match"});
            }
        })
    }
    
    async hash(str) {
        return await Hasher.hash(str);
    }

    async matches(password) {
        let hash = await this.hash(password);
        return (hash === this.__pwdHash) || hash === this.pwdHash;
    }

    send(amount, address, fee, password) {
        throw "needs implementation"
    }
    
    static generate() {
        throw "needs implementation"
    }

    static get store() {
        if (!BasicWallet.__store) BasicWallet.__store = new Database(BasicWallet.Defaults.DBFileName);
        return this.__store;
    }
    
    static find(info) {
        let self = this;
        return new Promise((resolve, reject)=>{
            this.store.find({
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
    
    static create(phone, name, mnemonic, privateKey, publicKey, address) {
        throw "needs implementation"
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
        if (this.__pwdHash) obj.pwdHash = this.__pwdHash;
        if (this.__phone)  obj.phone = this.__phone;
        return obj;
    }

}

BasicWallet.Defaults = {
    Encryption: 'aes-192-cbc',
    Path: "m/44'/0'/0'/0/0",
    DBFileName: 'wallets-v32',
};