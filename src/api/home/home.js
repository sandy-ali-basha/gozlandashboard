
import { _axios } from "../../interceptor/http-config";

const Link = "/home"

export const _Home = {
    index: () => _axios.get(Link).then((res) => res.data),
    nav: () => _axios.get('/navbar').then((res) => res.data),

    post: (data) => _axios.post(Link, data).then((res) => res?.data),

    delete: (id) => _axios.delete(Link+'/item/' + id).then((res) => res.data),

    update: ({ editedID, formData }) => _axios.post( Link +'/item/' + editedID, formData).then((res) => res?.data),
    add: ({ formData }) => _axios.post( Link +'/item', formData).then((res) => res?.data),
    updateNav: ({ editedID, formData }) => _axios.post('/navbar/' + editedID, formData).then((res) => res?.data),
};
