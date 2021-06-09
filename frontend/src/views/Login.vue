<template>
  <div>
    <div v-if="showError">
      {{ errorMessage }}
    </div>
    <button @click="googleLogin">Googleアカウントでログイン</button>
  </div>
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
