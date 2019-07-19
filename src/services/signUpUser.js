import Hasher from './hasher.util';
import {ETHWallet} from './ETHWallet';
import {once} from 'lodash';

function signUpUser(usr) {
    const {fname, lname, phone, password} = usr;
    return new Promise(function(resolve, reject) {
        Hasher.hash(password).then((hash) => {
            let pwdHash = hash;
            const {mnemonic, privateKey, publicKey, address} = ETHWallet.generate();
            const wallet = ETHWallet.create(phone,fname + '.' + lname, mnemonic, privateKey, publicKey, address, pwdHash).encrypt(pwdHash);
            console.log("saving wallet");
            wallet.save().then(() => {
                console.log("wallet saved. please keep mnemonic in somewhere safe: ", mnemonic);
                resolve(wallet);
            }, (e) => {
                console.log("database saved error: ", e);
                reject(e);
            });
        }, (e) => {
            reject(e)
        });
    });
}

export default signUpUser;