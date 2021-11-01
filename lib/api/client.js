import axios from "axios";

const client = axios.create();

client.defaults.baseURL = "http://localhost:8080"
// client.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN}`

export default client;
