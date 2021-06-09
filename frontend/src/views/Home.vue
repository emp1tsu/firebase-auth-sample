<template>
  <div class="d-flex flex-row">
    <Header :changeSelectedNoteId="changeSelectedNoteId" />
    <main class="d-flex flex-column w-100 vh-100">
      <Editor :note="note" />
    </main>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
} from "@vue/composition-api";
import Header from "../components/TheHeader.vue";
import Editor from "../components/TheEditor.vue";

type State = {
  selectedNoteId: string;
  note: any;
};

export default defineComponent({
  name: "Home",
  components: {
    Header,
    Editor,
  },
  setup(props, { root }) {
    const store = root.$store;
    const state = reactive<State>({
      selectedNoteId: "",
      note: computed(() => store.getters.noteById(state.selectedNoteId)),
    }) as State;

    const changeSelectedNoteId = (id: string) => {
      state.selectedNoteId = id;
    };

    return { ...toRefs(state), changeSelectedNoteId };
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
