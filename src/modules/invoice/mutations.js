import {
    defaultForm,
    defaultItemAdd,
} from "./state";

/**
 * @author Santiago Torres
 * seteamos el listado de facturas
 */
export function setInvoices(state, invoices) {
    state.invoices = invoices;
}

/**
 * @author Santiago Torres
 * seteamos receptores
 */
export function setReceivers(state, receivers) {
    state.receivers = receivers
}

/**
 * @author Santiago Torres
 * seteamos emisores
 */
export function setTransmitters(state, transmitters) {
    state.transmitters = transmitters
}

/**
 * @author Santiago Torres
 * seteamos items
 */
export function setItems(state, items) {
    state.items = items
}

/**
 * @author Santiago Torres
 * seteamos factura
 */
export function setInvoice(state, invoice) {
    state.form = invoice
    state.form.date = `${invoice.date.substr(0, 10)}T${invoice.date.substr(11, 5)}`;
}

/**
 * @author Santiago Torres
 * limpiamos los datos del formulario de creacion/modificaion
 * de factura
 */
export function clearForm(state){
    state.form = defaultForm(),
    state.item_add =  defaultItemAdd()
}