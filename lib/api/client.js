import axios from "axios";

const client = axios.create();

client.defaults.baseURL = `//${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}`;

export default client;
