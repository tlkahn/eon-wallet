import axios from 'axios/index';
import Hasher from './hasher.util';
import Wallet from './wallet.class';

async function logInUser(info) {
    window.Wallet = Wallet;
    const {phone, password} = info;
    let hash = await Hasher.hash(password);
    return new Promise((resolve, reject)=>{
            debugger
        Wallet.find({
            phone,
            pwdHash: hash
        }).then(docs=>{
            if (docs.length > 0) {
                resolve("user record found", docs);
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

