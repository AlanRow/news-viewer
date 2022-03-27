<template>
  <div class="news">
    <div class="news-grid">
      <news-card
        v-for="newsItem in news"
        :key="newsItem.id"
        :title="newsItem.title"
        :image="newsItem.image"
        :description="newsItem.description"
        :date="newsItem.date"
        :link="newsItem.link"
        class="news-grid__item"
        data-qa="card"
      />
    </div>
    <div v-if="isLoading" class="news__sub" data-qa="loader">
      <base-loader />
    </div>
    <div v-else-if="error" class="news__sub">
      <span class="error" data-qa="error">Loading Error: {{ error }}</span>
    </div>
    <div v-else-if="news.length === 0" class="news__sub">
      <span class="info" data-qa="empty">No news</span>
    </div>
  </div>
</template>

<script>
import NewsCard from "./NewsCard.vue";
import BaseLoader from "./BaseLoader.vue";
import { mapGetters } from "vuex";

export default {
  name: "NewsPage",
  components: {
    NewsCard,
    BaseLoader,
  },
  props: {
    news: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "areNewsLoading",
      error: "newsLoadingError",
    }),
  },
};
</script>

<style scoped lang="scss">
.news-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 25px;

  &__item {
    height: 600px;
  }
}

.news {
  &__sub {
    margin: 1em 0;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.error {
  font-size: 1.25rem;
  color: var(--error-color);
}

.info {
  font-size: 1.25rem;
  color: white;
}
</style>
