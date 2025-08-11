import axios from 'axios'

 const api = axios.create({
    baseURL : 'https://cadastro-usuario-backend.onrender.com/'
 })

 export default api