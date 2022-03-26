<template>
  <div id="app">
    <news-page :news="news" />
    <news-paginator />
    <el-button @click="appendNextPage">Загрузить еще</el-button>
  </div>
</template>

<script>
import NewsPage from "./components/NewsPage.vue";
import NewsPaginator from "./components/NewsPaginator.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    NewsPage,
    NewsPaginator,
  },
  computed: {
    ...mapGetters(["news"]),
  },
  async created() {
    this.loadNews();
  },
  methods: {
    ...mapActions(["loadNews", "appendNextPage"]),
  },
};
</script>

<style></style>
