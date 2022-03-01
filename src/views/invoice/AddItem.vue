<template>
  <div class="row">
    <div class="col-3">
      <label for="item" class="form-label">item *</label>
      <select :disabled="seeinvoice" class="form-select" id="item" v-model="item_add.item_id">
        <option v-for="item in items" :key="item.id" :value="item.id">
          {{ `${item.code} - ${item.description}` }}
        </option>
      </select>
    </div>

    <div class="col-3">
      <label for="number" class="form-label">Cantidad *</label>
      <input
        :disabled="seeinvoice"
        v-model="item_add.quantity"
        type="number"
        class="form-control"
        id="number"
      />
    </div>

    <div class="col-3">
      <label for="number" class="form-label">Valor unitario *</label>
      <input
        :disabled="seeinvoice"
        v-model="item_add.unit_value"
        type="number"
        class="form-control"
        id="number"
      />
    </div>

    <div class="col-3">
        <a v-if="!seeinvoice" @click="addItem()" class="mt-4 btn btn-primary">Añadir Item</a>
    </div>
  </div>
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
    ]),
    /**
     * añadimos item al array de items de factura
     **/
    addItem(){
        if (this.item_add.item_id && this.item_add.quantity && this.item_add.unit_value) {
            this.item_add.total_value = this.item_add.quantity  * this.item_add.unit_value;
            this.item_add.item.description = this.items.find(el => el.id == this.item_add.item_id).description;
            this.form.invoices_items.push(JSON.parse((JSON.stringify(this.item_add))));
        }
    }
  },
  computed: {
    ...mapState("invoice", ["form", "params", "items", "item_add"]),
    /**
     * validamos si se esta visualizando la factura para deshabilitar y ocultar campos
     **/
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