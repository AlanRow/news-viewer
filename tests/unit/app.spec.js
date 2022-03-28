import { mount } from "@vue/test-utils";
import App from "@/App.vue";
import Vuex from "vuex";
import { testNews } from "./testdata";

describe("App.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      news: () => testNews,
      areNewsLoading: () => false,
      newsLoadingError: () => null,
      currentPage: () => 1,
      totalPages: () => 20,
    };

    actions = {
      loadNews: jest.fn(),
      appendNextPage: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it("load page on create", () => {
    mount(App, { store });
    expect(actions.loadNews).toHaveBeenCalled();
  });

  it("load more on button click", async () => {
    const wrapper = mount(App, { store });
    await wrapper.find('[data-qa="load-more"]').trigger("click");
    expect(actions.appendNextPage).toHaveBeenCalled();
  });
});
