import { mount } from "@vue/test-utils";
import NewsCard from "@/components/NewsCard.vue";
import { longDescription } from "./testdata";

describe("NewsCard.vue", () => {
  it("renders title", () => {
    const title = "Test title";
    const wrapper = mount(NewsCard, {
      propsData: { title },
    });
    expect(wrapper.find('[data-qa="title"]').text()).toMatch(title);
  });

  it("renders description", () => {
    const description = "Lorem ipsum dolor";
    const wrapper = mount(NewsCard, {
      propsData: { description },
    });
    expect(wrapper.find('[data-qa="description"]').text()).toMatch(description);
  });

  it("cut long description", () => {
    const description = longDescription;
    const wrapper = mount(NewsCard, {
      propsData: { description },
    });
    const trimmedDescription = description.substring(0, 249) + "…";
    expect(wrapper.find('[data-qa="description"]').text()).toMatch(
      trimmedDescription
    );
  });

  it("renders date", () => {
    const date = new Date("12.05.2021");
    const wrapper = mount(NewsCard, {
      propsData: { date },
    });
    expect(wrapper.find('[data-qa="date"]').text()).toMatch("05,12,2021");
  });

  it("renders link", () => {
    const link = "https://goggle.com";
    const wrapper = mount(NewsCard, {
      propsData: { link },
    });
    expect(wrapper.find('[data-qa="link"]').exists()).toBe(true);
  });
});
