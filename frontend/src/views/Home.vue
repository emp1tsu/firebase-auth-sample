<template>
  <v-app>
    <Header :changeSelectedNoteId="changeSelectedNoteId" />
    <v-main>
      <v-container class="pa-0" fill-height>
        <v-row class="text-center" style="height: 100%;">
          <v-col v-if="note" cols="12" class="pa-0">
            <Editor :note="note" />
          </v-col>
          <v-col v-else cols="12" class="pa-0">
            <p>ノートを選択してください</p>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>footer</v-footer>
  </v-app>
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
.editor {
  width: 600px;
  height: 800px;
}
</style>
