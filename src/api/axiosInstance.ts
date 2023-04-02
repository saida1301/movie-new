import axios from "axios";

export const  baseUrl =  axios.create({
    baseURL: 'http://192.168.0.105:3000'
})