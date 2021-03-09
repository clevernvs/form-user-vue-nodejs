<template>
  <div>
    <h2>Login</h2>
    <hr />
    <div class="columns is-centered">
      <div class="columns is-half">
        <!-- Message: Error -->
        <div v-if="error != undefined">
          <div class="notification is-danger">
            <p>{{ error }}</p>
          </div>
        </div>

        <!-- Form -->
        <label class="label">E-mail</label>
        <input
          type="text"
          placeholder="E-mail do usuário."
          class="input"
          v-model="email"
        />
        <label class="label">Senha</label>
        <input
          type="password"
          placeholder="Digite a senha."
          class="input"
          v-model="password"
        />
        <hr />
        <button class="button is-primary" @click="login">Entrar</button>
        <!-- ./Form -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: undefined,
    };
  },
  methods: {
    login() {
      axios
        .post("http://localhost:8686/login", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ name: "Home" });
        })
        .catch((error) => {
          var messageError = error.res.data.err;
          this.error = messageError;
        });
    },
  },
};
</script>

<style scoped>
</style>