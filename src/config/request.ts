import axios, { AxiosInstance } from "axios";
import Cookies from "js-cookie";

const request: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

request.interceptors.request.use((setconfig: any) => {
    if (setconfig.url !== "/api/admin-login/")
        setconfig.headers["Authorization"] = `Token ${Cookies.get("token")}`;
    return setconfig;
}, (error) => {
    return Promise.reject(error);
}
);


export { request };