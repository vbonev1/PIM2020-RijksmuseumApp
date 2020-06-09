import axios from 'axios';

const options = {
    baseURL: "https://www.rijksmuseum.nl/api/en/"
};

const instance = axios.create(options);

export default instance;