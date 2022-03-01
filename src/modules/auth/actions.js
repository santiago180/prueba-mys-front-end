import axios from 'axios'
const host = 'http://127.0.0.1:8000/api/'
import { ElNotification } from 'element-plus'

/**
 * @author Santiago Torres
 * añadimos el token para poder acceder a las rutas
 * que requieren autenticacion
 */
 const $http = axios.create({});
 $http.interceptors.request.use(req => {
     let token = JSON.parse(localStorage.getItem('token'));
     req.headers.Authorization = `Bearer ${token}`
     return req
 }, error => {
     console.log(`interceptor request ${error}`)
 })

/**
 * @author Santiago Torres
 * consumimos api que nos permite autenticarnos
 */
export async function login({commit, state}) {
    return await new Promise( async (resolve, reject)=>{
        await axios.post(`${host}login`, state.login_form)
        .then( async response => {
            await localStorage.setItem('token', JSON.stringify(response.data.token))
            commit('setLoginUser', response.data)
            ElNotification({
                title: 'Exito',
                message: 'Bienvenido',
                duration: 3000,
                type: 'success',
              })
            resolve()
        })
        .catch(error => {
            ElNotification({
                title: 'Exito',
                message: 'Usuario no encontrado',
                duration: 3000,
                type: 'error',
            })
            reject()
        }) 
    }) 
}

/**
 * @author Santiago Torres
 * cerrar sesion.
 */
 export async function logout({commit, state}) {
    await $http.post(`${host}logout`)
    .then(response => {
    })
    .catch(error => {
    })
}

/**
 * @author Santiago Torres
 * consumimos api que nos permite registrarnos
 */
 export async function register({commit, state}) {
    await axios.post(`${host}regitro`, state.register_form)
    .then(response => {
        ElNotification({
            title: 'Exito',
            message: 'Usuario registrado',
            duration: 3000,
            type: 'success',
          })
    })
    .catch(error => {
        ElNotification({
            title: 'Exito',
            message: 'Hubo error al registrar Usuario',
            duration: 3000,
            type: 'error',
          })
    })
}