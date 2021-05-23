<template>
  <v-navigation-drawer app v-model="drawer" :width="notes.length ? 500 : 250">
    <v-row class="fill-height" no-gutters>
      <v-navigation-drawer dark>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Noteria
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item
            v-for="item in items"
            :key="item.title"
            link
            @click="onClickCategory(item.id)"
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block @click="logout">Logout</v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-list class="grow pt-0" v-if="notes.length">
        <v-list-item link>
          <v-list-item-content @click="handleAddNote">
            <v-list-item-title>Add Note</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="note in notes" :key="note.id" link>
          <v-list-item-content @click="changeSelectedNoteId(note.id)">
            <v-list-item-title>{{ note.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon @click="handleDeleteNote(note.id)">
            <v-icon>mdi-delete</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-row>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  reactive,
  toRefs,
  PropType,
} from "@vue/composition-api";
import firebase from "firebase/app";

type Item = {
  id: string;
  title: string;
  icon: string;
};

type State = {
  items: Item[];
  drawer: boolean;
};

const defaultItems: Item[] = [
  { id: "get-all-notes", title: "All Notes", icon: "mdi-view-dashboard" },
];

export default defineComponent({
  name: "app",
  props: {
    changeSelectedNoteId: {
      type: Function as PropType<(id: string) => void>,
    },
  },
  setup(props, { root }) {
    const router = root.$router;
    const store = root.$store;
    const state = reactive<State>({
      items: defaultItems,
      drawer: true,
    });
    const notes = computed(() => store.getters.notes);

    const logout = () => {
      firebase
        .auth()
        .signOut()
        .then(function() {
          router.push("/login");
        })
        .catch((error) => {
          console.error(error.message);
          router.push("/login");
        });
    };

    const onClickCategory = (id: string) => {
      switch (id) {
        case "get-all-notes":
          store.dispatch("getAllNotes");
          break;
        case "get-notes-by-category":
          store.dispatch("getNotesByCategory");
          break;
        default:
          break;
      }
    };

    const handleAddNote = () => {
      store.dispatch("createNote");
    };

    const handleDeleteNote = (id: string) => {
      if (window.confirm("ノートを削除します。よろしいですか？")) {
        store.dispatch("deleteNote", { id });
      }
    };

    return {
      ...toRefs(state),
      notes,
      logout,
      onClickCategory,
      handleAddNote,
      handleDeleteNote,
    };
  },
});
</script>
