<template>
  <router-view />
</template>

<script lang="ts">
import firebase from "firebase/app";
import Vue from "vue";

export default Vue.extend({
  name: "app",
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("setUser", { user, isLogin: true });
      } else {
        this.$store.dispatch("setUser", { user, isLogin: false });
      }
    });

    console.log("app.vue onmounted");
  },
});
</script>
