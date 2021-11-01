import axios from "axios";

const client = axios.create();

client.defaults.baseURL = `${process.env.NEXT_PUBLIC_API_HOST}`
client.defaults.headers.common["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_TEST_ACCESS_TOKEN}`

export default client;
