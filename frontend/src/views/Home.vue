<template>
  <div class="d-flex flex-row">
    <Header :changeSelectedNoteId="changeSelectedNoteId" />
    <main class="d-flex flex-column w-100 vh-100">
      <Editor :note="note" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../components/TheHeader.vue";
import Editor from "../components/TheEditor.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Editor,
  },
  data() {
    return {
      selectedNoteId: "",
    };
  },
  computed: {
    note(): any {
      return this.$store.getters.noteById(this.selectedNoteId);
    },
  },
  methods: {
    changeSelectedNoteId(id: string) {
      this.selectedNoteId = id;
    },
  },
});
</script>

<style scoped>
body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}

html {
  height: -webkit-fill-available;
}
</style>
