import { getNews } from "@/api";
import Vue from "vue";
import Vuex from "vuex";
import {
  SET_ERROR,
  SET_LINKS,
  SET_LOADING,
  SET_NEWS,
  SET_NEXT_PAGE_LINK,
} from "./types";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: {
      items: [],
      isLoading: false,
      error: null,
    },
    pageLinks: [],
    nextPageLink: null,
  },
  getters: {
    news(state) {
      return state.news.items;
    },
    isNewsLoading(state) {
      return state.news.isLoading;
    },
    newsLoadingError(state) {
      return state.news.error;
    },
    links(state) {
      return state.pageLinks;
    },
  },
  mutations: {
    [SET_NEWS](state, news) {
      state.news.items = news;
    },
    [SET_LINKS](state, links) {
      state.pageLinks = links;
    },
    [SET_LOADING](state, loading) {
      state.news.isLoading = loading;
    },
    [SET_ERROR](state, error) {
      state.news.error = error;
    },
    [SET_NEXT_PAGE_LINK](state, link) {
      state.nextPageLink = link;
    },
  },
  actions: {
    async loadNews({ commit }, link) {
      commit(SET_LOADING, true);
      commit(SET_ERROR, null);
      commit(SET_NEWS, []);

      try {
        const { news, links, next } = await getNews(link);
        commit(SET_NEWS, news);
        commit(SET_LINKS, links);
        commit(SET_NEXT_PAGE_LINK, next);
      } catch (err) {
        commit(SET_ERROR, err);
      } finally {
        commit(SET_LOADING, false);
      }
    },
    async appendNextPage({ state, commit }) {
      if (state.nextPageLink === null) return;

      commit(SET_LOADING, true);
      commit(SET_ERROR, null);

      try {
        const { news, links, next } = await getNews(state.nextPageLink);
        commit(SET_NEWS, [...state.news.items, ...news]);
        commit(SET_LINKS, links);
        commit(SET_NEXT_PAGE_LINK, next);
      } catch (err) {
        commit(SET_ERROR, err);
      } finally {
        commit(SET_LOADING, false);
      }
    },
  },
  modules: {},
});
