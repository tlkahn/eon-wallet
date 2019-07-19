import Hasher from './hasher.util';
import {ETHWallet} from './ETHWallet';

async function logInUser(info) {
    const {phone, password} = info;
    let pwdHash = await Hasher.hash(password);
    return new Promise((resolve, reject)=>{
        ETHWallet.store.find({
            phone,
            pwdHash
        }).then(wallets=>{
            if (wallets.length > 0) {
                resolve(wallets);
            }
            else {
                reject("user not exist or password wrong");
            }
        }, (e)=>{
            console.log("error when fetching user name and password: ", e);
        });
    });
}

export default logInUser;

