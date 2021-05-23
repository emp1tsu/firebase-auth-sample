<template>
  <div class="editor-container">
    <div class="px-5 py-2">
      <v-text-field
        outlined
        dense
        hide-details="true"
        v-model="note.title"
        v-debounce:300ms="test"
      ></v-text-field>
    </div>
    <MonacoEditor
      class="editor"
      v-model="note.body"
      language="markdown"
      theme="vs-dark"
      ref="editor"
      v-debounce:300ms="test"
    />
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
      default: {},
    },
  },
  setup(props, { root }) {
    const state = reactive<State>({ editor: null });

    window.addEventListener("resize", (e) => {
      state.editor.getMonaco().layout();
    });

    const test = () => {
      console.log("test");
    };

    return {
      ...toRefs(state),
      test,
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
