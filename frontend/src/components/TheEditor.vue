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
import Vue, { PropType } from "vue";
import MonacoEditor from "vue-monaco";
import { Note } from "../types";

type DataType = {
  editor: any;
};

export default Vue.extend({
  name: "Editor",
  components: { MonacoEditor },
  props: {
    note: {
      type: Object as PropType<Note>,
      default: () => {
        return {};
      },
    },
    updateNote: {
      type: Function as PropType<
        (id: string, title: string, body: string) => void
      >,
    },
  },
  data(): DataType {
    return {
      editor: null,
    };
  },
  mounted() {
    window.addEventListener("resize", (e) => {
      this.editor.getMonaco().layout();
    });
  },
  methods: {
    async handleUpdateNote(id: string, title: string, body: string) {
      console.log(id, title, body);
      if (!id) return;
      await this.updateNote(id, title, body);
    },
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
