import Hasher from './hasher.util';
import Wallet from './BitcoinWallet';

function signUpUser(usr) {
    const {fname, lname, phone, password} = usr;
    return new Promise(function(resolve, reject) {
        Hasher.hash(password).then((hash) => {
            let pwdHash = hash;
            const mnemonic = Wallet.generate();
            const wallet = Wallet.create(usr.fname+'.'+usr.lname, mnemonic).encrypt(pwdHash);
            Object.assign(wallet, {
                phone,
                pwdHash,
            });
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