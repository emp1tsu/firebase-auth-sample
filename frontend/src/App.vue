<template>
  <router-view />
</template>

<script lang="ts">
import firebase from "firebase/app";
import { computed, defineComponent, onMounted } from "@vue/composition-api";

export default defineComponent({
  name: "app",
  setup(props, { root }) {
    const store = root.$store;

    const user = computed(() => store.getters.userData);

    onMounted(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.dispatch("setUser", { user, isLogin: true });
        } else {
          store.dispatch("setUser", { user, isLogin: false });
        }
      });

      console.log("app.vue onmounted");
    });

    return { user };
  },
});
</script>
