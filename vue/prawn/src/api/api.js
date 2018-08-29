import axios from 'axios';

axios.defaults.baseURL = 'http://m.dxshiwan.com/'

export const sendPost = (url,params) => {

    return axios.post(url, params).then((res) => {
        return res.data;
    })
}

export const sendGet = (url,params) => {
    
    return axios.get(url, params).then((res) => {
        return res.data;
    })  
}
