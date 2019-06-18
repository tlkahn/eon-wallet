//TODO: mock stub
import axios from 'axios';
import {API_URL} from "../config/constants";

const USER_INFO_URL = `${API_URL}/users/`;

const fetchUsrInfo = (usrId) => {
    return axios.get(`${USER_INFO_URL}${usrId}.json`).then(response=>{
        return response.data;
    });
};

export default fetchUsrInfo;