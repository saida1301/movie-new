import axios from "axios";

export default axios.create({
    baseURL: 'https://movie-apii.onrender.com/api'
})