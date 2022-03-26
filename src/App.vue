<template>
  <div id="app">
    <news-page :news="news" />
  </div>
</template>

<script>
import NewsPage from "./components/NewsPage.vue";
import { getNews } from "./api";

export default {
  name: "App",
  components: {
    NewsPage,
  },
  data() {
    return {
      news: [],
    };
  },
  async created() {
    this.news = await getNews();
  },
};
</script>

<style></style>
