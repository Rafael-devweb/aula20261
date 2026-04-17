import { useAuth } from "@/app/context/AuthContext";
import axios from "axios";
import Cookies  from "js-cookie";
import { config } from "process";


const api = axios.create({
    baseURL: 'http://localhost:8080'

});

api.interceptors.request.use(
    (config)=>{

        debugger;
        const token = Cookies.get('token');
if(token){

config.headers.Authorization = `Bearer ${token}`;

    }
        return config
    }
)


export default api;