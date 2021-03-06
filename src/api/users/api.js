import request from '../request';
import { url } from './config';

const api = {
    fetch(params) {
        return request
            .get(`/api${url}`, { params })
            .then((res) => res.data)
            .catch((error) => error);
    }
};

export default api;
