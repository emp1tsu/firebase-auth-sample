<template>
  <div class="d-flex flex-row">
    <Header
      :notes="notes"
      :getAllNotes="getAllNotes"
      :createNote="createNote"
      :deleteNote="deleteNote"
      :changeSelectedNoteId="changeSelectedNoteId"
    />
    <main class="d-flex flex-column w-100 vh-100">
      <Editor :note="note" :updateNote="updateNote" />
    </main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import Header from "../components/TheHeader.vue";
import Editor from "../components/TheEditor.vue";
import { Note } from "../types";

type DataType = {
  notes: Note[];
  selectedNoteId: number;
};

export default Vue.extend({
  name: "Home",
  components: {
    Header,
    Editor,
  },
  data(): DataType {
    return {
      notes: [],
      selectedNoteId: 0,
    };
  },
  computed: {
    note(): any {
      const index = this.notes.findIndex(
        (note) => note.id === this.selectedNoteId
      );
      return this.notes[index];
    },
    user() {
      return this.$store.getters.userData;
    },
  },
  methods: {
    async getAllNotes(): Promise<void> {
      const idToken = await this.user.getIdToken();
      const response = await axios.get("http://localhost:1234/api/v1/note", {
        headers: {
          Authorization: idToken,
        },
      });
      this.notes.splice(0, this.notes.length);
      this.notes.push(...response.data.body);
    },
    async createNote(): Promise<void> {
      const idToken = await this.user.getIdToken();
      const response = await axios.post(
        "http://localhost:1234/api/v1/note",
        { title: "新しいノート", body: "## 新しいノート" },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
      this.notes.push(response.data.body);
    },
    async deleteNote(id: number): Promise<void> {
      const idToken = await this.user.getIdToken();
      await axios.delete(`http://localhost:1234/api/v1/note/${id}`, {
        headers: {
          Authorization: idToken,
        },
      });

      const index = this.notes.findIndex((note) => note.id === id);
      this.notes.splice(index, 1);
    },
    async updateNote(id: number, title: string, body: string): Promise<void> {
      const idToken = await this.user.getIdToken();
      await axios.put(
        `http://localhost:1234/api/v1/note/${id}`,
        { title, body },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
    },
    changeSelectedNoteId(id: number): void {
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
