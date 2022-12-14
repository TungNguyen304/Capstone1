import axiosClient from "./axiosApi";
const accountApi = {
    getAll: (params) => {
        const url = "/accounts"
        return axiosClient.get(url, {
            params
        })
    },
    update: (id) => {
        const url = `/accounts${id}`
        return axiosClient.put(url)
    },
    delete: (id) => {
        const url = `/accounts${id}`
        return axiosClient.delete(url)
    }
}
export default accountApi 