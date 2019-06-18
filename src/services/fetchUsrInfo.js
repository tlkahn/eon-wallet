//TODO: mock stub
import axios from 'axios';
const USER_INFO_URL = "http://localhost:3001/users/";

const fetchUsrInfo = (usrId) => {
    return axios.get(`${USER_INFO_URL}${usrId}.json`).then(response=>{
        return response.data;
    });
};

export default fetchUsrInfo;