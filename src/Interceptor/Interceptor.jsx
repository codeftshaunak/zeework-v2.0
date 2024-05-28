import axios from "axios";

const AxiosInstance = axios.create();

AxiosInstance.interceptors.request.use(
    config => {
        // const token = localStorage.getItem('authtoken')
        const token = ""

        if (token) {
            config.headers['Authorization'] = 'Bearer' + token
        }
        config.headers['Content-Type'] = 'application/json';
        return config
    },
    error => {
        console.log(error)
        Promise.reject(error)
    }
)
AxiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        // const access_token = localStorage.getItem('authtoken');
        const access_token = "";
        if (error.response.status === 401 && access_token) {
            // localStorage.clear();
            window.location.replace('/')
        } else {
            console.log(error)
        }
        return Promise.reject(error);
    }
);

export default AxiosInstance;