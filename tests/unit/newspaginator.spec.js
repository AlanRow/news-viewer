import { mount } from "@vue/test-utils";
import NewsPaginator from "@/components/NewsPaginator.vue";
import Vuex from "vuex";

describe("NewsPaginator.vue", () => {
  let getters;
  let actions;
  let store;

  beforeEach(() => {
    getters = {
      currentPage: () => 2,
      totalPages: () => 20,
      areNewsLoading: () => false,
    };

    actions = {
      loadNews: jest.fn(),
    };

    store = new Vuex.Store({
      getters,
      actions,
    });
  });

  it("current page is active", () => {
    const wrapper = mount(NewsPaginator, { store });
    expect(wrapper.find("li.number.active").text()).toMatch("2");
  });

  it("max page is total pages count", () => {
    const wrapper = mount(NewsPaginator, { store });
    expect(wrapper.findAll("li.number").wrappers.pop().text()).toMatch("20");
  });

  it("load page on click", async () => {
    const wrapper = mount(NewsPaginator, { store });
    await wrapper.findComponent("li.number").trigger("click");
    expect(actions.loadNews).toHaveBeenCalledWith(expect.anything(), 1);
  });
  it("disabled on loading", async () => {
    store = new Vuex.Store({
      getters: {
        ...getters,
        areNewsLoading: () => true,
      },
      actions,
    });

    const wrapper = mount(NewsPaginator, { store });
    await wrapper.findComponent("li.number").trigger("click");
    expect(actions.loadNews).not.toHaveBeenCalled();
  });
});
