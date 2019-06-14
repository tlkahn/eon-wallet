import axios from 'axios/index';

let positionOption = { timeout: 500, enableHighAccuracy: true };
let gpsSuccess = function(currentPosition) {
    return currentPosition;
};
let getPositionBy3rdParty = (cb)=>{
    axios.get('http://ip-api.com/json').then(response=>{
        //{"as":"AS16509 Amazon.com, Inc.","city":"San Jose","country":"United States","countryCode":"US","isp":"Amazon.com, Inc.","lat":37.3394,"lon":-121.895,"org":"Amazon Technologies Inc","query":"54.183.239.247","region":"CA","regionName":"California","status":"success","timezone":"America/Los_Angeles","zip":"95141"}
        cb(response.data);
    })

};
let gpsFailed = function(cb) {
    //use some 3rd party position solution(get position by your device ip)
    getPositionBy3rdParty(cb);
};

function getCurrentLocation(cb) {
  // return navigator.geolocation.getCurrentPosition(gpsSuccess, gpsFailed, positionOption);
    return gpsFailed(cb);
}

export default getCurrentLocation;