<template>
  <div>
    <h2>Registro de Usuário</h2>
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
        <label class="label">Nome</label>
        <input
          type="text"
          placeholder="Nome do usuário."
          class="input"
          v-model="name"
        />
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
        <button class="button is-sucess" @click="register">Cadastrar</button>
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
      name: "",
      email: "",
      password: "",
      error: undefined,
    }
  },
  methods: {
    register() {
      axios
        .post("http://localhost:8686/user", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.$router.push({ name: 'Home' });
        })
        .catch((error) => {
          var messageError = error.res.data.err;
          this.error = messageError;
        })
    },
  },
};
</script>

<style scoped>
</style>