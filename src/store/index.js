import Vue from "vue";
import Vuex from "vuex";
import { getUsers } from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    siutableUsers: [],
    isLoading: false,
    pagination: {
      activePage: 0,
      isLastPage: false,
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    },

    getLoadingStatus(state) {
      return state.isLoading;
    },

    getPagination(state) {
      return state.pagination;
    },

    isUserSiutable(state) {
      return (email) => state.siutableUsers.includes(email);
    },
  },
  mutations: {
    SET_USERS(state, { page, users }) {
      let newUsers = page === 1 ? [...users] : [...state.users, ...users];
      state.users = newUsers;
      state.isLoading = false;
    },

    SET_LOADING(state, payload) {
      state.isLoading = payload.loading;
    },

    SET_PAGINATION(state, pagination) {
      state.pagination = pagination;
    },

    ADD_SIUTABLE_USER(state, email) {
      state.siutableUsers.push(email);
    },

    REMOVE_SIUTABLE_USER(state, email) {
      state.siutableUsers = state.siutableUsers.filter(
        (item) => item !== email
      );
    },
  },
  actions: {
    async getUsers({ dispatch }, { page, query }) {
      dispatch("setLoading", { loading: true });
      const users = await getUsers(page, query);
      dispatch("setUsers", { page, users: Object.freeze(users.data) });
      dispatch("setPagination", users.pagination);
    },

    setLoading({ commit }, payload) {
      commit("SET_LOADING", payload);
    },

    setUsers({ commit }, { page, users }) {
      commit("SET_USERS", { page, users: users });
    },

    setPagination({ commit }, pagination) {
      commit("SET_PAGINATION", pagination);
    },

    addSiutableUser({ commit }, email) {
      commit("ADD_SIUTABLE_USER", email);
    },

    removeSiutableUser({ commit }, email) {
      commit("REMOVE_SIUTABLE_USER", email);
    },
  },
  modules: {},
});
