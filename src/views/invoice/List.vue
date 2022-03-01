<template>
  <div class="mt-3 container card">
    <div class="card-body">
      <div class="row">
        <div class="col-11">
          <h2>Facturas</h2>
        </div>
        <div class="col-1">
          <button type="button" class=" mt-1 btn btn-primary" @click="createInvoice()">Crear</button>
        </div>

      </div>
      <hr>

      <filter-invoices></filter-invoices>

      <table class="table mt-5">
      <thead>
        <tr>
          <th scope="col">Número de factura</th>
          <th scope="col">Fecha y hora</th>
          <th scope="col">Emisor</th>
          <th scope="col">Receptor</th>
          <th scope="col">Valor antes de IVA</th>
          <th scope="col">IVA</th>
          <th scope="col">Valor a pagar</th>
          <th scope="col">opciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="invoice in invoices" :key="invoice.id">
          <th scope="row">{{invoice.number}}</th>
          <td>{{ invoice.date }}</td>
          <td>{{ `${invoice.transmitter.nit} - ${invoice.transmitter.name}` }}</td>
          <td>{{ `${invoice.receiver.nit} - ${invoice.receiver.name}` }}</td>
          <td>{{ invoice.value_before_iva }}</td>
          <td>{{ invoice.iva }}</td>
          <td>{{ invoice.value_to_pay }}</td>
          <td>
            <button type="button" class="btn btn-secondary" @click="seeInvoice(invoice.id)">Ver</button>
            <button type="button" class="btn btn-primary" @click="editInvoice(invoice.id)">Editar</button>
            <button type="button" class="btn btn-danger" @click="deleteInvoice(invoice.id)">eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import filterInvoices from "./FilterInvoices.vue"

export default {
  components:{
    filterInvoices
  },
  created() {
    if(!this.login_user){
      this.$router.push("/login")
    }else{
      this.fetchInvoices();
    }
  },
  methods: {
    ...mapActions("invoice", ["fetchInvoices", "deleteInvoice"]),
    createInvoice(){
      this.$router.push("/factura/crear")
    },
    seeInvoice(id){
      this.$router.push(`/factura/${id}/ver`)
    },
    editInvoice(id){
      this.$router.push(`/factura/${id}/editar`)
    }
  },
  computed: {
    ...mapState("invoice", ["invoices"]),
    ...mapState("auth", ["login_user"]),
  },
};
</script>