<template>
  <div class="flex-grow-1">
    <nav>
      <div class="flex-shrink-0 p-3 bg-white" style="width: 280px">
        <a
          class="
            d-flex
            align-items-center
            pb-3
            mb-3
            link-dark
            text-decoration-none
            border-bottom
          "
        >
          <svg class="bi me-2" width="30" height="24">
            <use xlink:href="#bootstrap" />
          </svg>
          <span class="fs-5 fw-semibold">
            Noteria
          </span>
        </a>
        <ul class="list-unstyled ps-0">
          <li class="mb-1">
            <button
              class="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#home-collapse"
              aria-expanded="true"
            >
              Category
            </button>
            <div class="collapse show" id="home-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li
                  v-for="item in items"
                  :key="item.title"
                  @click="onClickCategory(item.id)"
                >
                  <a class="link-dark rounded">{{ item.title }}</a>
                </li>
              </ul>
            </div>
          </li>
          <li class="border-top my-3"></li>
          <li class="mb-1">
            <button
              class="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#account-collapse"
              aria-expanded="false"
            >
              Account
            </button>
            <div class="collapse" id="account-collapse">
              <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a class="link-dark rounded" @click="logout">Sign out</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>

      <div
        class="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
        style="width: 380px"
      >
        <div class="list-group list-group-flush border-bottom scrollarea">
          <a
            class="list-group-item list-group-item-action active py-3 lh-tight"
            aria-current="true"
            @click="handleAddNote"
          >
            Add Note
          </a>
          <a
            class="list-group-item list-group-item-action py-3 lh-tight"
            v-for="note in notes"
            :key="note.id"
            @click="changeSelectedNoteId(note.id)"
          >
            <div
              class="d-flex w-100 align-items-center justify-content-between"
            >
              <strong class="mb-1">{{ note.title }}</strong>
              <small class="text-muted" @click="handleDeleteNote(note.id)"
                >Delete</small
              >
            </div>
            <div class="col-10 mb-1 small">
              aaaa aaaaa aaaa a aaa aaaaaaaa aaaaaa aaaaaaaaa aaaaaaaaaaaaa.
            </div>
          </a>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import firebase from "firebase/app";
import { Note } from "../types";

type Item = {
  id: string;
  title: string;
  icon: string;
};

const defaultItems: Item[] = [
  { id: "get-all-notes", title: "All Notes", icon: "mdi-view-dashboard" },
];

export default Vue.extend({
  name: "app",
  props: {
    notes: {
      type: Array as PropType<Note[]>,
    },
    getAllNotes: {
      type: Function as PropType<() => void>,
    },
    createNote: {
      type: Function as PropType<() => void>,
    },
    deleteNote: {
      type: Function as PropType<(id: string) => void>,
    },
    changeSelectedNoteId: {
      type: Function as PropType<(id: string) => void>,
    },
  },
  data() {
    return {
      items: defaultItems,
      drawer: true,
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        })
        .catch((error) => {
          console.error(error.message);
          this.$router.push("/login");
        });
    },
    async onClickCategory(id: string) {
      switch (id) {
        case "get-all-notes":
          await this.getAllNotes();
          break;
        default:
          break;
      }
    },
    async handleAddNote() {
      await this.createNote();
    },
    handleDeleteNote(id: string) {
      if (window.confirm("ノートを削除します。よろしいですか？")) {
        this.deleteNote(id);
      }
    },
  },
});
</script>

<style scoped>
nav {
  display: flex;
  flex-wrap: nowrap;
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.b-example-divider {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.bi {
  vertical-align: -0.125em;
  pointer-events: none;
  fill: currentColor;
}

.dropdown-toggle {
  outline: 0;
}

.nav-flush .nav-link {
  border-radius: 0;
}

.btn-toggle {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.65);
  background-color: transparent;
  border: 0;
}
.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, 0.85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform 0.35s ease;
  transform-origin: 0.5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, 0.85);
}
.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  display: inline-flex;
  padding: 0.1875rem 0.5rem;
  margin-top: 0.125rem;
  margin-left: 1.25rem;
  text-decoration: none;
}
.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}

.fw-semibold {
  font-weight: 600;
}
.lh-tight {
  line-height: 1.25;
}
</style>
