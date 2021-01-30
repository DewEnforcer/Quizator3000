import axios from "axios";
import {toast} from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.response.use(null, err => {
    if (err.response && err.response.status >= 400 && err.response.status < 500) {
        toast.error("Unexpected error has occured, please refresh the page!");
    }

    return Promise.reject(err);
})

const setJwt = jwt => axios.defaults.headers.common["x-auth-token"] = jwt;

export default {
    get: axios.get,
    post: axios.post,
    delete: axios.delete,
    patch: axios.patch,
    put: axios.put,
    setJwt
}