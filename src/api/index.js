import axios from 'axios'
const BASE_URL = process.env.REACT_APP_API;
let API = axios.create({ baseURL: BASE_URL })
API.interceptors.request.use(req => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    if (user && user.accessToken) {
        req.headers = {
            "x-access-token": user.accessToken
        }
    } else {
        req.headers = { "x-access-token": "" };
    }
    return req;
})
export { API };