import axios from "axios";

export const BASE_URL = "http://localhost:5502";

export const myAxiosDs = axios.create({
    baseURL: BASE_URL,
});

