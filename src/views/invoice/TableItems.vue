<template>
  <table class="table mt-5 mt-4">
    <thead>
      <tr>
        <th scope="col">Descripción del Item</th>
        <th scope="col">Cantidad</th>
        <th scope="col">Valor Unitario</th>
        <th scope="col">Valor Total</th>
        <th scope="col">opciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in form.invoices_items" :key="index">
        <th scope="row">{{item.item.description}}</th>
        <td>{{ item.quantity }}</td>
        <td>{{ item.unit_value }}</td>
        <td>{{ item.total_value }}</td>
        <td><button v-if="!seeinvoice"  @click="deleteItem(index, item)" type="button" class="btn btn-danger">eliminar</button></td>
      </tr>
    </tbody>
  </table>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  created() {
  },
  methods: {
    ...mapActions("invoice", [
      "fetchInvoices",
      "fetchReceivers",
      "fetchTransmitters",
      "deleteInvoiceItem",
    ]),
    deleteItem(index, item){
      if (item.id) {
        this.deleteInvoiceItem(item.id);
      }
      this.form.invoices_items.splice(index, 1); 
    }
  },
  computed: {
    ...mapState("invoice", ["form", "params", "items", "product_add"]),
    seeinvoice(){
      if (this.$route.params.id_v) {
        return true;
      }else{
        return false;
      }
    }
  },
};
</script>