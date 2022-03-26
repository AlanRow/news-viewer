<template>
  <div id="app">
    <news-page :news="news" />
    <news-paginator :links="links" @pageChanged="loadNews" />
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
    ...mapGetters(["news", "links"]),
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
