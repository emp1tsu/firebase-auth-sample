import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { Note } from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    userData: {} as any,
    notes: [] as Note[],
  },
  mutations: {
    setUser(state, user) {
      state.userData = user;
    },
    setLoginStatus(state, isLogin) {
      state.isLogin = isLogin;
    },
    getNotes(state, notes) {
      state.notes = notes;
    },
    addNote(state, note) {
      state.notes.unshift(note);
    },
    updateNote(state, note) {
      // state.note
    },
    deleteNote(state, id) {
      console.log({ state, id });
      state.notes = state.notes.filter((note) => note.id !== id);
    },
  },
  actions: {
    setUser({ commit }, { user, isLogin }) {
      commit("setUser", user);

      if (user) commit("setLoginStatus", isLogin);
      else commit("setLoginStatus", isLogin);
    },
    async getAllNotes({ commit, state }) {
      const idToken = await state.userData.getIdToken();
      const response = await axios.get("http://localhost:1234/api/v1/note", {
        headers: {
          Authorization: idToken,
        },
      });
      const notes = response.data.body;
      commit("getNotes", notes);
    },
    async createNote({ commit, state }) {
      const idToken = await state.userData.getIdToken();
      const response = await axios.post(
        "http://localhost:1234/api/v1/note",
        { title: "新しいノート", body: "## 新しいノート" },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
      const note = response.data.body;
      commit("addNote", note);
    },
    async updateNote({ commit, state }, { id, title, body }) {
      const idToken = await state.userData.getIdToken();
      const response = await axios.put(
        `http://localhost:1234/api/v1/note/${id}`,
        { title, body },
        {
          headers: {
            Authorization: idToken,
          },
        }
      );
      const note = response.data.body;
      commit("updateNote", note);
    },
    async deleteNote({ commit, state }, { id }) {
      const idToken = await state.userData.getIdToken();
      await axios.delete(`http://localhost:1234/api/v1/note/${id}`, {
        headers: {
          Authorization: idToken,
        },
      });

      commit("deleteNote", id);
    },
  },
  getters: {
    userData: (state) => state.userData,
    notes: (state) => state.notes,
    noteById: (state) => (id: string) =>
      state.notes.find((note: any) => note.id === id),
  },
  modules: {},
});
