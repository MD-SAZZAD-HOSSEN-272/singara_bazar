import axios from "axios";


export default function useAxiosSecure() {
    const instance = axios.create({
        baseURL: 'http://localhost:4000/',
    });

    return instance
}