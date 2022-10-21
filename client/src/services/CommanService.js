import axiosInstance from '../services/AxiosInstance';

export function get(url) {
    return axiosInstance.get(url);
}

export function post(url, data) {
    return axiosInstance.post(url, data);
}

export function put(url, data) {
    return axiosInstance.put(url, data);
}
export function deleteMethod(url) {
    return axiosInstance.delete(url);
}
