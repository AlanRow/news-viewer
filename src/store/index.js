import { getNews } from "@/api";
import Vue from "vue";
import Vuex from "vuex";
import {
  SET_NEWS,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  SET_ERROR,
  SET_LOADING,
} from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: {
      items: [],
      isLoading: false,
      error: null,
    },
    currentPage: 1,
    totalPages: 10,
  },
  getters: {
    news(state) {
      return state.news.items;
    },
    totalPages(state) {
      return state.totalPages;
    },
    currentPage(state) {
      return state.currentPage;
    },
    areNewsLoading(state) {
      return state.news.isLoading;
    },
    newsLoadingError(state) {
      return state.news.error;
    },
  },
  mutations: {
    [SET_NEWS](state, news) {
      state.news.items = news;
    },
    [SET_CURRENT_PAGE](state, number) {
      if (number > 0 && number < state.totalPages) {
        state.currentPage = number;
      }
    },
    [SET_TOTAL_PAGES](state, count) {
      if (count < state.currentPage) {
        state.currentPage = count;
      }
      state.totalPages = count;
    },
    [SET_LOADING](state, loading) {
      state.news.isLoading = loading;
    },
    [SET_ERROR](state, error) {
      state.news.error = error;
    },
  },
  actions: {
    async loadNews({ commit, state }, page) {
      if (state.news.isLoading) {
        return;
      }

      commit(SET_LOADING, true);
      commit(SET_ERROR, null);
      commit(SET_NEWS, []);

      try {
        const { news, currentPage, totalPages } = await getNews(page);
        commit(SET_NEWS, news);
        commit(SET_TOTAL_PAGES, totalPages);
        commit(SET_CURRENT_PAGE, currentPage);
      } catch (err) {
        commit(SET_ERROR, err);
      } finally {
        commit(SET_LOADING, false);
      }
    },
    async appendNextPage({ state, commit }) {
      if (state.news.isLoading) {
        return;
      }

      if (state.currentPage === state.totalPages) {
        return;
      }

      commit(SET_LOADING, true);
      commit(SET_ERROR, null);

      try {
        const { news, currentPage } = await getNews(state.currentPage + 1);
        commit(SET_NEWS, [...state.news.items, ...news]);
        commit(SET_CURRENT_PAGE, currentPage);
      } catch (err) {
        commit(SET_ERROR, err);
      } finally {
        commit(SET_LOADING, false);
      }
    },
  },
  modules: {},
});
