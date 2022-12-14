import axios from 'axios';
const api = 'https://engaging-bird-13.hasura.app/v1/graphql';
const key = 'pBwSSpQYbAsV5lJKottd2hw4vDBVYEl8ac0uZUvZu44ZI0Sn3aU5uewUF9Cwrf19';
axios.defaults.baseURL = api
axios.defaults.headers.common = { 'x-hasura-admin-secret': key }
export default axios;