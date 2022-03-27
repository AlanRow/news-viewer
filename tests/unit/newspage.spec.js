import { shallowMount } from "@vue/test-utils";
import NewsPage from "@/components/NewsPage.vue";
import Vuex from "vuex";
import { testNews } from "./testdata";

describe("NewsPage.vue", () => {
  let getters;
  let store;
  let error = null;
  let loading = false;

  beforeEach(() => {
    getters = {
      areNewsLoading: () => loading,
      newsLoadingError: () => error,
    };

    store = new Vuex.Store({
      getters,
    });
  });

  it("render news", () => {
    const wrapper = shallowMount(NewsPage, {
      store,
      propsData: {
        news: testNews,
      },
    });
    expect(wrapper.findAll('[data-qa="card"]').length).toBe(testNews.length);
  });

  it("render loader", () => {
    loading = true;
    const wrapper = shallowMount(NewsPage, {
      store,
    });
    expect(wrapper.find('[data-qa="loader"]').exists()).toBe(true);
    loading = false;
  });

  it("render error", () => {
    error = "test";
    const wrapper = shallowMount(NewsPage, {
      store,
    });
    expect(wrapper.find('[data-qa="error"]').text()).toContain(error);
    error = null;
  });

  it("render empty", () => {
    const wrapper = shallowMount(NewsPage, {
      store,
      propsData: {
        news: [],
      },
    });
    expect(wrapper.find('[data-qa="empty"]').exists()).toBe(true);
  });
});
