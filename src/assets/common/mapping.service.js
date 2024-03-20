import axios from './axios';
const prefix = '/shopify';

export const MappingService = {
    getMappings() {
        return axios.get(`${prefix}/getMappings`);
    },
    saveMappings(mapping) {
        return axios.post(`${prefix}/saveMappings`, {
            mapping: mapping
        });
    },
    deleteMapping(id) {
        return axios.delete(`${prefix}/deleteMapping`, {
            params: {
                id: id
            }
        });
    },
}