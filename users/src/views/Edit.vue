<template>
  <div>
    <h2>Edição de Usuário</h2>
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
        <hr />
        <button class="button is-sucess" @click="update">Editar</button>
        <!-- ./Form -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  created() {
    var req = {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("token"),
      },
    };

    axios
      .get("http://localhost:8686/user" + this.$route.params.id, req)
      .then((res) => {
        this.name = res.data.name;
        this.id = res.data.id;
      })
      .catch((error) => {
        this.$router.push({ name: "Users" });
        console.log();
      });
  },
  data() {
    return {
      name: "",
      email: "",
      id: -1,
      error: undefined,
    };
  },
  methods: {
    update() {
      var req = {
        headers: {
          Authorization: "Bearer" + localStorage.getItem("token"),
        },
      };
      axios
        .put("http://localhost:8686/user", {
          name: this.name,
          email: this.email,
          id: this.id,
        }, req)
        .then((res) => {
          this.$router.push({ name: "Users" });
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