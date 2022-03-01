<template>
  <div class="mt-3 container card">
    <div class="card-body">
      <h2>Registro</h2>
      <form @submit.prevent="_register()">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre</label>
          <input v-model="register_form.name" type="text" class="form-control" id="name"/>
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Correo</label>
          <input v-model="register_form.email" type="email" class="form-control" id="email"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="register_form.password" type="password" class="form-control" id="password"/>
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>
      </form>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";

export default {
  created() {
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async _register() {
        if (this.   register_form.name && this.    register_form.email && this.    register_form.password) {
            this.register()
        }
    }
  },
  computed: {
    ...mapState("auth", ["register_form"]),
  },
};
</script>