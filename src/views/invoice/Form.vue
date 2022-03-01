<template>
  <div class="mt-3 container card">
    <div class="card-body">
      <h4>{{ title }}</h4>
      <hr>

      <form class="mt-4" @submit.prevent="validateForm()">
        <div class="row">
          <div class="col-3 mb-3">
            <label for="date" class="form-label">Fecha *</label>
            <input :disabled="seeinvoice" v-model="form.date" type="datetime-local" class="form-control" id="date"/>
          </div>

          <div class="col-3 mb-3">
            <label for="email" class="form-label">Emisor *</label>
            <select :disabled="seeinvoice" class="form-select" v-model="form.transmitter_id">
              <option v-for="transmitter in transmitters" :key="transmitter.id" :value="transmitter.id">{{`${transmitter.nit} - ${transmitter.name}`}}</option>
            </select>
          </div>

          <div class="col-3 mb-3">
            <label for="email" class="form-label">Receptor *</label>
            <select :disabled="seeinvoice" class="form-select" v-model="form.receiver_id">
              <option v-for="receiver in receivers" :key="receiver.id" :value="receiver.id">{{`${receiver.nit} - ${receiver.name}`}}</option>
            </select>
          </div>
          
        </div>

        <div class="row">
          <h6>Items</h6>
          <hr>
          
          <add-item></add-item>
          
          <table-item></table-item>

        </div>

        <div class="row">
          <div class="col-12 text-center mb-3">
            <button v-if="!seeinvoice"  type="submit" class="mt-4 btn btn-primary">{{buttonValue}}</button>
          </div>
        </div>
      </form>
      
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import AddItem from './AddItem.vue'
import TableItem from './TableItems.vue'

export default {
  components:{
    AddItem,
    TableItem
  },
  created() {
    if(!this.login_user){
      this.$router.push("/login")
    }else{
      this.fetchTransmitters();
      this.fetchReceivers();
      this.fetchItems();
      if (this.$route.params.id_v) {
        this.fetchInvoice(this.$route.params.id_v);
      }
      if (this.$route.params.id_e) {
        this.fetchInvoice(this.$route.params.id_e);
      }
    }
  },
  methods: {
    ...mapActions("invoice", ["fetchInvoices", "fetchInvoice", "fetchReceivers", "fetchTransmitters", "fetchItems", "createInvoice", "updateInvoice"]),
    ...mapMutations("invoice", ["clearForm"]),
    /**
     * validamos si la informacion está completa y creamos o actualizamos según sea el caso
     **/ 
    async validateForm(){
      if (this.form.date && this.form.transmitter_id && this.form.receiver_id && this.form.invoices_items.length > 0) {
        if  (this.$route.params.id_e) {
          await this.updateInvoice(this.$route.params.id_e)
        }else{
          await this.createInvoice()
        }
        this.clearForm()
        this.$router.push("/factura")
      }else{
        console.log('seleecione todos los campos');
      }
    }
  },
  computed: {
    ...mapState("invoice", ["form", "receivers", "transmitters"]),
    ...mapState("auth", ["login_user"]),
    seeinvoice(){
      if (this.$route.params.id_v) {
        return true;
      }else{
        return false;
      }
    },
    title(){
      if (this.$route.params.id_v) {
        return `Ver Factura`;
      }
      if (this.$route.params.id_e) {
        return `Editar Factura`;
      }
      return `Crear Factura`
    },
    buttonValue(){
      if (this.$route.params.id_e) {
        return `Editar Factura`;
      }
      return `Crear Factura`
    }
  },
};
</script>