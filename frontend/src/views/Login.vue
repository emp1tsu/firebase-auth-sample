<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <div v-if="showError">
          {{ errorMessage }}
        </div>
        <button @click="googleLogin">Googleアカウントでログイン</button>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase/app";

export default {
  name: "login",
  data() {
    return {
      errorMessage: "",
      showError: false,
    };
  },
  methods: {
    googleLogin: function() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log(result.user);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          this.errorMessage = error.message;
          this.showError = true;
        });
    },
  },
};
</script>
