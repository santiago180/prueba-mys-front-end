export const defaultForm = () => {
    return {
        number:null,
        transmitter_id:null,
        receiver_id:null,
        invoices_items:[]
    };
};
export const defaultItemAdd = () => {
    return {
        item_id:null,
        quantity:null,
        unit_value:null,
        total_value:null,
        item:{description:null}
    };
};

export default {
    invoices: [],
    items:[],
    receivers:[],
    transmitters:[],
    params:{
        number:null,
        transmitter_id:null,
        receiver_id:null,
        order:'ASC'
    },
    form:defaultForm(),
    item_add: defaultItemAdd()
}