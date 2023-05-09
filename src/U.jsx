import axios from "axios";          

export default class U {
    baseURL = "http://localhost:8080/usuarios/all"

    getAll() {
        return axios.get(this.baseURL).then(res => res.data);
    }
}
