import Hasher from './hasher.util';
import Wallet from './wallet.class';

function signUpUser(usr) {
    const {fname, lname, phone, password} = usr;
    let pwdHash = '';
    
    return new Promise(function(resolve, reject) {
        Hasher.hash(password).then((hash) => {
            pwdHash = hash;
            const mnemonic = Wallet.generate();
            const wallet = Wallet.create(usr.fname+'.'+usr.lname, mnemonic).encrypt(pwdHash);
            resolve({
                wallet,
                mnemonic,
                pwdHash
                });
        }, (e) => {
            reject(e)
        });

    });
}

export default signUpUser;