import axios from "axios";

const api = axios.create({
    baseURL: "https://ai-resume-builder-ewnp.vercel.app/"
});

export default api;