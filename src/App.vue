<template>
  <nav id="navbar-example2" class="navbar navbar-light bg-light px-3">
    <div class="container">
      <a class="navbar-brand" href="#">Prueba Mejora y Soluciones</a>
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link v-if="!loggued" class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="!loggued" class="nav-link" to="/registro">Registro</router-link>
        </li>
        <li class="nav-item">
          <router-link v-if="loggued" class="nav-link" to="/factura">Facturas </router-link>
        </li>
        <li class="nav-item">
          <a v-if="loggued" class="nav-link" @click="_logout" href="#">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  <router-view/>
</template>

<style>
@import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
</style>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  created(){
    let user = {
      token : JSON.parse(localStorage.getItem('token'))
    }
    this.setLoginUser(user)
  },
  methods:{
    ...mapMutations('auth', ['setLoginUser']),
    ...mapActions('auth', ['logout']),
    async _logout(){
      await this.logout()
      let user = {
        token : null
      }
      this.setLoginUser(user)
      await localStorage.setItem('token', null)
      await this.$router.push("/login")
    }
  },
  computed:{
    ...mapState('auth', ['login_user']),
     loggued(){
      let token = this.login_user;
      return token ? true : false;
    }
  }
}
</script>