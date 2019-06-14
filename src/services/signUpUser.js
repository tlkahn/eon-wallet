import axios from 'axios/index';

function signUpUser(userObj) {
    //TODO: mock stub
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
            status: 'ok',
            userId: '12345'
        });
        }, 300);
    });
}

export default signUpUser;