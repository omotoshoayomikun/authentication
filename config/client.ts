import axios from "axios";

const baseUrl = process.env.BASEURL;
const axiosClient = axios.create({
    baseURL: baseUrl,
    // timeout: 50000,
    withCredentials: true,
})

export default axiosClient;