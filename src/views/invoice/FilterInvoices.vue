<template>
  <div>
    <h4>filtros</h4>
    <form @submit.prevent="fetchInvoices()">
      <div class="row">
        <div class="col-3 mb-3">
          <label for="number" class="form-label">Numero</label>
          <input v-model="params.number" type="number" class="form-control" id="number"/>
        </div>
        <div class="col-3 mb-3">
          <label for="email" class="form-label">Emisor</label>
          <select class="form-select" v-model="params.transmitter_id">
            <option v-for="transmitter in transmitters" :key="transmitter.id" :value="transmitter.id">{{`${transmitter.nit} - ${transmitter.name}`}}</option>
          </select>
        </div>
        <div class="col-3 mb-3">
          <label for="email" class="form-label">Receptor</label>
          <select class="form-select" v-model="params.receiver_id">
            <option v-for="receiver in receivers" :key="receiver.id" :value="receiver.id">{{`${receiver.nit} - ${receiver.name}`}}</option>
          </select>
        </div>
        <div class="col-2">
          <label for="order" class="form-label">Orden</label>
          <select class="form-select" v-model="params.order">
            <option v-for="(option, index) in options" :key="index" :value="option.value">{{`${option.label}`}}</option>
          </select>
        </div>
        <div class="col-1 mb-3">
          <button type="submit" class="mt-4 btn btn-primary">Listar</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data(){
    return {
      options:[
        {
          value:'ASC',
          label: 'Ascendente'
        },
        {
          value:'DESC',
          label: 'descendente'
        }
      ]
    }
  },
  created() {
    this.fetchReceivers();
    this.fetchTransmitters();
  },
  methods: {
    ...mapActions("invoice", ["fetchInvoices", "fetchReceivers", "fetchTransmitters"]),
  },
  computed: {
    ...mapState("invoice", ["params", "receivers", "transmitters"]),
  },
};
</script>