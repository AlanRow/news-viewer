<template>
  <div id="app" class="main">
    <div class="main__content page">
      <news-page :news="news" class="page__news" />
      <news-paginator class="page__paginator" />
      <el-button class="page__loader loader" @click="appendNextPage">
        Загрузить еще
      </el-button>
    </div>
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

<style>
:root {
  --light-color: #eef;
  --dark-color: #227;
  --error-color: #faa;
}
body {
  margin: 0;
}
</style>

<style scoped lang="scss">
.main {
  background-color: var(--light-color);
  padding: 2em 0;
  &__content {
    margin: auto;
    width: 1200px;
  }
}

.page {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--dark-color);
  padding: 1em 2em;

  &__news {
    margin-bottom: 1em;
  }

  &__paginator {
    margin-bottom: 0.5em;
  }
}
</style>
