<template>
  <div class="mt-3 container card">
    <div class="card-body">
      <h2>Login</h2>
      <form @submit.prevent="_login()">
        <div class="mb-3">
          <label for="email" class="form-label">Correo</label>
          <input v-model="login_form.email" type="email" class="form-control" id="email"/>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Contraseña</label>
          <input v-model="login_form.password" type="password" class="form-control" id="password"/>
        </div>
        <button type="submit" class="btn btn-primary">Ingresar</button>
      </form>
    </div>
  </div>
</template>


<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
import { ElNotification } from 'element-plus'

export default {
  created() {
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async _login() {
      await this.login()
        .then(() => this.$router.push("/factura"))
        .catch(()=> console.error('login fail'))

    }
  },
  computed: {
    ...mapState("auth", ["login_form"]),
  },
};
</script>