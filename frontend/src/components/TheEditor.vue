<template>
  <div class="d-flex flex-column vh-100 overflow-hidden">
    <div class="d-flex">
      <input
        class="btn"
        type="button"
        value="Save"
        @click="handleUpdateNote(note.id, note.title, note.body)"
      />
      <input type="text" class="form-control" v-model="note.title" />
    </div>
    <div class="h-100 w-100">
      <MonacoEditor
        v-model="note.body"
        class="h-100 w-100"
        language="markdown"
        theme="vs-dark"
        ref="editor"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Note } from "@/store/types";
import {
  defineComponent,
  PropType,
  reactive,
  toRefs,
} from "@vue/composition-api";
import MonacoEditor from "vue-monaco";

type State = {
  editor: any;
};

export default defineComponent({
  name: "Editor",
  components: { MonacoEditor },
  props: {
    note: {
      type: Object as PropType<Note>,
      default: function() {
        return {};
      },
    },
  },
  setup(props: any, { root }: any) {
    const store = root.$store;
    const state = reactive<State>({ editor: null });

    window.addEventListener("resize", (e) => {
      state.editor.getMonaco().layout();
    });

    const handleUpdateNote = (id: string, title: string, body: string) => {
      console.log(id, title, body);
      if (!id) return;
      store.dispatch("updateNote", { id, title, body });
    };

    return {
      ...toRefs(state),
      handleUpdateNote,
    };
  },
});
</script>

<style scoped>
.editor-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.editor {
  text-align: left;
  width: 100%;
  height: 100%;
}
</style>
