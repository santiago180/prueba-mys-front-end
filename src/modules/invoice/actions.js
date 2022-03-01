import axios from 'axios';
const host = 'http://127.0.0.1:8000/api/';
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
 * obtenemos las facturas
 */
export async function fetchInvoices({commit, state}) {
    $http.get(`${host}factura`, {params:state.params})
    .then(response => {
        commit('setInvoices', response.data.data)
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * obtenemos la factura
 */
export async function fetchInvoice({commit, state}, id) {
    $http.get(`${host}factura/${id}`)
    .then(response => {
        commit('setInvoice', response.data.data)
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * Borramos un item de la factura
 */
export async function deleteInvoiceItem({commit, state}, id) {
    $http.delete(`${host}item-factura/${id}`)
    .then(response => {
        ElNotification({
            title: 'Exito',
            message: 'Eliminado correctamente',
            duration: 3000,
            type: 'success',
          })
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * creamos factura
 */
export async function createInvoice({commit, state}) {
    let params = state.form
    $http.post(`${host}factura`, params)
    .then(response => {
        ElNotification({
            title: 'Exito',
            message: response.data.message,
            duration: 3000,
            type: 'success',
        })
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * Actualizamos factura
 */
export async function updateInvoice({commit, state}, id) {
    let params = state.form
    $http.put(`${host}factura/${id}`, params)
    .then(response => {
        ElNotification({
            title: 'Exito',
            message: response.data.message,
            duration: 3000,
            type: 'success',
        })
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * Eliminamos factura
 */
export async function deleteInvoice({dispatch, commit, state}, id) {
    $http.delete(`${host}factura/${id}`)
    .then(response => {
        dispatch('fetchInvoices')
        ElNotification({
            title: 'Exito',
            message: response.data.message,
            duration: 3000,
            type: 'success',
        })
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * Obtenemos Emisores
 */
export async function fetchReceivers({commit, state}) {
    let params  = {
        is_receiver: true
    }
    $http.get(`${host}contacto`, {params:params})
    .then(response => {
        commit('setReceivers', response.data.data)
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * Obtenemos receptores
 */
export async function fetchTransmitters({commit, state}) {
    let params  = {
        is_transmitter: true
    }
    $http.get(`${host}contacto`, {params:params})
    .then(response => {
        commit('setTransmitters', response.data.data)
    })
    .catch(error => {

    })
}

/**
 * @author Santiago Torres
 * Obtenemos items
 */
export async function fetchItems({commit, state}) {
    $http.get(`${host}item`)
    .then(response => {
        commit('setItems', response.data.data)
    })
    .catch(error => {

    })
}